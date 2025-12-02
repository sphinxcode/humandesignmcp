/**
 * Human Design Calculations with Swiss Ephemeris
 * Complete implementation with Personality AND Design calculations
 * Based on hdkit reference + correct gate mapping
 */

const swisseph = require('swisseph');
const { getLocationInfo, getUTCOffset, convertToUTC } = require('./timezone-utils.cjs');
const { longitudeToGate } = require('./gate-mapping.cjs');
const { HARMONIC_GATES, CENTERS_BY_CHANNEL } = require('./channel-data.cjs');

swisseph.swe_set_ephe_path(__dirname);

const GATES = {
  1: { name: 'The Creative', ru_name: 'Творческий' },
  2: { name: 'The Receptive', ru_name: 'Воспринимающий' },
  3: { name: 'Ordering', ru_name: 'Порядок' },
  4: { name: 'Formulization', ru_name: 'Формулирование' },
  5: { name: 'Waiting', ru_name: 'Ожидание' },
  6: { name: 'Conflict', ru_name: 'Конфликт' },
  7: { name: 'The Army', ru_name: 'Армия' },
  8: { name: 'Holding Together', ru_name: 'Удержание' },
  9: { name: 'The Taming Power of the Small', ru_name: 'Малая сила укрощения' },
  10: { name: 'Treading', ru_name: 'Наступление' },
  11: { name: 'Peace', ru_name: 'Мир' },
  12: { name: 'Standstill', ru_name: 'Застой' },
  13: { name: 'The Listener', ru_name: 'Слушатель' },
  14: { name: 'Power Skills', ru_name: 'Силовые навыки' },
  15: { name: 'Modesty', ru_name: 'Скромность' },
  16: { name: 'Enthusiasm', ru_name: 'Энтузиазм' },
  17: { name: 'Following', ru_name: 'Следование' },
  18: { name: 'Work', ru_name: 'Работа' },
  19: { name: 'Approach', ru_name: 'Подход' },
  20: { name: 'Now', ru_name: 'Сейчас' },
  21: { name: 'Biting Through', ru_name: 'Прокусывание' },
  22: { name: 'Grace', ru_name: 'Грация' },
  23: { name: 'Splitting Apart', ru_name: 'Распад' },
  24: { name: 'Returning', ru_name: 'Возвращение' },
  25: { name: 'Innocence', ru_name: 'Невинность' },
  26: { name: 'The Taming Power of the Great', ru_name: 'Великая сила укрощения' },
  27: { name: 'Nourishment', ru_name: 'Питание' },
  28: { name: 'Preponderance of the Great', ru_name: 'Перевес великого' },
  29: { name: 'The Abysmal', ru_name: 'Бездна' },
  30: { name: 'The Clinging Fire', ru_name: 'Сияние' },
  31: { name: 'Influence', ru_name: 'Влияние' },
  32: { name: 'Duration', ru_name: 'Постоянство' },
  33: { name: 'Retreat', ru_name: 'Отступление' },
  34: { name: 'The Power of the Great', ru_name: 'Мощь великого' },
  35: { name: 'Progress', ru_name: 'Прогресс' },
  36: { name: 'Darkening of the Light', ru_name: 'Затмение света' },
  37: { name: 'The Family', ru_name: 'Семья' },
  38: { name: 'Opposition', ru_name: 'Противоположность' },
  39: { name: 'Obstruction', ru_name: 'Препятствие' },
  40: { name: 'Deliverance', ru_name: 'Освобождение' },
  41: { name: 'Decrease', ru_name: 'Убыль' },
  42: { name: 'Increase', ru_name: 'Прибыль' },
  43: { name: 'Breakthrough', ru_name: 'Прорыв' },
  44: { name: 'Coming to Meet', ru_name: 'Встреча' },
  45: { name: 'Gathering Together', ru_name: 'Собирание' },
  46: { name: 'Pushing Upward', ru_name: 'Подъем' },
  47: { name: 'Oppression', ru_name: 'Истощение' },
  48: { name: 'The Well', ru_name: 'Колодец' },
  49: { name: 'Revolution', ru_name: 'Революция' },
  50: { name: 'The Cauldron', ru_name: 'Котел' },
  51: { name: 'The Arousing', ru_name: 'Возбуждение' },
  52: { name: 'Keeping Still', ru_name: 'Сохранение покоя' },
  53: { name: 'Development', ru_name: 'Развитие' },
  54: { name: 'The Marrying Maiden', ru_name: 'Невеста' },
  55: { name: 'Abundance', ru_name: 'Изобилие' },
  56: { name: 'The Wanderer', ru_name: 'Странник' },
  57: { name: 'The Gentle', ru_name: 'Проникновение' },
  58: { name: 'The Joyous', ru_name: 'Радость' },
  59: { name: 'Dispersion', ru_name: 'Рассеивание' },
  60: { name: 'Limitation', ru_name: 'Ограничение' },
  61: { name: 'Inner Truth', ru_name: 'Внутренняя правда' },
  62: { name: 'Preponderance of the Small', ru_name: 'Перевес малого' },
  63: { name: 'After Completion', ru_name: 'После завершения' },
  64: { name: 'Before Completion', ru_name: 'До завершения' }
};

