import { DEVELOPMENT } from "../globs";

/* eslint-disable no-console */

/**
 * A class method decorator which will log the method when it is called, as well
 * as its return value when it completes.
 */
export function debugMethod(
  _: unknown,
  key: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  /**
   * Browsers are always assumed production.
   */
  if (typeof window !== "undefined") {
    return descriptor;
  }

  const functionName = key;

  descriptor.value = function (...args: any[]) {
    const formattedArgs = args.map((arg) => JSON.stringify(arg)).join(",");
    const formattedFunction = `${functionName}(${formattedArgs})`;

    if (DEVELOPMENT) {
      console.log(
        `[DEBUG] ${formattedFunction} [CALL]`
      );
    }

    const result = originalMethod.apply(this, args);
    const formattedResult = JSON.stringify(result);
    console.log(`[DEBUG] ${formattedFunction} => ${formattedResult} [RETURN]`);
    return result;
  };

  return descriptor;
}

