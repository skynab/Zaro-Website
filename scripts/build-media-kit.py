"""Rebuild assets/media-kit/zaro-media-kit.zip from the files the media kit page offers.

Run from the repository root after adding or replacing anything in assets/media-kit/:

    python scripts/build-media-kit.py
"""
import pathlib
import zipfile

ROOT = pathlib.Path(__file__).resolve().parent.parent
KIT = ROOT / "assets" / "media-kit"
OUT = KIT / "zaro-media-kit.zip"

# Product screenshots live with the product page; the zip files them under each app.
SCREENSHOTS = {
    "cutreel/screenshots": sorted((ROOT / "assets" / "img" / "cutreel").glob("0*-workspace.png")),
}


def main() -> None:
    with zipfile.ZipFile(OUT, "w", zipfile.ZIP_DEFLATED) as z:
        for path in sorted(KIT.rglob("*")):
            if path.is_file() and path != OUT:
                z.write(path, f"zaro-media-kit/{path.relative_to(KIT).as_posix()}")
        for folder, files in SCREENSHOTS.items():
            for path in files:
                z.write(path, f"zaro-media-kit/{folder}/{path.name}")
    print(f"wrote {OUT.relative_to(ROOT)} ({OUT.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
