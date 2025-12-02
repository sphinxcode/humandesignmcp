/**
 * Human Design Calculations with Swiss Ephemeris (CommonJS version)
 * Модуль для точного расчета карты Human Design
 */

// Импорт для расчета позиций планет (CommonJS)
const swisseph = require('swisseph');
const { getLocationInfo, getUTCOffset, convertToUTC } = require('./timezone-utils.cjs');

// Set ephemeris path for Moshier (built-in, no files needed)
swisseph.swe_set_ephe_path(__dirname);

// 64 ворот (gates) в Human Design с полными данными
const GATES = {
  1: { name: 'The Creative', ru_name: 'Творческий', hexagram: 1 },
  2: { name: 'The Receptive', ru_name: 'Воспринимающий', hexagram: 2 },
  3: { name: 'Ordering', ru_name: 'Порядок', hexagram: 3 },
  4: { name: 'Formulization', ru_name: 'Формулирование', hexagram: 4 },
  5: { name: 'Needing', ru_name: 'Потребность', hexagram: 5 },
  6: { name: 'Friction', ru_name: 'Трение', hexagram: 6 },
  7: { name: 'The Role of Self', ru_name: 'Роль Я', hexagram: 7 },
  8: { name: 'Holding Together', ru_name: 'Удержание вместе', hexagram: 8 },
  9: { name: 'The Focus', ru_name: 'Фокус', hexagram: 9 },
  10: { name: 'The Treading', ru_name: 'Шаги', hexagram: 10 },
  11: { name: 'Ideas', ru_name: 'Идеи', hexagram: 11 },
  12: { name: 'Caution', ru_name: 'Осторожность', hexagram: 12 },
  13: { name: 'The Listener', ru_name: 'Слушатель', hexagram: 13 },
  14: { name: 'Power Skills', ru_name: 'Силовые навыки', hexagram: 14 },
  15: { name: 'Modesty', ru_name: 'Скромность', hexagram: 15 },
  16: { name: 'Skills', ru_name: 'Навыки', hexagram: 16 },
  17: { name: 'Following', ru_name: 'Следование', hexagram: 17 },
  18: { name: 'Work', ru_name: 'Работа', hexagram: 18 },
  19: { name: 'Approach', ru_name: 'Подход', hexagram: 19 },
  20: { name: 'Now', ru_name: 'Сейчас', hexagram: 20 },
  21: { name: 'The Editor', ru_name: 'Редактор', hexagram: 21 },
  22: { name: 'Openness', ru_name: 'Открытость', hexagram: 22 },
  23: { name: 'Splitting Apart', ru_name: 'Распад', hexagram: 23 },
  24: { name: 'Rationalizing', ru_name: 'Рационализация', hexagram: 24 },
  25: { name: 'Spirit of the Self', ru_name: 'Дух Я', hexagram: 25 },
  26: { name: 'The Transmitter', ru_name: 'Передатчик', hexagram: 26 },
  27: { name: 'Caring', ru_name: 'Забота', hexagram: 27 },
  28: { name: 'The Game Player', ru_name: 'Игрок', hexagram: 28 },
  29: { name: 'Saying Yes', ru_name: 'Говорить да', hexagram: 29 },
  30: { name: 'Recognition of Feelings', ru_name: 'Узнавание чувств', hexagram: 30 },
  31: { name: 'Influence', ru_name: 'Влияние', hexagram: 31 },
  32: { name: 'The Duration', ru_name: 'Продолжительность', hexagram: 32 },
  33: { name: 'Retreat', ru_name: 'Отступление', hexagram: 33 },
  34: { name: 'Great Power', ru_name: 'Большая сила', hexagram: 34 },
  35: { name: 'Progress', ru_name: 'Прогресс', hexagram: 35 },
  36: { name: 'Crisis', ru_name: 'Кризис', hexagram: 36 },
  37: { name: 'Friendship', ru_name: 'Дружба', hexagram: 37 },
  38: { name: 'The Fighter', ru_name: 'Боец', hexagram: 38 },
  39: { name: 'Provocation', ru_name: 'Провокация', hexagram: 39 },
  40: { name: 'Deliverance', ru_name: 'Освобождение', hexagram: 40 },
  41: { name: 'Contraction', ru_name: 'Сокращение', hexagram: 41 },
  42: { name: 'Growth', ru_name: 'Рост', hexagram: 42 },
  43: { name: 'Insight', ru_name: 'Инсайт', hexagram: 43 },
  44: { name: 'Coming to Meet', ru_name: 'Встреча', hexagram: 44 },
  45: { name: 'The Gatherer', ru_name: 'Собирающий', hexagram: 45 },
  46: { name: 'Determination', ru_name: 'Определенность', hexagram: 46 },
  47: { name: 'Realization', ru_name: 'Реализация', hexagram: 47 },
  48: { name: 'The Well', ru_name: 'Колодец', hexagram: 48 },
  49: { name: 'Revolution', ru_name: 'Революция', hexagram: 49 },
  50: { name: 'Values', ru_name: 'Ценности', hexagram: 50 },
  51: { name: 'The Arousing', ru_name: 'Побуждение', hexagram: 51 },
  52: { name: 'Keeping Still', ru_name: 'Сохранение покоя', hexagram: 52 },
  53: { name: 'Development', ru_name: 'Развитие', hexagram: 53 },
  54: { name: 'The Marrying Maiden', ru_name: 'Невеста', hexagram: 54 },
  55: { name: 'Abundance', ru_name: 'Изобилие', hexagram: 55 },
  56: { name: 'The Wanderer', ru_name: 'Странник', hexagram: 56 },
  57: { name: 'The Gentle', ru_name: 'Нежный', hexagram: 57 },
  58: { name: 'The Joyous', ru_name: 'Радостный', hexagram: 58 },
  59: { name: 'Dispersion', ru_name: 'Дисперсия', hexagram: 59 },
  60: { name: 'Limitation', ru_name: 'Ограничение', hexagram: 60 },
  61: { name: 'Inner Truth', ru_name: 'Внутренняя правда', hexagram: 61 },
  62: { name: 'Detail', ru_name: 'Деталь', hexagram: 62 },
  63: { name: 'After Completion', ru_name: 'После завершения', hexagram: 63 },
  64: { name: 'Before Completion', ru_name: 'До завершения', hexagram: 64 },
};

