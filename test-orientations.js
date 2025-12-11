// Quick test script to verify orientation fields implementation
const http = require('http');

const postData = JSON.stringify({
    birthDate: '1989-11-01',
    birthTime: '06:00',
    birthLocation: 'Manila, Philippines'
});

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/human-design',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        'Authorization': 'Bearer your-secret-api-key-change-this'
    }
};

console.log('Sending request to HD calculator...\n');

const req = http.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        try {
            const result = JSON.parse(data);

            if (result.success && result.data) {
                console.log('✅ SUCCESS! Calculation completed.\n');

                // Check PHS fields
                console.log('=== PHS (Primary Health System) ===');
                console.log('Digestion:', result.data.phs.digestion);
                console.log('Digestion Tone:', result.data.phs.digestionTone);
                console.log('✨ Digestion Orientation:', result.data.phs.digestionOrientation || '❌ MISSING');
                console.log('');
                console.log('Environment:', result.data.phs.environment);
                console.log('Environmental Tone:', result.data.phs.environmentalTone);
                console.log('✨ Environment Orientation:', result.data.phs.environmentOrientation || '❌ MISSING');
                console.log('');

                // Check Rave Psychology fields
                console.log('=== Rave Psychology ===');
                console.log('Motivation:', result.data.ravePsychology.motivation);
                console.log('Motivation Tone:', result.data.ravePsychology.motivationTone);
                console.log('✨ Motivation Orientation:', result.data.ravePsychology.motivationOrientation || '❌ MISSING');
                console.log('');
                console.log('Perspective:', result.data.ravePsychology.perspective);
                console.log('Perspective Tone:', result.data.ravePsychology.perspectiveTone);
                console.log('✨ Perspective Orientation:', result.data.ravePsychology.perspectiveOrientation || '❌ MISSING');
                console.log('');

                // Verify expected values
                console.log('=== Verification ===');
                const checks = [
                    { name: 'Digestion Orientation', expected: 'Left', actual: result.data.phs.digestionOrientation },
                    { name: 'Environment Orientation', expected: 'Left', actual: result.data.phs.environmentOrientation },
                    { name: 'Motivation Orientation', expected: 'Left', actual: result.data.ravePsychology.motivationOrientation },
                    { name: 'Perspective Orientation', expected: 'Left', actual: result.data.ravePsychology.perspectiveOrientation }
                ];

                checks.forEach(check => {
                    const status = check.actual === check.expected ? '✅' : '❌';
                    console.log(`${status} ${check.name}: ${check.actual} (expected: ${check.expected})`);
                });

                // Save full output
                const fs = require('fs');
                fs.writeFileSync('test-output-with-orientations.json', JSON.stringify(result, null, 2));
                console.log('\n📄 Full output saved to: test-output-with-orientations.json');

            } else {
                console.error('❌ Calculation failed:', result);
            }
        } catch (err) {
            console.error('❌ Error parsing response:', err.message);
            console.error('Raw response:', data);
        }
    });
});

req.on('error', (error) => {
    console.error('❌ Request error:', error.message);
    console.error('Make sure the server is running on http://localhost:3000');
});

req.write(postData);
req.end();
```
