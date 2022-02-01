# Create Debug Logger

This module provides a few ways to log to the console in development
environments only.

For quick development-only logging (removed in production):

```ts
import { debugLog } from "create-debug-logger"

debugLog("hello world");

// if process.env.NODE_ENV !== "production", logs:
// [DEBUG] [debugLog] hello world
```

For more advanced logging, including function name:

```ts
import { createDebugLogger } from "create-debug-logger";

export const testFunction = () => {
  const DEBUG = createDebugLogger(testFunction);
  DEBUG.log("hello world");
}

// if process.env.NODE_ENV !== "production", logs:
// [DEBUG] [testFunction] hello world
```