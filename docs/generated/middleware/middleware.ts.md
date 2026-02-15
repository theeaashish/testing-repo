# Logging Middleware (`middleware/middleware.ts`)

This module exports a simple Express middleware, `loggerMiddleware`, designed to log details about incoming HTTP requests and their completion time to the console in JSON format.

## Key Components

### `loggerMiddleware`

This middleware function intercepts requests, records the start time using high-resolution time, and attaches a listener to the response object's `finish` event.

**Functionality:**

1.  Records the start time (`process.hrtime.bigint()`) when the request is received.
2.  When the response is finished (`res.on("finish", ...)`), it calculates the total duration of the request processing in milliseconds.
3.  It constructs a log object containing:
    *   `requestId` (read from `x-request-id` header, if present)
    *   HTTP `method`
    *   Request `url`
    *   Response `status` code
    *   Processing `duration` (formatted to two decimal places)
4.  The resulting log object is serialized to JSON and printed to `console.log`.
5.  It calls `next()` to pass control to the next middleware or route handler.

## Usage

This middleware should be registered early in your Express application's middleware stack to ensure it captures the full lifecycle of requests before other processing occurs.

```typescript
import express from 'express';
import { loggerMiddleware } from './middleware/middleware';

const app = express();

// Register the logger middleware
app.use(loggerMiddleware);

// ... rest of your application setup
```