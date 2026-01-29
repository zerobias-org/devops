#!/usr/bin/env node

/**
 * This script prepares a service for standalone publishing by:
 * 1. Scanning source files for actual import statements
 * 2. Scanning package.json scripts for build-time tool dependencies
 * 3. Adding only required dependencies (build, runtime, scripts) from root package.json
 * 4. Preserving the original package.json (backs it up first)
 *
 * Usage: node prepublish-standalone.js <service-dir> <root-dir> [--dry-run] [--restore] [--library] [--target-dir=<dir>]
 *
 * Options:
 *   --dry-run         Show what would be done without making changes
 *   --restore         Restore the original package.json from backup
 *   --library         Skip build tool dependencies (for SDK/library packages)
 *   --target-dir=DIR  Write updated package.json to this directory instead of service dir
 *                     (useful for ng-packagr where dist/ has its own package.json)
 */

import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const restore = args.includes('--restore');
const libraryMode = args.includes('--library'); // Skip build tool deps for library packages
const targetDirArg = args.find(arg => arg.startsWith('--target-dir='));
const targetDir = targetDirArg ? targetDirArg.split('=')[1] : null;
const serviceDir = args.find(arg => !arg.startsWith('--'));
const rootDir = args.find((arg, i) => !arg.startsWith('--') && i > args.indexOf(serviceDir));

if (!serviceDir || !rootDir) {
  console.error('Usage: node prepublish-standalone.js <service-dir> <root-dir> [--dry-run] [--restore] [--library] [--target-dir=<dir>]');
  console.error('\nOptions:');
  console.error('  --dry-run         Show what would be done without making changes');
  console.error('  --restore         Restore the original package.json from backup');
  console.error('  --library         Skip build tool dependencies (for SDK/library packages)');
  console.error('  --target-dir=DIR  Write updated package.json to DIR instead of service dir');
  process.exit(1);
}

const BACKUP_SUFFIX = '.prepublish-backup';

// Manual overrides for bin -> package mappings
// Use this for cases where the auto-detected mapping should be overridden
const BIN_PACKAGE_OVERRIDES = new Map([
  // Add overrides here if needed
]);

// Cached bin-to-package map built dynamically from node_modules
let binToPackageMap = null;

/**
 * Discover bin-to-package mappings by scanning node_modules
 * Reads package.json files and extracts bin field mappings
 * @param {string} rootDir - Root directory containing node_modules
 * @returns {Map<string, string>} Map of bin command name -> package name
 */
function discoverBinMappings(rootDir) {
  const binMap = new Map();
  const nodeModulesDir = path.join(rootDir, 'node_modules');

  if (!fs.existsSync(nodeModulesDir)) {
    console.log('[WARN] node_modules not found, bin discovery skipped');
    return binMap;
  }

  /**
   * Process a single package directory
   */
  function processPackage(pkgDir, packageName) {
    const pkgJsonPath = path.join(pkgDir, 'package.json');
    if (!fs.existsSync(pkgJsonPath)) return;

    try {
      const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'));
      const bin = pkgJson.bin;

      if (!bin) return;

      if (typeof bin === 'string') {
        // Single bin, command name is the package name (without scope)
        const cmdName = packageName.startsWith('@')
          ? packageName.split('/')[1]
          : packageName;
        binMap.set(cmdName, packageName);
      } else if (typeof bin === 'object') {
        // Multiple bins: { "cmd": "./path" }
        for (const cmdName of Object.keys(bin)) {
          binMap.set(cmdName, packageName);
        }
      }
    } catch {
      // Skip packages with invalid package.json
    }
  }

  try {
    // Process root-level packages
    const entries = fs.readdirSync(nodeModulesDir, { withFileTypes: true });

    for (const entry of entries) {
      if (!entry.isDirectory()) continue;

      // Skip hidden directories and .bin
      if (entry.name.startsWith('.')) continue;

      if (entry.name.startsWith('@')) {
        // Scoped package: scan @scope/package subdirectories
        const scopeDir = path.join(nodeModulesDir, entry.name);
        try {
          const scopeEntries = fs.readdirSync(scopeDir, { withFileTypes: true });
          for (const scopeEntry of scopeEntries) {
            if (scopeEntry.isDirectory()) {
              const packageName = `${entry.name}/${scopeEntry.name}`;
              processPackage(path.join(scopeDir, scopeEntry.name), packageName);
            }
          }
        } catch {
          // Skip unreadable scope directories
        }
      } else {
        // Regular package
        processPackage(path.join(nodeModulesDir, entry.name), entry.name);
      }
    }
  } catch {
    console.log('[WARN] Error scanning node_modules for bin mappings');
  }

  return binMap;
}