function getPlanetIndex(planetName) {
  const planetMap = {
    'Sun': swisseph.SE_SUN,
    'Moon': swisseph.SE_MOON,
    'Mercury': swisseph.SE_MERCURY,
    'Venus': swisseph.SE_VENUS,
    'Mars': swisseph.SE_MARS,
    'Jupiter': swisseph.SE_JUPITER,
    'Saturn': swisseph.SE_SATURN,
    'Rahu': swisseph.SE_TRUE_NODE,
    'Ketu': swisseph.SE_TRUE_NODE,
  };
  return planetMap[planetName] || swisseph.SE_SUN;
}

function calculatePlanetPositionAsync(jd, planetName, callback) {
  const planetIndex = getPlanetIndex(planetName);
  const flags = swisseph.SEFLG_SPEED | swisseph.SEFLG_MOSEPH;

  swisseph.swe_calc_ut(jd, planetIndex, flags, function(body) {
    if (body.error) {
      callback(new Error(body.error), null);
      return;
    }

    const longitude = body.longitude;
    const actualLongitude = planetName === 'Ketu' ? (longitude + 180) % 360 : longitude;
    const gateData = longitudeToGate(actualLongitude);

    if (!gateData) {
      callback(new Error('Failed to map longitude to gate'), null);
      return;
    }

    callback(null, {
      name: planetName,
      longitude: actualLongitude,
      sign: gateData.signNum,
      signName: gateData.sign,
      gate: gateData.gate,
      line: gateData.line,
      gateInfo: GATES[gateData.gate] || { name: 'Unknown', ru_name: 'Неизвестно' },
      degreeInSign: gateData.degreeInSign,
    });
  });
}

