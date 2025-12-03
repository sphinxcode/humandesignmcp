/**
 * Test extended Human Design calculations
 * Tests Color, Tone, Variable Type, PHS, and Rave Psychology
 */

const { calculateHumanDesign } = require('./src/calculations-cjs.cjs');

async function testExtendedCalculations() {
  console.log('=== Testing Extended Human Design Calculations ===\n');

  // Test data from HD.txt
  const birthData = {
    birthDate: '1993-02-05',
    birthTime: '11:53',
    birthLocation: 'Manila'
  };

  try {
    const chart = await calculateHumanDesign(birthData);

    console.log('Birth Info:');
    console.log(`  Date: ${chart.birthInfo.date}`);
    console.log(`  Time: ${chart.birthInfo.time}`);
    console.log(`  Location: ${chart.birthInfo.location}`);
    console.log(`  Coordinates: ${chart.birthInfo.coordinates}`);
    console.log(`  Timezone: ${chart.birthInfo.timezone}\n`);

    console.log('Core Information:');
    console.log(`  Type: ${chart.type}`);
    console.log(`  Authority: ${chart.authority}`);
    console.log(`  Profile: ${chart.profile}\n`);

    console.log('=== NEW: Variable Type ===');
    console.log(`  Variable: ${chart.variableType}\n`);

    console.log('=== NEW: PHS (Primary Health System) ===');
    console.log(`  Digestion: ${chart.phs.digestion}`);
    console.log(`  Environment: ${chart.phs.environment}`);
    console.log(`  Environmental Tone: ${chart.phs.environmentalTone}\n`);

    console.log('=== NEW: Rave Psychology ===');
    console.log(`  Motivation: ${chart.ravePsychology.motivation}`);
    console.log(`  Perspective: ${chart.ravePsychology.perspective}\n`);

    console.log('Personality Activations (with Color/Tone):');
    console.log(`  Sun: Gate ${chart.personality.Sun.gate}.${chart.personality.Sun.line}.${chart.personality.Sun.color}.${chart.personality.Sun.tone}.${chart.personality.Sun.base}`);
    console.log(`  Earth: Gate ${chart.personality.Earth.gate}.${chart.personality.Earth.line}.${chart.personality.Earth.line}.${chart.personality.Earth.color}.${chart.personality.Earth.tone}.${chart.personality.Earth.base}`);
    console.log(`  Rahu: Gate ${chart.personality.Rahu.gate}.${chart.personality.Rahu.line}.${chart.personality.Rahu.color}.${chart.personality.Rahu.tone}.${chart.personality.Rahu.base}`);
    console.log(`  Ketu: Gate ${chart.personality.Ketu.gate}.${chart.personality.Ketu.line}.${chart.personality.Ketu.color}.${chart.personality.Ketu.tone}.${chart.personality.Ketu.base}\n`);

    console.log('Design Activations (with Color/Tone):');
    console.log(`  Sun: Gate ${chart.design.Sun.gate}.${chart.design.Sun.line}.${chart.design.Sun.color}.${chart.design.Sun.tone}.${chart.design.Sun.base}`);
    console.log(`  Earth: Gate ${chart.design.Earth.gate}.${chart.design.Earth.line}.${chart.design.Earth.color}.${chart.design.Earth.tone}.${chart.design.Earth.base}`);
    console.log(`  Rahu: Gate ${chart.design.Rahu.gate}.${chart.design.Rahu.line}.${chart.design.Rahu.color}.${chart.design.Rahu.tone}.${chart.design.Rahu.base}`);
    console.log(`  Ketu: Gate ${chart.design.Ketu.gate}.${chart.design.Ketu.line}.${chart.design.Ketu.color}.${chart.design.Ketu.tone}.${chart.design.Ketu.base}\n`);

    console.log('Channels:', chart.channels.join(', '));
    console.log('Defined Centers:', chart.definedCenters.join(', '));
    console.log(`\nVersion: ${chart.version}`);

    console.log('\n✅ Test completed successfully!');
    return chart;

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run test
testExtendedCalculations()
  .then(() => {
    console.log('\n=== All tests passed! ===');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n=== Test suite failed ===');
    console.error(error);
    process.exit(1);
  });
