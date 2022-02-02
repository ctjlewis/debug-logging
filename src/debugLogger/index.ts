import { Console } from "console";
import { DEVELOPMENT } from "../globs";
import chalk from "chalk";

export const debugConsole = new Console({
  stdout: process.stdout,
  stderr: process.stderr,
  groupIndentation: 4,
});

// eslint-disable-next-line @typescript-eslint/ban-types
export const createDebugLogger = (fn: Function) => {
  if (!DEVELOPMENT) {
    /**
     * Dead path, should get removed after AST compilation.
     */
    return {
      log() { void 0; },
      group() { void 0; },
      groupEnd() { void 0; },
    };
  } else {
    const { name } = fn;
    return {
      log(...msgs: unknown[]) {
        const fnLabel = chalk.bgBlue.white(` [${name}] `);
        debugConsole.log(`${fnLabel}`, "\n\n", ...msgs);
        debugConsole.log();
      },

      group() {
        debugConsole.log();
        const fnLabel = chalk.bgBlue.white(` [${name}] `);
        debugConsole.group(fnLabel);
        debugConsole.log();
      },

      groupEnd() {
        debugConsole.log("\n", "-".repeat(20), "\n");
        debugConsole.groupEnd();
      }
    };
  }
};