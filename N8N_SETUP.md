# Настройка n8n для работы с Railway

## Вариант 1: HTTP Request к Railway (рекомендуется)

### Шаг 1: Настройте переменную окружения в n8n

1. Откройте n8n settings
2. Перейдите в **Environment Variables**
3. Добавьте переменную:
   - **Name**: `RAILWAY_API_URL`
   - **Value**: `https://your-project.up.railway.app`

### Шаг 2: Импортируйте workflow

1. Откройте n8n
2. Нажмите **"+"** → **"Import from File"**
3. Выберите файл `n8n-workflow-railway.json` или `n8n-workflow-simple.json`
4. Workflow автоматически импортируется

### Шаг 3: Активируйте workflow

1. Нажмите **"Active"** в правом верхнем углу
2. Скопируйте Webhook URL

### Шаг 4: Тестирование

```bash
curl -X POST https://your-n8n-instance.com/webhook/human-design-railway \
  -H "Content-Type: application/json" \
  -d '{
    "birthDate": "1990-05-15",
    "birthTime": "14:30",
    "birthLocation": "Москва, Россия"
  }'
```

## Вариант 2: Ручная настройка Workflow

### Создайте workflow вручную

1. **Webhook Trigger**
   - Method: POST
   - Path: `/human-design`
   - Response Mode: "Respond to Webhook"

2. **HTTP Request Node**
   - URL: `https://your-project.up.railway.app/api/human-design`
   - Method: POST
   - Authentication: None
   - Send Body: Yes
   - Body:
     ```json
     {
       "birthDate": "{{ $json.birthDate }}",
       "birthTime": "{{ $json.birthTime }}",
       "birthLocation": "{{ $json.birthLocation }}"
     }
     ```

3. **IF Node** (опционально)
   - Check: `{{ $json.success }}`
   - Then: форматируйте успешный ответ
   - Else: форматируйте ошибку

4. **Code Node** (опционально)
   - Форматируйте ответ для красивого вывода

5. **Respond to Webhook**
   - Return the formatted response

## Вариант 3: Использование локального MCP Server

Если вы хотите использовать локальный MCP Server напрямую (без Railway):

### Шаг 1: Установите зависимости локально

```bash
cd /path/to/human_design
npm install
```

### Шаг 2: Запустите локальный HTTP Server

```bash
npm start
# Сервер запустится на http://localhost:3000
```

### Шаг 3: В n8n укажите локальный URL

В HTTP Request Node:
- URL: `http://localhost:3000/api/human-design`

### Шаг 4: Или используйте Code Node

```javascript
// В n8n Code Node
const { calculateHumanDesign } = require('/path/to/human_design/src/calculations-cjs.cjs');

const result = await calculateHumanDesign({
  birthDate: $input.item.json.birthDate,
  birthTime: $input.item.json.birthTime,
  birthLocation: $input.item.json.birthLocation,
});

return { json: result };
```

## Примеры использования

### Пример 1: Простой запрос

```javascript
// Webhook получает:
{
  "birthDate": "1990-05-15",
  "birthTime": "14:30",
  "birthLocation": "Москва"
}

// HTTP Request отправляет это на Railway
// Получает ответ и возвращает клиенту
```

### Пример 2: С валидацией

```javascript
// Code Node для валидации
const birthDate = $input.item.json.birthDate;
const birthTime = $input.item.json.birthTime;
const birthLocation = $input.item.json.birthLocation;

if (!birthDate || !birthTime || !birthLocation) {
  return {
    json: {
      success: false,
      error: "Missing required fields: birthDate, birthTime, birthLocation"
    }
  };
}

// Проверка формата даты
if (!birthDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
  return {
    json: {
      success: false,
      error: "Invalid date format. Use YYYY-MM-DD"
    }
  };
}

// Проверка формата времени
if (!birthTime.match(/^\d{2}:\d{2}$/)) {
  return {
    json: {
      success: false,
      error: "Invalid time format. Use HH:MM"
    }
  };
}

return { json: $input.item.json };
```

### Пример 3: С форматированием

```javascript
// Format Response Code Node
const hd = $input.item.json.data;

const result = {
  type: hd.type.ru_name,
  strategy: hd.strategy,
  authority: hd.authority.ru_name,
  profile: hd.profile.number,
  gates: hd.gates.map(g => ({
    planet: g.planet,
    gate: `${g.gate} (${g.ru_name || g.name})`,
    line: g.line
  })),
  summary: `${hd.type.ru_name} с профилем ${hd.profile.number}. Стратегия: ${hd.strategy}`
};

return { json: result };
```

### Пример 4: Сохранение в базу данных

Добавьте Node после получения данных от Railway:

