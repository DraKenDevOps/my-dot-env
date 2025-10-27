import fs from "fs";
import path from "path";
import os from "os";
import type { IDotenvConfigOptions, DotenvPopulateInput } from "./types";

function _resolveHome(envPath: string | URL) {
    let p = "";
    if (typeof envPath == "string") p = envPath[0] === "~" ? path.join(os.homedir(), envPath.slice(1)) : envPath;
    return p;
}
const LINE = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/gm;

/**
 * Loads `.env` file contents into process.env by default. If `DOTENV_KEY` is present, it smartly attempts to load encrypted `.env.vault` file contents into process.env.
 *
 * See https://dotenvx.com/docs
 *
 * @param options - additional options. example: `{ path: './custom/path', encoding: 'latin1', quiet: false, debug: true, override: false }`
 */
function config(options: IDotenvConfigOptions = {}) {
    const dotenvPath = path.resolve(process.cwd(), ".env");
    let encoding = "utf8" as BufferEncoding;
    let processEnv = process.env;
    if (options.processEnv) processEnv = options.processEnv;
    if (options.encoding) encoding = options.encoding;

    let optionPaths = [dotenvPath];
    if (options.path) {
        if (!Array.isArray(options.path)) {
            optionPaths = [_resolveHome(options.path)];
        } else {
            optionPaths = [];
            for (const filepath of options.path) {
                optionPaths.push(_resolveHome(filepath));
            }
        }
    }

    for (const path of optionPaths) {
        try {
            const parsed = parse(fs.readFileSync(path, { encoding }));
            populate(processEnv, parsed, options);
        } catch (e) {
            throw e;
        }
    }
}
/**
 * Parses a string or buffer in the .env file format into an object.
 *
 * See https://dotenvx.com/docs
 *
 * @param src - contents to be parsed. example: `'DB_HOST=localhost'`
 * @returns an object with keys and values based on `src`. example: `{ DB_HOST : 'localhost' }`
 */
function parse(src: string | Buffer) {
    const obj = {} as {
        [k: string | symbol]: any;
    };
    let lines = src.toString().replace(/\r\n?/gm, "\n");
    let match = [] as unknown as RegExpExecArray | null;
    while ((match = LINE.exec(lines)) != null) {
        const key = match[1];
        let value = match[2] || "";
        value = value.trim();
        const maybeQuote = value[0];
        value = value.replace(/^(['"`])([\s\S]*)\1$/gm, "$2");
        if (maybeQuote === '"') {
            value = value.replace(/\\n/g, "\n");
            value = value.replace(/\\r/g, "\r");
        }
        // if(value == "true" || value == "false") value = value == "true"
        if (key) obj[key] = value;
    }
    return obj;
}
/**
 * Loads `source` json contents into `target` like process.env.
 *
 * See https://dotenvx.com/docs
 *
 * @param processEnv - the target JSON object. in most cases use process.env but you can also pass your own JSON object
 * @param parsed - the source JSON object
 * @param options - additional options. example: `{ quiet: false, debug: true, override: false }`
 */
function populate(processEnv: DotenvPopulateInput, parsed: DotenvPopulateInput, options: IDotenvConfigOptions = {}) {
    const override = Boolean(options.override);
    if (typeof parsed !== "object") throw new Error("OBJECT_REQUIRED: Please check the processEnv argument being passed to populate");
    for (const key of Object.keys(parsed)) {
        if (Object.prototype.hasOwnProperty.call(processEnv, key)) {
            if (override) if (key) processEnv[key] = parsed[key];
        } else {
            if (key) processEnv[key] = parsed[key];
        }
    }
}

export default {
    config,
    parse,
    populate
};
