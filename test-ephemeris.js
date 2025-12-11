try {
    const ephemeris = require('ephemeris-astronomy');
    console.log('Exports:', Object.keys(ephemeris));

    // Try to use it
    const date = new Date();
    const observer = new ephemeris.Observer(date.latitude, date.longitude, 0); // hypothetical API
    // Or maybe it's functional
} catch (e) {
    console.log('Error:', e.message);
}
