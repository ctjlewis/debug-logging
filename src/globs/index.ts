import { env } from "process";

export const PRODUCTION = env.NODE_ENV === "production";