import os
import glob
import subprocess
import yaml
import re
import html

# ───── Configuration ─────
CONTENT_DIR = "content"
CSS_FILE = "typewriter.css"
BIB_FILE = "refs.json"
CSL_FILE = "apa.csl"
FRAG_DIR = "fragments"
FINAL_HTML = "volumen.html"
INTRO_MD = "intro.md"
TITLE = "Volūmen"
GENERATOR = "pandoc 3.7.0.2"
VIEWPORT = "width=device-width, initial-scale=1.0, user-scalable=yes"

# ───── Verify required files ─────
for f in [CSS_FILE, BIB_FILE, CSL_FILE]:
    if not os.path.exists(f):
        print(f"Error: {f} not found.")
        exit(1)

# ───── Verify content directory ─────
if not os.path.isdir(CONTENT_DIR):
    print(f"Error: '{CONTENT_DIR}' directory not found.")
    exit(1)

# ───── Ensure fragments directory exists ─────
os.makedirs(FRAG_DIR, exist_ok=True)

# ───── Process intro.md if it exists ─────
intro_html = ""
if os.path.exists(INTRO_MD):
    temp_intro_md = os.path.join(FRAG_DIR, "intro.tmp.md")
    intro_output = os.path.join(FRAG_DIR, "intro.html")

    with open(INTRO_MD, "r", encoding="utf-8") as src, open(
        temp_intro_md, "w", encoding="utf-8"
    ) as dst:
        dst.write(src.read())

    command = [
        "pandoc",
        temp_intro_md,
        "-o",
        intro_output,
        "--css",
        CSS_FILE,
        "--no-highlight",
        "--file-scope",
    ]

    try:
        subprocess.run(command, check=True, capture_output=True, text=True)
        with open(intro_output, "r", encoding="utf-8") as f:
            intro_html = f.read()
        os.remove(temp_intro_md)
    except subprocess.CalledProcessError as e:
        print(f"❌ Pandoc failed on intro.md")
        print(e.stderr)
else:
    print("ℹ️ No intro.md found, skipping intro section.")

# ───── Process all .md files into fragments ─────
md_files = sorted(glob.glob(os.path.join(CONTENT_DIR, "*.md")), reverse=True)
md_files = [f for f in md_files if not os.path.basename(f).startswith("README") and os.path.basename(f) != INTRO_MD]

fragment_paths = []
toc_entries = []

for md_file in md_files:
    print(f"\n📄 Processing {os.path.basename(md_file)}")

    with open(md_file, "r", encoding="utf-8") as infile:
        content = infile.read()

    title = "Untitled"
    date = ""
    body = content.strip()

    if content.startswith("---"):
        parts = content.split("---", 2)
        if len(parts) >= 3:
            try:
                metadata = yaml.safe_load(parts[1])
                title = metadata.get("title", title)
                date = metadata.get("date", "")
                body = parts[2].strip()
            except Exception as e:
                print(f"⚠️ YAML parse error in {md_file}: {e}")

    # Create safe anchor ID
    anchor = re.sub(r"[^\w\-]", "", title.lower().replace(" ", "-"))
    toc_entries.append((title, anchor))

    # Write temporary Markdown fragment
    stem = os.path.splitext(os.path.basename(md_file))[0]
    temp_md_path = os.path.join(FRAG_DIR, f"{stem}.tmp.md")
    with open(temp_md_path, "w", encoding="utf-8") as tmp:
        tmp.write(f"# {title} {{#{anchor}}}\n")
        if date:
            tmp.write(f"Last update: {date}\n\n")
        tmp.write(body)
        tmp.write("\n\n::: {{#refs}}\n:::\n")

    # Convert to HTML
    frag_html = os.path.join(FRAG_DIR, f"{stem}.html")
    fragment_paths.append(frag_html)

    command = [
        "pandoc",
        temp_md_path,
        "-o",
        frag_html,
        "--css",
        CSS_FILE,
        "--no-highlight",
        "--citeproc",
        "--file-scope",
        f"--bibliography={BIB_FILE}",
        f"--csl={CSL_FILE}",
    ]

    try:
        result = subprocess.run(command, check=True, capture_output=True, text=True)
        print(f"✅ Success: {frag_html}")
        if result.stderr:
            print("⚙️ Pandoc warnings:")
            print(result.stderr)
        os.remove(temp_md_path)
    except subprocess.CalledProcessError as e:
        print(f"❌ Pandoc failed on {md_file}")
        print(e.stderr)
        continue

# ───── Assemble final HTML file ─────
with open(FINAL_HTML, "w", encoding="utf-8") as index:
    index.write("<!DOCTYPE html>\n")
    index.write('<html lang="en">\n')
    index.write("<head>\n")
    index.write('<meta charset="utf-8">\n')
    index.write(f'<meta name="generator" content="{GENERATOR}">\n')
    index.write(f'<meta name="viewport" content="{VIEWPORT}">\n')
    index.write(f"<title>{TITLE}</title>\n")
    index.write(f'<link rel="stylesheet" href="{CSS_FILE}">\n')
    index.write("</head>\n<body>\n")
    index.write(f"<h1>{TITLE}</h1>\n")

    if intro_html:
        index.write(intro_html + "\n<hr>\n")

    for frag_path in fragment_paths:
        with open(frag_path, "r", encoding="utf-8") as frag:
            index.write(frag.read())
            index.write("\n<hr>\n")

    index.write("<h4>Index</h4>\n<ul>\n")
    for title, anchor in toc_entries:
        index.write(f'<li><a href="#{anchor}">{html.escape(title)}</a></li>\n')
    index.write("</ul>\n</body>\n</html>\n")

print(f"\n📘 Final single-page site created → {FINAL_HTML}")