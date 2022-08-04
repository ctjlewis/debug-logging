/* eslint-disable no-console */
import { DEVELOPMENT } from "../globs";
import { createDebugLogger } from "../debugLogger";

export const log = (...msgs: unknown[]) => {
  console.log();
  console.log(...msgs);
  console.log();
};

export const debugLog = (...msgs: unknown[]) => {
  const DEBUG = createDebugLogger(debugLog);
  if (DEVELOPMENT) {
    DEBUG.log(...msgs);
  }
};