function calculateAllPlanets(jd) {
  const planets = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Rahu', 'Ketu'];
  return Promise.all(planets.map(planet =>
    new Promise((resolve, reject) => {
      calculatePlanetPositionAsync(jd, planet, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    })
  ));
}

function getChannels(allGates) {
  const gateNumbers = allGates.map(g => g.gate);
  const gateSet = new Set(gateNumbers);
  const channels = [];

  for (const gate of gateNumbers) {
    const harmonics = HARMONIC_GATES[gate] || [];
    for (const harmonic of harmonics) {
      if (gateSet.has(harmonic)) {
        const channelName = gate < harmonic ? gate + '-' + harmonic : harmonic + '-' + gate;
        if (!channels.includes(channelName)) {
          channels.push(channelName);
        }
      }
    }
  }

  return channels.sort();
}

function getDefinedCenters(channels) {
  const centersSet = new Set();
  for (const channel of channels) {
    const centers = CENTERS_BY_CHANNEL[channel] || [];
    centers.forEach(c => centersSet.add(c));
  }
  return Array.from(centersSet).sort();
}

function motorToThroat(channels, definedCenters) {
  if (!definedCenters.includes("Throat")) return false;

  if (definedCenters.includes("SolarPlexus")) {
    if (channels.some(c => ["12-22", "35-36"].includes(c))) return true;
  }

  if (definedCenters.includes("Sacral")) {
    if (channels.includes("20-34")) return true;
    if (channels.some(c => ["2-14", "5-15", "29-46"].includes(c))) {
      if (channels.some(c => ["1-8", "7-31", "10-20", "13-33"].includes(c))) return true;
    }
    if (channels.includes("27-50")) {
      if (channels.some(c => ["16-48", "20-57"].includes(c))) return true;
      if (channels.includes("10-57")) {
        if (channels.some(c => ["1-8", "7-31", "10-20", "13-33"].includes(c))) return true;
      }
    }
  }

  if (definedCenters.includes("Ego")) {
    if (channels.includes("21-45")) return true;
    if (channels.includes("25-51")) {
      if (channels.some(c => ["1-8", "7-31", "10-20", "13-33"].includes(c))) return true;
      if (channels.includes("10-57")) {
        if (channels.some(c => ["16-48", "20-57"].includes(c))) return true;
      }
    }
    if (channels.includes("26-44")) {
      if (channels.some(c => ["16-48", "20-57"].includes(c))) return true;
    }
  }

  if (definedCenters.includes("Root")) {
    if (channels.some(c => ["18-58", "28-38", "32-54"].includes(c))) {
      if (channels.some(c => ["16-48", "20-57"].includes(c))) return true;
    }
    if (channels.includes("10-57")) {
      if (channels.some(c => ["1-8", "7-31", "10-20", "13-33"].includes(c))) return true;
    }
  }

  return false;
}

function determineType(channels, definedCenters) {
  if (channels.length === 0) {
    return { name: 'Reflector', ru_name: 'Рефлектор' };
  }

  const hasSacral = definedCenters.includes("Sacral");
  const hasMotorToThroat = motorToThroat(channels, definedCenters);

  if (hasSacral) {
    return hasMotorToThroat
      ? { name: 'Manifesting Generator', ru_name: 'Манифестирующий Генератор' }
      : { name: 'Generator', ru_name: 'Генератор' };
  } else {
    return hasMotorToThroat
      ? { name: 'Manifestor', ru_name: 'Манифестор' }
      : { name: 'Projector', ru_name: 'Проектор' };
  }
}

function determineAuthority(definedCenters) {
  if (definedCenters.length === 0) {
    return { name: 'Lunar', ru_name: 'Лунная' };
  }

  const hierarchy = [
    { center: "SolarPlexus", authority: { name: 'Emotional', ru_name: 'Эмоциональная' } },
    { center: "Sacral", authority: { name: 'Sacral', ru_name: 'Сакральная' } },
    { center: "Spleen", authority: { name: 'Splenic', ru_name: 'Селезеночная' } },
    { center: "Ego", authority: { name: 'Ego Projected', ru_name: 'Эго-проецированная' } },
    { center: "G", authority: { name: 'Self Projected', ru_name: 'Само-проецированная' } },
  ];

  for (const item of hierarchy) {
    if (definedCenters.includes(item.center)) {
      return item.authority;
    }
  }

  return { name: 'Mental/None', ru_name: 'Ментальная/Нет' };
}

async function calculateHumanDesign(params) {
  try {
    const { birthDate, birthTime, birthLocation } = params;
    const locationInfo = getLocationInfo(birthLocation);
    const utcOffset = getUTCOffset(birthLocation, birthDate);
    const utcData = convertToUTC(birthDate, birthTime, birthLocation);

    console.log('Calculating HD for', birthDate, birthTime, 'at', birthLocation);
    console.log('Timezone:', locationInfo.tz, 'UTC offset:', utcOffset);

    return new Promise((resolve, reject) => {
      swisseph.swe_julday(
        utcData.utcYear,
        utcData.utcMonth,
        utcData.utcDay,
        utcData.utcHour + utcData.utcMinute / 60,
        swisseph.SE_GREG_CAL,
        function(personalityJd) {
          console.log('Personality Julian Day:', personalityJd);

          const designJd = personalityJd - 88.0;
          console.log('Design Julian Day:', designJd, '(88 days before)');

          Promise.all([
            calculateAllPlanets(personalityJd),
            calculateAllPlanets(designJd)
          ]).then(([personalityPlanets, designPlanets]) => {
            const allGates = [
              ...personalityPlanets.map(p => ({ gate: p.gate, source: 'Personality', planet: p.name })),
              ...designPlanets.map(p => ({ gate: p.gate, source: 'Design', planet: p.name }))
            ];

            const channels = getChannels(allGates);
            const definedCenters = getDefinedCenters(channels);
            const type = determineType(channels, definedCenters);
            const authority = determineAuthority(definedCenters);

            const personalitySun = personalityPlanets.find(p => p.name === 'Sun');
            const designSun = designPlanets.find(p => p.name === 'Sun');
            const profile = personalitySun.line + '/' + designSun.line;

            const strategies = {
              'Manifestor': { ru: 'Информировать', en: 'To Inform' },
              'Generator': { ru: 'Отвечать', en: 'To Respond' },
              'Manifesting Generator': { ru: 'Отвечать и информировать', en: 'To Respond and Inform' },
              'Projector': { ru: 'Ждать приглашения', en: 'Wait for Invitation' },
              'Reflector': { ru: 'Ждать полного лунного цикла', en: 'Wait for Lunar Cycle' },
            };

            resolve({
              birthDate,
              birthTime,
              birthLocation,
              latitude: locationInfo.lat,
              longitude: locationInfo.lon,
              timezone: locationInfo.tz,
              utcOffset: utcOffset,
              type,
              strategy: strategies[type.name] || { ru: 'Отвечать', en: 'To Respond' },
              authority,
              profile,
              channels,
              definedCenters,
              personality: {
                planets: personalityPlanets.map(p => ({
                  planet: p.name,
                  gate: p.gate,
                  line: p.line,
                  gateName: p.gateInfo.name,
                  sign: p.signName,
                  longitude: p.longitude
                }))
              },
              design: {
                planets: designPlanets.map(p => ({
                  planet: p.name,
                  gate: p.gate,
                  line: p.line,
                  gateName: p.gateInfo.name,
                  sign: p.signName,
                  longitude: p.longitude
                }))
              },
              calculationSource: 'Swiss Ephemeris (Moshier) v2.0',
              version: '2.0.0-complete',
            });
          }).catch(reject);
        }
      );
    });
  } catch (error) {
    console.error('Error calculating Human Design:', error);
    throw new Error('Failed to calculate Human Design: ' + error.message);
  }
}

module.exports = {
  calculateHumanDesign,
  GATES,
  getLocationInfo,
  getUTCOffset,
  convertToUTC,
};
