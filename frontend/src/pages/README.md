# [root](/) / [frontend](/frontend) / [src](/frontend/src) / [pages](/frontend/src/pages)

## 🏷️ 📁 Pages

### 🎯 PURPOSE
The `pages` directory forms a critical foundation within the Mavluda Beauty ecosystem, meticulously orchestrating the pages logic to ensure a seamless and premium experience.

This directory resides within the **Pages** layer of our Feature Sliced Design (FSD) architecture, strictly adhering to Mavluda Beauty's robust separation of concerns.

### 🏗️ ARCHITECTURE
```mermaid
graph TD
  pages[📁 pages]
  pages --> pages_about[📁 about]
  pages --> pages_auth[📁 auth]
  pages --> pages_clients[📁 clients]
  pages --> pages_dashboard[📁 dashboard]
  pages --> pages_gallery[📁 gallery]
  pages --> pages_inventory[📁 inventory]
  pages --> pages_portfolio[📁 portfolio]
  pages --> pages_settings[📁 settings]
  pages --> pages_treatments[📁 treatments]
  pages --> pages_treatments_catalog[📁 treatments-catalog]
  pages --> pages_user_home[📁 user-home]
  pages --> pages_user_profile[📁 user-profile]
  pages --> pages_veil[📁 veil]
  pages --> pages_veils_catalog[📁 veils-catalog]
```

### 📄 FILE REGISTRY
| File Name | Type | Responsibility | Key Aliases Used |
|---|---|---|---|
| *No files* | `-` | *Directory is strictly structural.* | `-` |

### 🔗 DEPENDENCIES
- *Self-contained premium module.*

### 🛠️ USAGE
```typescript
// Seamlessly integrate pages into your refined workflows:
import { /* exported members */ } from '@path/to/pages';
```
