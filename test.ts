import { createDebugLogger } from "./src/debugLogger";
import { debugLog } from "./src";

export const testFunction = () => {
  const DEBUG = createDebugLogger(testFunction);
  DEBUG.log("hello world");
};

testFunction();

debugLog("hello world");