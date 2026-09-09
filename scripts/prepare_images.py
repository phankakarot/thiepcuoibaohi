from __future__ import annotations

import argparse
import shutil
from pathlib import Path

from PIL import Image, ImageOps


SELECTIONS = {
    "hero": "DSC_2393.jpg",
    "introduction": "11111.jpg",
    "bride": "DSC_2328.jpg",
    "groom": "DSC_2304.jpg",
    "invitation": "DSC_1975.jpg",
    "closing": "DSC_3214.jpg",
    "album-01": "DSC_1985.jpg",
    "album-02": "DSC_2035.jpg",
    "album-03": "DSC_2237.jpg",
    "album-04": "DSC_2360.jpg",
    "album-05": "DSC_2387.jpg",
    "album-06": "DSC_2404.jpg",
    "album-07": "DSC_2506.jpg",
    "album-08": "DSC_2654.jpg",
}


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("source", type=Path)
    parser.add_argument("output", type=Path)
    args = parser.parse_args()
    args.output.mkdir(parents=True, exist_ok=True)

    for destination, source_name in SELECTIONS.items():
        source = args.source / source_name
        jpeg = args.output / f"{destination}.jpg"
        webp = args.output / f"{destination}.webp"
        shutil.copy2(source, jpeg)
        with Image.open(source) as raw:
            image = ImageOps.exif_transpose(raw).convert("RGB")
            image.thumbnail((2000, 2000), Image.Resampling.LANCZOS)
            image.save(webp, "WEBP", quality=84, method=6)
        print(f"{destination}: {source_name} -> {webp.name}")


if __name__ == "__main__":
    main()
