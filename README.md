# Create Debug Logger

This module provides a few ways to log to the console in development
environments only.  **Debug logs will be removed when `process.env.NODE_ENV ===
"production".**

### Quick, devleopment-only logging

```ts
import { debugLog } from "debug-logging"

debugLog("hello world");

// if process.env.NODE_ENV !== "production", logs:
// [DEBUG] [debugLog] hello world
```

### Including function name by initializing

```ts
import { createDebugLogger } from "debug-logging";

export const testFunction = () => {
  const DEBUG = createDebugLogger(testFunction);
  DEBUG.log("hello world");
}

// if process.env.NODE_ENV !== "production", logs:
// [DEBUG] [testFunction] hello world
```

### As a class method decorator, if you want that for some reason

```ts
import { debugMethod } from "debug-logging";

class Person {
  @debugMethod
  greet(name: string): string {
    return `hello ${name}`;
  }
}

new Person().greet("world");
// [DEBUG] greet("world") [CALL]
// [DEBUG] greet("world") => "hello world" [RETURN]
```