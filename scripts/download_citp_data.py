#!/usr/bin/env python3

from __future__ import annotations

import argparse
import csv
import hashlib
import json
import shutil
import urllib.request
from datetime import datetime, timezone
from pathlib import Path
from zipfile import ZipFile


ROOT = Path(__file__).resolve().parents[1]
RAW_DIR = ROOT / "data" / "raw" / "citp"
PORTAL_TABLES_DIR = RAW_DIR / "portal_tables"
LIFESPAN_DIR = RAW_DIR / "lifespan"
BY_DATASET_DIR = LIFESPAN_DIR / "by_dataset"
RNASEQ_DIR = RAW_DIR / "rnaseq"
DEG_TABLES_DIR = RNASEQ_DIR / "deg_tables"
MANIFEST_PATH = RAW_DIR / "citp_download_manifest.json"

BASE_URL = "https://citpaging.org"
USER_AGENT = "bio-citp-downloader/1.0"
TABLE_NAMES = ["dataset", "summary", "compound", "strain", "rnaseq"]
COMBINED_LIFESPAN_ZIP_URL = f"{BASE_URL}/static/downloads/citp_all_lifespan.zip"
DATA_DICTIONARY_URL = f"{BASE_URL}/static/citp_data_dictionary.xlsx"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Download public CITP portal datasets into data/raw/citp.",
    )
    parser.add_argument(
        "--force",
        action="store_true",
        help="Redownload files even when they already exist.",
    )
    return parser.parse_args()


def utc_now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def build_request(url: str) -> urllib.request.Request:
    return urllib.request.Request(url, headers={"User-Agent": USER_AGENT})


def fetch_bytes(url: str) -> bytes:
    with urllib.request.urlopen(build_request(url), timeout=120) as response:
        return response.read()


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def count_csv_rows(path: Path) -> int | None:
    if path.suffix.lower() != ".csv":
        return None

    with path.open("r", encoding="utf-8", newline="") as handle:
        reader = csv.reader(handle)
        try:
            next(reader)
        except StopIteration:
            return 0
        return sum(1 for _ in reader)


def load_json(path: Path) -> object:
    return json.loads(path.read_text(encoding="utf-8"))


def download_file(url: str, destination: Path, force: bool) -> dict[str, object]:
    destination.parent.mkdir(parents=True, exist_ok=True)
    downloaded = force or not destination.exists()

    if downloaded:
        destination.write_bytes(fetch_bytes(url))

    return {
        "file": str(destination.relative_to(ROOT)),
        "url": url,
        "bytes": destination.stat().st_size,
        "sha256": sha256_file(destination),
        "downloaded_this_run": downloaded,
    }


def extract_zip_members(zip_path: Path, destination_dir: Path, force: bool) -> list[dict[str, object]]:
    extracted: list[dict[str, object]] = []

    with ZipFile(zip_path) as archive:
        for member_name in archive.namelist():
            target_path = destination_dir / Path(member_name).name
            target_path.parent.mkdir(parents=True, exist_ok=True)
            extracted_this_run = force or not target_path.exists()

            if extracted_this_run:
                with archive.open(member_name) as source, target_path.open("wb") as dest:
                    shutil.copyfileobj(source, dest)

            extracted.append(
                {
                    "file": str(target_path.relative_to(ROOT)),
                    "member_name": member_name,
                    "bytes": target_path.stat().st_size,
                    "sha256": sha256_file(target_path),
                    "row_count_excluding_header": count_csv_rows(target_path),
                    "extracted_this_run": extracted_this_run,
                }
            )

    return extracted


def download_portal_tables(force: bool) -> tuple[dict[str, list[dict[str, object]]], dict[str, object]]:
    table_rows: dict[str, list[dict[str, object]]] = {}
    table_files: dict[str, object] = {}

    for table_name in TABLE_NAMES:
        url = f"{BASE_URL}/static/data_tables/{table_name}.json"
        destination = PORTAL_TABLES_DIR / f"{table_name}.json"
        metadata = download_file(url, destination, force)
        rows = load_json(destination)

        if not isinstance(rows, list):
            raise SystemExit(f"Expected list payload in {url}")

        metadata["record_count"] = len(rows)
        table_rows[table_name] = rows
        table_files[table_name] = metadata

    return table_rows, table_files


