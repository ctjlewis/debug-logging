/* eslint-disable no-console */
import { PRODUCTION } from "./globs";
import { createDebugLogger } from "./debugLogger";

export const log = (...msgs: unknown[]) => {
  console.log(...msgs);
};

export const debugLog = (...msgs: unknown[]) => {
  const DEBUG = createDebugLogger(debugLog);
  if (!PRODUCTION) {
    DEBUG.log(...msgs);
  }
};

export * from "./debugLogger";