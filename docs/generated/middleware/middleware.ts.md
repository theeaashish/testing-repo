# Error Handling Middleware (`middleware/middleware.ts`)

This module exports the core Express error handling middleware, `errorHandler`, which formats error responses differently based on the environment (`development` vs. `production`).

It relies on custom error objects having properties like `statusCode`, `status`, `message`, and optionally `isOperational` for production handling.

## Key Components

### `errorHandler` Middleware

This is the main Express error handling function, accepting the standard signature `(err, req, res, next)`.

**Functionality:**

1.  Sets default `statusCode` (500) and `status` ("error") on the error object if they are missing.
2.  Routes the error handling to environment-specific functions:
    *   If `process.env.NODE_ENV` is `"development"`, it calls `sendErrorDev`.
    *   Otherwise (production), it calls `sendErrorProd`.

### Internal Helper Functions

#### `sendErrorDev(err, res)`

Used for development environments. It returns the full error details to the client, including the stack trace and the original error object.

**Response Structure (Development):**
```json
{
  "status": "error" | "fail",
  "message": "Error message",
  "stack": "Stack trace...",
  "error": { ... original error object ... }
}
```

#### `sendErrorProd(err, res)`

Used for production environments. It aims to send safe, generic responses while logging detailed errors internally.

1.  **Operational Errors:** If `err.isOperational` is true (indicating a known, expected error like validation failure), it sends the specific status and message.
2.  **Programming/Unknown Errors:** If the error is not operational, it logs the full error to the console (`console.error("UNEXPECTED ERROR 💥", err)`) and sends a generic message to the client.

**Response Structure (Production - Operational Error):**
```json
{
  "status": "error" | "fail",
  "message": "Specific error message"
}
```

**Response Structure (Production - Unknown Error):**
```json
{
  "status": "error",
  "message": "Something went wrong"
}
```

## Export

The middleware is exported as the default export:

```typescript
export default errorHandler;
```

This function should be registered **last** in your Express application's middleware stack to catch errors propagated from routes or other middleware. (See related documentation on general middleware usage).