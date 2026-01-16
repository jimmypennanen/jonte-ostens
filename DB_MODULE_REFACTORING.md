# Database Module Refactoring Guide

## Current State

**File**: `src/db/index.ts`
**Size**: 489 lines
**Functions**: 32 exported functions across 7 feature domains

### Function Groups

| Domain | Functions | Lines |
|--------|-----------|-------|
| Cheeses | getCheeses, getCheese, insertCheese, updateCheese, deleteCheese | ~50 |
| Weekly Cheese | getCurrentWeeklyCheese, getWeeklyCheese, insertWeeklyCheese, getPreviousWeeks | ~70 |
| Testimonials | getApprovedTestimonials, getAllTestimonials, insertTestimonial, updateTestimonial, toggleTestimonialApproval, deleteTestimonial | ~70 |
| Contact Messages | getContactMessages, getContactMessage, insertContactMessage, markMessageAsRead, deleteContactMessage | ~50 |
| Users/Auth | getUser, getUserById, insertUser | ~30 |
| Sessions | getSession, insertSession, deleteSession | ~30 |
| Utilities | initDatabase, seedInitialData, getDb, getWeek | ~149 |

---

## Proposed Refactoring

### Option 1: Modular Split (Recommended)

Split into domain-specific modules while keeping a single connection handler:

```
src/db/
├── index.ts              (connection & exports)
├── cheeses.ts            (cheese operations)
├── testimonials.ts       (testimonial operations)
├── messages.ts           (contact message operations)
├── weekly.ts             (weekly cheese operations)
├── auth.ts               (users & sessions)
└── schema.sql            (unchanged)
```

**Advantages**:
- ✅ Logical domain separation
- ✅ Easier to navigate and maintain
- ✅ Reduced file size (each ~50-70 lines)
- ✅ Single connection management via index.ts
- ✅ All imports still come from one source

**File Size After Split**:
- `index.ts`: ~50 lines (connection, re-exports)
- `cheeses.ts`: ~50 lines
- `weekly.ts`: ~70 lines
- `testimonials.ts`: ~70 lines
- `messages.ts`: ~50 lines
- `auth.ts`: ~30 lines
- Total module size: ~320 lines (vs 489 now)

---

### Option 2: Keep As-Is

**Advantages**:
- ✅ Single file is currently manageable (489 lines < 500 line limit)
- ✅ No refactoring work needed
- ✅ No import changes needed in 15+ files

**Disadvantages**:
- ❌ Will become harder to maintain as codebase grows
- ❌ Mixed concerns (connection, seeding, queries)
- ❌ Harder to find specific functions

---

## Recommendation

**→ Implement Option 1 (Modular Split)**

**Rationale**:
1. Current size (489 lines) is approaching maintenance threshold
2. Clear domain boundaries make future changes safer
3. Reduced cognitive load when working on specific features
4. Re-export pattern keeps all imports unchanged

---

## Implementation Plan

### Step 1: Create Domain Modules

Create new files with their respective functions:

**`src/db/cheeses.ts`** (50 lines)
```typescript
import { getDb } from './index';

export function getCheeses() { ... }
export function getCheese(id: number) { ... }
export function insertCheese(...) { ... }
export function updateCheese(...) { ... }
export function deleteCheese(id: number) { ... }
```

**`src/db/weekly.ts`** (70 lines)
```typescript
import { getDb } from './index';

export function getCurrentWeeklyCheese() { ... }
export function getWeeklyCheese(weekNumber, year) { ... }
export function insertWeeklyCheese(...) { ... }
export function getPreviousWeeks() { ... }
```

**`src/db/testimonials.ts`** (70 lines)
```typescript
import { getDb } from './index';

export function getApprovedTestimonials() { ... }
export function getAllTestimonials() { ... }
export function insertTestimonial(...) { ... }
export function updateTestimonial(...) { ... }
export function toggleTestimonialApproval(...) { ... }
export function deleteTestimonial(id: number) { ... }
```

**`src/db/messages.ts`** (50 lines)
```typescript
import { getDb } from './index';

export function getContactMessages() { ... }
export function getContactMessage(id: number) { ... }
export function insertContactMessage(...) { ... }
export function markMessageAsRead(...) { ... }
export function deleteContactMessage(id: number) { ... }
```

**`src/db/auth.ts`** (30 lines)
```typescript
import { getDb } from './index';

export function getUser(username: string) { ... }
export function getUserById(id: number) { ... }
export function insertUser(username, passwordHash) { ... }
export function getSession(token: string) { ... }
export function insertSession(userId, token, expiresAt) { ... }
export function deleteSession(token: string) { ... }
```

### Step 2: Update `src/db/index.ts`

Keep as connection/export hub (50 lines):

```typescript
// Connection and initialization
export { getDb, initDatabase } from './connection';

// Re-exports (so imports don't change)
export {
  getCheeses,
  getCheese,
  insertCheese,
  updateCheese,
  deleteCheese
} from './cheeses';

export {
  getCurrentWeeklyCheese,
  getWeeklyCheese,
  insertWeeklyCheese,
  getPreviousWeeks
} from './weekly';

// ... more re-exports ...

export { getWeek } from './utils';
```

### Step 3: No Import Changes Needed

All existing imports remain unchanged:

```typescript
// These continue to work exactly as before
import { getCheeses, insertCheese } from '../db/index';
```

---

## Status

**Current**: Not implemented
**Recommended**: Implement in future phase
**Difficulty**: Low (simple file split, no logic changes)
**Breaking Changes**: None (re-export pattern preserves all imports)
**Testing Impact**: Minimal (only file structure changes)

---

## Future Considerations

### If Module Continues Growing

Could further split:
- `db/cheeses/read.ts` + `db/cheeses/write.ts`
- `db/auth/users.ts` + `db/auth/sessions.ts`

### Database Migration Helpers

Could add in future:
- `db/migrations/` directory for schema changes
- Version tracking for database schema

### Connection Pooling

Currently single connection via singleton. If load increases:
- Could switch to connection pooling
- Module split makes this refactoring easier

---

## Decision

**Recommendation**: Implement Option 1 after current improvement phase completes

**Timing**: When next working on database features or during next refactoring sprint

**Owner**: Can be assigned to any team member (low-risk refactoring)

