# Примеры использования Human Design MCP Server

## Пример 1: Простой расчет через MCP

```javascript
// MCP запрос
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "calculate_human_design",
    "arguments": {
      "birthDate": "1990-05-15",
      "birthTime": "14:30",
      "birthLocation": "Москва, Россия",
      "latitude": 55.7558,
      "longitude": 37.6173
    }
  }
}

// Ответ
{
  "birthDate": "1990-05-15",
  "birthTime": "14:30",
  "birthLocation": "Москва, Россия",
  "type": {
    "name": "Generator",
    "description": "Генератор"
  },
  "strategy": "Отвечать",
  "authority": {
    "name": "Sacral",
    "description": "Сакральная авторитет"
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
      "ru_name": "Подход"
    }
  ]
}
```

## Пример 2: Интеграция с n8n Webhook

### Шаг 1: Создайте workflow в n8n

1. Webhook Trigger: POST /human-design
2. Code Node: Расчет Human Design
3. Respond to Webhook: Вернуть результат

### Шаг 2: Отправьте запрос

```bash
curl -X POST http://localhost:5678/webhook/human-design \
  -H "Content-Type: application/json" \
  -d '{
    "birthDate": "1995-03-20",
    "birthTime": "10:15",
    "birthLocation": "Санкт-Петербург, Россия"
  }'
```

### Шаг 3: Получите ответ

```json
{
  "birthDate": "1995-03-20",
  "birthTime": "10:15",
  "birthLocation": "Санкт-Петербург, Россия",
  "type": {
    "name": "Manifestor",
    "description": "Манифестор"
  },
  "strategy": "Информировать",
  "authority": {
    "name": "Emotional",
    "description": "Эмоциональная авторитет"
  }
}
```

## Пример 3: Использование в Telegram боте

### Создайте n8n workflow:

**Node 1: Telegram Trigger**
- Configure Telegram bot
- Command: `/human-design`

**Node 2: Function**
```javascript
// Извлечь данные из сообщения
const text = $input.item.json.message.text;
const match = text.match(/(\d{4}-\d{2}-\d{2})\s+(\d{2}:\d{2})\s+(.+)/);

if (!match) {
  return {
    json: {
      error: true,
      message: 'Формат: /human-design YYYY-MM-DD HH:MM Город'
    }
  };
}

const [, birthDate, birthTime, birthLocation] = match;

// Вызвать subworkflow для расчета
const subworkflowResult = await $this.subworkflow({
  name: 'human-design-calculator',
  data: { birthDate, birthTime, birthLocation }
});

return {
  json: subworkflowResult
};
```

**Node 3: Telegram Send Message**
```javascript
const { type, strategy, authority, profile } = $input.item.json;

const message = `
🎋 Ваш Human Design:

✨ Тип: ${type.description} (${type.name})
🎯 Стратегия: ${strategy}
💪 Авторитет: ${authority.description}
📊 Профиль: ${profile.number}

${$input.item.json.gates.map(gate => 
  `• ${gate.planet}: Ворота ${gate.gate} Линия ${gate.line}`
).join('\n')}
`;

return {
  json: {
    chat_id: $input.item.json.message.chat.id,
    text: message,
    parse_mode: 'Markdown'
  }
};
```

## Пример 4: Batch обработка

### Обработка списка людей

```javascript
const people = [
  { name: 'Иван', birthDate: '1990-05-15', birthTime: '14:30', birthLocation: 'Москва' },
  { name: 'Мария', birthDate: '1992-08-22', birthTime: '08:00', birthLocation: 'СПб' },
];

const results = await Promise.all(
  people.map(async (person) => {
    const hd = await calculateHumanDesign({
      birthDate: person.birthDate,
      birthTime: person.birthTime,
      birthLocation: person.birthLocation,
    });
    
    return {
      name: person.name,
      type: hd.type.name,
      strategy: hd.strategy,
    };
  })
);

return {
  json: results
};
```

## Пример 5: Интеграция с CRM

### Сохранение результатов в базу данных

**n8n Workflow:**

1. **Webhook** - Получить данные рождения
2. **Calculate HD** - Рассчитать Human Design
3. **Postgres INSERT** - Сохранить результаты

```sql
INSERT INTO human_design_charts 
(name, birth_date, birth_time, birth_location, hd_type, strategy, authority, profile, gates)
VALUES 
(
  '{{ $json.name }}',
  '{{ $json.birthDate }}',
  '{{ $json.birthTime }}',
  '{{ $json.birthLocation }}',
  '{{ $json.type.name }}',
  '{{ $json.strategy }}',
  '{{ $json.authority.name }}',
  '{{ $json.profile.number }}',
  '{{ JSON.stringify($json.gates) }}'
);
```