/**
 * Get the bin-to-package map (cached)
 * Combines discovered mappings with manual overrides
 */
function getBinToPackageMap(rootDir) {
  if (binToPackageMap === null) {
    console.log('\nDiscovering bin-to-package mappings from node_modules...');
    binToPackageMap = discoverBinMappings(rootDir);
    console.log(`Discovered ${binToPackageMap.size} bin commands`);

    // Apply overrides
    for (const [cmd, pkg] of BIN_PACKAGE_OVERRIDES) {
      binToPackageMap.set(cmd, pkg);
    }
  }
  return binToPackageMap;
}

// Packages that should be ignored (not real dependencies)
const IGNORED_PACKAGES = new Set([
  'src',      // Relative path that slipped through regex
  'dist',     // Build output directory
  'test',     // Test directory
  'scripts',  // Scripts directory
  'node',     // Node.js runtime, not a package
  'bin',      // Binary directory
  'sdk',      // Common directory name that slips through
  'api',      // Common directory name
  'lib',      // Common directory name
  'generated',// Generated code directory
]);

/**
 * Restore the original package.json from backup
 */
function restoreBackup(servicePackageJsonPath) {
  const backupPath = servicePackageJsonPath + BACKUP_SUFFIX;
  if (fs.existsSync(backupPath)) {
    fs.copyFileSync(backupPath, servicePackageJsonPath);
    fs.unlinkSync(backupPath);
    console.log('Restored package.json from backup');
    return true;
  }
  console.log('No backup found to restore');
  return false;
}

/**
 * Create backup of original package.json
 */
function createBackup(servicePackageJsonPath) {
  const backupPath = servicePackageJsonPath + BACKUP_SUFFIX;
  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(servicePackageJsonPath, backupPath);
    console.log(`Created backup: ${backupPath}`);
  } else {
    console.log('Backup already exists, preserving original');
  }
}

/**
 * Extract package names from script commands
 * Handles npx, node_modules/.bin, and direct package references
 * @param {Object} scripts - package.json scripts object
 * @param {Map<string, string>} binMap - bin command to package name mapping
 */
function extractScriptDependencies(scripts, binMap) {
  const deps = new Set();

  for (const [scriptName, scriptCmd] of Object.entries(scripts || {})) {
    if (!scriptCmd || typeof scriptCmd !== 'string') continue;

    // Split by common command separators
    const parts = scriptCmd.split(/[;&|]/);

    for (const part of parts) {
      const trimmed = part.trim();

      // Match npx <package>
      const npxMatch = trimmed.match(/npx\s+(?:--[^\s]+\s+)*([^\s]+)/);
      if (npxMatch) {
        const pkg = npxMatch[1];
        if (!pkg.startsWith('-') && !pkg.startsWith('.')) {
          // First check if it's a bin command that maps to a different package
          if (binMap.has(pkg)) {
            deps.add(binMap.get(pkg));
          } else if (pkg.startsWith('@')) {
            // Handle scoped packages
            deps.add(pkg.split('/').slice(0, 2).join('/'));
          } else {
            deps.add(pkg.split('/')[0]);
          }
        }
      }

      // Match node_modules/.bin/<tool>
      const binMatch = trimmed.match(/node_modules\/\.bin\/([^\s]+)/);
      if (binMatch) {
        const tool = binMatch[1];
        if (binMap.has(tool)) {
          deps.add(binMap.get(tool));
        }
      }

      // Match common build tool invocations at start of command
      const toolMatch = trimmed.match(/^([a-zA-Z][-a-zA-Z0-9]*)/);
      if (toolMatch) {
        const tool = toolMatch[1];
        if (binMap.has(tool)) {
          deps.add(binMap.get(tool));
        }
      }

      // Match "node --import <package>" pattern
      const nodeImportMatch = trimmed.match(/node\s+--import\s+([^\s/]+)/);
      if (nodeImportMatch) {
        const pkg = nodeImportMatch[1];
        if (pkg.startsWith('@')) {
          deps.add(pkg.split('/').slice(0, 2).join('/'));
        } else {
          deps.add(pkg.split('/')[0]);
        }
      }
    }
  }

  return deps;
}

