import os
import re
from pathlib import Path

IGNORE_DIRS = {
    'node_modules', '.git', '.angular', '.next', 'dist', 'build',
    '.ignored', 'images', 'public', '.gemini', '.github', '.jules', '.agent'
}

BRAND_TONE = "Mavluda Beauty"

def get_icon_for_dir(dirname):
    mapping = {
        'frontend': '💻', 'backend': '⚙️', 'src': '📂', 'app': '🚀', 'pages': '📄',
        'widgets': '🧩', 'features': '✨', 'entities': '🧱', 'shared': '🛠️',
        'infrastructure': '🏗️', 'presentation': '🎭', 'domain': '🧠', 'application': '⚙️',
        'modules': '📦', 'common': '🧰', 'test': '🧪', 'ui': '🎨', 'model': '📊',
        'constants': '📌', 'dto': '📦', 'repositories': '🗄️', 'schemas': '📝',
        'guards': '🛡️', 'interceptors': '🕵️', 'services': '🔌', 'lib': '📚',
        'pipes': '🚰', 'store': '🏪', 'core': '🔋', 'gallery': '🖼️', 'user': '👤',
        'treatments': '💆‍♀️', 'veil': '👰‍♀️', 'payment': '💳', 'booking': '📅'
    }
    return mapping.get(dirname.lower(), '📁')

def get_fsd_layer(path):
    parts = Path(path).parts
    if 'frontend' in parts:
        if 'app' in parts: return "App Layer (Root configuration and global styles)"
        if 'pages' in parts: return "Pages Layer (Routing and page-level components)"
        if 'widgets' in parts: return "Widgets Layer (Independent, complex UI blocks)"
        if 'features' in parts: return "Features Layer (Business logic and user interactions)"
        if 'entities' in parts: return "Entities Layer (Business entities and state)"
        if 'shared' in parts: return "Shared Layer (Reusable infrastructure, UI kits)"
    if 'backend' in parts:
        if 'application' in parts: return "Application Layer (Use cases and orchestration)"
        if 'domain' in parts: return "Domain Layer (Enterprise business rules)"
        if 'infrastructure' in parts: return "Infrastructure Layer (External systems, DBs, frameworks)"
        if 'presentation' in parts: return "Presentation Layer (Controllers, Resolvers, DTOs)"
        if 'modules' in parts: return "Feature Module Layer (Bounded Contexts)"
        if 'common' in parts: return "Common Layer (Cross-cutting concerns)"
    return "Root / Operational Layer"

def parse_existing_readme(path):
    contexts = {}
    if os.path.exists(path):
        try:
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
                lines = content.split('\n')
                for line in lines:
                    if '|' in line and 'File Name' not in line and '---' not in line:
                        parts = [p.strip() for p in line.split('|')]
                        if len(parts) >= 4:
                            filename = parts[1].strip()
                            resp = parts[3].strip() if len(parts) > 3 else ''
                            contexts[filename] = resp
                purpose_match = re.search(r'### 🎯 PURPOSE(.*?)###', content, re.DOTALL)
                if purpose_match:
                    contexts['__purpose__'] = purpose_match.group(1).strip()
        except:
            pass
    return contexts

def extract_dependencies(filepath):
    deps = set()
    aliases = set()
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            imports = re.findall(r'from\s+[\'"]([^\'"]+)[\'"]', content)
            imports += re.findall(r'import\s+[\'"]([^\'"]+)[\'"]', content)
            for imp in imports:
                deps.add(imp)
                if imp.startswith('@'):
                    aliases.add(imp.split('/')[0])
    except:
        pass
    return deps, aliases

def get_file_type(filename):
    if filename.endswith('.component.ts'): return 'Component'
    if filename.endswith('.service.ts'): return 'Service'
    if filename.endswith('.module.ts'): return 'Module'
    if filename.endswith('.dto.ts'): return 'DTO'
    if filename.endswith('.controller.ts'): return 'Controller'
    if filename.endswith('.schema.ts'): return 'Schema'
    if filename.endswith('.repository.ts'): return 'Repository'
    if filename.endswith('.spec.ts'): return 'Unit Test'
    if filename.endswith('.html'): return 'Template'
    if filename.endswith('.scss') or filename.endswith('.css'): return 'Styles'
    if filename.endswith('.md'): return 'Documentation'
    return 'Source'

