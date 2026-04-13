#!/usr/bin/env python3

from __future__ import annotations

import json
import shutil
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
PUBLIC_DATA_DIR = ROOT / "public" / "data"
PUBLIC_SOURCES = [
    ROOT / "data" / "processed" / "itp_lifespan_all.csv",
    ROOT / "data" / "meta" / "itp_dataset_manifest.json",
]
CITP_CSV_SOURCE = ROOT / "data" / "processed" / "citp_lifespan_all.csv"
CITP_MANIFEST_SOURCE = ROOT / "data" / "meta" / "citp_dataset_manifest.json"
MAX_PUBLIC_CSV_PART_BYTES = 24 * 1024 * 1024
PRIVATE_ONLY_PUBLIC_FILES = [
    "killifish_lifespan_all.csv",
    "killifish_dataset_manifest.json",
    "drosophila_lifespan_all.csv",
    "drosophila_dataset_manifest.json",
]


def split_public_csv(source: Path, public_dir: Path, output_stem: str) -> list[str]:
    if not source.exists():
        raise SystemExit(f"Missing source file: {source}")

    for existing_part in public_dir.glob(f"{output_stem}.part*.csv"):
        existing_part.unlink()

    combined_public_file = public_dir / f"{output_stem}.csv"
    if combined_public_file.exists():
        combined_public_file.unlink()

    with source.open("rb") as handle:
        header = handle.readline()
        if not header:
            raise SystemExit(f"CSV source is empty: {source}")

        part_paths: list[Path] = []
        part_index = 1
        current_path = public_dir / f"{output_stem}.part{part_index:02d}.csv"
        current_file = current_path.open("wb")
        current_size = 0

        try:
            current_file.write(header)
            current_size = len(header)
            part_paths.append(current_path)

            for line in handle:
                if current_size + len(line) > MAX_PUBLIC_CSV_PART_BYTES and current_size > len(header):
                    current_file.close()
                    part_index += 1
                    current_path = public_dir / f"{output_stem}.part{part_index:02d}.csv"
                    current_file = current_path.open("wb")
                    part_paths.append(current_path)
                    current_size = 0

                current_file.write(line)
                current_size += len(line)
        finally:
            current_file.close()

    return [f"data/{path.name}" for path in part_paths]


def write_public_citp_manifest(source: Path, public_dir: Path, csv_parts: list[str]) -> None:
    if not source.exists():
        raise SystemExit(f"Missing source file: {source}")

    manifest = json.loads(source.read_text())
    manifest["combined_csv_parts"] = csv_parts
    (public_dir / source.name).write_text(f"{json.dumps(manifest, indent=2)}\n")


def main() -> None:
    PUBLIC_DATA_DIR.mkdir(parents=True, exist_ok=True)

    for source in PUBLIC_SOURCES:
        if not source.exists():
            raise SystemExit(f"Missing source file: {source}")
        shutil.copy2(source, PUBLIC_DATA_DIR / source.name)

    citp_parts = split_public_csv(CITP_CSV_SOURCE, PUBLIC_DATA_DIR, "citp_lifespan_all")
    write_public_citp_manifest(CITP_MANIFEST_SOURCE, PUBLIC_DATA_DIR, citp_parts)

    # Keep locally built experimental datasets out of the published static bundle.
    for file_name in PRIVATE_ONLY_PUBLIC_FILES:
        public_file = PUBLIC_DATA_DIR / file_name
        if public_file.exists():
            public_file.unlink()


if __name__ == "__main__":
    main()
