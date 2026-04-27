import os
import re
from pathlib import Path

EXCLUDED_DIRS = {
    'node_modules', '.git', '.angular', 'dist', 'build',
    '.gemini', '.agent', '.github', '.jules', 'coverage', 'scripts'
}

FSD_LAYERS = {
    'app': 'App',
    'pages': 'Pages',
    'widgets': 'Widgets',
    'features': 'Features',
    'entities': 'Entities',
    'shared': 'Shared',
    'backend': 'Backend Infrastructure',
    'core': 'Core Logic'
}

def get_fsd_layer(path):
    parts = Path(path).parts
    for part in reversed(parts):
        if part in FSD_LAYERS:
            return FSD_LAYERS[part]
    return "Domain Logic"

def get_icon_for_dir(dirname):
    lower = dirname.lower()
    if lower in ('backend', 'api'): return '⚙️'
    if lower in ('frontend', 'web', 'ui'): return '🎨'
    if lower == 'src': return '💻'
    if lower in ('models', 'entities'): return '🧬'
    if lower in ('components', 'ui'): return '🧩'
    if lower in ('services', 'application'): return '🛠️'
    if lower in ('modules', 'features'): return '📦'
    if lower == 'shared': return '🤝'
    if lower == 'pages': return '📄'
    if lower == 'infrastructure': return '🏗️'
    if lower == 'presentation': return '🎭'
    if lower == 'domain': return '🌐'
    if lower == 'test': return '🧪'
    if lower == 'config': return '🔧'
    if lower == 'utils': return '🧰'
    return '📁'

def get_file_type(filename):
    ext = os.path.splitext(filename)[1].lower()
    types = {
        '.ts': 'TypeScript',
        '.js': 'JavaScript',
        '.html': 'HTML Template',
        '.scss': 'SCSS Stylesheet',
        '.css': 'CSS Stylesheet',
        '.json': 'JSON Config',
        '.md': 'Markdown',
        '.env': 'Environment',
        '.cjs': 'CommonJS',
        '.yml': 'YAML Config',
        '.yaml': 'YAML Config'
    }
    return types.get(ext, 'File')

def extract_aliases(filepath):
    aliases = set()
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            # Match import statements with @...
            matches = re.findall(r"from\s+['\"](@[\w/-]+)['\"]", content)
            aliases.update(matches)
            matches2 = re.findall(r"require\(['\"](@[\w/-]+)['\"]\)", content)
            aliases.update(matches2)
    except Exception:
        pass
    return list(aliases)

def extract_existing_responsibilities(readme_path):
    responsibilities = {}
    if not os.path.exists(readme_path):
        return responsibilities

    try:
        with open(readme_path, 'r', encoding='utf-8') as f:
            content = f.read()
            # Simple regex to find table rows
            rows = re.findall(r'\|\s*`?([^|`]+)`?\s*\|\s*[^|]+\s*\|\s*([^|]+)\s*\|', content)
            for row in rows:
                filename = row[0].strip()
                resp = row[1].strip()
                if filename and resp and resp != "Core logic and utilities for this domain.":
                    responsibilities[filename] = resp
    except Exception:
        pass
    return responsibilities

