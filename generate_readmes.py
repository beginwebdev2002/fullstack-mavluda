import os
import re

IGNORED_DIRS = {'.git', 'node_modules', '.jules', '.agent', '.github', '.gemini', 'dist', 'build', '.angular', '.ignored'}

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
        if file == 'README.md': continue
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

def extract_dependencies(files_paths):
    deps = set()
    aliases = set()
    for fp in files_paths:
        if not fp.endswith(('.ts', '.js', '.tsx', '.jsx', '.scss', '.css', '.html')): continue
        try:
            with open(fp, 'r', encoding='utf-8') as f:
                content = f.read()
                # Find typescript imports
                import_matches = re.findall(r'import\s+.*?\s+from\s+[\'"](.*?)[\'"]', content)
                for match in import_matches:
                    deps.add(match)
                    if match.startswith('@'):
                        aliases.add(match.split('/')[0])
                # Find scss/css imports
                import_matches_scss = re.findall(r'@import\s+[\'"](.*?)[\'"]', content)
                for match in import_matches_scss:
                    deps.add(match)
        except Exception:
            pass
    return sorted(list(deps)), sorted(list(aliases))

def generate_readme_for_dir(root, dirs, files):
    rel_path = os.path.relpath(root, '.')
    dir_name = os.path.basename(root) if root != '.' else 'Root'
    if dir_name == 'Root': dir_name = 'Mavluda Beauty Repository'

    breadcrumbs = get_breadcrumbs(rel_path)
    mermaid = generate_mermaid(dir_name, dirs, files)

    fsd_layer = get_fsd_layer(rel_path)

    file_paths = [os.path.join(root, f) for f in files]
    deps, aliases = extract_dependencies(file_paths)

    # File registry
    file_registry = ["| File Name | Type | Responsibility | Key Aliases Used |", "|---|---|---|---|"]
    for file in sorted(files):
        if file == 'README.md': continue
        file_type = "File"
        if file.endswith('.ts'): file_type = "TypeScript"
        if file.endswith('.html'): file_type = "Template"
        if file.endswith('.scss') or file.endswith('.css'): file_type = "Stylesheet"
        if file.endswith('.json'): file_type = "JSON Configuration"
        if file.endswith('.js') or file.endswith('.mjs') or file.endswith('.cjs'): file_type = "JavaScript"

        file_aliases = "N/A"
        if file.endswith(('.ts', '.js', '.tsx', '.jsx', '.scss', '.css')):
            _, f_aliases = extract_dependencies([os.path.join(root, file)])
            if f_aliases:
                file_aliases = ", ".join(f_aliases)

        # Basic responsibility description based on file type/name
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

    deps_md = "\n".join([f"- `{d}`" for d in deps]) if deps else "- No external dependencies."

    readme_content = f"""# 📁 {dir_name}

{breadcrumbs}
{fsd_note}
## 🎯 Purpose
Delivering luxury-tier architectural components and high-performance logic for the **{dir_name}** domain. This directory is a crucial part of the Mavluda Beauty full-stack ecosystem, ensuring seamless scalability, robust performance, and an elite digital experience.

## 🏗️ Architecture
{mermaid}

## 📄 File Registry
{chr(10).join(file_registry)}

## 🔗 Dependencies
{deps_md}

## 🛠️ Usage
```typescript
// Example usage within the Mavluda Beauty ecosystem
import {{ relevantMember }} from './{dir_name if dir_name != 'Mavluda Beauty Repository' else 'core'}';

// Integrate into the application architecture
relevantMember.execute();
```
"""
    readme_path = os.path.join(root, 'README.md')
    with open(readme_path, 'w', encoding='utf-8') as f:
        f.write(readme_content)

def main():
    for root, dirs, files in os.walk('.'):
        # Exclude hidden directories that aren't specifically part of the code we want
        dirs[:] = [d for d in dirs if d not in IGNORED_DIRS]
        generate_readme_for_dir(root, dirs, files)

if __name__ == '__main__':
    main()
