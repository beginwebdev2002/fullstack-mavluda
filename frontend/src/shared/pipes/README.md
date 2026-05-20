# 🏷️ Pipes

[🏠 Home](../../../../README.md) ❯ [frontend](../../../README.md) ❯ [src](../../README.md) ❯ [shared](../README.md) ❯ **pipes**

**FSD Layer:** `Shared`

## 🎯 PURPOSE
Core implementation for the pipes domain within the luxury Mavluda Beauty ecosystem.

## 🏗️ ARCHITECTURE
```mermaid
graph TD
    f_pipes["📁 pipes"]
    f_pipes --> f_index_ts["📄 index.ts"]
    f_pipes --> f_safe_html_pipe_ts["📄 safe-html.pipe.ts"]
```


## 📄 FILE REGISTRY
| Entry Name | Type | Responsibility | Key Aliases Used |
|---|---|---|---|
| `📄 index.ts` | Logic/Utility | Structural or configuration definitions. | None |
| `📄 safe-html.pipe.ts` | Logic/Utility | Classes: SafeHtmlPipe | @angular/core, @angular/platform-browser |


## 🔗 DEPENDENCIES
- `@angular/core`
- `@angular/platform-browser`

## 🛠️ USAGE
Explore the files and directories within this path to understand the refined logic that powers the Mavluda Beauty experience. Refer to the specific classes and functions outlined in the registry for implementation details.
