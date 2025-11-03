/// <reference types="node" />
import type { URL } from "url";

export interface IDotenvParseOutput {
    [name: string]: string;
}

export interface IDotenvPopulateOutput {
    [name: string]: string;
}

export interface IDotenvConfigOptions {
    /**
     * Default: `path.resolve(process.cwd(), '.env')`
     *
     * Specify a custom path if your file containing environment variables is located elsewhere.
     * Can also be an array of strings, specifying multiple paths.
     *
     * example: `dotenv.config({ path: '/custom/path/to/.env' })`
     * example: `dotenv.config({ path: ['/path/to/first.env', '/path/to/second.env'] })`
     */
    path?: string | string[] | URL;

    /**
     * Default: `utf8`
     *
     * Specify the encoding of your file containing environment variables.
     *
     * example: `dotenv.config({ encoding: 'latin1' })`
     */
    encoding?: BufferEncoding | string;

    /**
     * Default: `false`
     *
     * Suppress all output (except errors).
     *
     * example: `dotenv.config({ quiet: true })`
     */
    quiet?: boolean;

    /**
     * Default: `false`
     *
     * Turn on logging to help debug why certain keys or values are not being set as you expect.
     *
     * example: `dotenv.config({ debug: process.env.DEBUG })`
     */
    debug?: boolean;

    /**
     * Default: `false`
     *
     * Override any environment variables that have already been set on your machine with values from your .env file.
     *
     * example: `dotenv.config({ override: true })`
     */
    override?: boolean;

    /**
     * Default: `process.env`
     *
     * Specify an object to write your secrets to. Defaults to process.env environment variables.
     *
     * example: `const processEnv = {}; dotenv.config({ processEnv: processEnv })`
     */
    processEnv?: DotenvPopulateInput;

    /**
     * Default: `undefined`
     *
     * Pass the DOTENV_KEY directly to config options. Defaults to looking for process.env.DOTENV_KEY environment variable. Note this only applies to decrypting .env.vault files. If passed as null or undefined, or not passed at all, dotenv falls back to its traditional job of parsing a .env file.
     *
     * example: `dotenv.config({ DOTENV_KEY: 'dotenv://:key_1234…@dotenvx.com/vault/.env.vault?environment=production' })`
     */
    DOTENV_KEY?: string;
}

export interface DotenvConfigOutput {
    error?: DotenvError;
    parsed?: IDotenvParseOutput;
}

type DotenvError = Error & {
    code: "MISSING_DATA" | "INVALID_DOTENV_KEY" | "NOT_FOUND_DOTENV_ENVIRONMENT" | "DECRYPTION_FAILED" | "OBJECT_REQUIRED";
};

export interface DotenvPopulateOptions {
    /**
     * Default: `false`
     *
     * Turn on logging to help debug why certain keys or values are not being set as you expect.
     *
     * example: `dotenv.config({ debug: process.env.DEBUG })`
     */
    debug?: boolean;

    /**
     * Default: `false`
     *
     * Override any environment variables that have already been set on your machine with values from your .env file.
     *
     * example: `dotenv.config({ override: true })`
     */
    override?: boolean;
}

export interface DotenvPopulateInput extends NodeJS.ProcessEnv {
    [name: string]: string | any;
}