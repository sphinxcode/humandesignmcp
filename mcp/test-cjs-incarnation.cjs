/**
 * Test incarnation cross in CommonJS calculations
 */

const { calculateHumanDesign } = require('./src/calculations-cjs.cjs');

async function test() {
  console.log('Testing incarnation cross calculation...\n');

  try {
    const result = await calculateHumanDesign({
      birthDate: '1993-02-05',
      birthTime: '11:53',
      birthLocation: 'Manila'
    });

    console.log('=== INCARNATION CROSS RESULT ===');
    console.log('Name:', result.incarnationCross.name);
    console.log('Type:', result.incarnationCross.type);
    console.log('Gates:', result.incarnationCross.gates);
    console.log('Profile:', result.incarnationCross.profile);
    console.log('\n=== FULL RESULT ===');
    console.log('Type:', result.type);
    console.log('Authority:', result.authority);
    console.log('Definition:', result.definition);
    console.log('Profile:', result.profile);

  } catch (error) {
    console.error('Error:', error.message);
    console.error(error.stack);
  }
}

test();