// Центры и их ворота
const CENTER_GATES = {
  Root: [19, 39, 52, 58],
  Sacral: [2, 14, 26, 30, 31, 38, 42, 45, 59],
  SolarPlexus: [10, 20, 29, 34, 40, 46, 50, 57],
  Heart: [10, 21, 26, 34, 40, 51],
  Throat: [2, 3, 5, 7, 10, 11, 12, 16, 17, 20, 21, 22, 23, 24, 28, 31, 33, 35, 45, 56, 62],
  Ajna: [9, 20, 23, 30, 34, 40, 43, 47, 60, 61, 63, 64],
  Head: [1, 7, 13, 26, 27, 44, 50, 64],
  Spleen: [28, 32, 44, 48, 50, 57, 58],
  GCenter: [1, 2, 7, 10, 13, 15, 25, 46],
};

/**
 * Get planet index for Swiss Ephemeris
 */
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
    'Ketu': swisseph.SE_TRUE_NODE, // Calculate opposite for Ketu
  };
  return planetMap[planetName] || swisseph.SE_SUN;
}

/**
 * Calculate planet position (callback wrapper)
 */
function calculatePlanetPositionAsync(jd, planetName, callback) {
  const planetIndex = getPlanetIndex(planetName);
  const flags = swisseph.SEFLG_SPEED | swisseph.SEFLG_MOSEPH; // Use Moshier (no files needed)
  
  swisseph.swe_calc_ut(jd, planetIndex, flags, function(body) {
    if (body.error) {
      callback(new Error(body.error), null);
      return;
    }
    
    const longitude = body.longitude;
    
    // Handle Ketu (opposite of Rahu)
    const actualLongitude = planetName === 'Ketu' ? (longitude + 180) % 360 : longitude;
    
    // Human Design gate calculation
    const gateNumber = Math.floor(actualLongitude / 5.625) + 1;
    const gate = gateNumber > 64 ? 64 : gateNumber;
    const degreeInGate = actualLongitude % 5.625;
    const line = Math.floor(degreeInGate / 0.9375) + 1;
    const sign = Math.floor(actualLongitude / 30) + 1;
    
    callback(null, {
      name: planetName,
      longitude: actualLongitude,
      sign: sign,
      gate: gate,
      line: line,
      gateInfo: GATES[gate] || { name: 'Unknown', ru_name: 'Неизвестно' },
      color: degreeInGate / 0.9375,
    });
  });
}

/**
 * Determine HD type
 */
