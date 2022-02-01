import { Console } from "console";
import { PRODUCTION } from "../globs";
import chalk from "chalk";

export const debugConsole = new Console({
  stdout: process.stdout,
  stderr: process.stderr,
  groupIndentation: 4,
});

// eslint-disable-next-line @typescript-eslint/ban-types
export const createDebugLogger = (fn: Function) => {
  if (PRODUCTION) {
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
        debugConsole.log("\n");
        const debugLabel = chalk.bgWhite.gray("[LOG]");
        debugConsole.group(`${debugLabel}`);
        debugConsole.log(...msgs);
      },

      group() {
        debugConsole.log("\n");
        const debugLabel = chalk.bgWhite.gray("[DEBUG]");
        const fnLabel = chalk.bgBlueBright.black(`[${name}]`);
        debugConsole.group(`${debugLabel} ${fnLabel}`);
      },

      groupEnd() {
        debugConsole.log("\n", "-".repeat(20), "\n");
        debugConsole.groupEnd();
      }
    };
  }
};