#!/usr/bin/env node

/**
 * Deployment Configuration Checker
 * 
 * This script helps verify that all required environment variables
 * are properly configured for deployment.
 */

const requiredEnvVars = [
  'NEXT_PUBLIC_SANITY_PROJECT_ID',
  'NEXT_PUBLIC_SANITY_DATASET',
  'NEXT_PUBLIC_SANITY_API_VERSION',
  'SANITY_TOKEN',
  'NEXT_PUBLIC_SITE_URL',
  'NEXT_PUBLIC_SITE_NAME'
];

const optionalEnvVars = [
  'VERCEL_TOKEN',
  'DOCKER_USERNAME',
  'DOCKER_PASSWORD',
  'LHCI_GITHUB_APP_TOKEN'
];

console.log('🔍 Checking deployment configuration...\n');

let missingRequired = [];
let missingOptional = [];

// Check required environment variables
console.log('📋 Required Environment Variables:');
requiredEnvVars.forEach(envVar => {
  const value = process.env[envVar];
  if (value) {
    console.log(`✅ ${envVar}: ${value.substring(0, 10)}...`);
  } else {
    console.log(`❌ ${envVar}: NOT SET`);
    missingRequired.push(envVar);
  }
});

console.log('\n📋 Optional Environment Variables:');
optionalEnvVars.forEach(envVar => {
  const value = process.env[envVar];
  if (value) {
    console.log(`✅ ${envVar}: ${value.substring(0, 10)}...`);
  } else {
    console.log(`⚠️  ${envVar}: NOT SET`);
    missingOptional.push(envVar);
  }
});

console.log('\n📊 Summary:');
if (missingRequired.length === 0) {
  console.log('✅ All required environment variables are configured!');
  console.log('🚀 Your deployment should work correctly.');
} else {
  console.log(`❌ Missing ${missingRequired.length} required environment variable(s):`);
  missingRequired.forEach(envVar => {
    console.log(`   - ${envVar}`);
  });
  console.log('\n🔧 To fix this:');
  console.log('1. Check your .env.local file for local development');
  console.log('2. Add missing secrets to GitHub repository settings');
  console.log('3. Refer to DEPLOYMENT_TROUBLESHOOTING.md for detailed instructions');
}

if (missingOptional.length > 0) {
  console.log(`\n⚠️  Optional variables not set (${missingOptional.length}):`);
  missingOptional.forEach(envVar => {
    console.log(`   - ${envVar}`);
  });
  console.log('These are only needed for specific deployment features.');
}

console.log('\n📚 For more help, see:');
console.log('- .env.example (template for environment variables)');
console.log('- DEPLOYMENT_TROUBLESHOOTING.md (detailed troubleshooting guide)');
console.log('- https://github.com/settings/tokens (for GitHub tokens)');
console.log('- https://sanity.io/manage (for Sanity configuration)');

process.exit(missingRequired.length > 0 ? 1 : 0);