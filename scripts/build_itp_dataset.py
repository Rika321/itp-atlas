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


def build_publication(
    pmid: str,
    title: str,
    author: str,
    year: int,
    journal: str,
    *,
    kind: str = "primary",
    note: str | None = None,
) -> dict[str, object]:
    return {
        "pmid": pmid,
        "title": title,
        "author": author,
        "year": year,
        "journal": journal,
        "kind": kind,
        "note": note,
    }


ITP_PUBLICATION_GROUPS = [
    (
        build_publication(
            "18631321",
            "Nordihydroguaiaretic acid and aspirin increase lifespan of genetically heterogeneous male mice.",
            "Strong et al.",
            2008,
            "Aging Cell",
        ),
        [("C2004", group) for group in ["4-OH-PBN", "Asp", "NDGA", "NFP"]],
    ),
    (
        build_publication(
            "19587680",
            "Rapamycin fed late in life extends lifespan in genetically heterogeneous mice.",
            "Harrison et al.",
            2009,
            "Nature",
        ),
        [("C2005", "Rapa")],
    ),
    (
        build_publication(
            "38630424",
            "The Gehan test identifies life-extending compounds overlooked by the log-rank test in the NIA Interventions Testing Program: Metformin, Enalapril, caffeic acid phenethyl ester, green tea extract, and 17-dimethylaminoethylamino-17-demethoxygeldanamycin hydrochloride.",
            "Jiang et al.",
            2024,
            "GeroScience",
            kind="secondary",
            note="Secondary analysis of public ITP survival data.",
        ),
        [("C2005", group) for group in ["CAPE_hi", "CAPE_lo", "Enal"]],
    ),
    (
        build_publication(
            "20974732",
            "Rapamycin, but not resveratrol or simvastatin, extends life span of genetically heterogeneous mice.",
            "Miller et al.",
            2011,
            "J Gerontol A Biol Sci Med Sci",
        ),
        [("C2006", group) for group in ["Rapa", "Res_hi", "Res_lo", "Sim_hi", "Sim_lo"]],
    ),
    (
        build_publication(
            "22451473",
            "Evaluation of resveratrol, green tea extract, curcumin, oxaloacetic acid, and medium-chain triglyceride oil on life span of genetically heterogeneous mice.",
            "Strong et al.",
            2013,
            "J Gerontol A Biol Sci Med Sci",
        ),
        [("C2007", group) for group in ["Cur", "GTE", "MCTO", "OAA", "Res"]],
    ),
    (
        build_publication(
            "24245565",
            "Acarbose, 17-alpha-estradiol, and nordihydroguaiaretic acid extend mouse lifespan preferentially in males.",
            "Harrison et al.",
            2014,
            "Aging Cell",
        ),
        [("C2009", group) for group in ["17aE2", "ACA", "MB"]]
        + [("C2010", group) for group in ["NDGA_hi", "NDGA_lo", "NDGA_mid"]],
    ),
    (
        build_publication(
            "24341993",
            "Rapamycin-mediated lifespan increase in mice is dose and sex dependent and metabolically distinct from dietary restriction.",
            "Miller et al.",
            2014,
            "Aging Cell",
        ),
        [("C2009", group) for group in ["Rapa_hi", "Rapa_lo", "Rapa_mid"]],
    ),
    (
        build_publication(
            "27312235",
            "Longer lifespan in male mice treated with a weakly estrogenic agonist, an antioxidant, an alpha-glucosidase inhibitor or a Nrf2-inducer.",
            "Strong et al.",
            2016,
            "Aging Cell",
        ),
        [("C2010", group) for group in ["FO_hi", "FO_lo"]]
        + [("C2011", group) for group in ["17aE2_hi", "Met", "MetRapa", "Prot", "UDCA"]]
        + [("C2012", "ACA")],
    ),
    (
        build_publication(
            "30688027",
            "Acarbose improves health and lifespan in aging HET3 mice.",
            "Harrison et al.",
            2019,
            "Aging Cell",
        ),
        [("C2012", group) for group in ["HBX", "INT-767"]]
        + [("C2013", group) for group in ["ACA_hi", "ACA_lo", "ACA_mid", "UA"]],
    ),
    (
        build_publication(
            "30916479",
            "Glycine supplementation extends lifespan of male and female mice.",
            "Miller et al.",
            2019,
            "Aging Cell",
        ),
        [("C2014", group) for group in ["Asp_200", "Asp_60", "Gly", "Inu", "TM5441"]],
    ),
    (
        build_publication(
            "33145977",
            "Rapamycin-mediated mouse lifespan extension: Late-life dosage regimes with sex-specific effects.",
            "Strong et al.",
            2020,
            "Aging Cell",
        ),
        [
            ("C2015", group)
            for group in [
                "DMAG",
                "Min",
                "MitoQ",
                "Rapa_hi_continuous",
                "Rapa_hi_cycle",
                "Rapa_hi_start_stop",
                "bGPA",
            ]
        ],
    ),
    (
        build_publication(
            "33788371",
            "17-a-estradiol late in life extends lifespan in aging UM-HET3 male mice; nicotinamide riboside and three other drugs do not affect lifespan in either sex.",
            "Harrison et al.",
            2021,
            "Aging Cell",
        ),
        [("C2016", group) for group in ["17aE2_16m", "17aE2_20m", "CC", "Cana", "GGA", "MIF098", "NR"]],
    ),
    (
        build_publication(
            "36179270",
            "Lifespan benefits for the combination of rapamycin plus acarbose and for captopril in genetically heterogeneous mice.",
            "Strong et al.",
            2022,
            "Aging Cell",
        ),
        [("C2017", group) for group in ["BD", "Capt", "Leu", "PB125", "RaAc16", "RaAc9", "Sul", "Syr"]],
    ),
    (
        build_publication(
            "38041783",
            "Astaxanthin and meclizine extend lifespan in UM-HET3 male mice; fisetin, SG1002 (hydrogen sulfide donor), dimethyl fumarate, mycophenolic acid, and 4-phenylbutyrate do not significantly affect lifespan in either sex at the doses and schedules used.",
            "Harrison et al.",
            2024,
            "GeroScience",
        ),
        [("C2018", group) for group in ["Fis_Cyc", "Fis_On", "SG1002"]]
        + [("C2019", group) for group in ["Asta", "DMF_16", "DMF_9", "MPA", "Mec", "PBA", "SG1002"]],
    ),
    (
        build_publication(
            "38753230",
            "Lifespan effects in male UM-HET3 mice treated with sodium thiosulfate, 16-hydroxyestriol, and late-start canagliflozin.",
            "Miller et al.",
            2024,
            "GeroScience",
        ),
        [("C2020", group) for group in ["AKG_18", "Cana_16", "Cana_6", "DNP", "HYD_16", "HYD_6", "NEBI", "OH-EST", "THIO"]],
    ),
]


def build_publication_by_group_key() -> dict[str, dict[str, object]]:
    publication_by_group_key: dict[str, dict[str, object]] = {}
    for publication, groups in ITP_PUBLICATION_GROUPS:
        for cohort, group in groups:
            normalized_group = GROUP_CODE_NORMALIZATION.get(group, group)
            publication_by_group_key[f"{cohort}::{normalized_group}"] = publication
    return publication_by_group_key


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
    publication_by_group_key = build_publication_by_group_key()

    manifest = {
        "generated_at_utc": datetime.now(timezone.utc).isoformat(),
        "latest_public_cohort_downloaded": "C2020",
        "combined_csv": str(COMBINED_CSV_PATH.relative_to(ROOT)),
        "union_columns": union_columns,
        "cohorts_in_combined_csv": [path.stem.split("_")[1] for path in csv_paths],
        "publication_by_group_key": publication_by_group_key,
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
