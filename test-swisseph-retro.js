const swisseph = require('swisseph');

// Julian day for a known retrograde period (e.g. Mercury retrograde)
// April 2, 2024 - Mercury was retrograde
const julday = 2460403.5;

swisseph.swe_calc_ut(julday, swisseph.SE_MERCURY, swisseph.SEFLG_MOSEPH, (result) => {
    console.log('Mercury Result:', result);
    if (result.longitudeSpeed < 0) {
        console.log('Mercury is Retrograde!');
    } else {
        console.log('Mercury is Direct');
    }
});
