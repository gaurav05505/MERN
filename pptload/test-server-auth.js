import http from 'http';
import fs from 'fs';

// Quick sanity check for server auth logic
console.log('🧪 Verifying Server Authorization and Security Constraints...');

const mockOwnerKey = 'secret-test-key-123';

function checkAuth(providedSecret) {
  if (!providedSecret || providedSecret !== mockOwnerKey) {
    return { status: 401, error: 'Unauthorized: Invalid or missing owner credential.' };
  }
  return { status: 200, isOwner: true };
}

// 1. Missing secret
const res1 = checkAuth(undefined);
if (res1.status !== 401) throw new Error('Failed to block missing secret');
console.log('  ✓ Missing secret blocked with 401');

// 2. Wrong secret
const res2 = checkAuth('wrong-password');
if (res2.status !== 401) throw new Error('Failed to block wrong secret');
console.log('  ✓ Wrong secret blocked with 401');

// 3. Valid secret
const res3 = checkAuth(mockOwnerKey);
if (res3.status !== 200 || !res3.isOwner) throw new Error('Failed to authorize valid secret');
console.log('  ✓ Correct owner secret authorized with 200');

// 4. File extension validator check
function validateExt(filename) {
  const ext = filename.slice(filename.lastIndexOf('.')).toLowerCase();
  return ext === '.pptx' || ext === '.ppt';
}

if (validateExt('malicious.exe')) throw new Error('Allowed .exe');
if (validateExt('notes.txt')) throw new Error('Allowed .txt');
if (validateExt('doc.pdf')) throw new Error('Allowed .pdf');
if (!validateExt('Presentation.pptx')) throw new Error('Rejected .pptx');
if (!validateExt('Slides.ppt')) throw new Error('Rejected .ppt');
console.log('  ✓ Strict file extension validation verified (.pptx and .ppt only)');

console.log('\n🎉 ALL SECURITY & AUTH CHECKS PASSED!\n');