/**
 * Check if a string looks like a valid npm package name
 */
function isValidPackageName(name) {
  if (!name || typeof name !== 'string') return false;

  // Must not start with special chars (except @ for scoped)
  if (name.startsWith('.') || name.startsWith('-') || name.startsWith('$')) return false;

  // Must not contain shell syntax
  if (name.includes('"') || name.includes("'") || name.includes(';') ||
      name.includes('|') || name.includes('&') || name.includes('=') ||
      name.includes('[') || name.includes(']') || name.includes('(') ||
      name.includes(')') || name.includes('{') || name.includes('}')) {
    return false;
  }

  // Scoped package validation: @scope/package
  if (name.startsWith('@')) {
    const parts = name.split('/');
    if (parts.length !== 2) return false;
    const scope = parts[0].substring(1); // Remove @
    const pkg = parts[1];
    // Scope and package must be valid
    return /^[a-z0-9][-a-z0-9]*$/.test(scope) && /^[a-z0-9][-a-z0-9._]*$/.test(pkg);
  }

  // Unscoped package validation
  return /^[a-z0-9][-a-z0-9._]*$/.test(name);
}

/**
 * Scan shell script files for package references
 * Returns a Set of package names found in node_modules paths or npx calls
 */
function scanShellScripts(directory) {
  const packages = new Set();

  function scanShellFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');

      // Match node_modules/@scope/package or node_modules/package patterns
      // Examples:
      //   $NODE_MODULES_BASE_DIR/node_modules/@zerobias-org/util-alert-importer/bin/importer
      //   node_modules/@zerobias-org/platform-dataloader/bin/dataloader
      // Use stricter pattern: package names only contain alphanumeric, dash, underscore, dot
      const nodeModulesRegex = /node_modules\/(@[a-z0-9][-a-z0-9]*\/[a-z0-9][-a-z0-9._]*|[a-z0-9][-a-z0-9._]*)/gi;
      let match;
      while ((match = nodeModulesRegex.exec(content)) !== null) {
        const pkg = match[1].toLowerCase();
        if (isValidPackageName(pkg)) {
          packages.add(pkg);
        }
      }

      // Match variable-based paths to packages like:
      //   ${NODE_MODULES_DIR}/@zerobias-com/hydra-schema-principal
      //   $NODE_MODULES_DIR/@zerobias-com/package-name
      //   ${SOME_VAR}/@scope/package
      // These are common in shell scripts that locate packages dynamically
      const varPathRegex = /\$\{?[A-Z_]+\}?\/(@[a-z0-9][-a-z0-9]*\/[a-z0-9][-a-z0-9._]*)/gi;
      while ((match = varPathRegex.exec(content)) !== null) {
        const pkg = match[1].toLowerCase();
        if (isValidPackageName(pkg)) {
          packages.add(pkg);
        }
      }

      // Match npx @scope/package or npx package patterns
      // Must be followed by space, end of line, or path separator
      const npxRegex = /npx\s+(?:node\s+)?(?:\$[A-Z_]+\/)?(?:node_modules\/)?(@[a-z0-9][-a-z0-9]*\/[a-z0-9][-a-z0-9._]*|[a-z][a-z0-9-]*)/gi;
      while ((match = npxRegex.exec(content)) !== null) {
        const pkg = match[1].toLowerCase();
        if (isValidPackageName(pkg)) {
          packages.add(pkg);
        }
      }

    } catch {
      // Ignore files that can't be read
    }
  }

  function scanDirectory(dir) {
    if (!fs.existsSync(dir)) return;

    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        // Skip node_modules
        if (entry.name === 'node_modules' || entry.name === '.git') {
          continue;
        }

        if (entry.isDirectory()) {
          scanDirectory(fullPath);
        } else if (entry.isFile() && entry.name.endsWith('.sh')) {
          scanShellFile(fullPath);
        }
      }
    } catch {
      // Ignore directories that can't be read
    }
  }

  // Scan src directory for shell scripts
  scanDirectory(path.join(directory, 'src'));

  // Scan scripts directory
  scanDirectory(path.join(directory, 'scripts'));

  // Also check root of service directory for shell scripts
  try {
    const entries = fs.readdirSync(directory, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isFile() && entry.name.endsWith('.sh')) {
        scanShellFile(path.join(directory, entry.name));
      }
    }
  } catch {
    // Ignore
  }

  return packages;
}

