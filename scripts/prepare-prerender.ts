import fs from 'fs';
import path from 'path';
import { prerenderRoutes } from '../src/data/contentMetadata.ts';

/**
 * This script runs in 'tsx' during prebuild to extract the routes into a JSON file.
 * This allows the 'prerender.js' script to be a pure, dependency-free Node ESM script.
 */
const routesPath = path.resolve(process.cwd(), 'scripts/routes.json');
fs.writeFileSync(routesPath, JSON.stringify(prerenderRoutes, null, 2));
console.log(`Routes extracted to ${routesPath}`);
