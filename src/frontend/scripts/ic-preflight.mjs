#!/usr/bin/env node

/**
 * Internet Computer project preflight validation script.
 * Validates required configuration files and build prerequisites before deployment.
 * Exits with non-zero status and clear English error messages when checks fail.
 */

import { existsSync, readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = resolve(__dirname, '../..');

console.log('=== Internet Computer Preflight Checks ===');
console.log('Project root:', projectRoot);

let hasErrors = false;

/**
 * Log an error and mark the preflight as failed
 */
function logError(message, resolution) {
  console.error(`\n❌ ERROR: ${message}`);
  if (resolution) {
    console.error(`   Resolution: ${resolution}`);
  }
  hasErrors = true;
}

/**
 * Log a success message
 */
function logSuccess(message) {
  console.log(`✓ ${message}`);
}

/**
 * Check if a file exists
 */
function checkFileExists(filePath, description) {
  const fullPath = resolve(projectRoot, filePath);
  if (!existsSync(fullPath)) {
    logError(
      `${description} not found at: ${filePath}`,
      `Ensure the file exists and is in the correct location.`
    );
    return false;
  }
  logSuccess(`${description} found`);
  return true;
}

/**
 * Validate dfx.json configuration
 */
function validateDfxConfig() {
  const dfxPath = resolve(projectRoot, 'dfx.json');
  
  if (!existsSync(dfxPath)) {
    logError(
      'dfx.json configuration file not found',
      'Run "dfx new" to initialize a new Internet Computer project or ensure dfx.json exists in the project root.'
    );
    return false;
  }

  try {
    const dfxContent = readFileSync(dfxPath, 'utf-8');
    const dfxConfig = JSON.parse(dfxContent);

    if (!dfxConfig.canisters) {
      logError(
        'dfx.json is missing "canisters" configuration',
        'Add canister definitions to dfx.json'
      );
      return false;
    }

    if (!dfxConfig.canisters.backend) {
      logError(
        'dfx.json is missing "backend" canister definition',
        'Add a backend canister configuration to dfx.json'
      );
      return false;
    }

    if (!dfxConfig.canisters.frontend) {
      logError(
        'dfx.json is missing "frontend" canister definition',
        'Add a frontend canister configuration to dfx.json'
      );
      return false;
    }

    logSuccess('dfx.json configuration is valid');
    return true;
  } catch (error) {
    logError(
      `Failed to parse dfx.json: ${error.message}`,
      'Ensure dfx.json contains valid JSON'
    );
    return false;
  }
}

/**
 * Validate frontend build configuration
 */
function validateFrontendConfig() {
  const frontendDir = resolve(projectRoot, 'frontend');
  
  if (!existsSync(frontendDir)) {
    logError(
      'frontend directory not found',
      'Ensure the frontend directory exists in the project root'
    );
    return false;
  }

  // Check for essential frontend files
  checkFileExists('frontend/index.html', 'Frontend HTML entry point');
  checkFileExists('frontend/src/main.tsx', 'Frontend TypeScript entry point');
  checkFileExists('frontend/vite.config.js', 'Vite configuration');
  checkFileExists('frontend/tsconfig.json', 'TypeScript configuration');

  logSuccess('Frontend configuration validated');
  return true;
}

/**
 * Validate backend configuration
 */
function validateBackendConfig() {
  const backendDir = resolve(projectRoot, 'backend');
  
  if (!existsSync(backendDir)) {
    logError(
      'backend directory not found',
      'Ensure the backend directory exists in the project root'
    );
    return false;
  }

  checkFileExists('backend/main.mo', 'Backend Motoko source file');

  logSuccess('Backend configuration validated');
  return true;
}

/**
 * Run all preflight checks
 */
function runPreflightChecks() {
  console.log('\nRunning preflight checks...\n');

  validateDfxConfig();
  validateFrontendConfig();
  validateBackendConfig();

  console.log('\n=== Preflight Check Results ===');
  
  if (hasErrors) {
    console.error('\n❌ Preflight checks FAILED');
    console.error('Please resolve the errors above before deploying.\n');
    process.exit(1);
  } else {
    console.log('\n✓ All preflight checks PASSED');
    console.log('Project is ready for deployment.\n');
    process.exit(0);
  }
}

// Run the checks
runPreflightChecks();
