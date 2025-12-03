/**
 * Утилиты для работы с часовыми поясами
 * Обертка над полной базой данных timezone
 */

const tzDB = require('./timezone-database.cjs');

/**
 * Определить часовой пояс и координаты по названию города
 */
function getLocationInfo(cityName) {
  const result = tzDB.findTimezoneByCity(cityName);
  return {
    city: result.city || cityName,
    tz: result.timezone,
    lat: result.latitude,
    lon: result.longitude
  };
}

/**
 * Определить UTC offset для даты (учитывая DST)
 */
function getUTCOffset(cityName, birthDate) {
  const locationInfo = getLocationInfo(cityName);
  const offsetData = tzDB.getUTCOffsetWithDST(birthDate, locationInfo.tz);
  return offsetData.offset;
}

/**
 * Конвертировать local time в UTC
 */
function localTimeToUTC(localTime, utcOffset) {
  const [hour, minute] = localTime.split(':').map(Number);
  const utcHour = hour - utcOffset;
  
  // Обработка перехода через полуночь
  let adjustedHour = utcHour;
  if (adjustedHour < 0) adjustedHour += 24;
  if (adjustedHour >= 24) adjustedHour -= 24;
  
  return {
    hour: adjustedHour,
    minute: minute,
    offset: utcOffset
  };
}

/**
 * Конвертировать local time в UTC (с учетом даты)
 */
function convertToUTC(birthDate, birthTime, cityName) {
  const fullResult = tzDB.convertLocalToUTC(birthDate, birthTime, cityName);
  return {
    utcYear: fullResult.utcYear,
    utcMonth: fullResult.utcMonth,
    utcDay: fullResult.utcDay,
    utcHour: fullResult.utcHour,
    utcMinute: fullResult.utcMinute,
    offset: fullResult.localOffset,
    originalLocalTime: fullResult.originalLocalTime
  };
}

module.exports = {
  getLocationInfo,
  getUTCOffset,
  localTimeToUTC,
  convertToUTC
};

