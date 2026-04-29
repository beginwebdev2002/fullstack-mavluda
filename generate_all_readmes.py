import os
import re

IGNORED_DIRS = {'.git', 'node_modules', '.jules', '.agent', '.github', '.gemini', 'dist', 'build', '.angular', '.ignored', 'coverage'}

def get_breadcrumbs(rel_path):
    if rel_path == '.':
        return "[Root](/.)"
    parts = rel_path.split(os.sep)
    breadcrumbs = ["[Root](/.)"]
    current_path = ""
    for part in parts:
        if part == '.':
            continue
        current_path += "/" + part if current_path else part
        breadcrumbs.append(f"[{part}](/{current_path})")
    return " > ".join(breadcrumbs)

def generate_mermaid(dir_name, subdirs, files):
    lines = ["```mermaid", "graph TD", f'  Root["📁 {dir_name}"]']
    for subdir in sorted(subdirs):
        lines.append(f'  Root --> {subdir}["📁 {subdir}"]')
    for file in sorted(files):
        if file.lower() == 'readme.md': continue
        safe_name = re.sub(r'[^a-zA-Z0-9]', '_', file)
        lines.append(f'  Root --> {safe_name}["📄 {file}"]')
    lines.append("```")
    return "\n".join(lines)

def get_fsd_layer(rel_path):
    parts = rel_path.split(os.sep)
    if 'shared' in parts: return "Shared"
    if 'entities' in parts: return "Entity"
    if 'features' in parts: return "Feature"
    if 'widgets' in parts: return "Widget"
    if 'pages' in parts: return "Page"
    if 'app' in parts: return "App"
    return None

def extract_dependencies(file_path):
    deps = set()
    aliases = set()
    if not file_path.endswith(('.ts', '.js', '.tsx', '.jsx', '.scss', '.css', '.html')):
        return [], []
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            import_matches = re.findall(r'import\s+.*?\s+from\s+[\'"](.*?)[\'"]', content)
            for match in import_matches:
                deps.add(match)
                if match.startswith('@'):
                    aliases.add(match.split('/')[0])
            import_matches_scss = re.findall(r'@import\s+[\'"](.*?)[\'"]', content)
            for match in import_matches_scss:
                deps.add(match)
    except Exception:
        pass
    return sorted(list(deps)), sorted(list(aliases))

def parse_existing_readme(readme_path):
    existing_data = {
        'purpose': None,
        'usage': None,
        'responsibilities': {}
    }
    if not os.path.exists(readme_path):
        return existing_data

    try:
        with open(readme_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Extract Purpose
        purpose_match = re.search(r'## 🎯\s*Purpose\s*\n(.*?)(?:\n##|$)', content, re.DOTALL | re.IGNORECASE)
        if purpose_match:
            existing_data['purpose'] = purpose_match.group(1).strip()

        # Extract Usage
        usage_match = re.search(r'## 🛠️\s*Usage\s*\n(.*?)(?:\n##|$)', content, re.DOTALL | re.IGNORECASE)
        if usage_match:
            existing_data['usage'] = usage_match.group(1).strip()

        # Extract File Registry Responsibilities
        registry_match = re.search(r'## 📄\s*File Registry\s*\n(.*?)(?:\n##|$)', content, re.DOTALL | re.IGNORECASE)
        if registry_match:
            table_lines = registry_match.group(1).strip().split('\n')
            for line in table_lines:
                if line.startswith('|') and not line.startswith('|---') and not 'File Name' in line:
                    parts = [p.strip() for p in line.split('|')[1:-1]]
                    if len(parts) >= 3:
                        file_name = parts[0].strip('`')
                        responsibility = parts[2]
                        existing_data['responsibilities'][file_name] = responsibility

    except Exception:
        pass

    return existing_data

def generate_readme_for_dir(root, dirs, files):
    rel_path = os.path.relpath(root, '.')
    dir_name = os.path.basename(root) if root != '.' else 'Mavluda_Beauty_Root'

    readme_path = os.path.join(root, 'README.md')
    existing_data = parse_existing_readme(readme_path)

    breadcrumbs = get_breadcrumbs(rel_path)
    mermaid = generate_mermaid(dir_name, dirs, files)
    fsd_layer = get_fsd_layer(rel_path)

    all_deps = set()

    file_registry = ["| File Name | Type | Responsibility | Key Aliases Used |", "|---|---|---|---|"]
    for file in sorted(files):
        if file.lower() == 'readme.md': continue
        file_path = os.path.join(root, file)

        file_type = "File"
        if file.endswith('.ts'): file_type = "TypeScript"
        if file.endswith('.html'): file_type = "Template"
        if file.endswith('.scss') or file.endswith('.css'): file_type = "Stylesheet"
        if file.endswith('.json'): file_type = "JSON Configuration"
        if file.endswith('.js') or file.endswith('.mjs') or file.endswith('.cjs'): file_type = "JavaScript"

        f_deps, f_aliases = extract_dependencies(file_path)
        for d in f_deps: all_deps.add(d)

        file_aliases = ", ".join(f_aliases) if f_aliases else "N/A"

        responsibility = existing_data['responsibilities'].get(file)
        if not responsibility:
            responsibility = f"Provides core logic and orchestration for {file}."
            if 'module' in file: responsibility = f"Defines the architectural module boundaries for {file}."
            if 'controller' in file: responsibility = f"Handles incoming HTTP requests and routing for {file}."
            if 'service' in file: responsibility = f"Encapsulates business logic and data access for {file}."
            if 'component.ts' in file: responsibility = f"UI component logic and state management for {file}."
            if 'component.html' in file: responsibility = f"Structural template and layout for {file}."
            if 'component.scss' in file: responsibility = f"Luxury styling and visual presentation for {file}."
            if 'spec.ts' in file: responsibility = f"Unit testing and quality assurance for {file}."

        file_registry.append(f"| `{file}` | {file_type} | {responsibility} | {file_aliases} |")

    fsd_note = f"\n**FSD Layer:** {fsd_layer}\n" if fsd_layer else ""

    deps_md = "\n".join([f"- `{d}`" for d in sorted(list(all_deps))]) if all_deps else "*No internal path aliases detected in this directory.*"

    purpose = existing_data['purpose']
    if not purpose:
        purpose = f"Delivering luxury-tier architectural components and high-performance logic for the **{dir_name}** domain. This directory is a crucial part of the Mavluda Beauty full-stack ecosystem, ensuring seamless scalability, robust performance, and an elite digital experience."

    usage = existing_data['usage']
    if not usage:
        usage = f"> This directory acts primarily as a structural container or logic module.\n> To interact with its contents, import the relevant exported members from the `index.ts` or specifically targeted files."

    readme_content = f"""# 📁 {dir_name}

{breadcrumbs}
{fsd_note}
## 🎯 Purpose
{purpose}

## 🏗️ Architecture
{mermaid}

## 📄 File Registry
{chr(10).join(file_registry)}

## 🔗 Dependencies
{deps_md}

## 🛠️ Usage
```markdown
{usage}
```
"""
    with open(readme_path, 'w', encoding='utf-8') as f:
        f.write(readme_content)

def main():
    for root, dirs, files in os.walk('.'):
        dirs[:] = [d for d in dirs if d not in IGNORED_DIRS]
        generate_readme_for_dir(root, dirs, files)

if __name__ == '__main__':
    main()
