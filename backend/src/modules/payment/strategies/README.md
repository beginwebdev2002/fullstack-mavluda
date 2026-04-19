# [root](/) / [backend](/backend) / [src](/backend/src) / [modules](/backend/src/modules) / [payment](/backend/src/modules/payment) / [strategies](/backend/src/modules/payment/strategies)

## 🏷️ 📁 Strategies

### 🎯 PURPOSE
The `strategies` backend module encapsulates the business logic, presentation, and data access for strategies.

### 🏗️ ARCHITECTURE
```mermaid
graph TD
  strategies[📁 strategies]
  strategies --> strategies_alif_pay_strategy_ts(alif-pay.strategy.ts)
  strategies --> strategies_mock_card_strategy_ts(mock-card.strategy.ts)
  strategies --> strategies_payment_strategy_ts(payment.strategy.ts)
```

### 📄 FILE REGISTRY
| File Name | Type | Responsibility | Key Aliases Used |
|---|---|---|---|
| `alif-pay.strategy.ts` | `ts` | Core logic implementation. | @nestjs |
| `mock-card.strategy.ts` | `ts` | Core logic implementation. | @nestjs |
| `payment.strategy.ts` | `ts` | Core logic implementation. | None |

### 🔗 DEPENDENCIES
- `./payment.strategy`
- `@nestjs/common`

### 🛠️ USAGE
```typescript
// Seamlessly integrate strategies into your refined workflows:
import { /* exported members */ } from '@path/to/strategies';
```
