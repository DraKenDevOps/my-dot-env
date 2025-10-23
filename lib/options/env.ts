const options = {} as any;

if (process.env.DOTENV_CONFIG_ENCODING) options.encoding = process.env.DOTENV_CONFIG_ENCODING;
if (process.env.DOTENV_CONFIG_PATH) options.path = process.env.DOTENV_CONFIG_PATH;
if (process.env.DOTENV_CONFIG_QUIET) options.quiet = process.env.DOTENV_CONFIG_QUIET;
if (process.env.DOTENV_CONFIG_DEBUG) options.debug = process.env.DOTENV_CONFIG_DEBUG;
if (process.env.DOTENV_CONFIG_OVERRIDE) options.override = process.env.DOTENV_CONFIG_OVERRIDE;
if (process.env.DOTENV_CONFIG_DOTENV_KEY) options.DOTENV_KEY = process.env.DOTENV_CONFIG_DOTENV_KEY;

module.exports = options;
