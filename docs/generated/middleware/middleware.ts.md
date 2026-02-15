# Date Formatting Utility (`middleware/middleware.ts`)

This module exports a utility function, `formatDate`, designed to reliably format `Date` objects or date-like inputs (strings/numbers) into a human-readable string using internationalization standards.

## Key Components

### `formatDate(date, options?)`

This function takes a date input and optional `Intl.DateTimeFormatOptions` and returns a formatted date string.

**Parameters:**

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `date` | `Date \| string \| number` | The date value to format. |
| `options` | `Intl.DateTimeFormatOptions` (optional) | Custom formatting options to override defaults. |

**Functionality:**

1.  Attempts to create a `Date` object from the input.
2.  Throws an `Error` if the resulting date is invalid (`NaN` time value).
3.  Formats the date using `Intl.DateTimeFormat` with the locale set to `"en-IN"`.
4.  Applies default styles (`dateStyle: "medium"`, `timeStyle: "short"`) unless overridden by the provided `options`.

**Note on Context:**
While this file is located in the `middleware/` directory, its primary export, `formatDate`, is a general-purpose utility for date formatting, distinct from the logging middleware described in related documentation.

## Usage Example

```typescript
import { formatDate } from './middleware/middleware';

// Format the current date with default settings (medium date, short time)
const formattedNow = formatDate(new Date());
// Example output: "Oct 26, 2023, 10:30 AM"

// Format a specific timestamp with custom options
const customFormat = formatDate(1678886400000, {
  weekday: 'long',
  hour: '2-digit',
});
// Example output: "Wednesday, 12 AM"
```