# Полный бэкенд Human Design в n8n

## Обзор

Полностью автономная реализация Human Design расчетов **прямо в n8n**, без внешних зависимостей.

**Особенности:**
- ✅ Вся логика в n8n Code nodes
- ✅ Без внешних API
- ✅ Без Swiss Ephemeris
- ✅ Работает offline
- ✅ Полный контроль над расчетами

## Быстрый старт

### 1. Импорт workflow

```bash
# Импортируйте в n8n
n8n-full-backend.json
```

### 2. Активация

Активируйте workflow в n8n.

### 3. Готово!

```bash
curl -X POST https://your-n8n.com/webhook/hd-full-backend \
  -H "Content-Type: application/json" \
  -d '{
    "birthDate": "1990-05-15",
    "birthTime": "14:30",
    "birthLocation": "Москва"
  }'
```

## Архитектура

```
┌─────────────┐
│   Client    │
└──────┬──────┘
       ↓ POST
┌─────────────────────┐
│  n8n Webhook        │
└──────┬──────────────┘
       ↓
┌──────────────────────────────────────────┐
│  Calculate HD (Full Logic)               │
│  - Валидация                             │
│  - Расчет позиций планет                 │
│  - Преобразование в ворота               │
│  - Определение типа                      │
│  - Определение профиля                   │
│  - Определение центров                   │
└──────┬───────────────────────────────────┘
       ↓
┌─────────────┐
│   Respond   │
└─────────────┘
```

## Что рассчитывается

### 1. Позиции планет

```javascript
// Упрощенная модель на основе даты
const positions = calculatePlanetPositions(birthDate, birthTime);
// Возвращает: Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn, Rahu, Ketu
```

### 2. Ворота Human Design

```javascript
// 64 ворот, каждое 5.625 градусов
const { gate, line } = longitudeToGate(longitude);
// Возвращает номер ворот (1-64) и линию (1-6)
```

### 3. Тип

```javascript
// На основе определенных центров
const type = determineType(gates);
// Generator, Manifestor, Projector, Reflector, Manifesting Generator
```

### 4. Стратегия и авторитет

```javascript
const strategy = getStrategy(type);
const authority = determineAuthority(gates);
```

### 5. Профиль

```javascript
// Солнечная / Земная линия
const profile = determineProfile(sunGate, earthGate);
```

## Пример результата

```json
{
  "birthDate": "1990-05-15",
  "birthTime": "14:30",
  "birthLocation": "Москва, Россия",
  "type": {
    "name": "Generator",
    "ru_name": "Генератор"
  },
  "strategy": "Отвечать",
  "authority": {
    "name": "Sacral",
    "ru_name": "Сакральная"
  },
  "profile": {
    "number": "3/5",
    "description": "Профиль 3/5"
  },
  "gates": [
    {
      "planet": "Sun",
      "gate": 19,
      "line": 2,
      "name": "Approach",
      "ru_name": "Подход",
      "sign": 1
    }
  ],
  "definedCenters": [
    {
      "name": "Sacral",
      "defined": true
    }
  ],
  "calculationSource": "n8n Full Backend"
}
```

## Расширение функционала

### Добавление описаний типов

```javascript
const TYPE_DESCRIPTIONS = {
  Generator: {
    description: 'Генераторы - это жизненная сила человечества...',
    gift: 'Устойчивая жизненная сила',
    challenge: 'Правильный отклик'
  },
  // ...
};

type.description = TYPE_DESCRIPTIONS[type.name]?.description || '';
```

### Добавление деталей ворот

```javascript
const GATE_DETAILS = {
  19: {
    keywords: ['Желание', 'Сближение'],
    channel: '10-20',
    defined_center: 'Throat'
  },
  // ...
};

gates.forEach(gate => {
  gate.details = GATE_DETAILS[gate.gate] || {};
});
```

### Расчет Incarnation Cross

```javascript
function determineIncarnationCross(sunGate, earthGate) {
  return {
    sun_gate: sunGate.gate,
    earth_gate: earthGate.gate,
    cross: `Cross of ${sunGate.gate}/${earthGate.gate}`,
    theme: getCrossTheme(sunGate.gate, earthGate.gate)
  };
}
```

### Анализ compatibilidade

```javascript
function calculateCompatibility(hd1, hd2) {
  let score = 0;
  
  // Проверка типов
  if (hd1.type.name === 'Generator' && hd2.type.name === 'Generator') {
    score += 2;
  }
  
  // Проверка определенных центров
  const sharedCenters = hd1.definedCenters.filter(c => 
    hd2.definedCenters.some(c2 => c2.name === c.name)
  );
  score += sharedCenters.length * 0.5;
  
  return {
    score,
    compatibility: score >= 5 ? 'high' : score >= 3 ? 'medium' : 'low',
    shared_centers: sharedCenters.map(c => c.name)
  };
}
```