function determineType(gates) {
  const gateNumbers = gates.map(g => g.gate);
  const hasSacral = CENTER_GATES.Sacral.some(g => gateNumbers.includes(g));
  const hasThroat = CENTER_GATES.Throat.some(g => gateNumbers.includes(g));
  const hasSolarPlexus = CENTER_GATES.SolarPlexus.some(g => gateNumbers.includes(g));
  
  if (hasSacral && hasThroat) {
    return { name: 'Manifesting Generator', ru_name: 'Манифестирующий Генератор' };
  } else if (hasSacral) {
    return { name: 'Generator', ru_name: 'Генератор' };
  } else if (!hasThroat) {
    return { name: 'Reflector', ru_name: 'Рефлектор' };
  } else if (hasSolarPlexus) {
    return { name: 'Projector', ru_name: 'Проектор' };
  } else {
    return { name: 'Manifestor', ru_name: 'Манифестор' };
  }
}

function determineProfile(planetPositions) {
  const sun = planetPositions.find(p => p.name === 'Sun');
  if (!sun) return null;
  const sunLine = sun.line;
  const earthLine = 7 - sunLine;
  return { sun_line: sunLine, earth_line: earthLine, number: `${sunLine}/${earthLine}` };
}

function determineAuthority(planetPositions) {
  const gateNumbers = planetPositions.map(p => p.gate);
  if (CENTER_GATES.SolarPlexus.some(g => gateNumbers.includes(g))) {
    return { name: 'Emotional', ru_name: 'Эмоциональная' };
  } else if (CENTER_GATES.Sacral.some(g => gateNumbers.includes(g))) {
    return { name: 'Sacral', ru_name: 'Сакральная' };
  } else {
    return { name: 'Splenic', ru_name: 'Селезеночная' };
  }
}

function getDefinedCenters(gates) {
  const gateNumbers = gates.map(g => g.gate);
  const defined = [];
  for (const [centerName, gates] of Object.entries(CENTER_GATES)) {
    if (gates.some(g => gateNumbers.includes(g))) {
      defined.push({ name: centerName, defined: true });
    }
  }
  return defined;
}

/**
 * Main calculation function
 */
async function calculateHumanDesign({ birthDate, birthTime, birthLocation, latitude, longitude }) {
  try {
    const [year, month, day] = birthDate.split('-').map(Number);
    const [hour, minute] = birthTime.split(':').map(Number);
    
    const locationInfo = getLocationInfo(birthLocation);
    const utcOffset = getUTCOffset(birthLocation, birthDate);
    const utcData = convertToUTC(birthDate, birthTime, birthLocation);
    
    console.log(`Timezone: ${locationInfo.tz}, UTC offset: ${utcOffset}`);
    
    // Calculate Julian Day (async with callback)
    return new Promise((resolve, reject) => {
      swisseph.swe_julday(
        utcData.utcYear,
        utcData.utcMonth,
        utcData.utcDay,
        utcData.utcHour + utcData.utcMinute / 60,
        swisseph.SE_GREG_CAL,
        function(jd) {
          console.log('Julian Day:', jd);
          
          // Calculate all planets
          const planets = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Rahu', 'Ketu'];
          const promises = planets.map(planet => 
            new Promise((res, rej) => {
              calculatePlanetPositionAsync(jd, planet, (err, result) => {
                if (err) rej(err);
                else res(result);
              });
            })
          );
          
          Promise.all(promises)
            .then(planetPositions => {
              const gates = planetPositions.map(p => ({
                number: p.gate,
                name: p.gateInfo.name,
                ru_name: p.gateInfo.ru_name,
                line: p.line,
                planet: p.name,
                sign: p.sign,
                hexagram: p.gateInfo.hexagram,
              }));
              
              const type = determineType(gates);
              const profile = determineProfile(planetPositions);
              const authority = determineAuthority(planetPositions);
              const definedCenters = getDefinedCenters(gates);
              
              const strategies = {
                'Manifestor': 'Информировать',
                'Generator': 'Отвечать',
                'Manifesting Generator': 'Отвечать и информировать',
                'Projector': 'Ждать приглашения',
                'Reflector': 'Ждать полного лунного цикла',
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
                strategy: strategies[type.name] || 'Отвечать',
                authority,
                profile,
                gates,
                definedCenters,
                planetPositions: planetPositions.map(p => ({
                  planet: p.name,
                  longitude: p.longitude,
                  sign: p.sign,
                  gate: p.gate,
                  line: p.line,
                })),
                calculationSource: 'Swiss Ephemeris (Moshier)',
                version: '1.0.0-full',
              });
            })
            .catch(reject);
        }
      );
    });
  } catch (error) {
    console.error('Error calculating Human Design:', error);
    throw new Error(`Failed to calculate Human Design: ${error.message}`);
  }
}

module.exports = {
  calculateHumanDesign,
  GATES,
  CENTER_GATES,
  getLocationInfo,
  getUTCOffset,
  convertToUTC,
};
