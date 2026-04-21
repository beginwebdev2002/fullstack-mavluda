import os
import re

def get_layer(path):
    if '/app/' in path or '/app' in path: return 'App'
    if '/pages/' in path or '/pages' in path: return 'Pages'
    if '/widgets/' in path or '/widgets' in path: return 'Widgets'
    if '/features/' in path or '/features' in path: return 'Features'
    if '/entities/' in path or '/entities' in path: return 'Entities'
    if '/shared/' in path or '/shared' in path: return 'Shared'
    if '/backend/src/modules/' in path:
        parts = path.split('/')
        if 'application' in parts: return 'Application'
        if 'domain' in parts: return 'Domain'
        if 'infrastructure' in parts: return 'Infrastructure'
        if 'presentation' in parts: return 'Presentation'
        return 'Module Root'
    if '/backend/' in path: return 'Backend Core/Infrastructure'
    return 'General'

def parse_imports(filepath):
    imports = set()
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            matches = re.findall(r"from\s+['\"]([^'\"]+)['\"]", content)
            for m in matches:
                imports.add(m)
    except Exception:
        pass
    return list(imports)

def get_dir_contents(directory):
    items = []
    try:
        for f in os.listdir(directory):
            if f.startswith('.') or f == 'README.md': continue
            full_path = os.path.join(directory, f)
            if os.path.isfile(full_path):
                ext = os.path.splitext(f)[1]
                aliases = parse_imports(full_path)
                key_aliases = [a for a in aliases if a.startswith('@')]
                items.append({
                    'name': f,
                    'is_dir': False,
                    'type': ext if ext else 'file',
                    'responsibility': 'Component logic' if 'component' in f else 'Service logic' if 'service' in f else 'Module configuration' if 'module' in f else 'Controller logic' if 'controller' in f else 'DTO definitions' if 'dto' in f else 'General functionality',
                    'aliases': ', '.join(key_aliases) if key_aliases else 'None'
                })
            elif os.path.isdir(full_path):
                if f in ['node_modules', 'dist', 'build', 'coverage']: continue
                items.append({
                    'name': f,
                    'is_dir': True,
                    'type': 'Directory',
                    'responsibility': 'Subdirectory logic grouping',
                    'aliases': 'None'
                })
    except Exception:
        pass
    return items

def generate_mermaid(items, directory):
    diagram = "```mermaid\ngraph TD\n"
    if not items:
        diagram += "    A[Empty Directory] --> B(No contents to display)\n"
    else:
        diagram += f"    Root[{os.path.basename(directory)}] \n"
        for i, info in enumerate(items):
            icon = "📂 " if info['is_dir'] else "📄 "
            diagram += f"    Root --> F{i}[{icon}{info['name']}]\n"
    diagram += "```"
    return diagram

def get_breadcrumb(path):
    parts = path.split(os.sep)
    if not parts or parts == ['.']: return "Root"
    return " > ".join(parts)

def get_usage(directory, items):
    usage_snippet = "```typescript\n// Example usage context\n"
    has_files = any(not item['is_dir'] for item in items)
    if has_files:
        ts_files = [item['name'] for item in items if not item['is_dir'] and item['type'] in ['.ts', '.tsx']]
        if ts_files:
            example_file = ts_files[0].replace('.ts', '').replace('.tsx', '')
            usage_snippet += f"import {{ ... }} from './{example_file}';\n\n// Integrate {example_file} logic into your feature.\n"
        else:
            usage_snippet += "// Refer to the specific files in this directory for exact export usage.\n"
    else:
        usage_snippet += "// This directory groups child modules/layers. Navigate into subdirectories for specific logic.\n"
    usage_snippet += "```"
    return usage_snippet

def generate_readme(directory):
    items = get_dir_contents(directory)
    layer = get_layer(directory)
    breadcrumb = get_breadcrumb(directory)
    dirname = os.path.basename(directory) or 'Root'

    mermaid = generate_mermaid(items, directory)
    usage = get_usage(directory, items)

    readme_content = f"""# 📂 {dirname.upper()}

> 💎 **Mavluda Beauty - Luxury Professional Architecture**

### 📍 Breadcrumb Navigation
`{breadcrumb}`

## 🎯 PURPOSE
This directory encapsulates `{layer}` level functionality within the Mavluda Beauty ecosystem, ensuring proper separation of concerns and architectural transparency.

**FSD / Architecture Layer:** `{layer}`

## 🏗️ ARCHITECTURE
{mermaid}

## 📄 FILE REGISTRY

| Item Name | Type | Responsibility | Key Aliases Used |
|-----------|------|----------------|------------------|
"""
    for info in items:
        icon = "📁 " if info['is_dir'] else "📄 "
        readme_content += f"| `{icon}{info['name']}` | `{info['type']}` | {info['responsibility']} | `{info['aliases']}` |\n"

    all_aliases = set()
    for info in items:
        if info['aliases'] != 'None':
            for a in info['aliases'].split(', '):
                all_aliases.add(a)

    readme_content += "\n## 🔗 DEPENDENCIES\n"
    if all_aliases:
        for a in all_aliases:
            readme_content += f"- `{a}`\n"
    else:
        readme_content += "No external/internal aliases used directly in these files.\n"

    readme_content += f"\n## 🛠️ USAGE\n{usage}\n"
    return readme_content

def main():
    skip_dirs = {'.git', '.github', 'node_modules', 'dist', 'build', '.agent', '.gemini', '.jules', 'coverage'}
    for root, dirs, files in os.walk('.'):
        dirs[:] = [d for d in dirs if d not in skip_dirs and not d.startswith('.')]

        if 'node_modules' in root or 'dist' in root or 'coverage' in root:
            continue

        readme_path = os.path.join(root, 'README.md')
        content = generate_readme(root)
        with open(readme_path, 'w', encoding='utf-8') as f:
            f.write(content)

if __name__ == '__main__':
    main()