/**
 * Scan TypeScript/JavaScript files for import statements
 * Returns a Set of package names (external dependencies only)
 */
function scanImports(directory, extensions = ['.ts', '.js', '.mts', '.mjs']) {
  const imports = new Set();

  function scanFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');

      // Match ES6 imports: import ... from 'package' or import 'package'
      const importRegex = /(?:import\s+(?:[\s\S]*?from\s+)?['"]([^'"]+)['"]|require\s*\(['"]([^'"]+)['"]\))/g;

      let match;
      while ((match = importRegex.exec(content)) !== null) {
        const importPath = match[1] || match[2];

        // Skip relative imports
        if (importPath.startsWith('.') || importPath.startsWith('/')) {
          continue;
        }

        // Skip node: protocol imports
        if (importPath.startsWith('node:')) {
          continue;
        }

        // Extract package name (handle scoped packages)
        let packageName;
        if (importPath.startsWith('@')) {
          // Scoped package: @scope/package or @scope/package/subpath
          const parts = importPath.split('/');
          packageName = parts.slice(0, 2).join('/');
        } else {
          // Regular package: package or package/subpath
          packageName = importPath.split('/')[0];
        }

        imports.add(packageName);
      }
    } catch {
      // Ignore files that can't be read
    }
  }

  function scanDirectory(dir) {
    if (!fs.existsSync(dir)) return;

    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        // Skip node_modules and common non-source directories
        if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name === '.git') {
          continue;
        }

        if (entry.isDirectory()) {
          scanDirectory(fullPath);
        } else if (entry.isFile() && extensions.some(ext => entry.name.endsWith(ext))) {
          scanFile(fullPath);
        }
      }
    } catch {
      // Ignore directories that can't be read
    }
  }

  // Scan src directory
  scanDirectory(path.join(directory, 'src'));

  // Also scan generated directory if it exists
  scanDirectory(path.join(directory, 'generated'));

  // Scan scripts directory for any Node.js scripts
  scanDirectory(path.join(directory, 'scripts'));

  return imports;
}

/**
 * Scan config files (eslint, prettier, etc.) for package imports
 * These files are not in src/ but may import shared config packages
 * @param {string} directory - Service directory to scan
 * @returns {Set<string>} Set of package names found in config files
 */
function scanConfigFiles(directory) {
  const imports = new Set();

  // Config file patterns to scan
  const configPatterns = [
    'eslint.config.js',
    'eslint.config.mjs',
    'eslint.config.cjs',
    '.eslintrc.js',
    '.eslintrc.cjs',
    '.eslintrc.mjs',
    'prettier.config.js',
    'prettier.config.mjs',
    '.prettierrc.js',
    '.prettierrc.cjs',
  ];

  function extractImports(content) {
    // Match ES6 imports and require statements
    const importRegex = /(?:import\s+(?:[\s\S]*?from\s+)?['"]([^'"]+)['"]|require\s*\(['"]([^'"]+)['"]\))/g;

    let match;
    while ((match = importRegex.exec(content)) !== null) {
      const importPath = match[1] || match[2];

      // Skip relative imports and node: protocol
      if (importPath.startsWith('.') || importPath.startsWith('/') || importPath.startsWith('node:')) {
        continue;
      }

      // Extract package name (handle scoped packages)
      let packageName;
      if (importPath.startsWith('@')) {
        const parts = importPath.split('/');
        packageName = parts.slice(0, 2).join('/');
      } else {
        packageName = importPath.split('/')[0];
      }

      imports.add(packageName);
    }
  }

  for (const pattern of configPatterns) {
    const filePath = path.join(directory, pattern);
    if (fs.existsSync(filePath)) {
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        extractImports(content);
      } catch {
        // Ignore files that can't be read
      }
    }
  }

  return imports;
}

