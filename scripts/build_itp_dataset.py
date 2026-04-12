#!/usr/bin/env python3

from __future__ import annotations

import csv
import json
import os
from datetime import datetime, timezone
from pathlib import Path
from zipfile import ZipFile
import xml.etree.ElementTree as ET


ROOT = Path(__file__).resolve().parents[1]
RAW_CSV_DIR = ROOT / "data" / "raw" / "lifespancharts"
RAW_MPD_DIR = ROOT / "data" / "raw" / "mpd"
PROCESSED_DIR = ROOT / "data" / "processed"
META_DIR = ROOT / "data" / "meta"

COMBINED_CSV_PATH = PROCESSED_DIR / "itp_lifespan_all.csv"
MANIFEST_PATH = META_DIR / "itp_dataset_manifest.json"

MPD_DOWNLOAD_URLS = {
    "C2017": "https://phenome.jax.org/getcurationfile?id=737&mode=download",
    "C2018": "https://phenome.jax.org/getcurationfile?id=651&mode=download",
    "C2019": "https://phenome.jax.org/getcurationfile?id=708&mode=download",
    "C2020": "https://phenome.jax.org/getcurationfile?id=710&mode=download",
}

GROUP_CODE_NORMALIZATION = {
    "CAPT": "Capt",
}


def cohort_key(path: Path) -> tuple[int, str]:
    cohort = path.stem.split("_")[1]
    return (int(cohort[1:]), path.name)


def count_xlsx_rows(path: Path) -> int:
    row_count = -1
    with ZipFile(path) as archive:
        with archive.open("xl/worksheets/sheet1.xml") as handle:
            for _, element in ET.iterparse(handle, events=("end",)):
                if element.tag.endswith("}row"):
                    row_count += 1
                element.clear()
    return max(row_count, 0)


def main() -> None:
    csv_paths = sorted(RAW_CSV_DIR.glob("ITP_C*_Lifespan.csv"), key=cohort_key)
    if not csv_paths:
        raise SystemExit(f"No cohort CSVs found in {RAW_CSV_DIR}")

    PROCESSED_DIR.mkdir(parents=True, exist_ok=True)
    META_DIR.mkdir(parents=True, exist_ok=True)

    union_columns: list[str] = []
    per_csv_rows: dict[str, int] = {}

    for csv_path in csv_paths:
        with csv_path.open(newline="", encoding="utf-8") as handle:
            reader = csv.DictReader(handle)
            if reader.fieldnames is None:
                raise SystemExit(f"Missing header in {csv_path}")
            for field in reader.fieldnames:
                if field not in union_columns:
                    union_columns.append(field)
            per_csv_rows[csv_path.name] = sum(1 for _ in reader)

    with COMBINED_CSV_PATH.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=union_columns)
        writer.writeheader()

        for csv_path in csv_paths:
            with csv_path.open(newline="", encoding="utf-8") as source_handle:
                reader = csv.DictReader(source_handle)
                for row in reader:
                    normalized = {field: row.get(field, "") for field in union_columns}
                    normalized["group"] = GROUP_CODE_NORMALIZATION.get(
                        normalized.get("group", ""), normalized.get("group", "")
                    )
                    writer.writerow(normalized)

    mpd_paths = sorted(RAW_MPD_DIR.glob("ITP_C*_Lifespan.xlsx"), key=cohort_key)
    mpd_workbooks = []
    overlap_checks = []

    for workbook_path in mpd_paths:
        cohort = workbook_path.stem.split("_")[1]
        xlsx_rows = count_xlsx_rows(workbook_path)
        csv_name = f"ITP_{cohort}_Lifespan.csv"
        csv_rows = per_csv_rows.get(csv_name)

        mpd_workbooks.append(
            {
                "file": str(workbook_path.relative_to(ROOT)),
                "cohort": cohort,
                "download_url": MPD_DOWNLOAD_URLS.get(cohort),
                "bytes": workbook_path.stat().st_size,
                "row_count_excluding_header": xlsx_rows,
            }
        )

        if csv_rows is not None:
            overlap_checks.append(
                {
                    "cohort": cohort,
                    "mpd_xlsx_rows": xlsx_rows,
                    "normalized_csv_rows": csv_rows,
                    "row_count_match": xlsx_rows == csv_rows,
                }
            )

    normalized_repo = {
        "source": "matthost/lifespancharts",
        "repo_url": os.environ.get("LIFESPANCHARTS_REPO_URL"),
        "repo_commit": os.environ.get("LIFESPANCHARTS_REPO_COMMIT"),
        "files": [
            {
                "file": str(path.relative_to(ROOT)),
                "cohort": path.stem.split("_")[1],
                "bytes": path.stat().st_size,
                "row_count_excluding_header": per_csv_rows[path.name],
            }
            for path in csv_paths
        ],
    }

    manifest = {
        "generated_at_utc": datetime.now(timezone.utc).isoformat(),
        "latest_public_cohort_downloaded": "C2020",
        "combined_csv": str(COMBINED_CSV_PATH.relative_to(ROOT)),
        "union_columns": union_columns,
        "cohorts_in_combined_csv": [path.stem.split("_")[1] for path in csv_paths],
        "raw_sources": {
            "normalized_csv_repo": normalized_repo,
            "mpd_workbooks": mpd_workbooks,
        },
        "overlap_checks_mpd_vs_normalized_csv": overlap_checks,
        "notes": [
            "C2008 is not present in the downloaded normalized cohort CSV set.",
            "C2014 adds DOB and DOE columns.",
            "C2019 and C2020 add trailing columns named l, m, n, and o.",
            "The normalized CSV corrects the single C2017 CAPT typo to Capt, matching the MPD workbook record for mouse UM77854.",
            "The combined CSV preserves the union schema across all cohorts.",
        ],
    }

    MANIFEST_PATH.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
