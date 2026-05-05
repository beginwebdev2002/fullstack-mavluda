import os
import re

# Emojis for titles based on directory names
EMOJI_MAP = {
    'backend': '⚙️',
    'frontend': '🎨',
    'src': '💻',
    'modules': '📦',
    'common': '🤝',
    'test': '🧪',
    'public': '🌐',
    'environments': '🌍',
    'infrastructure': '🏗️',
    'presentation': '🖥️',
    'application': '🚀',
    'domain': '🧠',
    'entities': '🧬',
    'pages': '📄',
    'features': '🌟',
    'widgets': '🧩',
    'shared': '🔄',
    'core': '🛠️',
    'models': '🧱',
    'ui': '🖼️',
    'components': '🧩',
    'interfaces': '📋',
    'constants': '🔢',
    'dto': '📦',
    'repositories': '🗄️',
    'schemas': '📄',
    'guards': '🛡️',
    'filters': '🧹',
    'decorators': '✨',
    'config': '⚙️',
    'database': '💾',
    'utils': '🧰'
}

DEFAULT_EMOJI = '📁'

def get_emoji(dirname):
    return EMOJI_MAP.get(dirname.lower(), DEFAULT_EMOJI)

def generate_mermaid_diagram(dirname, files, subdirs):
    diagram = "```mermaid\n"
    if dirname.lower() in ['domain', 'entities', 'models', 'schemas']:
        diagram += "classDiagram\n"
        for f in files:
            if f.endswith('.ts') and not f.endswith('.spec.ts'):
                class_name = f.replace('.ts', '').replace('-', ' ').title().replace(' ', '')
                class_name = re.sub(r'[^a-zA-Z0-9]', '', class_name)
                if class_name:
                    diagram += f"    class {class_name} {{\n"
                    diagram += "        +... properties/methods\n"
                    diagram += "    }\n"
    elif dirname.lower() in ['ui', 'components', 'pages', 'widgets', 'features']:
        diagram += "graph TD\n"
        dirname_safe = re.sub(r'[^a-zA-Z0-9]', '_', dirname)
        diagram += f"    {dirname_safe} --> Components\n"
        for f in files:
            if f.endswith('.ts') and not f.endswith('.spec.ts'):
                comp_name = f.replace('.ts', '').replace('-', ' ').title().replace(' ', '')
                comp_name = re.sub(r'[^a-zA-Z0-9]', '', comp_name)
                if comp_name:
                    diagram += f"    Components --> {comp_name}\n"
    else:
        diagram += "graph TD\n"
        dirname_safe = re.sub(r'[^a-zA-Z0-9]', '_', dirname)
        if not dirname_safe: dirname_safe = "Dir"
        diagram += f"    {dirname_safe}[{dirname}] --> Files\n"
        for d in subdirs:
            d_safe = re.sub(r'[^a-zA-Z0-9]', '_', d)
            if d_safe:
                diagram += f"    {dirname_safe} --> {d_safe}[{d}]\n"

    # Provide a simple default if empty diagram
    if len(diagram.split('\n')) <= 3:
         dirname_safe = re.sub(r'[^a-zA-Z0-9]', '_', dirname)
         if not dirname_safe: dirname_safe = "Dir"
         diagram = f"```mermaid\ngraph TD\n    {dirname_safe}[{dirname}] --> Files\n```\n"
    elif not diagram.endswith("```\n"):
        diagram += "```\n"
    return diagram

