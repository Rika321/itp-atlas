#!/usr/bin/env python3

from __future__ import annotations

import argparse
import hashlib
import json
import re
import urllib.request
from datetime import datetime, timezone
from pathlib import Path
from zipfile import ZipFile


ROOT = Path(__file__).resolve().parents[1]
RAW_DIR = ROOT / "data" / "raw" / "human_acm"
MANIFEST_PATH = RAW_DIR / "human_acm_download_manifest.json"

USER_AGENT = "itp-atlas-human-acm/0.1"
PUBLICATION = {
    "title": "Association between prescription drugs and all-cause mortality risk in the UK population",
    "author": "Morin et al.",
    "year": 2024,
    "journal": "Aging Cell",
    "pmid": "39364726",
    "doi": "10.1111/acel.14334",
    "pmc": "PMC11634711",
}
SUPPLEMENT_FILES = [
    {
        "file": "ACEL-23-e14334-s001.xlsx",
        "url": "https://pmc.ncbi.nlm.nih.gov/articles/instance/11634711/bin/ACEL-23-e14334-s001.xlsx",
        "label": "Data S1 workbook",
    },
    {
        "file": "ACEL-23-e14334-s002.zip",
        "url": "https://pmc.ncbi.nlm.nih.gov/articles/instance/11634711/bin/ACEL-23-e14334-s002.zip",
        "label": "Data S2 supplementary archive",
    },
]


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Download public Morin et al. UK Biobank ACM supplement files.",
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


def sha256_bytes(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def solve_pmc_pow(html: bytes) -> tuple[str, str] | None:
    text = html.decode("utf-8", errors="replace")
    challenge_match = re.search(r'const POW_CHALLENGE = "([^"]+)"', text)
    difficulty_match = re.search(r'const POW_DIFFICULTY = "([^"]+)"', text)
    cookie_match = re.search(r'const POW_COOKIE_NAME = "([^"]+)"', text)

    if not challenge_match or not difficulty_match or not cookie_match:
        return None

    challenge = challenge_match.group(1)
    difficulty = int(difficulty_match.group(1))
    prefix = "0" * difficulty

    nonce = 0
    while True:
        digest = hashlib.sha256(f"{challenge}{nonce}".encode("utf-8")).hexdigest()
        if digest.startswith(prefix):
            return cookie_match.group(1), f"{challenge},{nonce}"
        nonce += 1


def fetch_pmc_binary(url: str) -> tuple[bytes, bool]:
    first_payload = fetch_bytes(url)
    if first_payload.startswith(b"PK"):
        return first_payload, False

    cookie = solve_pmc_pow(first_payload)
    if cookie is None:
        return first_payload, False

    opener = urllib.request.build_opener()
    request = build_request(url)
    request.add_header("Cookie", f"{cookie[0]}={cookie[1]}")
    with opener.open(request, timeout=120) as response:
        second_payload = response.read()
    return second_payload, True


def download_file(file_info: dict[str, str], force: bool) -> dict[str, object]:
    destination = RAW_DIR / file_info["file"]
    downloaded = force or not destination.exists()
    used_pow = False

    if downloaded:
        payload, used_pow = fetch_pmc_binary(file_info["url"])
        destination.write_bytes(payload)

    metadata: dict[str, object] = {
        "file": str(destination.relative_to(ROOT)),
        "url": file_info["url"],
        "label": file_info["label"],
        "bytes": destination.stat().st_size,
        "sha256": sha256_file(destination),
        "downloaded_this_run": downloaded,
        "used_pmc_pow_cookie": used_pow,
    }

    if destination.suffix.lower() == ".zip":
        with ZipFile(destination) as archive:
            metadata["zip_members"] = [
                {"name": info.filename, "bytes": info.file_size}
                for info in archive.infolist()
            ]

    return metadata


def main() -> None:
    args = parse_args()
    RAW_DIR.mkdir(parents=True, exist_ok=True)
    downloads = [download_file(file_info, force=args.force) for file_info in SUPPLEMENT_FILES]
    manifest = {
        "downloaded_at_utc": utc_now_iso(),
        "source_scope": "Public article supplement only; no UK Biobank participant-level data.",
        "publication": PUBLICATION,
        "downloads": downloads,
    }
    MANIFEST_PATH.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {MANIFEST_PATH.relative_to(ROOT)} ({len(downloads)} files).")


if __name__ == "__main__":
    main()
