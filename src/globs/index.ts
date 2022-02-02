/**
 * Env is PRODUCTION by default. Will be overwritten with existing process.env
 * if it exists.
 */
const env: NodeJS.ProcessEnv = {
  NODE_ENV: "production",
};

/**
 * try ... catch around dynamic import so if this is executed in a browser
 * context it will not produce runtime failures.
 */
try {
  const { env: processEnv } = await import("process");
  if (processEnv.NODE_ENV) {
    // console.log("Found NODE_ENV override", processEnv.NODE_ENV);
    env.NODE_ENV = processEnv.NODE_ENV;
  }
} catch (e) {}

export const PRODUCTION = env.NODE_ENV === "production";