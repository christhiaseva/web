# Generates one SVG QR code per student linking to their sponsor page.
# White background + white quiet-zone border, rust-colored modules.

import json
import os

import qrcode

BASE_URL = "https://csmforchrist.com/student/"
RUST = "#B84A2A"
BORDER = 4  # quiet-zone modules on every side (white, for reliable detection)

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(ROOT, "images", "qr-codes", "students")


def build_svg(matrix):
    n = len(matrix)
    size = n + BORDER * 2
    rects = []
    for r, row in enumerate(matrix):
        for c, cell in enumerate(row):
            if cell:
                rects.append(
                    f'<rect x="{c + BORDER}" y="{r + BORDER}" width="1" height="1"/>'
                )
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{size}" height="{size}" '
        f'viewBox="0 0 {size} {size}" shape-rendering="crispEdges">'
        f'<rect width="{size}" height="{size}" fill="#FFFFFF"/>'
        f'<g fill="{RUST}">{"".join(rects)}</g>'
        f"</svg>\n"
    )


def main():
    with open(os.path.join(ROOT, "data", "students.json")) as f:
        students = json.load(f)["students"]

    os.makedirs(OUT_DIR, exist_ok=True)

    for student in students:
        qr = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_M, border=0)
        qr.add_data(BASE_URL + student["id"])
        qr.make(fit=True)
        svg = build_svg(qr.get_matrix())
        with open(os.path.join(OUT_DIR, student["id"] + ".svg"), "w") as f:
            f.write(svg)

    print(f"Wrote {len(students)} QR codes to {OUT_DIR}")


if __name__ == "__main__":
    main()