def generate_readme_for_dir(dirpath):
    existing_readme_path = os.path.join(dirpath, "README.md")
    existing_resp = extract_existing_responsibilities(existing_readme_path)

    dir_name = os.path.basename(dirpath)
    if not dir_name or dir_name == '.':
        dir_name = "Mavluda_Beauty_Root"

    icon = get_icon_for_dir(dir_name)

    # Title
    title_str = f"# {icon} {dir_name.replace('-', ' ').title()}"
    if dir_name == "Mavluda Beauty Root":
        title_str = f"# 👑 Mavluda Beauty Root"

    # Breadcrumbs
    rel_path = os.path.relpath(dirpath, start=".")
    if rel_path == ".":
        breadcrumbs = "[Root](/.)"
    else:
        parts = Path(rel_path).parts
        links = []
        acc = []
        for i, part in enumerate(parts):
            acc.append(part)
            # Link to relative README
            # from current dir to the part's dir
            depth = len(parts) - 1 - i
            prefix = "../" * depth if depth > 0 else "./"
            links.append(f"[{part}]({prefix})")
        breadcrumbs = " > ".join(links)
        breadcrumbs = f"[Root]({'../'*len(parts)}) > " + breadcrumbs

    # Purpose
    layer = get_fsd_layer(dirpath)
    purpose = f"Delivering luxury-tier architectural components and high-performance logic for the **{dir_name.replace('-', ' ').title()}** domain. This directory is a crucial part of the Mavluda Beauty full-stack ecosystem, ensuring seamless scalability, robust performance, and an elite digital experience."
    if layer != "Domain Logic":
        purpose += f"\n\n**Architecture Layer:** {layer} (Feature Sliced Design / Layered Architecture)"

    # Architecture Diagram
    subdirs = sorted([d for d in os.listdir(dirpath) if os.path.isdir(os.path.join(dirpath, d)) and d not in EXCLUDED_DIRS])
    files = sorted([f for f in os.listdir(dirpath) if os.path.isfile(os.path.join(dirpath, f)) and f != "README.md"])

    mermaid = "```mermaid\ngraph TD\n"
    safe_name = dir_name.replace('-', '_').replace('.', '_').replace(' ', '_')
    if safe_name == '':
        safe_name = 'root'
    mermaid += f"  {safe_name}[\"{icon} {dir_name}\"]\n"
    for d in subdirs:
        safe_d = d.replace('-', '_').replace('.', '_')
        d_icon = get_icon_for_dir(d)
        mermaid += f"  {safe_name} --> {safe_name}_{safe_d}[\"📁 {d}\"]\n"
    for f in files[:5]: # limit to 5 files in diagram
        safe_f = f.replace('-', '_').replace('.', '_')
        mermaid += f"  {safe_name} --> {safe_name}_{safe_f}[\"📄 {f}\"]\n"
    if len(files) > 5:
        mermaid += f"  {safe_name} --> {safe_name}_more_files[\"...and {len(files)-5} more files\"]\n"
    mermaid += "```"

    # File Registry
    registry = "| File Name | Type | Responsibility | Key Aliases Used |\n|---|---|---|---|\n"
    all_aliases_in_dir = set()
    for f in files:
        fpath = os.path.join(dirpath, f)
        ftype = get_file_type(f)
        aliases = extract_aliases(fpath)
        alias_str = ", ".join(aliases) if aliases else "N/A"
        all_aliases_in_dir.update(aliases)
        resp = existing_resp.get(f, "Core logic and utilities for this domain.")
        registry += f"| `{f}` | {ftype} | {resp} | {alias_str} |\n"

    if not files:
        registry = "*No files directly in this directory.*\n"

    # Dependencies
    deps = ""
    if all_aliases_in_dir:
        deps = "\n".join(f"- `{a}`" for a in sorted(all_aliases_in_dir))
    else:
        deps = "*No internal path aliases detected in this directory.*"

    # Usage
    usage = f"""```markdown
> This directory acts primarily as a structural container or logic module.
> To interact with its contents, import the relevant exported members from the `index.ts` or specifically targeted files.
```"""

    content = f"""{title_str}

{breadcrumbs}

## 🎯 Purpose
{purpose}

## 🏗️ Architecture
{mermaid}

## 📄 File Registry
{registry}

## 🔗 Dependencies
{deps}

## 🛠️ Usage
{usage}
"""
    return content

def main():
    root_dir = "."
    for dirpath, dirnames, filenames in os.walk(root_dir):
        # Exclude directories
        dirnames[:] = [d for d in dirnames if d not in EXCLUDED_DIRS and not d.startswith('.')]

        readme_path = os.path.join(dirpath, "README.md")
        content = generate_readme_for_dir(dirpath)
        with open(readme_path, "w", encoding="utf-8") as f:
            f.write(content)

if __name__ == "__main__":
    main()