def download_dataset_files(
    dataset_rows: list[dict[str, object]],
    force: bool,
) -> list[dict[str, object]]:
    downloads: list[dict[str, object]] = []

    for row in dataset_rows:
        dataset_name = str(row["dataset_name"])
        dataset_prefix = f"citp_dataset_{dataset_name}"
        csv_url = f"{BASE_URL}/static/downloads/by_dataset/{dataset_prefix}.csv"
        xlsx_url = f"{BASE_URL}/static/downloads/by_dataset/{dataset_prefix}.xlsx"
        csv_path = BY_DATASET_DIR / f"{dataset_prefix}.csv"
        xlsx_path = BY_DATASET_DIR / f"{dataset_prefix}.xlsx"
        csv_metadata = download_file(csv_url, csv_path, force)
        xlsx_metadata = download_file(xlsx_url, xlsx_path, force)
        csv_metadata["row_count_excluding_header"] = count_csv_rows(csv_path)

        downloads.append(
            {
                "dataset_name": dataset_name,
                "manuscript_id": row.get("manuscript_id"),
                "year": row.get("year"),
                "doi": row.get("doi"),
                "dataset_description": row.get("dataset_description"),
                "csv": csv_metadata,
                "xlsx": xlsx_metadata,
            }
        )

    return downloads


def download_deg_tables(
    rnaseq_rows: list[dict[str, object]],
    force: bool,
) -> list[dict[str, object]]:
    deg_tables: list[dict[str, object]] = []

    for row in rnaseq_rows:
        exp_id = row["exp_id"]
        url = f"{BASE_URL}/static/data_tables/rnaseq_degtable_{exp_id}.json"
        destination = DEG_TABLES_DIR / f"rnaseq_degtable_{exp_id}.json"
        metadata = download_file(url, destination, force)
        genes = load_json(destination)

        if not isinstance(genes, list):
            raise SystemExit(f"Expected list payload in {url}")

        metadata["record_count"] = len(genes)

        deg_tables.append(
            {
                "exp_id": exp_id,
                "compound": row.get("comp_display_name"),
                "compound_abbr": row.get("comp_abbr"),
                "strain_name": row.get("strain_name"),
                "adult_age": row.get("adult_age"),
                "geo_accession": row.get("geo_accession"),
                "doi": row.get("doi"),
                "deg_table": metadata,
            }
        )

    return deg_tables


def main() -> None:
    args = parse_args()
    RAW_DIR.mkdir(parents=True, exist_ok=True)

    table_rows, table_files = download_portal_tables(force=args.force)
    dataset_rows = table_rows["dataset"]
    rnaseq_rows = table_rows["rnaseq"]

    combined_zip = download_file(
        COMBINED_LIFESPAN_ZIP_URL,
        LIFESPAN_DIR / "citp_all_lifespan.zip",
        args.force,
    )
    extracted_combined = extract_zip_members(
        LIFESPAN_DIR / "citp_all_lifespan.zip",
        LIFESPAN_DIR,
        args.force,
    )
    data_dictionary = download_file(
        DATA_DICTIONARY_URL,
        LIFESPAN_DIR / "citp_data_dictionary.xlsx",
        args.force,
    )
    dataset_downloads = download_dataset_files(dataset_rows, force=args.force)
    deg_tables = download_deg_tables(rnaseq_rows, force=args.force)

    manifest = {
        "downloaded_at_utc": utc_now_iso(),
        "source": {
            "portal_home": f"{BASE_URL}/portal/home",
            "portal_info": f"{BASE_URL}/portal/info",
            "portal_tables": {
                name: f"{BASE_URL}/static/data_tables/{name}.json" for name in TABLE_NAMES
            },
        },
        "counts": {
            "datasets": len(dataset_rows),
            "summary_rows": len(table_rows["summary"]),
            "compounds": len(table_rows["compound"]),
            "strains": len(table_rows["strain"]),
            "rnaseq_experiments": len(rnaseq_rows),
        },
        "lifespan_bundle": {
            "zip": combined_zip,
            "extracted_files": extracted_combined,
            "data_dictionary": data_dictionary,
        },
        "portal_tables": table_files,
        "dataset_downloads": dataset_downloads,
        "rnaseq_deg_tables": deg_tables,
    }

    MANIFEST_PATH.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")

    print(
        f"Downloaded CITP portal data to {RAW_DIR.relative_to(ROOT)} "
        f"({manifest['counts']['datasets']} datasets, "
        f"{manifest['counts']['rnaseq_experiments']} RNA-seq experiments)."
    )
    print(f"Manifest: {MANIFEST_PATH.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
