import os
import re

def create_readme_for_dir(dirpath):
    dirname = os.path.basename(dirpath) or "root"
    readme_path = os.path.join(dirpath, "README.md")

    # Check if this is part of FSD
    fsd_layer = ""
    if "entities" in dirpath.split(os.sep):
        fsd_layer = " (Entity Layer)"
    elif "features" in dirpath.split(os.sep):
        fsd_layer = " (Feature Layer)"
    elif "widgets" in dirpath.split(os.sep):
        fsd_layer = " (Widget Layer)"
    elif "pages" in dirpath.split(os.sep):
        fsd_layer = " (Page Layer)"
    elif "shared" in dirpath.split(os.sep):
        fsd_layer = " (Shared Layer)"
    elif "app" in dirpath.split(os.sep) and "frontend" in dirpath.split(os.sep):
        fsd_layer = " (App Layer)"

    # Get subdirectories and files
    try:
        items = os.listdir(dirpath)
    except Exception as e:
        print(f"Skipping {dirpath}: {e}")
        return

    subdirs = []
    files = []
    for item in sorted(items):
        if item.startswith('.') and item not in ['.env', '.gitignore']:
            continue
        if item in ['node_modules', 'dist', 'build', 'coverage']:
            continue

        item_path = os.path.join(dirpath, item)
        if os.path.isdir(item_path):
            subdirs.append(item)
        elif os.path.isfile(item_path) and item != "README.md":
            files.append(item)

    # Load existing README if it exists to extract existing descriptions
    existing_file_registry = {}
    existing_purpose = ""
    if os.path.exists(readme_path):
        with open(readme_path, 'r', encoding='utf-8') as f:
            content = f.read()
            # Extract Purpose
            purpose_match = re.search(r'### 🎯 PURPOSE\n(.*?)\n\n###', content, re.DOTALL)
            if purpose_match:
                existing_purpose = purpose_match.group(1).strip()

            # Extract File Registry
            registry_match = re.search(r'### 📄 FILE REGISTRY\n\|.*?\|\n\|.*?\|\n(.*?)\n\n###', content, re.DOTALL)
            if registry_match:
                rows = registry_match.group(1).strip().split('\n')
                for row in rows:
                    cols = [c.strip() for c in row.split('|') if c.strip()]
                    if len(cols) >= 3:
                        filename_raw = cols[0].replace('`', '').strip()
                        desc = cols[2].strip()
                        existing_file_registry[filename_raw] = desc

    # Breadcrumb
    parts = dirpath.split(os.sep)
    if parts[0] == '.':
        parts = parts[1:]

    breadcrumb = "[root](/)"
    curr_path = ""
    for part in parts:
        if part:
            curr_path += f"/{part}"
            breadcrumb += f" / [{part}]({curr_path})"

    # Build content
    content = f"# {breadcrumb}\n\n"
    content += f"## 🏷️ 📁 {dirname.capitalize()}{fsd_layer}\n\n"

    content += f"### 🎯 PURPOSE\n"
    if existing_purpose and "meticulously orchestrating the" not in existing_purpose:
        content += f"{existing_purpose}\n\n"
    else:
        # Generate a contextual purpose
        if "frontend" in parts and "backend" in parts:
            purpose = f"The root directory contains the full-stack Mavluda Beauty application, divided into frontend and backend."
        elif "frontend" in parts:
            if "pages" in parts:
                purpose = f"The `{dirname}` page component orchestrates the UI layer for the {dirname} feature in the Mavluda Beauty frontend application."
            elif "entities" in parts:
                purpose = f"The `{dirname}` entity defines the data models and core business logic for the {dirname} domain within the frontend."
            elif "features" in parts:
                purpose = f"The `{dirname}` feature implements specific user interactions and workflows for {dirname}."
            elif "shared" in parts:
                purpose = f"The `{dirname}` shared module provides reusable UI components and utilities across the frontend."
            else:
                purpose = f"The `{dirname}` directory handles frontend architecture and configuration for the Mavluda Beauty platform."
        elif "backend" in parts:
            if "modules" in parts:
                purpose = f"The `{dirname}` backend module encapsulates the business logic, presentation, and data access for {dirname}."
            elif "infrastructure" in parts:
                purpose = f"The infrastructure layer for {dirname} manages database connections, schemas, and repositories."
            elif "presentation" in parts:
                purpose = f"The presentation layer for {dirname} handles incoming API requests and defines DTOs for data validation."
            elif "domain" in parts:
                purpose = f"The domain layer for {dirname} contains the core business rules and entities."
            elif "application" in parts:
                purpose = f"The application layer coordinates tasks and use cases for the {dirname} module."
            else:
                purpose = f"The `{dirname}` directory provides core backend services and configuration."
        else:
            purpose = f"The `{dirname}` directory is a foundational part of the Mavluda Beauty ecosystem."
        content += f"{purpose}\n\n"

    content += f"### 🏗️ ARCHITECTURE\n"
    content += "```mermaid\ngraph TD\n"
    clean_dirname = re.sub(r'[^a-zA-Z0-9]', '_', dirname)
    if not clean_dirname:
        clean_dirname = "root"
    content += f"  {clean_dirname}[📁 {dirname}]\n"

    for subdir in subdirs:
        clean_subdir = re.sub(r'[^a-zA-Z0-9]', '_', subdir)
        content += f"  {clean_dirname} --> {clean_dirname}_{clean_subdir}[📁 {subdir}]\n"
    for file in files:
        clean_file = re.sub(r'[^a-zA-Z0-9]', '_', file)
        content += f"  {clean_dirname} --> {clean_dirname}_{clean_file}({file})\n"
    content += "```\n\n"

    content += "### 📄 FILE REGISTRY\n"
    content += "| File Name | Type | Responsibility | Key Aliases Used |\n"
    content += "|---|---|---|---|\n"

    dependencies = set()
    for file in files:
        ext = file.split('.')[-1] if '.' in file else 'unknown'

        # Analyze aliases and dependencies
        aliases = []
        try:
            with open(os.path.join(dirpath, file), 'r', encoding='utf-8') as f:
                file_content = f.read()

                # Simple import/require parsing
                import_matches = re.findall(r'from\s+[\'"]([^\'"]+)[\'"]', file_content)
                import_matches += re.findall(r'require\([\'"]([^\'"]+)[\'"]\)', file_content)
                import_matches += re.findall(r'import\([\'"]([^\'"]+)[\'"]\)', file_content)

                for match in import_matches:
                    dependencies.add(match)
                    if match.startswith('@'):
                        alias_base = match.split('/')[0]
                        if alias_base not in aliases:
                            aliases.append(alias_base)
        except Exception:
            pass

        alias_str = ", ".join(aliases) if aliases else "None"

        # Determine responsibility
        if file in existing_file_registry and existing_file_registry[file] != "Configuration and foundational asset.":
            responsibility = existing_file_registry[file]
        else:
            if file.endswith('.controller.ts'):
                responsibility = "Handles incoming HTTP requests and API routing."
            elif file.endswith('.service.ts'):
                responsibility = "Implements core business logic and service operations."
            elif file.endswith('.module.ts'):
                responsibility = "Configures and orchestrates dependencies for this module."
            elif file.endswith('.entity.ts') or file.endswith('.schema.ts') or file.endswith('.model.ts'):
                responsibility = "Defines the database schema and data models."
            elif file.endswith('.dto.ts'):
                responsibility = "Data Transfer Object for input validation and typing."
            elif file.endswith('.repository.ts'):
                responsibility = "Data access layer for database interactions."
            elif file.endswith('.component.ts'):
                responsibility = "Angular component logic and state management."
            elif file.endswith('.component.html'):
                responsibility = "Angular component template structure."
            elif file.endswith('.component.scss') or file.endswith('.component.css'):
                responsibility = "Component-specific styling."
            elif file.endswith('.spec.ts'):
                responsibility = "Unit tests for the corresponding component or service."
            elif 'config' in file:
                responsibility = "Configuration settings and environment setup."
            else:
                responsibility = "Core logic or foundational asset for this directory."

        content += f"| `{file}` | `{ext}` | {responsibility} | {alias_str} |\n"

    if not files:
        content += "| (No files) | - | - | - |\n"
    content += "\n"

    content += "### 🔗 DEPENDENCIES\n"
    if dependencies:
        for dep in sorted(list(dependencies)[:10]): # Limit to 10 for brevity
            content += f"- `{dep}`\n"
        if len(dependencies) > 10:
            content += "- `...`\n"
    else:
        content += "- `None`\n"
    content += "\n"

    content += "### 🛠️ USAGE\n"
    content += "```typescript\n"
    content += f"// Seamlessly integrate {dirname} into your refined workflows:\n"
    content += f"import {{ /* exported members */ }} from '@path/to/{dirname}';\n"
    content += "```\n"

    with open(readme_path, 'w', encoding='utf-8') as f:
        f.write(content)

def walk_and_generate(root_dir):
    for root, dirs, files in os.walk(root_dir):
        # Exclude directories
        dirs[:] = [d for d in dirs if not (d.startswith('.') and d not in ['.env', '.gitignore']) and d not in ['node_modules', 'dist', 'build', 'coverage']]

        create_readme_for_dir(root)

if __name__ == "__main__":
    walk_and_generate('.')
    print("READMEs generated successfully.")
