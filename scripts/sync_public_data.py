#!/usr/bin/env python3

from __future__ import annotations

import shutil
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
PUBLIC_DATA_DIR = ROOT / "public" / "data"


def main() -> None:
    PUBLIC_DATA_DIR.mkdir(parents=True, exist_ok=True)

    for source in [
        ROOT / "data" / "processed" / "itp_lifespan_all.csv",
        ROOT / "data" / "processed" / "citp_lifespan_all.csv",
        ROOT / "data" / "meta" / "itp_dataset_manifest.json",
        ROOT / "data" / "meta" / "citp_dataset_manifest.json",
    ]:
        if not source.exists():
            raise SystemExit(f"Missing source file: {source}")
        shutil.copy2(source, PUBLIC_DATA_DIR / source.name)


if __name__ == "__main__":
    main()