/**
 * Scan YAML files for package references
 * Handles Spectral configs, and other YAML files that may reference npm packages
 * @param {string} directory - Service directory to scan
 * @returns {Set<string>} Set of package names found in YAML files
 */
function scanYamlFiles(directory) {
  const packages = new Set();

  /**
   * Extract package references from YAML content
   * Looks for extends: arrays/strings and other patterns that reference npm packages
   */
  function extractYamlPackages(content) {
    // Match extends field - can be string or array of strings
    // Pattern: extends: "@scope/package" or extends:\n  - "@scope/package"
    // Also matches unscoped packages but filters out built-ins like "spectral:oas"

    // Match array items under extends:
    // Look for lines like:  - "@scope/package" or  - "package"
    const extendsArrayRegex = /extends:\s*\n((?:\s+-\s+["']?[^\n]+["']?\n?)+)/gi;
    let match;

    while ((match = extendsArrayRegex.exec(content)) !== null) {
      const arrayContent = match[1];
      // Extract each array item - capture full value including any colon suffix for filtering
      const itemRegex = /-\s+["']?([^"'\n]+)["']?/gi;
      let itemMatch;
      while ((itemMatch = itemRegex.exec(arrayContent)) !== null) {
        const rawValue = itemMatch[1].trim();
        // Skip built-in references like "spectral:oas"
        if (rawValue.includes(':')) continue;
        // Skip relative paths
        if (rawValue.startsWith('.') || rawValue.startsWith('/')) continue;
        // Extract package name (handle scoped packages)
        let pkg;
        if (rawValue.startsWith('@')) {
          const parts = rawValue.split('/');
          pkg = parts.slice(0, 2).join('/');
        } else {
          pkg = rawValue.split('/')[0];
        }
        if (isValidPackageName(pkg)) {
          packages.add(pkg);
        }
      }
    }

    // Match single string extends: "package"
    const extendsSingleRegex = /extends:\s+["'](@?[a-z0-9][-a-z0-9._]*(?:\/[a-z0-9][-a-z0-9._]*)?)["']/gi;
    while ((match = extendsSingleRegex.exec(content)) !== null) {
      const pkg = match[1];
      if (pkg.includes(':')) continue;
      if (pkg.startsWith('.') || pkg.startsWith('/')) continue;
      if (isValidPackageName(pkg)) {
        packages.add(pkg);
      }
    }
  }

  function scanDirectory(dir) {
    if (!fs.existsSync(dir)) return;

    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        // Skip node_modules, dist, .git, and other non-source directories
        if (entry.name === 'node_modules' || entry.name === 'dist' ||
            entry.name === '.git' || entry.name === 'coverage') {
          continue;
        }

        if (entry.isDirectory()) {
          scanDirectory(fullPath);
        } else if (entry.isFile() && (entry.name.endsWith('.yml') || entry.name.endsWith('.yaml'))) {
          try {
            const content = fs.readFileSync(fullPath, 'utf8');
            extractYamlPackages(content);
          } catch {
            // Ignore files that can't be read
          }
        }
      }
    } catch {
      // Ignore directories that can't be read
    }
  }

  // Scan the entire service directory for YAML files
  scanDirectory(directory);

  return packages;
}

/**
 * Get transitive dependencies for workspace packages
 */
function getWorkspaceTransitiveDeps(packageName, workspacePackageJsons, visited = new Set()) {
  if (visited.has(packageName)) return new Set();
  visited.add(packageName);

  const packageJson = workspacePackageJsons.get(packageName);
  if (!packageJson) return new Set();

  const deps = new Set();
  const allDeps = { ...packageJson.dependencies };

  for (const dep of Object.keys(allDeps)) {
    deps.add(dep);
    // Recursively get transitive deps from workspace packages
    if (workspacePackageJsons.has(dep)) {
      const transitive = getWorkspaceTransitiveDeps(dep, workspacePackageJsons, visited);
      transitive.forEach(d => deps.add(d));
    }
  }

  return deps;
}

/**
 * Main function
 */
function main() {
  const servicePackageJsonPath = path.join(serviceDir, 'package.json');
  // If targetDir is specified, write to that directory's package.json instead
  const outputPackageJsonPath = targetDir
    ? path.join(targetDir, 'package.json')
    : servicePackageJsonPath;

  // Handle restore mode
  if (restore) {
    restoreBackup(outputPackageJsonPath);
    return;
  }

  // Read root package.json
  const rootPackageJsonPath = path.join(rootDir, 'package.json');
  const rootPackageJson = JSON.parse(fs.readFileSync(rootPackageJsonPath, 'utf8'));
  const rootDeps = rootPackageJson.dependencies || {};
  const rootDevDeps = rootPackageJson.devDependencies || {};
  const rootOverrides = rootPackageJson.overrides || {};

  // Build map of workspace package names to their package.json content
  const workspacePackages = new Map(); // name -> version
  const workspacePackageJsons = new Map(); // name -> full package.json

  const workspaces = rootPackageJson.workspaces || [];

  for (const ws of workspaces) {
    const wsPackageJsonPath = path.join(rootDir, ws, 'package.json');
    if (fs.existsSync(wsPackageJsonPath)) {
      const wsPackageJson = JSON.parse(fs.readFileSync(wsPackageJsonPath, 'utf8'));
      if (wsPackageJson.name && wsPackageJson.version) {
        workspacePackages.set(wsPackageJson.name, wsPackageJson.version);
        workspacePackageJsons.set(wsPackageJson.name, wsPackageJson);
      }
    }
  }

  // Read service package.json (source for scanning)
  const servicePackageJson = JSON.parse(fs.readFileSync(servicePackageJsonPath, 'utf8'));

  // Read target package.json if using --target-dir (e.g., ng-packagr's dist/package.json)
  // This preserves the target's structure (exports, typings, etc.) while adding dependencies
  let outputPackageJson;
  if (targetDir && fs.existsSync(outputPackageJsonPath)) {
    outputPackageJson = JSON.parse(fs.readFileSync(outputPackageJsonPath, 'utf8'));
    console.log(`Using target package.json: ${outputPackageJsonPath}`);
  } else {
    outputPackageJson = { ...servicePackageJson };
  }

  // Auto-detect library mode based on zerobias.import-artifact field
  // SDK packages should not include build tool dependencies
  const isLibrary = libraryMode ||
    servicePackageJson.zerobias?.['import-artifact'] === 'sdk' ||
    servicePackageJson.zerobias?.['import-artifact'] === 'library';

  console.log(`\n=== Preparing standalone package: ${servicePackageJson.name} ===`);
  console.log(`Service directory: ${serviceDir}`);
  console.log(`Root directory: ${rootDir}`);
  if (targetDir) console.log(`Target directory: ${targetDir}`);
  if (isLibrary) console.log('** LIBRARY MODE - skipping build tool dependencies **');
  if (dryRun) console.log('** DRY RUN MODE **\n');

  // Scan for actual imports in source files
  console.log('\nScanning source files for imports...');
  const scannedImports = scanImports(serviceDir);
  console.log(`Found ${scannedImports.size} unique package imports from source files`);

  // Scan shell scripts for package references (skip for libraries - they're build-time only)
  let shellDeps = new Set();
  if (!isLibrary) {
    console.log('\nScanning shell scripts for package references...');
    shellDeps = scanShellScripts(serviceDir);
    console.log(`Found ${shellDeps.size} package references from shell scripts`);
    if (shellDeps.size > 0) {
      console.log('  Shell script deps:', [...shellDeps].join(', '));
    }
  } else {
    console.log('\nSkipping shell script scan (library mode)');
  }

  // Extract dependencies from package.json scripts (skip for libraries - they're build-time only)
  let scriptDeps = new Set();
  if (!isLibrary) {
    // Build bin-to-package map from node_modules
    const binMap = getBinToPackageMap(rootDir);

    console.log('\nScanning package.json scripts for build tools...');
    scriptDeps = extractScriptDependencies(servicePackageJson.scripts, binMap);
    console.log(`Found ${scriptDeps.size} build tool dependencies from scripts`);
    if (scriptDeps.size > 0) {
      console.log('  Build tools:', [...scriptDeps].join(', '));
    }
  } else {
    console.log('Skipping script dependency scan (library mode)');
  }

  // Scan YAML files for package references (extends: directives, etc.)
  console.log('\nScanning YAML files for package references...');
  const yamlDeps = scanYamlFiles(serviceDir);
  console.log(`Found ${yamlDeps.size} package references from YAML files`);
  if (yamlDeps.size > 0) {
    console.log('  YAML deps:', [...yamlDeps].join(', '));
  }

  // Start with existing dependencies from both source and target (if using --target-dir)
  // This preserves deps that build tools like ng-packagr add (e.g., tslib)
  const existingDeps = {
    ...servicePackageJson.dependencies,
    ...(targetDir ? outputPackageJson.dependencies : {}),
  };
  const requiredDeps = new Set();

  // Add all scanned imports to required deps
  for (const pkg of scannedImports) {
    requiredDeps.add(pkg);
  }

  // Add shell script dependencies
  for (const pkg of shellDeps) {
    requiredDeps.add(pkg);
  }

  // Add script dependencies
  for (const pkg of scriptDeps) {
    requiredDeps.add(pkg);
  }

  // Add YAML file dependencies
  for (const pkg of yamlDeps) {
    requiredDeps.add(pkg);
  }

  // Add existing service dependencies
  for (const pkg of Object.keys(existingDeps)) {
    requiredDeps.add(pkg);
  }

  // Add implicit dependencies based on package name patterns
  // e.g., eslint-config packages need eslint and related plugins
  const implicitDeps = [];
  if (servicePackageJson.name?.includes('eslint-config')) {
    const eslintDeps = [
      'eslint',
      '@typescript-eslint/eslint-plugin',
      '@typescript-eslint/parser',
      'eslint-plugin-unicorn',
    ];
    for (const dep of eslintDeps) {
      requiredDeps.add(dep);
      implicitDeps.push(dep);
    }
  }
  if (servicePackageJson.name?.includes('prettier-config')) {
    requiredDeps.add('prettier');
    implicitDeps.push('prettier');
  }
  if (implicitDeps.length > 0) {
    console.log(`\nAdded implicit dependencies based on package name: ${implicitDeps.join(', ')}`);
  }

  // Expand workspace package dependencies transitively
  const transitiveDeps = new Set();
  for (const pkg of requiredDeps) {
    if (workspacePackageJsons.has(pkg)) {
      const deps = getWorkspaceTransitiveDeps(pkg, workspacePackageJsons);
      deps.forEach(d => transitiveDeps.add(d));
    }
  }
  transitiveDeps.forEach(d => requiredDeps.add(d));

  // Build new dependencies object
  const newDependencies = {};
  const addedDeps = [];
  const missingDeps = [];

  for (const pkg of requiredDeps) {
    // Skip ignored packages
    if (IGNORED_PACKAGES.has(pkg)) {
      continue;
    }

    // Check if it's a workspace package
    if (workspacePackages.has(pkg)) {
      newDependencies[pkg] = workspacePackages.get(pkg);
      if (!existingDeps[pkg]) {
        addedDeps.push(`${pkg}@${workspacePackages.get(pkg)} (workspace)`);
      }
      continue;
    }

    // Check if it's in root dependencies
    if (rootDeps[pkg]) {
      newDependencies[pkg] = rootDeps[pkg];
      if (!existingDeps[pkg]) {
        addedDeps.push(`${pkg}@${rootDeps[pkg]}`);
      }
      continue;
    }

    // Check if it's in root devDependencies (needed for build/scripts)
    if (rootDevDeps[pkg]) {
      newDependencies[pkg] = rootDevDeps[pkg];
      if (!existingDeps[pkg]) {
        addedDeps.push(`${pkg}@${rootDevDeps[pkg]} (dev)`);
      }
      continue;
    }

    // Check if it's a Node.js built-in (shouldn't be in imports but just in case)
    const builtins = ['fs', 'path', 'http', 'https', 'crypto', 'stream', 'url', 'util', 'os', 'child_process', 'events', 'assert', 'buffer', 'net', 'tls', 'dns', 'readline', 'zlib'];
    if (builtins.includes(pkg)) {
      continue;
    }

    // Preserve existing service dependencies (e.g., workspace deps already defined)
    if (existingDeps[pkg]) {
      newDependencies[pkg] = existingDeps[pkg];
      continue;
    }

    // Package not found in root - might be a problem
    missingDeps.push(pkg);
  }

  // Sort dependencies alphabetically
  const sortedDependencies = {};
  Object.keys(newDependencies).sort().forEach(key => {
    sortedDependencies[key] = newDependencies[key];
  });

  // Report
  console.log('\n=== Summary ===');
  console.log(`Scanned imports: ${scannedImports.size}`);
  console.log(`Shell script deps: ${shellDeps.size}`);
  console.log(`Script dependencies: ${scriptDeps.size}`);
  console.log(`YAML file deps: ${yamlDeps.size}`);
  console.log(`Required dependencies (including transitive): ${requiredDeps.size}`);
  console.log(`Final dependencies: ${Object.keys(sortedDependencies).length}`);

  if (addedDeps.length > 0) {
    console.log(`\nAdded ${addedDeps.length} dependencies:`);
    addedDeps.slice(0, 30).forEach(dep => console.log(`  + ${dep}`));
    if (addedDeps.length > 30) {
      console.log(`  ... and ${addedDeps.length - 30} more`);
    }
  }

  if (missingDeps.length > 0) {
    console.log(`\n[WARNING] ${missingDeps.length} imported packages not found in root dependencies:`);
    missingDeps.forEach(dep => console.log(`  ! ${dep}`));
  }

  // Compare with current approach (all root deps)
  const allRootDepsCount = Object.keys(rootDeps).length;
  const savings = allRootDepsCount - Object.keys(sortedDependencies).length;
  console.log(`\nDependency reduction: ${allRootDepsCount} -> ${Object.keys(sortedDependencies).length} (${savings} fewer)`);

  // Log overrides from root
  const overrideCount = Object.keys(rootOverrides).length;
  if (overrideCount > 0) {
    console.log(`\nCopying ${overrideCount} overrides from root package.json:`);
    Object.entries(rootOverrides).forEach(([pkg, version]) => {
      console.log(`  ${pkg}: ${typeof version === 'string' ? version : JSON.stringify(version)}`);
    });
  }

  if (dryRun) {
    console.log('\n[DRY RUN] No changes made');
    console.log('\nDependencies that would be included:');
    Object.entries(sortedDependencies).forEach(([pkg, version]) => {
      console.log(`  ${pkg}: ${version}`);
    });
    if (overrideCount > 0) {
      console.log('\nOverrides that would be included:');
      Object.entries(rootOverrides).forEach(([pkg, version]) => {
        console.log(`  ${pkg}: ${typeof version === 'string' ? version : JSON.stringify(version)}`);
      });
    }
    return;
  }

  // Create backup before modifying (skip when using --target-dir since we're not modifying source)
  if (!targetDir) {
    createBackup(servicePackageJsonPath);
  }

  // Update the output package.json (either target or source)
  outputPackageJson.dependencies = sortedDependencies;
  delete outputPackageJson.devDependencies;

  // Copy overrides from root package.json (for vulnerability fixes)
  // Overrides apply to transitive dependencies - unused ones are safely ignored by npm
  if (overrideCount > 0) {
    outputPackageJson.overrides = rootOverrides;
  }

  // Write updated package.json to target location
  fs.writeFileSync(outputPackageJsonPath, JSON.stringify(outputPackageJson, null, 2) + '\n');
  console.log(`\nUpdated ${outputPackageJsonPath}`);
  console.log(`Total dependencies in standalone package: ${Object.keys(sortedDependencies).length}`);
  if (overrideCount > 0) {
    console.log(`Total overrides copied: ${overrideCount}`);
  }
}

main();
