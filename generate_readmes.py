import os
import re

EXCLUDE_DIRS = {
    '.git', 'node_modules', 'dist', 'coverage', '.angular', '.vscode',
    '.jules', '.gemini', '.agent', '.github', '.nx', '.husky', 'build', 'out'
}

def get_breadcrumbs(path):
    parts = path.strip('./').split('/')
    if path == '.' or path == './':
        return "[Root](/.)"
    breadcrumbs = ["[Root](/.)"]
    current_path = "."
    for part in parts:
        current_path = current_path + "/" + part
        breadcrumbs.append(f"[{part}](/{current_path.lstrip('./')})")
    return " > ".join(breadcrumbs)

def extract_existing_responsibilities(readme_path):
    responsibilities = {}
    if not os.path.exists(readme_path):
        return responsibilities

    try:
        with open(readme_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except:
        return responsibilities

    in_table = False
    for line in content.split('\n'):
        if '| File Name' in line and '| Responsibility' in line:
            in_table = True
            continue
        if in_table and line.strip().startswith('|---'):
            continue
        if in_table and line.strip().startswith('|'):
            parts = [p.strip() for p in line.split('|')]
            if len(parts) >= 4:
                file_name = parts[1].replace('`', '').strip()
                resp = parts[3].strip()
                if resp and resp != "Provides core logic and utilities for this domain." and not resp.startswith("Provides core logic and orchestration for"):
                    responsibilities[file_name] = resp
        elif in_table and not line.strip():
            in_table = False

    return responsibilities

def get_fsd_layer(path):
    lower_path = path.lower()
    layers = ['app', 'pages', 'widgets', 'features', 'entities', 'shared']
    for layer in layers:
        if f'/{layer}/' in lower_path or lower_path.endswith(f'/{layer}'):
            return layer.capitalize()
    return None

def analyze_file(filepath):
    # Returns (type, aliases, dependencies, is_export)
    _, ext = os.path.splitext(filepath)
    file_type = "File"
    if ext in ['.ts', '.tsx']:
        file_type = "TypeScript"
    elif ext in ['.js', '.jsx']:
        file_type = "JavaScript"
    elif ext in ['.css', '.scss', '.sass', '.less']:
        file_type = "Style"
    elif ext in ['.html']:
        file_type = "Template"
    elif ext in ['.json']:
        file_type = "Config/JSON"
    elif ext in ['.md']:
        file_type = "Markdown"

    aliases = set()
    deps = set()

    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            # Extract dependencies and aliases from imports
            import_patterns = re.findall(r'from\s+[\'"]([^\'"]+)[\'"]', content)
            import_patterns += re.findall(r'import\s+[\'"]([^\'"]+)[\'"]', content)
            for imp in import_patterns:
                deps.add(imp)
                if imp.startswith('@'):
                    aliases.add(imp.split('/')[0])
    except:
        pass

    return file_type, list(aliases), list(deps)

def generate_mermaid_diagram(folder_path, subdirs, files):
    lines = ["```mermaid", "graph TD"]
    folder_name = os.path.basename(os.path.abspath(folder_path))
    if folder_name == '':
        folder_name = "Root"

    safe_folder = folder_name.replace(" ", "_").replace("-", "_").replace(".", "_")
    lines.append(f'  {safe_folder}["📁 {folder_name}"]')

    # Just list subdirs and files up to a limit
    count = 0
    for subdir in subdirs:
        if count > 10:
            lines.append(f'  {safe_folder} --> more_dirs["..."]')
            break
        safe_sub = subdir.replace(" ", "_").replace("-", "_").replace(".", "_")
        lines.append(f'  {safe_folder} --> {safe_sub}["📁 {subdir}"]')
        count += 1

    count = 0
    for file in files:
        if file == 'README.md': continue
        if count > 10:
            lines.append(f'  {safe_folder} --> more_files["..."]')
            break
        safe_file = file.replace(" ", "_").replace("-", "_").replace(".", "_")
        lines.append(f'  {safe_folder} --> {safe_file}["📄 {file}"]')
        count += 1

    lines.append("```")
    return "\n".join(lines)

def process_directory(dir_path):
    readme_path = os.path.join(dir_path, 'README.md')
    existing_responsibilities = extract_existing_responsibilities(readme_path)

    # List directory
    all_items = []
    try:
        all_items = os.listdir(dir_path)
    except:
        return

    subdirs = [d for d in all_items if os.path.isdir(os.path.join(dir_path, d)) and d not in EXCLUDE_DIRS]
    files = [f for f in all_items if os.path.isfile(os.path.join(dir_path, f))]

    folder_name = os.path.basename(os.path.abspath(dir_path))
    if folder_name == '' or folder_name == '.':
        folder_name = "Mavluda Beauty Repository"

    breadcrumbs = get_breadcrumbs(dir_path)
    fsd_layer = get_fsd_layer(dir_path)

    purpose = f"Delivering luxury-tier architectural components and high-performance logic for the **{folder_name}** domain. This directory is a crucial part of the Mavluda Beauty full-stack ecosystem, ensuring seamless scalability, robust performance, and an elite digital experience."
    if fsd_layer:
        purpose += f"\n\n**FSD Layer:** `{fsd_layer}`"

    diagram = generate_mermaid_diagram(dir_path, subdirs, files)

    table_lines = [
        "| File Name | Type | Responsibility | Key Aliases Used |",
        "|---|---|---|---|"
    ]

    all_deps = set()

    for f in sorted(files):
        if f == 'README.md': continue
        file_path = os.path.join(dir_path, f)
        f_type, aliases, deps = analyze_file(file_path)

        all_deps.update(deps)

        resp = existing_responsibilities.get(f)
        if not resp:
            resp = f"Provides core logic and orchestration for {f}."

        alias_str = ", ".join(aliases) if aliases else "N/A"
        table_lines.append(f"| `{f}` | {f_type} | {resp} | {alias_str} |")

    if len(table_lines) == 2:
        table_lines.append("| (No files) | - | - | - |")

    deps_list = [d for d in all_deps if not d.startswith('.')]
    if not deps_list:
        deps_content = "- No external dependencies."
    else:
        # cap dependencies to 10 to avoid huge lists
        capped_deps = sorted(list(deps_list))[:10]
        deps_content = "\n".join(f"- `{d}`" for d in capped_deps)
        if len(deps_list) > 10:
            deps_content += f"\n- ... and {len(deps_list) - 10} more."

    usage = """```typescript
// Example usage within the Mavluda Beauty ecosystem
import { relevantMember } from './core';

// Integrate into the application architecture
relevantMember.execute();
```"""

    readme_content = f"""# 📁 {folder_name}

{breadcrumbs}

## 🎯 Purpose
{purpose}

## 🏗️ Architecture
{diagram}

## 📄 File Registry
{"\n".join(table_lines)}

## 🔗 Dependencies
{deps_content}

## 🛠️ Usage
{usage}
"""

    with open(readme_path, 'w', encoding='utf-8') as f:
        f.write(readme_content)

def crawl():
    for root, dirs, files in os.walk('.'):
        # Exclude directories
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]

        process_directory(root)

if __name__ == '__main__':
    crawl()
