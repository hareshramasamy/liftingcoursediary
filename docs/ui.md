# UI Coding Standards

## Component Library

**Only shadcn/ui components may be used for UI in this project.**

- Do NOT create custom components. If a UI element is needed, find the appropriate shadcn/ui component and use it.
- If a required component is not yet installed, install it via the shadcn CLI:
  ```bash
  npx shadcn@latest add <component>
  ```
- Do not wrap shadcn/ui components in custom wrapper components.

## Date Formatting

All date formatting must be done using **date-fns**. Do not use `toLocaleDateString`, `Intl.DateTimeFormat`, or any other date formatting approach.

Dates must be formatted using ordinal day suffixes in the following style:

```
1st Sep 2025
2nd Aug 2025
3rd Jan 2026
4th Jun 2024
```

Use the `do MMM yyyy` format token with date-fns:

```ts
import { format } from 'date-fns';

format(date, 'do MMM yyyy'); // e.g. "1st Sep 2025"
```
