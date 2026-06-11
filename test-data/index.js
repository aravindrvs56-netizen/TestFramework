import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const loadJson = (filename) =>
  JSON.parse(readFileSync(join(__dirname, filename), 'utf-8'));

export const users = loadJson('users.json');
