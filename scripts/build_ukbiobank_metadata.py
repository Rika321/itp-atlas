#!/usr/bin/env python3

from __future__ import annotations

import csv
import json
import re
from datetime import datetime, timezone
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
RAW_DIR = ROOT / "data" / "raw" / "ukbiobank"
SCHEMA_DIR = RAW_DIR / "showcase" / "schemas"
DOWNLOAD_MANIFEST_PATH = RAW_DIR / "ukbiobank_metadata_manifest.json"
META_DIR = ROOT / "data" / "meta"
OUTPUT_PATH = META_DIR / "ukbiobank_metadata_manifest.json"

PROJECT_APP_ID = "1246676"
RELEVANT_FIELD_IDS = ["42039", "42040", "42038", "40023"]
RELEVANT_RECORD_TABLE_IDS = ["1062", "1060", "1061", "1058", "1059"]


def utc_now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def schema_path(prefix: str) -> Path:
    matches = sorted(SCHEMA_DIR.glob(f"{prefix}_*.tsv"))
    if not matches:
        raise SystemExit(f"Missing UK Biobank schema file for prefix {prefix} in {SCHEMA_DIR}")
    return matches[0]


def read_tsv(prefix: str) -> list[dict[str, str]]:
    path = schema_path(prefix)
    with path.open("r", encoding="utf-8", errors="replace", newline="") as handle:
        return list(csv.DictReader(handle, delimiter="\t"))


def clean_htmlish_text(value: str | None) -> str:
    if not value:
        return ""

    text = str(value)
    text = text.replace("<br>", " ").replace("<br/>", " ").replace("<br />", " ")
    text = re.sub(r"<[^>]+>", " ", text)
    text = re.sub(r"~[EF](.*?)~", r"\1", text)
    text = text.replace("&amp;", "&").replace("&quot;", '"').replace("&#39;", "'")
    text = text.replace("&#228;", "a").replace("&#246;", "o").replace("&#252;", "u")
    text = re.sub(r"\s+", " ", text)
    return text.strip()


def as_int(value: str | None) -> int | None:
    if value in {None, ""}:
        return None
    try:
        return int(value)
    except ValueError:
        return None


def pick_by_id(rows: list[dict[str, str]], key: str, wanted: list[str]) -> list[dict[str, str]]:
    index = {row.get(key): row for row in rows}
    return [index[item] for item in wanted if item in index]


def build_field(row: dict[str, str]) -> dict[str, object]:
    return {
        "field_id": row["field_id"],
        "title": row["title"],
        "units": row.get("units") or None,
        "main_category": row.get("main_category") or None,
        "encoding_id": row.get("encoding_id") or None,
        "num_participants": as_int(row.get("num_participants")),
        "item_count": as_int(row.get("item_count")),
        "debut": row.get("debut") or None,
        "version": row.get("version") or None,
        "notes": clean_htmlish_text(row.get("notes")),
        "showcase_url": f"https://biobank.ndph.ox.ac.uk/showcase/field.cgi?id={row['field_id']}",
    }


def build_record_table(
    row: dict[str, str],
    columns_by_rectab: dict[str, list[dict[str, str]]],
) -> dict[str, object]:
    rectab_id = row["rectab_id"]
    columns = [
        {
            "column_name": column["column_name"],
            "value_type": column.get("value_type") or None,
            "encoding_id": column.get("encoding_id") or None,
            "units": column.get("units") or None,
            "notes": clean_htmlish_text(column.get("notes")),
        }
        for column in sorted(
            columns_by_rectab.get(rectab_id, []),
            key=lambda column: as_int(column.get("orda")) or 0,
        )
    ]

    return {
        "rectab_id": rectab_id,
        "table_name": row["table_name"],
        "record_field_id": row.get("record_field_id") or None,
        "parent_id": row.get("parent_id") or None,
        "title": row["title"],
        "available": row.get("available") == "1",
        "private": row.get("private") == "1",
        "nrows": as_int(row.get("nrows")),
        "notes": clean_htmlish_text(row.get("notes")),
        "columns": columns,
        "column_count": len(columns),
        "showcase_url": f"https://biobank.ndph.ox.ac.uk/showcase/rectab.cgi?id={rectab_id}",
    }


def build_project(row: dict[str, str]) -> dict[str, object]:
    return {
        "app_id": row["app_id"],
        "title": row["title"],
        "pi": row.get("pi") or None,
        "institution": row.get("institution") or None,
        "notes": clean_htmlish_text(row.get("notes")),
        "showcase_url": f"https://www.ukbiobank.ac.uk/enable-your-research/approved-research/{row['app_id']}",
        "project_url": (
            "https://www.ukbiobank.ac.uk/projects/"
            "systematic-identification-of-potential-lifespan-modulating-drugs-and-long-term-health-outcomes-in-the-uk-biobank/"
        ),
    }


def main() -> None:
    fields = read_tsv("001")
    record_tables = read_tsv("017")
    record_columns = read_tsv("018")
    applications = read_tsv("027")
    raw_manifest = json.loads(DOWNLOAD_MANIFEST_PATH.read_text(encoding="utf-8"))

    columns_by_rectab: dict[str, list[dict[str, str]]] = {}
    for column in record_columns:
        columns_by_rectab.setdefault(column["rectab_id"], []).append(column)

    project_rows = pick_by_id(applications, "app_id", [PROJECT_APP_ID])
    if not project_rows:
        raise SystemExit(f"Could not find UK Biobank project app_id {PROJECT_APP_ID}")

    manifest = {
        "generated_at_utc": utc_now_iso(),
        "source_scope": "Public UK Biobank metadata only; no participant-level data.",
        "download_manifest": str(DOWNLOAD_MANIFEST_PATH.relative_to(ROOT)),
        "official_schema_summary": {
            "schema_count": raw_manifest["official_showcase"]["schema_count"],
            "schema_catalogue_file": raw_manifest["official_showcase"]["schema_catalogue"]["file"],
            "schemas": [
                {
                    "schema_id": schema["schema_id"],
                    "title": schema["title"],
                    "file": schema["file"],
                    "row_count_excluding_header": schema.get("row_count_excluding_header"),
                    "bytes": schema["bytes"],
                }
                for schema in raw_manifest["official_showcase"]["schemas"]
            ],
        },
        "project": build_project(project_rows[0]),
        "relevant_fields": [
            build_field(row) for row in pick_by_id(fields, "field_id", RELEVANT_FIELD_IDS)
        ],
        "record_tables": [
            build_record_table(row, columns_by_rectab)
            for row in pick_by_id(record_tables, "rectab_id", RELEVANT_RECORD_TABLE_IDS)
        ],
        "github_discovery": {
            "query_summaries": [
                {
                    "query": query["query"],
                    "total_count": query.get("total_count"),
                    "items": query.get("items", [])[:5],
                    "error": query.get("error"),
                }
                for query in raw_manifest["github_discovery"]["search"]["queries"]
            ],
            "resource_snapshots": raw_manifest["github_discovery"]["resource_snapshots"],
        },
    }

    META_DIR.mkdir(parents=True, exist_ok=True)
    OUTPUT_PATH.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
    print(
        f"Wrote {OUTPUT_PATH.relative_to(ROOT)} "
        f"({len(manifest['relevant_fields'])} fields, {len(manifest['record_tables'])} record tables)."
    )


if __name__ == "__main__":
    main()
