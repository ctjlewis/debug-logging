import { DEVELOPMENT } from "../globs";
import { style } from "@tsmodule/log";

export interface DebugLogger {
  log(...msgs: unknown[]): void;
  table(...msgs: unknown[]): void;
  group(): void;
  groupEnd(): void;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export const createDebugLogger = (fn: Function): DebugLogger => {
  const debugConsole = console;

  if (!DEVELOPMENT) {
    /**
     * Dead path, should get removed after AST compilation.
     */
    return {
      log() { void 0; },
      group() { void 0; },
      groupEnd() { void 0; },
      table() { void 0; }
    };
  } else {
    const { name } = fn;
    return {
      log(...msgs: unknown[]) {
        const fnLabel = style(` [${name}] `, ["bgBlue", "white"]);
        debugConsole.log(`${fnLabel}`, "\n\n", ...msgs);
        debugConsole.log();
      },

      table(...msgs: unknown[]) {
        const fnLabel = style(` [${name}] `, ["bgBlue", "white"]);
        debugConsole.log(`${fnLabel}`, "\n\n");
        debugConsole.table(...msgs);
        debugConsole.log();
      },

      group() {
        debugConsole.log();
        const fnLabel = style(` [${name}] `, ["bgBlue", "white"]);
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