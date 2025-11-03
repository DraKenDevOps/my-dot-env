import type { IDotenvConfigOptions } from "../types";

const options = {} as IDotenvConfigOptions;

if (process.env.DOTENV_CONFIG_ENCODING) options.encoding = process.env.DOTENV_CONFIG_ENCODING;
if (process.env.DOTENV_CONFIG_PATH) options.path = process.env.DOTENV_CONFIG_PATH;
if (process.env.DOTENV_CONFIG_QUIET) options.quiet = process.env.DOTENV_CONFIG_QUIET == "true";
if (process.env.DOTENV_CONFIG_DEBUG) options.debug = process.env.DOTENV_CONFIG_DEBUG == "true";
if (process.env.DOTENV_CONFIG_OVERRIDE) options.override = process.env.DOTENV_CONFIG_OVERRIDE == "true";
if (process.env.DOTENV_CONFIG_DOTENV_KEY) options.DOTENV_KEY = process.env.DOTENV_CONFIG_DOTENV_KEY;

export default options;
