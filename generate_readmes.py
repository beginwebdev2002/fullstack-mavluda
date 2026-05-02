import os
import re

IGNORE_DIRS = {'.git', '.github', 'node_modules', 'dist', 'build', '.agent', '.gemini', '.jules', 'coverage'}

def parse_existing_readme(readme_path):
    purpose = None
    responsibilities = {}
    if not os.path.exists(readme_path):
        return purpose, responsibilities

    with open(readme_path, 'r', encoding='utf-8') as f:
        content = f.read()

    purpose_match = re.search(r"## 🎯 (?:PURPOSE|Purpose)\n(.*?)(?=\n## |$)", content, re.DOTALL)
    if purpose_match:
        purpose = purpose_match.group(1).strip()
        # Clean out old fsd layer strings if they exist so we can re-add them standardized
        purpose = re.sub(r"💎 \*\*FSD Layer:\*\*(.*?)(?:\n|$)", "", purpose).strip()

    registry_match = re.search(r"## 📄 (?:FILE REGISTRY|File Registry)\n(.*?)(?=\n## |$)", content, re.DOTALL)
    if registry_match:
        lines = registry_match.group(1).strip().split('\n')
        for line in lines:
            if '|' in line and '---' not in line and 'File Name' not in line:
                parts = [p.strip() for p in line.split('|')]
                if len(parts) >= 4:
                    file_name = parts[1].replace('`', '').strip()
                    resp = parts[3].strip()
                    responsibilities[file_name] = resp
    return purpose, responsibilities

def get_file_type(filename):
    ext = filename.split('.')[-1].lower()
    if ext in ['ts', 'tsx']: return 'TypeScript'
    if ext in ['js', 'jsx', 'cjs', 'mjs']: return 'JavaScript'
    if ext == 'html': return 'Template'
    if ext in ['scss', 'css']: return 'Stylesheet'
    if ext == 'json': return 'JSON Configuration'
    if ext == 'md': return 'Markdown'
    if ext == 'py': return 'Python Script'
    return 'File'

def extract_imports(filepath):
    imports = set()
    aliases = set()
    if not os.path.isfile(filepath):
        return imports, aliases
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            import_matches = re.findall(r"from\s+['\"](.*?)['\"]", content)
            import_matches += re.findall(r"require\(['\"](.*?)['\"]\)", content)
            import_matches += re.findall(r"import\(['\"](.*?)['\"]\)", content)
            for match in import_matches:
                imports.add(match)
                if match.startswith('@'):
                    aliases.add(match.split('/')[0])
    except Exception:
        pass
    return imports, aliases

def generate_breadcrumbs(root_dir, current_dir):
    rel_path = os.path.relpath(current_dir, root_dir)
    if rel_path == '.':
        return "[Root](/.)"

    parts = rel_path.split(os.sep)
    breadcrumbs = ["[Root](/.)"]
    current_path = ""
    for part in parts:
        current_path += f"/{part}"
        breadcrumbs.append(f"[{part}]({current_path})")
    return " > ".join(breadcrumbs)

def determine_fsd_layer(rel_path):
    parts = rel_path.split(os.sep)
    for layer in ['shared', 'entities', 'features', 'widgets', 'pages', 'app']:
        if layer in parts:
            return layer.capitalize()
    return None

def process_directory(root_dir, current_dir):
    if os.path.basename(current_dir) in IGNORE_DIRS:
        return

    try:
        entries = os.listdir(current_dir)
    except PermissionError:
        return

    subdirs = []
    files = []
    for entry in entries:
        full_path = os.path.join(current_dir, entry)
        if os.path.isdir(full_path):
            if entry not in IGNORE_DIRS:
                subdirs.append(entry)
                process_directory(root_dir, full_path)
        else:
            files.append(entry)

    subdirs.sort()
    files.sort()

    readme_path = os.path.join(current_dir, 'README.md')
    existing_purpose, existing_resp = parse_existing_readme(readme_path)

    dir_name = os.path.basename(current_dir) if current_dir != root_dir else "Mavluda Beauty Repository"
    icon = "📁"

    breadcrumbs = generate_breadcrumbs(root_dir, current_dir)

    rel_path = os.path.relpath(current_dir, root_dir)
    fsd_layer = determine_fsd_layer(rel_path)

    purpose_text = ""
    if existing_purpose:
        purpose_text = existing_purpose
    else:
        purpose_text = f"Delivering luxury-tier architectural components and high-performance logic for the **{dir_name}** domain. This directory is a crucial part of the Mavluda Beauty full-stack ecosystem, ensuring seamless scalability, robust performance, and an elite digital experience."

    if fsd_layer:
        purpose_text += f"\n\n💎 **FSD Layer:** This directory represents the **{fsd_layer}** layer in the Feature Sliced Design (FSD) architecture, strictly adhering to its modular principles."

    safe_dir_name = dir_name.replace(" ", "_").replace(".", "_").replace("-", "_")
    if not safe_dir_name:
        safe_dir_name = "root"
    mermaid = "```mermaid\ngraph TD\n"
    mermaid += f"  Root[\"📁 {dir_name}\"]\n"
    for d in subdirs:
        safe_sub = d.replace(" ", "_").replace(".", "_").replace("-", "_")
        mermaid += f"  Root --> {safe_sub}[\"📁 {d}\"]\n"
    for f in files:
        safe_f = f.replace(" ", "_").replace(".", "_").replace("-", "_")
        mermaid += f"  Root --> {safe_f}[\"📄 {f}\"]\n"
    mermaid += "```"

    registry_lines = []
    all_imports = set()
    all_aliases = set()

    for f in files:
        file_path = os.path.join(current_dir, f)
        f_type = get_file_type(f)

        f_imports, f_aliases = extract_imports(file_path)
        all_imports.update(f_imports)
        all_aliases.update(f_aliases)

        resp = existing_resp.get(f)
        if not resp:
            if 'html' in f_type.lower():
                resp = f"Structural template and layout for {f}."
            elif 'stylesheet' in f_type.lower():
                resp = f"Luxury styling and visual presentation for {f}."
            elif 'ts' in f.lower() or 'js' in f.lower():
                resp = f"UI component logic and state management for {f}." if 'component' in f else f"Provides core logic and orchestration for {f}."
            else:
                resp = f"Provides core logic and configuration for {f}."

        aliases_str = ", ".join(sorted(list(f_aliases))) if f_aliases else "N/A"
        registry_lines.append(f"| `{f}` | {f_type} | {resp} | {aliases_str} |")

    registry_table = "| File Name | Type | Responsibility | Key Aliases Used |\n|---|---|---|---|\n"
    if not registry_lines:
        registry_table += "| _No files_ | - | - | - |\n"
    else:
        registry_table += "\n".join(registry_lines)

    deps_list = "\n".join([f"- `{dep}`" for dep in sorted(list(all_imports))]) if all_imports else "- No external dependencies."

    usage = f"""```typescript
// Example usage within the Mavluda Beauty ecosystem
import {{ relevantMember }} from './{dir_name}';

// Integrate into the application architecture
relevantMember.execute();
```"""

    readme_content = f"""# {icon} {dir_name}

{breadcrumbs}

## 🎯 Purpose
{purpose_text}

## 🏗️ Architecture
{mermaid}

## 📄 File Registry
{registry_table}

## 🔗 Dependencies
{deps_list}

## 🛠️ Usage
{usage}
"""

    with open(readme_path, 'w', encoding='utf-8') as f:
        f.write(readme_content)

if __name__ == '__main__':
    process_directory(os.getcwd(), os.getcwd())
    print("Done!")
