#!/bin/bash
sed -i 's/\*\.md/#\*\.md/g' .gitignore
echo "*.md" >> .gitignore
echo "!README.md" >> .gitignore
echo "!**/README.md" >> .gitignore
echo "!GEMINI.md" >> .gitignore
echo "!AGENTS.md" >> .gitignore