## Пример 6: Генерация отчета

```javascript
const { type, strategy, authority, profile, gates } = $input.item.json;

const report = `
# Human Design Отчет

## Основные данные
- Дата рождения: ${$input.item.json.birthDate}
- Время рождения: ${$input.item.json.birthTime}
- Место рождения: ${$input.item.json.birthLocation}

## Ваш тип
**${type.description} (${type.name})**

${type.description === 'Генератор' ? 
  'Вы обладаете устойчивой жизненной силой и сакральной энергией. Ваша стратегия - отвечать на вопросы жизни и работы.' :
  ''}

## Ваша стратегия
**${strategy}**

Это ваш способ правильного взаимодействия с жизнью и принятия решений.

## Ваша авторитетность
**${authority.description}**

Слушайте этот центр для принятия решений.

## Ваш профиль
**${profile.number}**

Профиль показывает, как вы выражаете себя в мире.

## Активированные ворота
${gates.map(gate => `- **${gate.planet}**: Ворота ${gate.gate} (${gate.ru_name}), Линия ${gate.line}`).join('\n')}

---
*Этот отчет создан автоматически. Для детального анализа проконсультируйтесь с сертифицированным аналитиком Human Design.*
`;

return {
  json: {
    report,
    pdf: await generatePDF(report),
  }
};
```

## Пример 7: RESTful API wrapper

```javascript
// api-server.js
import express from 'express';
import cors from 'cors';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { calculateHumanDesign } = require('./src/calculations-cjs.cjs');

const app = express();
app.use(cors());
app.use(express.json());

// POST /api/human-design
app.post('/api/human-design', async (req, res) => {
  try {
    const { birthDate, birthTime, birthLocation } = req.body;
    
    if (!birthDate || !birthTime) {
      return res.status(400).json({
        error: 'birthDate and birthTime are required'
      });
    }
    
    const result = await calculateHumanDesign({
      birthDate,
      birthTime,
      birthLocation,
    });
    
    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// GET /api/types
app.get('/api/types', (req, res) => {
  res.json({
    success: true,
    data: [
      { name: 'Generator', description: 'Генератор' },
      { name: 'Manifestor', description: 'Манифестор' },
      { name: 'Projector', description: 'Проектор' },
      { name: 'Reflector', description: 'Рефлектор' },
      { name: 'Manifesting Generator', description: 'Манифестирующий Генератор' },
    ]
  });
});

app.listen(3000, () => {
  console.log('API server running on http://localhost:3000');
});
```

Использование:

```bash
curl -X POST http://localhost:3000/api/human-design \
  -H "Content-Type: application/json" \
  -d '{
    "birthDate": "1990-05-15",
    "birthTime": "14:30",
    "birthLocation": "Москва"
  }'
```

## Пример 8: Совместимость двух карт

```javascript
const person1 = {
  birthDate: '1990-05-15',
  birthTime: '14:30',
  birthLocation: 'Москва',
};

const person2 = {
  birthDate: '1992-08-22',
  birthTime: '10:00',
  birthLocation: 'СПб',
};

const hd1 = await calculateHumanDesign(person1);
const hd2 = await calculateHumanDesign(person2);

// Проверка совместимости типов
const compatible = checkCompatibility(hd1, hd2);

function checkCompatibility(hd1, hd2) {
  // Generator + Generator = хорошо
  if (hd1.type.name === 'Generator' && hd2.type.name === 'Generator') {
    return { score: 8, message: 'Отличная совместимость' };
  }
  
  // Manifestor + Generator = хорошо
  if (hd1.type.name === 'Manifestor' && hd2.type.name === 'Generator') {
    return { score: 9, message: 'Отличная совместимость' };
  }
  
  // Projector + Generator = идеально
  if (hd1.type.name === 'Projector' && hd2.type.name === 'Generator') {
    return { score: 10, message: 'Идеальная совместимость' };
  }
  
  return { score: 5, message: 'Нейтральная совместимость' };
}

return {
  json: {
    person1: {
      name: hd1.type.name,
      strategy: hd1.strategy,
    },
    person2: {
      name: hd2.type.name,
      strategy: hd2.strategy,
    },
    compatibility: compatible,
  }
};
```

## Дополнительные примеры

Смотрите также:
- [QUICKSTART.md](QUICKSTART.md) - Быстрый старт
- [README.md](README.md) - Полная документация
- [INTEGRATION.md](INTEGRATION.md) - Интеграция

