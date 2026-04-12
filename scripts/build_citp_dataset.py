#!/usr/bin/env python3

from __future__ import annotations

import csv
import json
import re
import subprocess
from collections import Counter, defaultdict
from datetime import datetime, timezone
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
RAW_DIR = ROOT / "data" / "raw" / "citp"
PROCESSED_DIR = ROOT / "data" / "processed"
META_DIR = ROOT / "data" / "meta"

RAW_LIFESPAN_CSV_PATH = RAW_DIR / "lifespan" / "citp_all_lifespan.csv"
DATASET_INDEX_PATH = RAW_DIR / "portal_tables" / "dataset.json"
COMPOUND_INDEX_PATH = RAW_DIR / "portal_tables" / "compound.json"
DOWNLOAD_MANIFEST_PATH = RAW_DIR / "citp_download_manifest.json"

COMBINED_CSV_PATH = PROCESSED_DIR / "citp_lifespan_all.csv"
MANIFEST_PATH = META_DIR / "citp_dataset_manifest.json"

CONTROL_COMPOUND_LABELS = {
    "CTRL_DMSO": "DMSO control",
    "CTRL_H2O": "Water control",
    "untreated": "Untreated control",
}
CONTROL_COMPOUNDS = set(CONTROL_COMPOUND_LABELS)
DEFAULT_SITE_META = {"ALL": "All Labs"}


def utc_now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def load_intervention_descriptions() -> dict[str, str]:
    script = (
        "import { INTERVENTION_DESCRIPTIONS } from './src/lib/interventions.js';"
        "process.stdout.write(JSON.stringify(INTERVENTION_DESCRIPTIONS));"
    )
    try:
        result = subprocess.run(
            ["node", "--input-type=module", "-e", script],
            cwd=ROOT,
            check=True,
            capture_output=True,
            text=True,
        )
    except (OSError, subprocess.CalledProcessError):
        return {}

    try:
        return json.loads(result.stdout)
    except json.JSONDecodeError:
        return {}


def normalize_name(value: str | None) -> str:
    return re.sub(r"[^a-z0-9]+", "", (value or "").lower())


def slug_part(value: str | None) -> str:
    text = (value or "NA").strip()
    return text.replace("|", "/").replace("\n", " ").replace("\r", " ") or "NA"


def humanize_condition(value: str | None) -> str | None:
    text = (value or "").strip()
    if text in {"", "NA", "standard", "unspecified"}:
        return None
    return text.replace("_", " ")


def format_concentration(value: str | None, units: str | None) -> str | None:
    text = (value or "").strip()
    if text in {"", "NA", "0", "0.0"}:
        return None

    unit_text = (units or "").strip()
    if unit_text in {"", "NA"}:
        return text

    return f"{text} {unit_text}"


def build_group_key(
    species: str,
    strain: str,
    compound: str,
    concentration: str,
    units: str,
    condition: str,
) -> str:
    return "|".join(
        [
            slug_part(species),
            slug_part(strain),
            slug_part(compound),
            slug_part(concentration),
            slug_part(units),
            slug_part(condition),
        ]
    )


def build_control_group_key(species: str, strain: str, control_compound: str, condition: str) -> str:
    return "|".join(
        [
            "CTRL",
            slug_part(species),
            slug_part(strain),
            slug_part(control_compound),
            slug_part(condition),
        ]
    )


def build_treatment_label(
    compound_display_name: str,
    strain: str,
    concentration_label: str | None,
    condition_label: str | None,
) -> str:
    details = [item for item in [concentration_label, strain, condition_label] if item]
    if not details:
        return compound_display_name
    return f"{compound_display_name} ({' · '.join(details)})"


def build_control_label(
    control_compound: str,
    strain: str,
    condition_label: str | None,
) -> str:
    display_name = CONTROL_COMPOUND_LABELS.get(control_compound, control_compound)
    details = [item for item in [strain, condition_label] if item]
    if not details:
        return display_name
    return f"{display_name} ({' · '.join(details)})"


def build_treatment_description(
    compound_display_name: str,
    species: str,
    strain: str,
    concentration_label: str | None,
    condition_label: str | None,
    audience_description: str | None,
) -> str:
    summary = audience_description or f"{compound_display_name} is the intervention being tested here."
    description = f"In this CITP study, {compound_display_name} was tested in {species} strain {strain}"
    if concentration_label:
        description += f" at {concentration_label}"
    if condition_label:
        description += f" under {condition_label} conditions"
    return f"{summary} {description}."


def build_control_description(
    control_compound: str,
    species: str,
    strain: str,
    condition_label: str | None,
    audience_description: str | None,
) -> str:
    display_name = CONTROL_COMPOUND_LABELS.get(control_compound, control_compound)
    summary = audience_description or f"{display_name} is the matched comparison condition for this experiment."
    description = f"In this CITP study, it served as the matched control for {species} strain {strain}"
    if condition_label:
        description += f" under {condition_label} conditions"
    return f"{summary} {description}."


