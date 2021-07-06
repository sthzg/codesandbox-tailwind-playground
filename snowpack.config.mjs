/** @type {import("snowpack").SnowpackUserConfig } */
import os from 'os';

const DEFAULT_HOSTNAME = 'localhost';
const COMMON_HOSTNAME = 'sse.codesandbox.io';

const isSSE = os.hostname().includes('sse-sandbox');

/**
 * The fully qualified hostname allows HMR on Codesandbox to  establish a websocket connection.
 *
 * This is a (currently) working but brittle attempt to build the subdomain
 * of the sandbox. TODO: is there a more official way to gather this information?
 */
const getHostName = () => {
  if (!isSSE) {
    return DEFAULT_HOSTNAME;
  }

  const hash = os.hostname().split('-').reverse()[0];
  const result = `${hash}.${COMMON_HOSTNAME}`;
  console.log(`Guessed hostname: ${result}`);

  return result;
};

export default {
  root: 'src',
  devOptions: {
    output: isSSE ? 'stream' : 'dashboard',
    tailwindConfig: './tailwind.config.js',
    hostname: getHostName(),
    port: 8080,
    hmrPort: isSSE ? 443 : 8080,
  },
  plugins: [
    '@snowpack/plugin-postcss',
  ],
  buildOptions: {
    out: './build',
  },
};