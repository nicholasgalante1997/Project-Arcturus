import fs from 'fs';
import path from 'path';

import type { Manifest } from 'vite';

const ENTRY_SOURCE = 'src/main.tsx';

export function getBrowserESMBundles(publicPath = '/'): string[] {
  const main = findEntryInViteManifest(ENTRY_SOURCE, publicPath);
  const worker___prefetchCache = findBundleInDistOutput(
    'worker___prefetch-cache',
    publicPath + 'workers/',
    'dist/workers'
  );
  return [main, worker___prefetchCache];
}

/**
 * Vite emits `dist/.vite/manifest.json` mapping source entries to hashed output files.
 * The entry's static imports (react-runtime, vendors, ...) are loaded by the browser
 * through the entry module's own `import` statements, so only the entry needs bootstrapping.
 */
function findEntryInViteManifest(source: string, publicPath = '/') {
  const manifestPath = path.resolve(process.cwd(), 'dist', '.vite', 'manifest.json');
  if (!fs.existsSync(manifestPath)) throw new Error('Missing Vite manifest at ' + manifestPath);

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8')) as Manifest;
  const chunk = manifest[source];
  if (!chunk?.isEntry) throw new Error('Missing entry ' + source + ' in Vite manifest');

  return `${publicPath}${chunk.file}`;
}

function findBundleInDistOutput(name: string, publicPath = '/', searchDir = 'dist') {
  const dist = path.resolve(process.cwd(), searchDir);
  const distdes = fs.readdirSync(dist, { encoding: 'utf8', withFileTypes: true });
  const de = distdes
    .filter((de) => de.isFile() && de.name.endsWith('.js'))
    .find((de) => de.name.startsWith(name));
  if (!de) throw new Error('Missing file ' + name);

  return `${publicPath}${de.name}`;
}