def build_compound_lookup(compound_rows: list[dict[str, object]]) -> dict[str, dict[str, object]]:
    lookup: dict[str, dict[str, object]] = {}

    for row in compound_rows:
        keys = {
            normalize_name(str(row.get("comp_name", ""))),
            normalize_name(str(row.get("comp_display_name", ""))),
            normalize_name(str(row.get("comp_abbr", ""))),
        }
        entry = {
            "abbr": row.get("comp_abbr"),
            "raw_name": row.get("comp_name"),
            "display_name": row.get("comp_display_name"),
            "control_name": row.get("control_name"),
        }
        for key in keys:
            if key:
                lookup[key] = entry

    return lookup


def build_cohort_meta_by_name(
    dataset_rows: list[dict[str, object]],
) -> tuple[dict[str, dict[str, object]], list[str], str, int]:
    ordered_rows = sorted(
        dataset_rows,
        key=lambda row: (int(row["year"]), str(row["dataset_name"])),
    )
    cohort_meta_by_name: dict[str, dict[str, object]] = {}

    for row in ordered_rows:
        dataset_name = str(row["dataset_name"])
        description = str(row["dataset_description"])
        short_label = re.sub(
            r"\s+(study|data|negative result)$",
            "",
            description,
            flags=re.IGNORECASE,
        )
        cohort_meta_by_name[dataset_name] = {
            "label": f"{row['year']} · {description}",
            "short_label": short_label,
            "secondary_label": str(row["year"]),
            "dataset_name": dataset_name,
            "dataset_description": description,
            "year": row["year"],
            "doi": row.get("doi"),
            "journal": row.get("journal"),
            "author": row.get("author"),
            "manuscript_id": row.get("manuscript_id"),
        }

    latest_row = max(
        ordered_rows,
        key=lambda row: (int(row["year"]), str(row["dataset_name"])),
    )

    return (
        cohort_meta_by_name,
        [str(row["dataset_name"]) for row in ordered_rows],
        str(latest_row["dataset_name"]),
        int(latest_row["year"]),
    )


