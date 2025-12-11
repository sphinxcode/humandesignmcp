
console.log('Starting test_local_debug.js');
try {
    const { calculateHumanDesign } = require('./src/calculations-cjs.cjs');
    console.log('Imported calculateHumanDesign');

    const swisseph = require('swisseph');
    console.log('Imported swisseph');

    async function run() {
        console.log('Calling calculateHumanDesign...');
        try {
            const result = await calculateHumanDesign({
                birthDate: '1989-11-01',
                birthTime: '06:00',
                birthLocation: 'Manila, Philippines',
                latitude: 14.5995,
                longitude: 120.9842
            });
            console.log('Finished calculation.');
            console.log('Result:', JSON.stringify(result, null, 2));
        } catch (e) {
            console.error('Error in calculation:', e);
        }
    }

    run();
} catch (e) {
    console.error('Error importing:', e);
}
