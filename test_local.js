
const { calculateHumanDesign } = require('./src/calculations-cjs.cjs');

async function run() {
    try {
        const result = await calculateHumanDesign({
            birthDate: '1989-11-01',
            birthTime: '06:00',
            birthLocation: 'Manila, Philippines',
            latitude: 14.5995, // Manila approximate
            longitude: 120.9842
        });

        console.log('Result:');
        console.log('Type:', result.type);
        console.log('Profile:', result.profile);
        console.log('Cross:', result.incarnationCross);
        console.log('Full JSON:', JSON.stringify(result, null, 2));

    } catch (error) {
        console.error('Error:', error);
    }
}

run();
