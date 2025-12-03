/**
 * Test script for incarnation cross calculation
 */

import { rightAngleCrosses, juxtapositionCrosses, leftAngleCrosses } from './src/incarnation-crosses-data.js';

// Test function to lookup a cross
function lookupIncarnationCross(gates, type) {
  const databases = {
    'Right Angle': rightAngleCrosses,
    'Juxtaposition': juxtapositionCrosses,
    'Left Angle': leftAngleCrosses
  };

  const db = databases[type];

  // Find matching gate combination
  const match = db.find(cross => {
    return cross.gates[0] === gates[0] &&
           cross.gates[1] === gates[1] &&
           cross.gates[2] === gates[2] &&
           cross.gates[3] === gates[3];
  });

  if (match) {
    return match.name;
  }

  // If no exact match, return a generic name with the gates
  return `${type} Cross (${gates[0]}/${gates[1]} | ${gates[2]}/${gates[3]})`;
}

// Test cases
console.log('=== INCARNATION CROSS LOOKUP TESTS ===\n');

// Test 1: Right Angle Cross of The Sphinx
const test1 = lookupIncarnationCross([13, 7, 1, 2], 'Right Angle');
console.log('Test 1 - Right Angle (13/7 | 1/2):');
console.log('Result:', test1);
console.log('Expected: Right Angle Cross of The Sphinx');
console.log('Pass:', test1 === 'Right Angle Cross of The Sphinx', '\n');

// Test 2: Juxtaposition Cross of Self-Expression
const test2 = lookupIncarnationCross([1, 2, 4, 49], 'Juxtaposition');
console.log('Test 2 - Juxtaposition (1/2 | 4/49):');
console.log('Result:', test2);
console.log('Expected: Juxtaposition Cross of Self-Expression');
console.log('Pass:', test2 === 'Juxtaposition Cross of Self-Expression', '\n');

// Test 3: Left Angle Cross of Defiance
const test3 = lookupIncarnationCross([1, 2, 4, 49], 'Left Angle');
console.log('Test 3 - Left Angle (1/2 | 4/49):');
console.log('Result:', test3);
console.log('Expected: Left Angle Cross of Defiance');
console.log('Pass:', test3 === 'Left Angle Cross of Defiance', '\n');

// Test 4: Right Angle Cross of Laws
const test4 = lookupIncarnationCross([3, 50, 60, 56], 'Right Angle');
console.log('Test 4 - Right Angle (3/50 | 60/56):');
console.log('Result:', test4);
console.log('Expected: Right Angle Cross of Laws');
console.log('Pass:', test4 === 'Right Angle Cross of Laws', '\n');

// Test 5: Unknown combination (should return generic)
const test5 = lookupIncarnationCross([99, 99, 99, 99], 'Right Angle');
console.log('Test 5 - Unknown combination (99/99 | 99/99):');
console.log('Result:', test5);
console.log('Expected: Right Angle Cross (99/99 | 99/99)');
console.log('Pass:', test5 === 'Right Angle Cross (99/99 | 99/99)', '\n');

// Statistics
console.log('=== DATABASE STATISTICS ===');
console.log('Right Angle Crosses:', rightAngleCrosses.length);
console.log('Juxtaposition Crosses:', juxtapositionCrosses.length);
console.log('Left Angle Crosses:', leftAngleCrosses.length);
console.log('Total:', rightAngleCrosses.length + juxtapositionCrosses.length + leftAngleCrosses.length);
