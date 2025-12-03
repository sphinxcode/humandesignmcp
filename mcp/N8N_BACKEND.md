# Бэкенд Human Design на n8n

## Полная архитектура

### Схема работы:

```
Клиент → n8n Webhook → Валидация → Railway API (Swiss Ephemeris) → Обогащение → Форматирование → Ответ клиенту
```

**Преимущества:**
- ✅ Вся бизнес-логика в n8n
- ✅ Централизованное логирование
- ✅ Легко добавить дополнительные проверки
- ✅ Swiss Ephemeris расчеты на Railway
- ✅ Можно добавить БД, кэш, rate limiting

## Развертывание

### 1. Импорт workflow

Импортируйте `n8n-backend-workflow.json` в n8n.

### 2. Настройка переменных окружения

В n8n Settings → Environment Variables:

```
RAILWAY_API_URL=https://balanced-generosity-test.up.railway.app
```

### 3. Активация

Активируйте workflow в n8n.

## Workflow узлы

### 1. Webhook - Main Entry
- Метод: POST
- Path: `/human-design`
- Получает JSON с birthDate, birthTime, birthLocation

### 2. Validate Input
Проверяет:
- Все поля заполнены
- Формат даты: YYYY-MM-DD
- Формат времени: HH:MM

### 3. Is Valid?
IF node для ветвления логики

### 4. Calculate Swiss Ephemeris
HTTP Request к Railway API

### 5. Calculation Success?
IF node для проверки результата

### 6. Enrich Data
Добавляет:
- Характеристики типа
- Статистику
- Ключевые ворота
- Краткое резюме

### 7. Format Output
Форматирует для красивого вывода клиенту

### 8. Respond Success / Respond Error
Отправляет результат обратно клиенту

## Использование

### Запрос

```bash
curl -X POST https://your-n8n-instance.com/webhook/human-design-backend \
  -H "Content-Type: application/json" \
  -d '{
    "birthDate": "1990-05-15",
    "birthTime": "14:30",
    "birthLocation": "Москва, Россия"
  }'
```

### Ответ

```json
{
  "basic": {
    "type": "Проектор (Projector)",
    "strategy": "Ждать приглашения",
    "authority": "Эмоциональная авторитет (Emotional)",
    "profile": "3/4"
  },
  "type_info": {
    "name": "Проектор",
    "description": "Проекторы имеют сосредоточенную ауру...",
    "strategy": "Ждать приглашения"
  },
  "prominent_gates": [
    {
      "gate": 19,
      "planet": "Sun",
      "name": "Подход",
      "line": 2
    }
  ],
  "defined_centers": ["SolarPlexus", "Throat", "Ajna"],
  "stats": {
    "total_gates": 9,
    "defined_centers_count": 6,
    "open_centers_count": 3
  },
  "source": "Swiss Ephemeris"
}
```

## Добавление дополнительной логики

### Сохранение в БД

Добавьте узел после "Enrich Data":

```javascript
// Save to Database node
const hd = $input.item.json;

// Подключение к БД (PostgreSQL)
const query = `
  INSERT INTO human_design_charts 
  (birth_date, birth_time, birth_location, type, strategy, profile, gates, created_at)
  VALUES 
  ($1, $2, $3, $4, $5, $6, $7, NOW())
  RETURNING id
`;

return await executeQuery(query, [
  hd.birthDate,
  hd.birthTime,
  hd.birthLocation,
  hd.type.name,
  hd.strategy,
  hd.profile.number,
  JSON.stringify(hd.gates)
]);
```

### Кэширование

Добавьте Redis узел:

```javascript
// Cache check (перед "Calculate Swiss Ephemeris")
const cacheKey = `hd:${birthDate}:${birthTime}:${birthLocation}`;
const cached = await redis.get(cacheKey);

if (cached) {
  return { json: JSON.parse(cached) };
}

// После "Format Output" - save to cache
await redis.setex(cacheKey, 86400, JSON.stringify(hd)); // 24 часа
```

### Rate Limiting

Добавьте проверку после "Validate Input":

```javascript
// Rate limit per IP
const clientIP = $json.headers?.['x-forwarded-for'] || 'unknown';
const key = `rate:${clientIP}`;
const count = await redis.incr(key);

if (count === 1) {
  await redis.expire(key, 3600); // 1 час
}

if (count > 100) { // max 100 requests/hour
  return {
    json: {
      success: false,
      error: 'Rate limit exceeded',
      code: 'RATE_LIMIT'
    }
  };
}
```

### Авторизация

Добавьте API Key проверку:

```javascript
// Check API Key (после Webhook)
const apiKey = $json.headers?.['x-api-key'] || $json.apiKey;
const validKey = process.env.API_KEYS?.split(',').includes(apiKey);

if (!validKey) {
  return {
    json: {
      success: false,
      error: 'Invalid API key',
      code: 'UNAUTHORIZED'
    }
  };
}
```

### Логирование

Добавьте Log узел после каждого важного шага:

```javascript
// Log calculation
console.log(JSON.stringify({
  event: 'human_design_calculated',
  birthDate: hd.birthDate,
  type: hd.type.name,
  timestamp: new Date().toISOString()
}));
```

### Email уведомления

Для важных событий:

```javascript
// After error
await sendEmail({
  to: 'admin@example.com',
  subject: 'HD Calculation Failed',
  body: `Error: ${error.message}\nRequest: ${JSON.stringify(request)}`
});
```

## Мониторинг

### Метрики

Добавьте сбор метрик:

```javascript
// After Format Output
await updateMetrics({
  calculations_total: 1,
  calculations_by_type: { [hd.type.name]: 1 },
  avg_gates_count: hd.gates.length
});
```

### Алерты

Настройте Slack/Telegram для критических ошибок:

```javascript
if (error.message.includes('Railway')) {
  await sendSlackMessage({
    channel: '#alerts',
    text: `🚨 Railway API failed for HD calculation`
  });
}
```

## Production настройки

### Переменные окружения

```env
RAILWAY_API_URL=https://balanced-generosity-test.up.railway.app
API_KEYS=key1,key2,key3
REDIS_URL=redis://localhost:6379
DB_CONNECTION_STRING=postgresql://...
SLACK_WEBHOOK=https://hooks.slack.com/...
LOG_LEVEL=info
```

### Error Handling

Всегда логируйте ошибки:

```javascript
try {
  // logic
} catch (error) {
  console.error('HD Calculation Error:', {
    error: error.message,
    stack: error.stack,
    input: $input.item.json,
    timestamp: new Date().toISOString()
  });
  throw error;
}
```

### Retry logic

Для Railway API:

```javascript
// Retry on failure
const maxRetries = 3;
let attempt = 0;

while (attempt < maxRetries) {
  try {
    const result = await callRailway();
    return result;
  } catch (error) {
    attempt++;
    if (attempt >= maxRetries) throw error;
    await sleep(1000 * attempt); // exponential backoff
  }
}
```

## Тестирование

### Unit тесты (в n8n)

Создайте тестовый workflow:

```javascript
// Test validate
const testCases = [
  { input: {}, expected: 'VALIDATION_ERROR' },
  { input: { birthDate: 'invalid' }, expected: 'INVALID_DATE' },
  { input: { birthDate: '1990-05-15', birthTime: '14:30', birthLocation: 'Москва' }, expected: 'success' }
];

for (const test of testCases) {
  const result = await validateInput(test.input);
  assert(result.code === test.expected);
}
```

## Дополнительные endpoints

### GET /health

```javascript
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'human-design-backend',
    railway: await checkRailwayHealth()
  });
});
```

### GET /types

```javascript
// Вернуть список всех типов Human Design
const types = [
  { name: 'Generator', ru_name: 'Генератор', strategy: 'Отвечать' },
  { name: 'Manifestor', ru_name: 'Манифестор', strategy: 'Информировать' },
  // ...
];
return types;
```

## Архитектура

```
┌─────────────┐
│   Client    │
└──────┬──────┘
       │
       ↓ HTTP POST
┌─────────────────┐
│  n8n Webhook    │ ◄─── API Key
└──────┬──────────┘
       │
       ↓
┌─────────────────┐
│ Validate Input  │ ◄─── Input validation
└──────┬──────────┘
       │
       ↓
┌──────────────────────────┐
│ Calculate Swiss Ephemeris│ ◄─── Railway API
└──────┬───────────────────┘
       │
       ↓
┌─────────────────┐
│  Enrich Data    │ ◄─── Add insights
└──────┬──────────┘
       │
       ↓
┌─────────────────┐
│ Format Output   │ ◄─── Format response
└──────┬──────────┘
       │
       ↓
┌─────────────────┐
│  Save to DB     │ ◄─── PostgreSQL (optional)
└──────┬──────────┘
       │
       ↓
┌─────────────────┐
│  Cache Result   │ ◄─── Redis (optional)
└──────┬──────────┘
       │
       ↓
┌─────────────────┐
│ Respond to Webhook
└─────────────────┘
```

## Рекомендации

1. **Используйте Railway** для Swiss Ephemeris (тяжелые расчеты)
2. **Держите бизнес-логику в n8n** (валидация, обогащение, форматирование)
3. **Добавьте кэширование** для частых запросов
4. **Логируйте все** для мониторинга
5. **Настройте алерты** для критических ошибок
6. **Добавьте rate limiting** для защиты от спама
7. **Используйте БД** для истории расчетов

## Примеры расширения

### Telegram Bot

Добавьте Telegram Trigger перед workflow:

```javascript
// Telegram command /hd
const message = $input.item.json.message.text;
const match = message.match(/(\d{4}-\d{2}-\d{2})\s+(\d{2}:\d{2})\s+(.+)/);

if (!match) {
  // Show help
  return { chat_id, text: 'Формат: /hd YYYY-MM-DD HH:MM Город' };
}

// Continue to main workflow
```

### Analytics Dashboard

После каждого расчета отправляйте в analytics:

```javascript
await fetch('https://analytics.example.com/events', {
  method: 'POST',
  body: JSON.stringify({
    event: 'hd_calculation',
    properties: {
      type: hd.type.name,
      profile: hd.profile.number,
      timestamp: Date.now()
    }
  })
});
```

## Поддержка

- См. `N8N_SETUP.md` для базовой интеграции
- См. `RAILWAY_DEPLOY.md` для настройки Railway
- См. `EXAMPLES.md` для примеров использования