def get_breadcrumbs(current_path):
    parts = list(Path(current_path).parts)
    crumbs = []
    for i, part in enumerate(parts):
        depth = len(parts) - 1 - i
        rel_path = "../" * depth + "README.md" if depth > 0 else "README.md"
        crumbs.append(f"[{part}]({rel_path})")
    return " > ".join(crumbs)

def main():
    for root, dirs, files in os.walk('.'):
        dirs[:] = [d for d in dirs if d not in IGNORE_DIRS and not d.startswith('.')]

        if root == '.':
            # Skip the actual root repo folder itself?
            # The prompt says "Generate a professional ... README.md for EVERY directory"
            # But we might overwrite the main repo README. Let's do it anyway.
            pass

        dir_name = os.path.basename(root)
        if dir_name == '.':
            dir_name = 'Mavluda Beauty Root'

        icon = get_icon_for_dir(dir_name)
        fsd_layer = get_fsd_layer(root)
        breadcrumbs = get_breadcrumbs(root)

        readme_path = os.path.join(root, 'README.md')
        existing_contexts = parse_existing_readme(readme_path)

        # Files logic
        local_files = [f for f in files if f != 'README.md' and not f.startswith('.')]
        all_deps = set()
        all_aliases = set()

        file_registry = []
        for f in local_files:
            filepath = os.path.join(root, f)
            deps, aliases = extract_dependencies(filepath)
            all_deps.update(deps)
            all_aliases.update(aliases)

            ftype = get_file_type(f)
            resp = existing_contexts.get(f, f"Handles {ftype.lower()} logic for Mavluda Beauty's luxury standards.")
            used_aliases = ", ".join(aliases) if aliases else "None"
            file_registry.append(f"| `{f}` | {ftype} | {resp} | `{used_aliases}` |")

        # Mermaid Diagram
        mermaid = "```mermaid\n"
        if len(local_files) > 0:
            mermaid += "graph TD\n"
            mermaid += f"  subgraph {dir_name.replace('-', '_')}\n"
            for f in local_files:
                name = re.sub(r'[^a-zA-Z0-9]', '_', f)
                mermaid += f"    {name}[\"{f}\"]\n"
            mermaid += "  end\n"
        else:
            mermaid += "graph TD\n"
            mermaid += f"  {dir_name.replace('-', '_')}Empty[\"Directory Structure Only\"]\n"
        mermaid += "```\n"

        # Assemble Content
        purpose = existing_contexts.get('__purpose__', f"Elevating the digital experience for the {BRAND_TONE} ecosystem, this module manages the sophisticated {fsd_layer} operations.")

        content = f"""# {icon} {dir_name}

{breadcrumbs}

---

### 🎯 PURPOSE
{purpose}

*FSD Layer:* **{fsd_layer}**

---

### 🏗️ ARCHITECTURE
{mermaid}

---

### 📄 FILE REGISTRY
| File Name | Type | Responsibility | Key Aliases Used |
|-----------|------|----------------|------------------|
"""
        if file_registry:
            content += "\n".join(file_registry) + "\n"
        else:
            content += "| No files | N/A | Structure container | N/A |\n"

        content += "\n---\n\n### 🔗 DEPENDENCIES\n"
        if all_deps:
            if all_aliases:
                content += f"**Key Path Aliases Detected:** {', '.join([f'`{a}`' for a in all_aliases])}\n\n"
            content += "Notable imports:\n"
            # Limit to 10 for brevity
            for d in list(all_deps)[:10]:
                content += f"- `{d}`\n"
            if len(all_deps) > 10:
                content += f"- *...and {len(all_deps) - 10} more*\n"
        else:
            content += "No external or internal dependencies detected.\n"

        content += "\n---\n\n### 🛠️ USAGE\n"
        content += f"To interact with this directory's luxurious logic, integrate its exported components or services directly into your feature modules. Ensure strict adherence to the {fsd_layer} boundaries.\n\n"
        content += "```typescript\n"
        content += "// Example integration snippet\n"
        content += f"import {{ FeatureModule }} from '@path/to/{dir_name}';\n"
        content += "```\n"

        with open(readme_path, 'w', encoding='utf-8') as f:
            f.write(content)

if __name__ == '__main__':
    main()