1. **PostgreSQL/MySQL Node**
   - Connect to your database
   - Insert Human Design data
   - Store: type, strategy, profile, gates as JSON

```sql
INSERT INTO human_design_charts 
(user_id, birth_date, birth_time, birth_location, type, strategy, authority, profile, gates, created_at)
VALUES 
(
  {{ $json.userId }},
  {{ $json.birthDate }},
  {{ $json.birthTime }},
  {{ $json.birthLocation }},
  {{ $json.data.type.name }},
  {{ $json.data.strategy }},
  {{ $json.data.authority.name }},
  {{ $json.data.profile.number }},
  '{{ JSON.stringify($json.data.gates) }}',
  NOW()
);
```

## Интеграция с Telegram Bot

### Workflow для Telegram бота

1. **Telegram Trigger**
   - Command: `/hd` или `/human-design`

2. **Prompt Node** или **Code Node**
   - Запрашивать: birthDate, birthTime, birthLocation

3. **HTTP Request к Railway**

4. **Format Response**

5. **Telegram Send Message**
   - Отправить отформатированный результат

Пример кода:

```javascript
// Вызов Railway через HTTP Request
const railwayUrl = process.env.RAILWAY_API_URL || 'https://your-project.up.railway.app';
const response = await fetch(`${railwayUrl}/api/human-design`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    birthDate: $input.item.json.birthDate,
    birthTime: $input.item.json.birthTime,
    birthLocation: $input.item.json.birthLocation,
  }),
});

const result = await response.json();
return { json: result.data };
```

## Обработка ошибок

### Рекомендуемая структура

```javascript
try {
  // HTTP Request к Railway
  const railwayResponse = $input.item.json;
  
  if (!railwayResponse.success) {
    // Обработка ошибки от Railway
    return {
      json: {
        success: false,
        error: railwayResponse.error,
        source: 'Railway API'
      }
    };
  }
  
  // Успех
  return {
    json: {
      success: true,
      data: railwayResponse.data
    }
  };
  
} catch (error) {
  // Обработка исключений
  return {
    json: {
      success: false,
      error: error.message,
      source: 'n8n workflow'
    }
  };
}
```

## Мониторинг и логирование

### Добавьте Log Node для отладки

1. После каждого важного шага добавьте **"Log"** node
2. Логируйте входные и выходные данные
3. Используйте для отладки в production

### Настройте алерты

1. **IF Node** для проверки ошибок
2. **Send Email** или **Slack** для уведомлений
3. **Webhook** для отправки в систему мониторинга

## Оптимизация

### Кэширование

Добавьте кэширование для повторяющихся запросов:

1. **Redis Node** или **Database Node**
2. Ключ: `birthDate+birthTime+birthLocation`
3. TTL: 24 часа

### Rate Limiting

Добавьте защиту от спама:

```javascript
// Rate limit check
const userId = $json.user.id || 'anonymous';
const key = `rate_limit:${userId}`;
const count = await redis.get(key);

if (count && count > 10) {
  return {
    json: {
      success: false,
      error: "Rate limit exceeded. Please try again later."
    }
  };
}

await redis.incr(key);
await redis.expire(key, 3600); // 1 hour
```

## Тестирование

### Unit тесты для workflow

1. Создайте тестовый workflow
2. Используйте статические данные
3. Проверяйте каждый node отдельно

### Production тестирование

```bash
# Health check
curl https://your-project.up.railway.app/health

# Полный тест
curl -X POST https://your-n8n-instance.com/webhook/human-design-railway \
  -H "Content-Type: application/json" \
  -d '{
    "birthDate": "1990-05-15",
    "birthTime": "14:30",
    "birthLocation": "Москва"
  }'
```

## Troubleshooting

### Проблема: Railway недоступен

**Решение:**
- Проверьте что Railway деплой успешен
- Проверьте logs в Railway Dashboard
- Убедитесь что URL правильный

### Проблема: Timeout в n8n

**Решение:**
- Увеличьте timeout в HTTP Request node
- Railway может быть медленным при первой загрузке
- Добавьте retry logic

### Проблема: Некорректный ответ

**Решение:**
- Добавьте Log node после Railway API
- Проверьте формат данных
- Убедитесь что Railway возвращает JSON

## Дополнительные ресурсы

- [n8n Documentation](https://docs.n8n.io)
- [Railway Deployment Guide](RAILWAY_DEPLOY.md)
- [Human Design API](https://github.com/dvvolkovv/MCP_Human_design)

## Пример полного workflow

См. файлы:
- `n8n-workflow-railway.json` - полная версия с ошибками
- `n8n-workflow-simple.json` - упрощенная версия
- `n8n-example-workflow.json` - локальная версия

