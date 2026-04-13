#!/usr/bin/env python3

from __future__ import annotations

import csv
import json
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
RAW_DIR = ROOT / "data" / "raw" / "killifish"
PROCESSED_DIR = ROOT / "data" / "processed"
META_DIR = ROOT / "data" / "meta"

COMBINED_CSV_PATH = PROCESSED_DIR / "killifish_lifespan_all.csv"
MANIFEST_PATH = META_DIR / "killifish_dataset_manifest.json"

DEFAULT_SITE = "ALL"
CONTROL_GROUP = "AL"
SPECIES = "N. furzeri"
STRAIN = "GRZ"

PUBLICATION = {
    "pmid": "36354233",
    "doi": "10.7554/eLife.69008",
    "title": "An automated feeding system for the African killifish reveals the impact of diet on lifespan and allows scalable assessment of associative learning.",
    "author": "Hu et al.",
    "year": 2022,
    "journal": "eLife",
}

RAW_SOURCES = [
    {
        "cohort": "2019-04",
        "label": "Apr 2019 cohort",
        "short_label": "Apr 2019",
        "secondary_label": "Apr 12-17 hatch",
        "file_name": "elife-69008-fig4-data2-v2.csv",
        "source_data_label": "Figure 4 source data 2",
        "url": "https://cdn.elifesciences.org/articles/69008/elife-69008-fig4-data2-v2.csv",
    },
    {
        "cohort": "2019-08",
        "label": "Aug-Sep 2019 cohort",
        "short_label": "Aug-Sep 2019",
        "secondary_label": "Aug 20-Sep 25 hatch",
        "file_name": "elife-69008-fig4-data1-v2.csv",
        "source_data_label": "Figure 4 source data 1",
        "url": "https://cdn.elifesciences.org/articles/69008/elife-69008-fig4-data1-v2.csv",
    },
]


def utc_now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def parse_date(value: str | None) -> datetime.date | None:
    text = (value or "").strip()
    if not text:
        return None
    return datetime.strptime(text, "%m/%d/%y").date()


def parse_age_days(row: dict[str, str]) -> int | None:
    lifespan_text = (row.get("Lifespan_days") or "").strip()
    if lifespan_text:
        try:
            return int(round(float(lifespan_text)))
        except ValueError:
            pass

    hatch_date = parse_date(row.get("HatchDate"))
    death_date = parse_date(row.get("DeathDate"))
    if hatch_date is None or death_date is None:
        return None

    age_days = (death_date - hatch_date).days
    return age_days if age_days >= 0 else None


def build_group_meta(cohort: str) -> dict[str, dict[str, object]]:
    return {
        f"{cohort}::{CONTROL_GROUP}": {
            "cohort": cohort,
            "group": CONTROL_GROUP,
            "control_group": CONTROL_GROUP,
            "label": "Ad libitum control",
            "description": (
                "A cohort-matched ad libitum feeding schedule used as the control condition "
                "for this African turquoise killifish experiment."
            ),
            "is_control": True,
            "species": SPECIES,
            "strain": STRAIN,
            "compound": "ad_libitum",
            "compound_display_name": "Ad libitum control",
            "control_compound": "ad_libitum",
            "concentration": None,
            "units": None,
            "condition": "automated feeding",
            "publication": PUBLICATION,
        },
        f"{cohort}::DR": {
            "cohort": cohort,
            "group": "DR",
            "control_group": CONTROL_GROUP,
            "label": "Dietary restriction",
            "description": (
                "A reduced feeding schedule tested against the ad libitum cohort-matched "
                "control in GRZ African turquoise killifish."
            ),
            "is_control": False,
            "species": SPECIES,
            "strain": STRAIN,
            "compound": "dietary_restriction",
            "compound_display_name": "Dietary restriction",
            "control_compound": "ad_libitum",
            "concentration": None,
            "units": None,
            "condition": "automated feeding",
            "publication": PUBLICATION,
        },
    }


