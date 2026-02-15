# Error Handling Middleware

This module exports a standard Express error handling middleware function designed to catch errors propagated through the request-response cycle and format them into consistent JSON responses.

## Overview

The `errorHandler` middleware intercepts errors, logs them to the console, and sends a standardized error response back to the client, ensuring that sensitive internal details are not exposed directly in the HTTP response body.

## Key Components

### `errorHandler` Middleware

This function adheres to the standard Express error handling signature (`(err, req, res, next)`).

**Signature:**
```typescript
(err, req, res, next) => { ... }
```

**Functionality:**

1.  **Logging:** It logs the error object to the server console using `console.error(err)`.
2.  **Response Status:** It sets the HTTP status code based on `err.status` if present, defaulting to `500` (Internal Server Error) otherwise.
3.  **JSON Response:** It sends a JSON response containing:
    *   `status`: Always `"error"`.
    *   `message`: Uses `err.message` if available, defaulting to `"Internal Server Error"`.

### Export

The middleware is exported as the default export:

```typescript
export default errorHandler;
```

## Usage Example (Conceptual)

This middleware should be placed **last** in your Express application's middleware chain, typically after all routes and other non-error middleware, to catch any errors thrown during request processing.

If you are using the setup described in `index.ts` (which initializes Express), you would integrate this middleware like so (assuming you import it):

```typescript
import express from "express";
import errorHandler from "./middleware/middleware"; // Assuming path resolution

const app = express();

// ... Define routes here ...

// Error Handler must be the last middleware loaded
app.use(errorHandler);

app.listen(3000);
```