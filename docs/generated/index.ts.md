# Express Server Initialization

This file sets up a basic HTTP server using the Express framework.

## Overview

The primary function of this module is to initialize an Express application, configure a single root route (`/`), and start listening for connections on port `3000`.

## Key Components

### Express Application Setup

An instance of the Express application is created:

```typescript
const app = express();
```

### Routes

#### Root Route (`GET /`)

This route handles HTTP GET requests to the root path (`/`).

**Handler:**
It responds to the request with a JSON object:
```json
{
  "message": "hey"
}
```

### Server Listening

The server is started and begins listening for incoming connections on port `3000`.

```typescript
app.listen(3000);
```