def main() -> None:
    PROCESSED_DIR.mkdir(parents=True, exist_ok=True)
    META_DIR.mkdir(parents=True, exist_ok=True)

    fieldnames = [
        "cohort",
        "site",
        "sex",
        "id",
        "group",
        "control_group",
        "age_days",
        "dead",
        "status",
        "species",
        "strain",
        "compound",
        "compound_display_name",
        "control_compound",
        "concentration",
        "units",
        "condition",
        "is_control",
        "age_initiation_months",
    ]

    combined_rows: list[dict[str, object]] = []
    cohort_meta_by_name: dict[str, dict[str, object]] = {}
    group_meta_by_key: dict[str, dict[str, object]] = {}
    raw_source_summary: list[dict[str, object]] = []

    for source in RAW_SOURCES:
        raw_path = RAW_DIR / source["file_name"]
        if not raw_path.exists():
            raise SystemExit(f"Missing raw killifish CSV: {raw_path}")

        with raw_path.open(newline="") as handle:
            source_rows = list(csv.DictReader(handle))

        hatch_dates = [parse_date(row.get("HatchDate")) for row in source_rows if row.get("HatchDate")]
        death_dates = [parse_date(row.get("DeathDate")) for row in source_rows if row.get("DeathDate")]
        if not hatch_dates:
            raise SystemExit(f"No hatch dates found in {raw_path}")

        group_counts: Counter[str] = Counter()
        sex_counts: Counter[str] = Counter()
        event_counts: Counter[str] = Counter()

        for raw_row in source_rows:
            group = (raw_row.get("FeedingScheme") or "").strip().upper()
            if group not in {CONTROL_GROUP, "DR"}:
                continue

            age_days = parse_age_days(raw_row)
            if age_days is None:
                continue

            sex = (raw_row.get("Sex") or "all").strip().lower() or "all"
            observed = (raw_row.get("Observed") or "").strip() == "1"
            compound = "ad_libitum" if group == CONTROL_GROUP else "dietary_restriction"
            compound_display_name = (
                "Ad libitum control" if group == CONTROL_GROUP else "Dietary restriction"
            )

            combined_rows.append(
                {
                    "cohort": source["cohort"],
                    "site": DEFAULT_SITE,
                    "sex": sex,
                    "id": f"KF-{source['cohort']}-{(raw_row.get('Number') or '').strip()}",
                    "group": group,
                    "control_group": CONTROL_GROUP,
                    "age_days": age_days,
                    "dead": str(observed).lower(),
                    "status": "dead" if observed else "censored",
                    "species": SPECIES,
                    "strain": STRAIN,
                    "compound": compound,
                    "compound_display_name": compound_display_name,
                    "control_compound": "ad_libitum",
                    "concentration": "",
                    "units": "",
                    "condition": "automated feeding",
                    "is_control": str(group == CONTROL_GROUP).lower(),
                    "age_initiation_months": "",
                }
            )

            group_counts[group] += 1
            sex_counts[sex] += 1
            event_counts["dead" if observed else "censored"] += 1

        cohort_meta_by_name[source["cohort"]] = {
            "label": source["label"],
            "short_label": source["short_label"],
            "secondary_label": source["secondary_label"],
            "source_data_label": source["source_data_label"],
            "publication": PUBLICATION,
            "hatch_date_min": min(hatch_dates).isoformat(),
            "hatch_date_max": max(hatch_dates).isoformat(),
            "death_date_min": min(death_dates).isoformat() if death_dates else None,
            "death_date_max": max(death_dates).isoformat() if death_dates else None,
        }
        group_meta_by_key.update(build_group_meta(source["cohort"]))
        raw_source_summary.append(
            {
                "cohort": source["cohort"],
                "label": source["label"],
                "source_data_label": source["source_data_label"],
                "url": source["url"],
                "local_path": str(raw_path.relative_to(ROOT)),
                "row_count": len(source_rows),
                "normalized_row_count": group_counts[CONTROL_GROUP] + group_counts["DR"],
                "group_counts": dict(group_counts),
                "sex_counts": dict(sex_counts),
                "event_counts": dict(event_counts),
                "hatch_date_min": min(hatch_dates).isoformat(),
                "hatch_date_max": max(hatch_dates).isoformat(),
                "death_date_min": min(death_dates).isoformat() if death_dates else None,
                "death_date_max": max(death_dates).isoformat() if death_dates else None,
            }
        )

    combined_rows.sort(key=lambda row: (row["cohort"], row["sex"], row["group"], int(row["age_days"])))

    with COMBINED_CSV_PATH.open("w", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(combined_rows)

    cohort_order = [source["cohort"] for source in RAW_SOURCES]
    manifest = {
        "generated_at_utc": utc_now_iso(),
        "latest_public_cohort_downloaded": cohort_order[-1],
        "latest_public_release_label": "eLife 2022",
        "combined_csv": str(COMBINED_CSV_PATH.relative_to(ROOT)),
        "cohort_order": cohort_order,
        "cohort_meta_by_name": cohort_meta_by_name,
        "site_meta": {DEFAULT_SITE: "eLife public data"},
        "group_meta_by_key": group_meta_by_key,
        "counts": {
            "rows": len(combined_rows),
            "cohorts": len(cohort_order),
            "intervention_groups": sum(
                1 for meta in group_meta_by_key.values() if not meta["is_control"]
            ),
            "dead_events": sum(1 for row in combined_rows if row["dead"] == "true"),
            "censored_rows": sum(1 for row in combined_rows if row["dead"] != "true"),
            "sex_counts": dict(Counter(str(row["sex"]) for row in combined_rows)),
        },
        "raw_sources": raw_source_summary,
        "notes": [
            "Rows were normalized from eLife Figure 4 source-data CSVs into matched dietary restriction versus ad libitum survival comparisons.",
            "Observed=1 was treated as a death event; Observed=0 was treated as censoring.",
            "Lifespan_days was used when present, otherwise age_days was recomputed from HatchDate and DeathDate.",
        ],
    }

    with MANIFEST_PATH.open("w") as handle:
        json.dump(manifest, handle, indent=2)
        handle.write("\n")

    print(
        f"Wrote {COMBINED_CSV_PATH.relative_to(ROOT)} with {len(combined_rows)} rows and "
        f"{MANIFEST_PATH.relative_to(ROOT)}"
    )


if __name__ == "__main__":
    main()
