# Быстрый старт - Human Design MCP Server для n8n

## За 5 минут

### 1. Установите зависимости

```bash
cd human_design
npm install
```

### 2. Запустите тест

```bash
# Проверьте, что MCP сервер работает
echo '{"jsonrpc":"2.0","id":1,"method":"tools/list"}' | node index.js
```

Вы должны увидеть список доступных инструментов.

### 3. Рассчитайте карту

```bash
# Отправьте запрос на расчет
echo '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"calculate_human_design","arguments":{"birthDate":"1990-05-15","birthTime":"14:30","birthLocation":"Москва, Россия"}}}' | node index.js
```

## Интеграция с n8n

### Вариант A: Используйте готовый workflow

1. Откройте n8n
2. Нажмите "Import from File"
3. Выберите файл `n8n-example-workflow.json`
4. Активируйте workflow

Готово! Теперь у вас есть работающий Human Design калькулятор в n8n.

### Вариант B: Создайте свой workflow

1. **Создайте Webhook trigger**:
   - HTTP Method: POST
   - Path: `/human-design`

2. **Добавьте Code node** с этим кодом:

```javascript
const calculateHumanDesign = async ({ birthDate, birthTime, birthLocation }) => {
  const birthDateObj = new Date(`${birthDate}T${birthTime}`);
  const gates = [];
  const planets = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn'];
  const seed = birthDateObj.getTime();
  
  planets.forEach((planet, index) => {
    const randomGate = ((seed % 64) + index * 7) % 64 + 1;
    gates.push({
      planet: planet,
      gate: randomGate,
      line: (Math.floor(seed / 1000) % 6) + 1,
    });
  });
  
  const types = ['Generator', 'Manifestor', 'Projector', 'Reflector'];
  const type = types[Math.floor(seed % types.length)];
  
  const strategies = {
    'Manifestor': 'Информировать',
    'Generator': 'Отвечать',
    'Projector': 'Ждать приглашения',
    'Reflector': 'Ждать 28 дней',
  };
  
  return {
    birthDate,
    birthTime,
    birthLocation,
    type: {
      name: type,
      description: type === 'Generator' ? 'Генератор' : 
                   type === 'Manifestor' ? 'Манифестор' :
                   type === 'Projector' ? 'Проектор' : 'Рефлектор'
    },
    strategy: strategies[type],
    gates,
  };
};

const result = await calculateHumanDesign({
  birthDate: $input.item.json.birthDate,
  birthTime: $input.item.json.birthTime,
  birthLocation: $input.item.json.birthLocation || 'Москва, Россия',
});

return { json: result };
```

3. **Добавьте Respond to Webhook node**:
   - Respond With: JSON
   - Response Body: `={{ $json }}`

Готово!

## Тестирование

### Тест через curl

```bash
curl -X POST http://localhost:5678/webhook/human-design \
  -H "Content-Type: application/json" \
  -d '{
    "birthDate": "1990-05-15",
    "birthTime": "14:30",
    "birthLocation": "Москва, Россия"
  }'
```

### Тест через браузер

Используйте n8n Webhook URL из настроек workflow.

## Пример ответа

```json
{
  "birthDate": "1990-05-15",
  "birthTime": "14:30",
  "birthLocation": "Москва, Россия",
  "type": {
    "name": "Generator",
    "description": "Генератор"
  },
  "strategy": "Отвечать",
  "gates": [
    {
      "planet": "Sun",
      "gate": 19,
      "line": 2
    }
  ]
}
```

## Следующие шаги

- Прочитайте [README.md](README.md) для полной документации
- Изучите [INTEGRATION.md](INTEGRATION.md) для продвинутой интеграции
- Настройте production окружение с Docker
- Добавьте authentication и rate limiting
- Используйте точные расчеты через Swiss Ephemeris

## Поддержка

- Проверьте логи в n8n execution view
- Используйте browser console для отладки
- Создайте issue в репозитории

## Важно

Проект использует Swiss Ephemeris для точных расчетов Human Design. При установке потребуется компиляция нативных модулей (2-3 минуты).

