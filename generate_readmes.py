import os
import re

IGNORE_DIRS = {
    'node_modules', 'dist', 'build', '.git', '.angular', 'tmp', 'out-tsc',
    '.jules', '.agent', '.github', '.gemini', '__pycache__'
}

FSD_LAYERS = {
    'shared': 'Shared',
    'entities': 'Entity',
    'features': 'Feature',
    'widgets': 'Widget',
    'pages': 'Page',
    'app': 'App'
}

def get_fsd_layer(path):
    parts = path.split(os.sep)
    for part in reversed(parts):
        if part in FSD_LAYERS:
            return FSD_LAYERS[part]
    return None

def parse_existing_readme(path):
    registry = {}
    if not os.path.exists(path):
        return registry

    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    table_match = re.search(r'## 📄 File Registry\n(.*?)(?=\n##|$)', content, re.DOTALL)
    if table_match:
        lines = table_match.group(1).strip().split('\n')
        for line in lines:
            if line.startswith('|') and not line.startswith('|---') and not line.startswith('| File Name'):
                cols = [c.strip() for c in line.split('|')[1:-1]]
                if len(cols) == 4:
                    fname = cols[0].strip('`* ')
                    registry[fname] = {
                        'type': cols[1],
                        'responsibility': cols[2],
                        'aliases': cols[3]
                    }
    return registry

def get_file_type(filename):
    ext = os.path.splitext(filename)[1].lower()
    types = {
        '.ts': 'TypeScript',
        '.js': 'JavaScript',
        '.mjs': 'JavaScript',
        '.cjs': 'JavaScript',
        '.json': 'JSON Configuration',
        '.md': 'Markdown',
        '.html': 'HTML Template',
        '.css': 'CSS Stylesheet',
        '.scss': 'SCSS Stylesheet',
        '.py': 'Python Script',
        '.yml': 'YAML Configuration',
        '.yaml': 'YAML Configuration',
        '.sh': 'Shell Script',
        '.env': 'Environment Variables'
    }
    return types.get(ext, 'File')

def extract_dependencies(filepath):
    if not filepath.endswith(('.ts', '.js', '.mjs', '.cjs')):
        return []
    deps = set()
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            for line in f:
                match_import = re.search(r'import\s+.*?\s+from\s+[\'"]([^\'"]+)[\'"]', line)
                if match_import:
                    deps.add(match_import.group(1))
                match_require = re.search(r'require\([\'"]([^\'"]+)[\'"]\)', line)
                if match_require:
                    deps.add(match_require.group(1))
    except Exception:
        pass
    return sorted(list(deps))

def get_breadcrumbs(rel_path):
    if rel_path == '.':
        return '[Root](/.)'

    parts = rel_path.split(os.sep)
    breadcrumbs = ['[Root](/.)']
    current_path = ''
    for part in parts:
        current_path = f"{current_path}/{part}"
        breadcrumbs.append(f"[{part}]({current_path})")
    return ' > '.join(breadcrumbs)

def generate_readme_for_dir(dirpath):
    readme_path = os.path.join(dirpath, 'README.md')
    existing_registry = parse_existing_readme(readme_path)

    dirname = os.path.basename(dirpath)
    if dirname == '.' or dirname == '':
        dirname = 'Mavluda Beauty Repository'
        rel_path = '.'
    else:
        rel_path = os.path.relpath(dirpath, '.')

    fsd_layer = get_fsd_layer(rel_path)

    try:
        entries = sorted(os.listdir(dirpath))
    except PermissionError:
        return

    dirs = []
    files = []
    for e in entries:
        if e in IGNORE_DIRS or e == 'README.md':
            continue
        full_p = os.path.join(dirpath, e)
        if os.path.isdir(full_p):
            dirs.append(e)
        else:
            files.append(e)

    breadcrumbs = get_breadcrumbs(rel_path)

    content = f"# 📁 {dirname}\n\n{breadcrumbs}\n\n"
    if fsd_layer:
        content += f"**FSD Layer:** {fsd_layer}\n\n"

    content += f"## 🎯 Purpose\nDelivering luxury-tier architectural components and high-performance logic for the **{dirname}** domain. This directory is a crucial part of the Mavluda Beauty full-stack ecosystem, ensuring seamless scalability, robust performance, and an elite digital experience.\n\n"

    content += "## 🏗️ Architecture\n```mermaid\ngraph TD\n"
    root_node = "Root"
    content += f"  {root_node}[\"📁 {dirname}\"]\n"
    for d in dirs:
        safe_d = re.sub(r'[^a-zA-Z0-9_]', '_', d)
        content += f"  {root_node} --> {safe_d}[\"📁 {d}\"]\n"
    for f in files:
        safe_f = re.sub(r'[^a-zA-Z0-9_]', '_', f)
        content += f"  {root_node} --> {safe_f}[\"📄 {f}\"]\n"
    content += "```\n\n"

    content += "## 📄 File Registry\n| File Name | Type | Responsibility | Key Aliases Used |\n|---|---|---|---|\n"
    all_deps = set()
    for f in files:
        if f in existing_registry:
            r = existing_registry[f]
            ftype = r['type']
            resp = r['responsibility']
            aliases = r['aliases']
        else:
            ftype = get_file_type(f)
            resp = f"Provides core logic and orchestration for {f}."
            aliases = "N/A"

        deps = extract_dependencies(os.path.join(dirpath, f))
        for d in deps:
            all_deps.add(d)
            if d.startswith('@'):
                alias_base = d.split('/')[0]
                if aliases == 'N/A':
                    aliases = alias_base
                elif alias_base not in aliases:
                    aliases += f", {alias_base}"

        content += f"| `{f}` | {ftype} | {resp} | {aliases} |\n"

    if not files:
        content += "| N/A | N/A | No files in this directory. | N/A |\n"
    content += "\n"

    content += "## 🔗 Dependencies\n"
    if all_deps:
        for d in sorted(all_deps):
            content += f"- `{d}`\n"
    else:
        content += "- No external dependencies.\n"
    content += "\n"

    content += "## 🛠️ Usage\n```typescript\n// Example usage within the Mavluda Beauty ecosystem\n"
    safe_import = re.sub(r'[^a-zA-Z0-9_]', '', dirname)
    if not safe_import:
        safe_import = "core"
    content += f"import {{ relevantMember }} from './{dirname if dirname != 'Mavluda Beauty Repository' else 'core'}';\n\n"
    content += "// Integrate into the application architecture\nrelevantMember.execute();\n```\n"

    with open(readme_path, 'w', encoding='utf-8') as f:
        f.write(content)

def process_directory(path):
    if os.path.basename(path) in IGNORE_DIRS:
        return

    generate_readme_for_dir(path)
    try:
        entries = os.listdir(path)
    except PermissionError:
        return

    for e in entries:
        if e in IGNORE_DIRS:
            continue
        full_p = os.path.join(path, e)
        if os.path.isdir(full_p):
            process_directory(full_p)

if __name__ == '__main__':
    process_directory('.')
    print("README generation completed.")