def get_file_info(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        imports = re.findall(r'from\s+[\'"]([@\w\-\./]+)[\'"]', content)
        aliases = [i for i in imports if i.startswith('@')]

        # Determine type
        if filepath.endswith('.module.ts'): file_type = 'Module'
        elif filepath.endswith('.controller.ts'): file_type = 'Controller'
        elif filepath.endswith('.service.ts'): file_type = 'Service'
        elif filepath.endswith('.component.ts'): file_type = 'Component'
        elif filepath.endswith('.model.ts'): file_type = 'Model'
        elif filepath.endswith('.interface.ts'): file_type = 'Interface'
        elif filepath.endswith('.dto.ts'): file_type = 'DTO'
        elif filepath.endswith('.spec.ts'): file_type = 'Test'
        elif filepath.endswith('.html'): file_type = 'Template'
        elif filepath.endswith('.css') or filepath.endswith('.scss'): file_type = 'Style'
        else: file_type = 'TypeScript' if filepath.endswith('.ts') else 'File'

        # Responsibility logic based on known Mavluda Beauty standard conventions
        filename = os.path.basename(filepath).lower()
        if 'guard' in filename:
            responsibility = "Handles authentication/authorization protection."
        elif 'interceptor' in filename:
            responsibility = "Intercepts HTTP requests/responses for global logic."
        elif 'repository' in filename:
            responsibility = "Handles database operations and data access."
        elif 'schema' in filename:
            responsibility = "Defines MongoDB data structure and validation."
        elif 'dto' in filename:
            responsibility = "Data Transfer Object for input validation."
        elif 'controller' in filename:
            responsibility = "Handles incoming HTTP requests and routing."
        elif 'service' in filename:
            responsibility = "Executes core business logic and use cases."
        elif 'component' in filename:
            responsibility = "Angular UI standalone component logic."
        else:
            responsibility = f"Provides localized {file_type.lower()} definitions."

        return {
            'type': file_type,
            'responsibility': responsibility,
            'aliases': ', '.join(set(aliases)) if aliases else 'None'
        }
    except Exception as e:
        return {'type': 'Unknown', 'responsibility': 'Failed to read', 'aliases': 'None'}

def generate_readme_content(root, dirs, files):
    dirname = os.path.basename(root)
    if not dirname or dirname == '.':
        dirname = 'mavluda-beauty'

    emoji = get_emoji(dirname)

    # Calculate breadcrumbs
    parts = root.split(os.sep)
    if parts[0] == '.':
        parts = parts[1:]
    breadcrumbs = " > ".join([f"[{p}](/{'/'.join(parts[:i+1])})" for i, p in enumerate(parts)])
    if not breadcrumbs:
        breadcrumbs = "Root"

    # FSD Layer Detection
    fsd_layer = ""
    if 'shared' in parts: fsd_layer = "Shared"
    elif 'entities' in parts: fsd_layer = "Entities"
    elif 'features' in parts: fsd_layer = "Features"
    elif 'widgets' in parts: fsd_layer = "Widgets"
    elif 'pages' in parts: fsd_layer = "Pages"
    elif 'app' in parts: fsd_layer = "App"

    fsd_text = f"\n**FSD Layer:** {fsd_layer}\n" if fsd_layer else ""

    content = f"""# {emoji} {dirname.title()} Directory

{breadcrumbs}

## 🎯 Purpose
A high-level module handling `{dirname}` logic within the Mavluda Beauty ecosystem. This directory adheres to our "Luxury Professional" architectural standards.
{fsd_text}

## 🏗️ Architecture
{generate_mermaid_diagram(dirname, files, dirs)}

## 📄 File Registry
| File Name | Type | Responsibility | Key Aliases Used |
|-----------|------|----------------|------------------|
"""

    dependencies = set()
    for f in sorted(files):
        if f in ['README.md', 'generate_readmes.py', '.DS_Store'] or f.startswith('.'):
            continue

        filepath = os.path.join(root, f)
        info = get_file_info(filepath)
        content += f"| `{f}` | {info['type']} | {info['responsibility']} | {info['aliases']} |\n"

        if info['aliases'] != 'None':
             dependencies.update([a.strip() for a in info['aliases'].split(',')])

    content += """
## 🔗 Dependencies
"""
    if dependencies:
        for dep in sorted(dependencies):
            content += f"- `{dep}`\n"
    else:
        content += "- No major internal/external path aliases detected.\n"

    content += """
## 🛠️ Usage
```typescript
// Architectural overview snippet
import { InternalLogic } from './internal-file';
// Ensure adherence to Hexagonal / FSD principles
```
"""
    return content


def update_readmes():
    for root, dirs, files in os.walk('.'):
        # Exclude directories that shouldn't be documented or processed
        dirs[:] = [d for d in dirs if not d.startswith('.') and d not in ['node_modules', 'dist', 'coverage', '.angular', 'tmp', 'scripts']]

        # Skip root directory to avoid messing up main README.md which might be very detailed
        if root == '.':
            continue

        readme_path = os.path.join(root, 'README.md')

        existing_content = ""
        if os.path.exists(readme_path):
            with open(readme_path, 'r', encoding='utf-8') as f:
                existing_content = f.read()

        new_content = generate_readme_content(root, dirs, files)

        if existing_content and not existing_content.startswith('# ' + get_emoji(os.path.basename(root))):
            new_content += "\n## 📝 Existing Context\n"
            new_content += existing_content

        with open(readme_path, 'w', encoding='utf-8') as f:
            f.write(new_content)

if __name__ == '__main__':
    update_readmes()
