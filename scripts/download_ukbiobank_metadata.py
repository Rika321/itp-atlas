#!/usr/bin/env python3

from __future__ import annotations

import argparse
import hashlib
import json
import os
import re
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from html.parser import HTMLParser
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
RAW_DIR = ROOT / "data" / "raw" / "ukbiobank"
SHOWCASE_DIR = RAW_DIR / "showcase"
SCHEMA_DIR = SHOWCASE_DIR / "schemas"
PAGE_DIR = SHOWCASE_DIR / "pages"
GITHUB_DIR = RAW_DIR / "github"
MANIFEST_PATH = RAW_DIR / "ukbiobank_metadata_manifest.json"

USER_AGENT = "itp-atlas-ukbiobank-metadata/0.1"
SHOWCASE_BASE_URL = "https://biobank.ndph.ox.ac.uk"
SCHEMA_CATALOGUE_URL = f"{SHOWCASE_BASE_URL}/showcase/schema.cgi"
SCHEMA_DOWNLOAD_URL = f"{SHOWCASE_BASE_URL}/ukb/scdown.cgi?fmt=txt&id={{schema_id}}"
PROJECT_PAGE_URL = (
    "https://www.ukbiobank.ac.uk/projects/"
    "systematic-identification-of-potential-lifespan-modulating-drugs-and-long-term-health-outcomes-in-the-uk-biobank/"
)

OFFICIAL_PAGE_SNAPSHOTS = [
    {
        "key": "ukb_project_1246676",
        "url": PROJECT_PAGE_URL,
        "file": "ukb_project_1246676.html",
        "note": "Approved UK Biobank project page for lifespan-modulating drug discovery.",
    },
    {
        "key": "data_field_42039_gp_prescriptions",
        "url": f"{SHOWCASE_BASE_URL}/showcase/field.cgi?id=42039",
        "file": "field_42039_gp_prescriptions.html",
        "note": "Data-Field 42039: GP prescription record availability.",
    },
    {
        "key": "record_table_1062_gp_scripts",
        "url": f"{SHOWCASE_BASE_URL}/showcase/rectab.cgi?id=1062",
        "file": "record_table_1062_gp_scripts.html",
        "note": "Record Table 1062: GP prescriptions.",
    },
    {
        "key": "record_table_1058_death",
        "url": f"{SHOWCASE_BASE_URL}/showcase/rectab.cgi?id=1058",
        "file": "record_table_1058_death.html",
        "note": "Record Table 1058: death records.",
    },
    {
        "key": "record_table_1059_death_cause",
        "url": f"{SHOWCASE_BASE_URL}/showcase/rectab.cgi?id=1059",
        "file": "record_table_1059_death_cause.html",
        "note": "Record Table 1059: death causes.",
    },
]

GITHUB_SEARCH_QUERIES = [
    "UK Biobank Data Showcase",
    "ukb fields",
    "ukb metadata",
    "ukbtools",
    "ukbwranglr",
    "UKBiobank",
]

GITHUB_RESOURCE_SNAPSHOTS = [
    {
        "key": "kappers_ukb_fields_readme",
        "repo": "Kappers/ukb-fields",
        "url": "https://raw.githubusercontent.com/Kappers/ukb-fields/HEAD/README.md",
        "file": "Kappers_ukb-fields_README.md",
        "note": "Community utilities that point at official UKB schema downloads.",
    },
    {
        "key": "kappers_ukb_fields_schema_script",
        "repo": "Kappers/ukb-fields",
        "url": "https://raw.githubusercontent.com/Kappers/ukb-fields/HEAD/retrieve_ukb_schemas.py",
        "file": "Kappers_ukb-fields_retrieve_ukb_schemas.py",
        "note": "Community schema downloader; kept for implementation comparison only.",
    },
    {
        "key": "biobankly_ukb_ontology_readme",
        "repo": "biobankly/ukb-ontology",
        "url": "https://raw.githubusercontent.com/biobankly/ukb-ontology/HEAD/README.md",
        "file": "biobankly_ukb-ontology_README.md",
        "note": "Community ontology viewer built around UK Biobank Showcase data.",
    },
    {
        "key": "spiros_ukbiobank_resources_readme",
        "repo": "spiros/ukbiobank-resources",
        "url": "https://raw.githubusercontent.com/spiros/ukbiobank-resources/HEAD/README.md",
        "file": "spiros_ukbiobank-resources_README.md",
        "note": "Community curated list of UK Biobank resources.",
    },
    {
        "key": "dnanexus_ukb_rap_readme",
        "repo": "dnanexus/UKB_RAP",
        "url": "https://raw.githubusercontent.com/dnanexus/UKB_RAP/HEAD/README.md",
        "file": "dnanexus_UKB_RAP_README.md",
        "note": "RAP notebooks and examples; not a source of participant data.",
    },
    {
        "key": "kenhanscombe_ukbtools_readme",
        "repo": "kenhanscombe/ukbtools",
        "url": "https://raw.githubusercontent.com/kenhanscombe/ukbtools/HEAD/README.md",
        "file": "kenhanscombe_ukbtools_README.md",
        "note": "R package for manipulating UK Biobank application data.",
    },
    {
        "key": "bjcairns_ukbschemas_readme",
        "repo": "bjcairns/ukbschemas",
        "url": "https://raw.githubusercontent.com/bjcairns/ukbschemas/HEAD/README.md",
        "file": "bjcairns_ukbschemas_README.md",
        "note": "R package for generating a database from UK Biobank schemas.",
    },
]


class SchemaCatalogueParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.schemas: dict[str, str] = {}
        self._active_schema_id: str | None = None
        self._active_text: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag != "a":
            return

        href = dict(attrs).get("href")
        if not href or "schema.cgi?id=" not in href:
            return

        parsed = urllib.parse.urlparse(href)
        schema_id = urllib.parse.parse_qs(parsed.query).get("id", [None])[0]
        if schema_id:
            self._active_schema_id = schema_id
            self._active_text = []

    def handle_data(self, data: str) -> None:
        if self._active_schema_id:
            self._active_text.append(data)

    def handle_endtag(self, tag: str) -> None:
        if tag != "a" or not self._active_schema_id:
            return

        title = " ".join("".join(self._active_text).split())
        if title:
            self.schemas[self._active_schema_id] = title
        self._active_schema_id = None
        self._active_text = []


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Download public UK Biobank metadata snapshots into data/raw/ukbiobank.",
    )
    parser.add_argument(
        "--force",
        action="store_true",
        help="Redownload files even when they already exist.",
    )
    parser.add_argument(
        "--skip-github",
        action="store_true",
        help="Skip GitHub search and README snapshots.",
    )
    return parser.parse_args()


def utc_now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def slugify(value: str) -> str:
    slug = re.sub(r"[^A-Za-z0-9]+", "_", value).strip("_").lower()
    return slug[:80] or "schema"


def build_request(url: str) -> urllib.request.Request:
    headers = {"User-Agent": USER_AGENT}
    if "api.github.com" in url:
        headers["Accept"] = "application/vnd.github+json"
        token = os.environ.get("GITHUB_TOKEN")
        if token:
            headers["Authorization"] = f"Bearer {token}"
    return urllib.request.Request(url, headers=headers)


def fetch_bytes(url: str, timeout: int = 120) -> bytes:
    with urllib.request.urlopen(build_request(url), timeout=timeout) as response:
        return response.read()


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def count_tsv_rows(path: Path) -> int | None:
    if path.suffix.lower() not in {".tsv", ".txt"}:
        return None

    with path.open("r", encoding="utf-8", errors="replace") as handle:
        line_count = sum(1 for _ in handle)
    return max(line_count - 1, 0)


def file_metadata(path: Path, url: str, downloaded: bool) -> dict[str, object]:
    return {
        "file": str(path.relative_to(ROOT)),
        "url": url,
        "bytes": path.stat().st_size,
        "sha256": sha256_file(path),
        "downloaded_this_run": downloaded,
    }


def download_file(url: str, destination: Path, force: bool, timeout: int = 120) -> dict[str, object]:
    destination.parent.mkdir(parents=True, exist_ok=True)
    downloaded = force or not destination.exists()

    if downloaded:
        destination.write_bytes(fetch_bytes(url, timeout=timeout))

    return file_metadata(destination, url, downloaded)


def download_text_file(url: str, destination: Path, force: bool) -> dict[str, object]:
    metadata = download_file(url, destination, force)
    metadata["row_count_excluding_header"] = count_tsv_rows(destination)
    return metadata


def load_schema_catalogue(force: bool) -> tuple[list[dict[str, str]], dict[str, object]]:
    catalogue_path = PAGE_DIR / "schema_catalogue.html"
    catalogue_meta = download_file(SCHEMA_CATALOGUE_URL, catalogue_path, force)
    parser = SchemaCatalogueParser()
    parser.feed(catalogue_path.read_text(encoding="utf-8", errors="replace"))
    schemas = [
        {"schema_id": schema_id, "title": title}
        for schema_id, title in sorted(parser.schemas.items(), key=lambda item: int(item[0]))
    ]
    catalogue_meta["schema_count"] = len(schemas)
    return schemas, catalogue_meta


def download_showcase_schemas(schemas: list[dict[str, str]], force: bool) -> list[dict[str, object]]:
    downloads: list[dict[str, object]] = []

    for schema in schemas:
        schema_id = schema["schema_id"]
        title = schema["title"]
        url = SCHEMA_DOWNLOAD_URL.format(schema_id=schema_id)
        path = SCHEMA_DIR / f"{int(schema_id):03d}_{slugify(title)}.tsv"
        metadata = download_text_file(url, path, force)
        metadata["schema_id"] = schema_id
        metadata["title"] = title
        downloads.append(metadata)

    return downloads


