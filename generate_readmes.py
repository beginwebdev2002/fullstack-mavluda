import os
import re

IGNORED_DIRS = {'.git', 'node_modules', '.github', '.agent', '.gemini', '.jules', 'dist', 'dist-ssr', 'logs', 'uploads', '__pycache__', '.vscode', '.idea'}

def should_ignore(path):
    parts = path.split(os.sep)
    for part in parts:
        if part in IGNORED_DIRS or part.endswith('.local'):
            return True
    return False

def get_breadcrumbs(path):
    if path == '.' or path == './':
        return "[Root](/.)"
    parts = path.split(os.sep)
    if parts[0] == '.':
        parts = parts[1:]

    crumbs = ["[Root](/.)"]
    current_path = ""
    for part in parts:
        current_path += "/" + part
        crumbs.append(f"[{part}]({current_path})")
    return " > ".join(crumbs)

def get_fsd_layer(path):
    parts = path.split(os.sep)
    if 'frontend' in parts and 'src' in parts:
        src_idx = parts.index('src')
        if len(parts) > src_idx + 1:
            layer = parts[src_idx + 1]
            layers = {'app': 'App', 'pages': 'Page', 'widgets': 'Widget', 'features': 'Feature', 'entities': 'Entity', 'shared': 'Shared'}
            return layers.get(layer, None)
    return None

def extract_existing_info(readme_path):
    purpose = None
    file_responsibilities = {}
    if os.path.exists(readme_path):
        with open(readme_path, 'r', encoding='utf-8') as f:
            content = f.read()
            purpose_match = re.search(r'## 🎯 Purpose\n(.*?)\n##', content, re.DOTALL)
            if purpose_match:
                purpose = purpose_match.group(1).strip()

            table_match = re.search(r'## 📄 File Registry\n(.*?)(\n## |$)', content, re.DOTALL)
            if table_match:
                table_lines = table_match.group(1).strip().split('\n')
                for line in table_lines[2:]:
                    if not line.strip() or '|' not in line: continue
                    cols = [c.strip() for c in line.split('|')]
                    if len(cols) >= 4:
                        filename = cols[1].replace('`', '')
                        resp = cols[3]
                        file_responsibilities[filename] = resp
    return purpose, file_responsibilities

def get_file_type(filename):
    ext = os.path.splitext(filename)[1].lower()
    types = {'.ts': 'TypeScript', '.js': 'JavaScript', '.html': 'HTML', '.scss': 'SCSS', '.css': 'CSS', '.py': 'Python', '.md': 'Markdown', '.json': 'JSON', '.cjs': 'CommonJS'}
    return types.get(ext, 'File')

def get_dependencies_and_aliases(filepath):
    deps = set()
    aliases = set()
    if filepath.endswith('.ts') or filepath.endswith('.js') or filepath.endswith('.cjs'):
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
                imports = re.findall(r'import\s+.*?from\s+[\'"](.*?)[\'"]', content)
                for imp in imports:
                    deps.add(imp)
                    if imp.startswith('@'):
                        aliases.add(imp.split('/')[0])
        except:
            pass
    return list(deps), list(aliases)

def generate_readme_for_dir(dirpath):
    if should_ignore(dirpath):
        return

    readme_path = os.path.join(dirpath, 'README.md')
    existing_purpose, existing_resp = extract_existing_info(readme_path)

    dir_name = os.path.basename(os.path.abspath(dirpath))
    if dir_name == '.' or dir_name == 'fullstack-mavluda':
        dir_name = 'Mavluda Beauty Repository'

    breadcrumbs = get_breadcrumbs(dirpath)
    fsd_layer = get_fsd_layer(dirpath)

    # Purpose
    purpose = existing_purpose
    if not purpose:
        purpose = f"Delivering luxury-tier architectural components and high-performance logic for the **{dir_name}** domain. This directory is a crucial part of the Mavluda Beauty full-stack ecosystem, ensuring seamless scalability, robust performance, and an elite digital experience."

    # Architecture (Mermaid)
    entries = sorted(os.listdir(dirpath))
    valid_entries = [e for e in entries if not should_ignore(os.path.join(dirpath, e))]

    mermaid = "```mermaid\ngraph TD\n"
    safe_root = dir_name.replace('.', '_').replace('-', '_').replace(' ', '_')
    mermaid += f'  Root["📁 {dir_name}"]\n'
    for entry in valid_entries:
        if entry == 'README.md': continue
        entry_path = os.path.join(dirpath, entry)
        safe_entry = entry.replace('.', '_').replace('-', '_')
        if os.path.isdir(entry_path):
            mermaid += f'  Root --> {safe_entry}["📁 {entry}"]\n'
        else:
            mermaid += f'  Root --> {safe_entry}["📄 {entry}"]\n'
    mermaid += "```"

    # File Registry & Dependencies
    registry_lines = []
    all_deps = set()
    for entry in valid_entries:
        if entry == 'README.md': continue
        entry_path = os.path.join(dirpath, entry)
        if os.path.isfile(entry_path):
            ftype = get_file_type(entry)
            resp = existing_resp.get(entry, f"Provides core logic and orchestration for {entry}.")
            deps, aliases = get_dependencies_and_aliases(entry_path)
            all_deps.update(deps)
            alias_str = ", ".join(sorted(list(aliases))) if aliases else "N/A"
            registry_lines.append(f"| `{entry}` | {ftype} | {resp} | {alias_str} |")

    registry_table = "| File Name | Type | Responsibility | Key Aliases Used |\n|---|---|---|---|\n"
    if registry_lines:
        registry_table += "\n".join(registry_lines)
    else:
        registry_table += "| No files | - | - | - |"

    deps_section = ""
    if all_deps:
        deps_section = "\n".join([f"- `{dep}`" for dep in sorted(list(all_deps))])
    else:
        deps_section = "- No external dependencies."

    # Build Content
    content = f"# 📁 {dir_name}\n\n"
    content += f"{breadcrumbs}\n\n"
    if fsd_layer:
        content += f"**FSD Layer:** {fsd_layer}\n\n"

    content += f"## 🎯 Purpose\n{purpose}\n\n"
    content += f"## 🏗️ Architecture\n{mermaid}\n\n"
    content += f"## 📄 File Registry\n{registry_table}\n\n"
    content += f"## 🔗 Dependencies\n{deps_section}\n\n"

    content += f"## 🛠️ Usage\n```typescript\n// Example usage within the Mavluda Beauty ecosystem\nimport {{ relevantMember }} from './{dir_name}';\n\n// Integrate into the application architecture\nrelevantMember.execute();\n```\n"

    with open(readme_path, 'w', encoding='utf-8') as f:
        f.write(content)

def main():
    for root, dirs, files in os.walk('.'):
        generate_readme_for_dir(root)

if __name__ == "__main__":
    main()
