/**
 * Env is PRODUCTION by default. Will be overwritten with existing process.env
 * if it exists.
 */
const env: NodeJS.ProcessEnv = {
  NODE_ENV: "production",
};

if (typeof process !== "undefined") {
  const { env: processEnv } = process;
  /**
   * try ... catch around dynamic import so if this is executed in a browser
   * context it will not produce runtime failures.
   */
  if (processEnv.NODE_ENV) {
    // console.log("Found NODE_ENV override", processEnv.NODE_ENV);
    env.NODE_ENV = processEnv.NODE_ENV;
  }
}

/**
 * Whether NODE_ENV is set to "development". Browser context will always be
 * assumed production.
 */
export const DEVELOPMENT =
  typeof window === "undefined" && env.NODE_ENV === "development";