def download_official_pages(force: bool) -> list[dict[str, object]]:
    pages: list[dict[str, object]] = []
    for page in OFFICIAL_PAGE_SNAPSHOTS:
        try:
            metadata = download_file(page["url"], PAGE_DIR / page["file"], force)
            metadata.update({"status": "downloaded"})
        except urllib.error.HTTPError as error:
            metadata = {
                "url": page["url"],
                "status": "error",
                "error": f"HTTP {error.code}: {error.reason}",
            }
        except Exception as error:  # noqa: BLE001 - keep public page snapshots best-effort.
            metadata = {
                "url": page["url"],
                "status": "error",
                "error": str(error),
            }
        metadata.update({"key": page["key"], "note": page["note"]})
        pages.append(metadata)
    return pages


def github_search(force: bool) -> dict[str, object]:
    search_path = GITHUB_DIR / "github_repository_search_results.json"
    if search_path.exists() and not force:
        return {
            "file": str(search_path.relative_to(ROOT)),
            "downloaded_this_run": False,
            "queries": json.loads(search_path.read_text(encoding="utf-8")),
        }

    results: list[dict[str, object]] = []
    for query in GITHUB_SEARCH_QUERIES:
        url = (
            "https://api.github.com/search/repositories?"
            + urllib.parse.urlencode(
                {"q": query, "sort": "stars", "order": "desc", "per_page": "10"}
            )
        )
        try:
            payload = json.loads(fetch_bytes(url, timeout=60).decode("utf-8"))
            results.append(
                {
                    "query": query,
                    "url": url,
                    "total_count": payload.get("total_count"),
                    "items": [
                        {
                            "full_name": item.get("full_name"),
                            "html_url": item.get("html_url"),
                            "description": item.get("description"),
                            "stars": item.get("stargazers_count"),
                            "forks": item.get("forks_count"),
                            "updated_at": item.get("updated_at"),
                        }
                        for item in payload.get("items", [])
                    ],
                }
            )
        except urllib.error.HTTPError as error:
            results.append(
                {
                    "query": query,
                    "url": url,
                    "error": f"HTTP {error.code}: {error.reason}",
                }
            )
        except Exception as error:  # noqa: BLE001 - keep discovery resilient.
            results.append({"query": query, "url": url, "error": str(error)})

    GITHUB_DIR.mkdir(parents=True, exist_ok=True)
    search_path.write_text(json.dumps(results, indent=2) + "\n", encoding="utf-8")
    metadata = file_metadata(search_path, "GitHub repository search API", True)
    metadata["queries"] = results
    return metadata


def download_github_resources(force: bool) -> list[dict[str, object]]:
    resources: list[dict[str, object]] = []
    for resource in GITHUB_RESOURCE_SNAPSHOTS:
        try:
            metadata = download_file(resource["url"], GITHUB_DIR / resource["file"], force)
            metadata.update(
                {
                    "key": resource["key"],
                    "repo": resource["repo"],
                    "note": resource["note"],
                    "status": "downloaded",
                }
            )
        except urllib.error.HTTPError as error:
            metadata = {
                "key": resource["key"],
                "repo": resource["repo"],
                "url": resource["url"],
                "note": resource["note"],
                "status": "error",
                "error": f"HTTP {error.code}: {error.reason}",
            }
        except Exception as error:  # noqa: BLE001 - keep discovery resilient.
            metadata = {
                "key": resource["key"],
                "repo": resource["repo"],
                "url": resource["url"],
                "note": resource["note"],
                "status": "error",
                "error": str(error),
            }
        resources.append(metadata)
    return resources


def main() -> None:
    args = parse_args()
    RAW_DIR.mkdir(parents=True, exist_ok=True)

    schemas, catalogue_meta = load_schema_catalogue(force=args.force)
    schema_downloads = download_showcase_schemas(schemas, force=args.force)
    official_pages = download_official_pages(force=args.force)

    github = None
    github_resources: list[dict[str, object]] = []
    if not args.skip_github:
        github = github_search(force=args.force)
        github_resources = download_github_resources(force=args.force)

    manifest = {
        "downloaded_at_utc": utc_now_iso(),
        "source_scope": "Public metadata only. This download intentionally excludes participant-level UK Biobank data.",
        "official_showcase": {
            "schema_catalogue": catalogue_meta,
            "schema_download_url_template": SCHEMA_DOWNLOAD_URL,
            "schema_count": len(schema_downloads),
            "schemas": schema_downloads,
            "page_snapshots": official_pages,
        },
        "github_discovery": {
            "search": github,
            "resource_snapshots": github_resources,
        },
    }

    MANIFEST_PATH.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
    downloaded_pages = sum(1 for page in official_pages if page.get("status") == "downloaded")
    downloaded_github_resources = sum(
        1 for resource in github_resources if resource.get("status") == "downloaded"
    )
    print(
        f"Wrote {MANIFEST_PATH.relative_to(ROOT)} "
        f"({len(schema_downloads)} official schemas, {downloaded_pages}/{len(official_pages)} "
        f"official page snapshots, {downloaded_github_resources}/{len(github_resources)} "
        f"GitHub resource snapshots)."
    )


if __name__ == "__main__":
    main()