def main() -> None:
    if not RAW_LIFESPAN_CSV_PATH.exists():
        raise SystemExit(f"Missing raw CITP lifespan CSV: {RAW_LIFESPAN_CSV_PATH}")

    PROCESSED_DIR.mkdir(parents=True, exist_ok=True)
    META_DIR.mkdir(parents=True, exist_ok=True)

    dataset_rows = json.loads(DATASET_INDEX_PATH.read_text(encoding="utf-8"))
    compound_rows = json.loads(COMPOUND_INDEX_PATH.read_text(encoding="utf-8"))
    download_manifest = json.loads(DOWNLOAD_MANIFEST_PATH.read_text(encoding="utf-8"))
    intervention_descriptions = load_intervention_descriptions()

    compound_lookup = build_compound_lookup(compound_rows)
    (
        cohort_meta_by_name,
        cohort_order,
        latest_public_cohort,
        latest_public_release_year,
    ) = build_cohort_meta_by_name(dataset_rows)

    site_meta = dict(DEFAULT_SITE_META)
    group_meta_by_key: dict[str, dict[str, object]] = {}
    cohort_sample_counts: Counter[str] = Counter()
    cohort_species: defaultdict[str, set[str]] = defaultdict(set)
    cohort_strains: defaultdict[str, set[str]] = defaultdict(set)

    output_fieldnames = [
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
    ]

    with RAW_LIFESPAN_CSV_PATH.open(
        newline="",
        encoding="utf-8",
    ) as source_handle, COMBINED_CSV_PATH.open(
        "w",
        newline="",
        encoding="utf-8",
    ) as output_handle:
        reader = csv.DictReader(source_handle)
        writer = csv.DictWriter(output_handle, fieldnames=output_fieldnames)
        writer.writeheader()

        for row in reader:
            try:
                age_days = int(float(row["DeathAge"]))
            except (TypeError, ValueError):
                continue

            cohort = row["dataset_name"].strip()
            site = row["Lab"].strip()
            species = row["Species"].strip()
            strain = row["Strain"].strip()
            compound = row["Compound"].strip()
            concentration = row["Concentration"].strip()
            units = row["Units"].strip()
            condition = row["Condition"].strip() or "standard"
            dead = row["Dead"].strip() == "1"
            status = "dead" if dead else (row["ObsReason"].strip() or "censored")
            id_value = row["death_id"].strip() or row["observation_id"].strip()
            is_control = compound in CONTROL_COMPOUNDS

            compound_meta = compound_lookup.get(normalize_name(compound), {})
            compound_display_name = (
                CONTROL_COMPOUND_LABELS.get(compound)
                if is_control
                else str(compound_meta.get("display_name") or compound.replace("_", " "))
            )
            control_compound = (
                compound
                if is_control
                else str(compound_meta.get("control_name") or "untreated")
            )

            group = (
                build_control_group_key(species, strain, compound, condition)
                if is_control
                else build_group_key(
                    species,
                    strain,
                    compound,
                    concentration,
                    units,
                    condition,
                )
            )
            control_group = (
                group
                if is_control
                else build_control_group_key(species, strain, control_compound, condition)
            )

            concentration_label = format_concentration(concentration, units)
            condition_label = humanize_condition(condition)
            group_meta_key = f"{cohort}::{group}"

            if group_meta_key not in group_meta_by_key:
                if is_control:
                    control_display_name = CONTROL_COMPOUND_LABELS.get(compound, compound)
                    label = build_control_label(compound, strain, condition_label)
                    description = build_control_description(
                        compound,
                        species,
                        strain,
                        condition_label,
                        intervention_descriptions.get(control_display_name),
                    )
                else:
                    label = build_treatment_label(
                        compound_display_name,
                        strain,
                        concentration_label,
                        condition_label,
                    )
                    description = build_treatment_description(
                        compound_display_name,
                        species,
                        strain,
                        concentration_label,
                        condition_label,
                        intervention_descriptions.get(compound_display_name),
                    )

                group_meta_by_key[group_meta_key] = {
                    "cohort": cohort,
                    "group": group,
                    "control_group": control_group,
                    "label": label,
                    "description": description,
                    "is_control": is_control,
                    "species": species,
                    "strain": strain,
                    "compound": compound,
                    "compound_display_name": compound_display_name,
                    "control_compound": control_compound,
                    "concentration": concentration,
                    "units": units,
                    "condition": condition,
                }

            site_meta[site] = site
            cohort_sample_counts[cohort] += 1
            cohort_species[cohort].add(species)
            cohort_strains[cohort].add(strain)

            writer.writerow(
                {
                    "cohort": cohort,
                    "site": site,
                    "sex": "all",
                    "id": id_value,
                    "group": group,
                    "control_group": control_group,
                    "age_days": age_days,
                    "dead": str(dead).lower(),
                    "status": status,
                    "species": species,
                    "strain": strain,
                    "compound": compound,
                    "compound_display_name": compound_display_name,
                    "control_compound": control_compound,
                    "concentration": concentration,
                    "units": units,
                    "condition": condition,
                    "is_control": str(is_control).lower(),
                }
            )

    intervention_group_counts: Counter[str] = Counter(
        meta["cohort"]
        for meta in group_meta_by_key.values()
        if not meta["is_control"]
    )
    control_group_counts: Counter[str] = Counter(
        meta["cohort"] for meta in group_meta_by_key.values() if meta["is_control"]
    )

    manifest = {
        "generated_at_utc": utc_now_iso(),
        "latest_public_cohort_downloaded": latest_public_cohort,
        "latest_public_release_year": latest_public_release_year,
        "combined_csv": str(COMBINED_CSV_PATH.relative_to(ROOT)),
        "cohort_order": cohort_order,
        "cohort_meta_by_name": cohort_meta_by_name,
        "site_meta": site_meta,
        "group_meta_by_key": dict(sorted(group_meta_by_key.items())),
        "counts": {
            "datasets": download_manifest["counts"]["datasets"],
            "summary_rows": download_manifest["counts"]["summary_rows"],
            "compounds": download_manifest["counts"]["compounds"],
            "strains": download_manifest["counts"]["strains"],
            "rnaseq_experiments": download_manifest["counts"]["rnaseq_experiments"],
            "samples": sum(cohort_sample_counts.values()),
            "intervention_groups": sum(intervention_group_counts.values()),
            "control_groups": sum(control_group_counts.values()),
        },
        "datasets": [
            {
                **cohort_meta_by_name[dataset_name],
                "sample_count": cohort_sample_counts[dataset_name],
                "intervention_group_count": intervention_group_counts[dataset_name],
                "control_group_count": control_group_counts[dataset_name],
                "species": sorted(cohort_species[dataset_name]),
                "strains": sorted(cohort_strains[dataset_name]),
            }
            for dataset_name in cohort_order
        ],
        "raw_sources": {
            "download_manifest": str(DOWNLOAD_MANIFEST_PATH.relative_to(ROOT)),
            "combined_lifespan_csv": str(RAW_LIFESPAN_CSV_PATH.relative_to(ROOT)),
            "dataset_index": str(DATASET_INDEX_PATH.relative_to(ROOT)),
            "compound_index": str(COMPOUND_INDEX_PATH.relative_to(ROOT)),
        },
        "notes": [
            "Control matching is normalized within each dataset by species, strain, control compound, and condition.",
            "Control strata intentionally merge unit-specific solvent rows when the portal records them under the same matched control condition.",
            "The normalized CSV collapses the CITP raw schema into the fields needed by the survival explorer.",
        ],
    }

    MANIFEST_PATH.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