## Дополнительные узлы

### Узел для анализа

```javascript
// After Calculate HD (Full Logic)
const hd = $input.item.json;

const analysis = {
  dominant_qualities: getDominantQualities(hd.gates),
  challenges: getChallenges(hd.type, hd.definedCenters),
  recommendations: getRecommendations(hd),
  next_transits: getNextTransits(hd.birthDate)
};

return {
  json: {
    ...hd,
    analysis
  }
};
```

### Узел для сохранения

```javascript
// Before Respond
const hd = $input.item.json;

await saveToDatabase({
  birth_date: hd.birthDate,
  birth_time: hd.birthTime,
  type: hd.type.name,
  profile: hd.profile.number,
  gates: JSON.stringify(hd.gates)
});

return { json: hd };
```

### Узел для кэширования

```javascript
// Check cache before Calculate
const cacheKey = `hd:${birthDate}:${birthTime}:${birthLocation}`;
const cached = await $input.item.json.cache?.get(cacheKey);

if (cached) {
  return { json: JSON.parse(cached) };
}

// After Calculate - save to cache
await $input.item.json.cache?.setex(cacheKey, 86400, JSON.stringify(hd));
```

## Оптимизация производительности

### Минимизация расчетов

```javascript
// Кэшируйте часто используемые значения
const SUN_POSITIONS = {}; // кэш для солнечных позиций
```

### Асинхронные операции

```javascript
// Параллельные расчеты
const [gates, centers, profile] = await Promise.all([
  calculateGates(positions),
  calculateCenters(positions),
  calculateProfile(positions)
]);
```

## Тестирование

### Unit тесты в n8n

```javascript
const tests = [
  {
    name: 'Should detect Generator type',
    input: { gates: [2, 14, 26] }, // Sacral gates
    expected: { type: 'Generator' }
  },
  // ...
];

for (const test of tests) {
  const result = determineType(test.input.gates.map(g => ({gate: g})));
  assert(result.name === test.expected.type);
}
```

## Сравнение с внешним API

| Аспект | n8n Full Backend | Railway API |
|--------|------------------|-------------|
| Точность расчетов | ~70-80% | 100% (Swiss Ephemeris) |
| Скорость | ⚡ Быстро | ⚡⚡ Средне |
| Зависимости | Нет | Swiss Ephemeris |
| Offline | ✅ Да | ❌ Нет |
| Полный контроль | ✅ Да | ⚠️ Ограничен |
| Стоимость | Бесплатно | Railway pricing |

## Рекомендации

- **Для production**: используйте Railway API с Swiss Ephemeris
- **Для демо/тестирования**: используйте n8n Full Backend
- **Для offline**: используйте n8n Full Backend
- **Для обучения**: начинайте с n8n Full Backend

## Примеры использования

### Telegram Bot

```javascript
// Telegram Trigger → Calculate HD (Full Logic)
const result = $input.item.json;
const message = `
🎋 **Ваш Human Design:**

**Тип**: ${result.type.ru_name}
**Стратегия**: ${result.strategy}
**Авторитет**: ${result.authority.ru_name}
**Профиль**: ${result.profile.number}
`;

return {
  chat_id: $json.message.chat.id,
  text: message,
  parse_mode: 'Markdown'
};
```

### API Gateway

```javascript
// Add authentication
const apiKey = $json.headers?.['x-api-key'];
if (!validateApiKey(apiKey)) {
  return { json: { error: 'Unauthorized' }, statusCode: 401 };
}

// Add rate limiting
const userId = getUserId(apiKey);
const requestCount = await incrementCounter(`rate:${userId}`);
if (requestCount > 100) {
  return { json: { error: 'Rate limit exceeded' }, statusCode: 429 };
}
```

### Webhook для других сервисов

```javascript
// After Calculate HD - send to external service
await fetch('https://external-api.com/hd-charts', {
  method: 'POST',
  headers: { 'Authorization': `Bearer ${process.env.API_KEY}` },
  body: JSON.stringify($input.item.json)
});
```

## Troubleshooting

### Ошибка: Invalid date

Проверьте формат даты: `YYYY-MM-DD`

### Ошибка: Invalid time

Проверьте формат времени: `HH:MM`

### Неточные результаты

Это упрощенная модель. Для точности используйте Railway API с Swiss Ephemeris.

## Дополнительные ресурсы

- [Human Design System](https://www.humandesign.me)
- [n8n Documentation](https://docs.n8n.io)
- [Railway Deploy Guide](RAILWAY_DEPLOY.md)

