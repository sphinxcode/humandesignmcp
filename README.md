# Human Design MCP Server

MCP Server для расчета карты Human Design по дате, времени и месту рождения. Совместим с n8n и другими системами, поддерживающими Model Context Protocol.

## Описание

Этот сервер предоставляет инструменты для расчета Human Design карты, включая:
- Определение типа (Manifestor, Generator, Manifesting Generator, Projector, Reflector)
- Вычисление стратегии и авторитета
- Расчет профиля
- Определение активных ворот (gates) и их линий
- Определение определенных центров
- Расчет Incarnation Cross

## Установка

### Требования

- Node.js >= 18.0.0
- npm или yarn

### Установка зависимостей

```bash
cd human_design
npm install
```

### Сборка

```bash
npm run build
```

## Использование

### Запуск сервера

**HTTP Server (для Railway/n8n):**
```bash
npm start
```

**MCP Server (через stdio):**
```bash
npm run start:mcp
```

> 📚 Сервер использует Swiss Ephemeris для точных расчетов

HTTP сервер работает на порту 3000 (или PORT из env) и готов принимать запросы.

### Инструменты сервера

#### 1. calculate_human_design

Рассчитывает полную карту Human Design.

**Параметры:**
- `birthDate` (string, обязательный): Дата рождения в формате YYYY-MM-DD
- `birthTime` (string, обязательный): Время рождения в формате HH:MM
- `birthLocation` (string, обязательный): Место рождения (город, страна)
- `latitude` (number, опциональный): Широта места рождения
- `longitude` (number, опциональный): Долгота места рождения

**Пример запроса:**

```json
{
  "name": "calculate_human_design",
  "arguments": {
    "birthDate": "1990-05-15",
    "birthTime": "14:30",
    "birthLocation": "Москва, Россия",
    "latitude": 55.7558,
    "longitude": 37.6173
  }
}
```

**Пример ответа:**

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
      "number": 19,
      "name": "Approach",
      "line": 2,
      "planet": "Sun"
    },
    {
      "number": 49,
      "name": "Revolution",
      "line": 4,
      "planet": "Earth"
    }
  ],
  "definedCenters": [
    {
      "number": 2,
      "name": "Sacral Center"
    }
  ],
  "incarnationCross": {
    "sunGate": 19,
    "earthGate": 19,
    "cross": "Cross of 19 / 19"
  }
}

```

#### 2. get_human_design_definition

Получить определения и значения компонентов Human Design.

**Параметры:**
- `component` (string, обязательный): Компонент для определения
  - `type` - Типы Human Design
  - `authority` - Авторитеты
  - `profile` - Профили
  - `gates` - Ворота
  - `channels` - Каналы
  - `centers` - Центры

**Пример запроса:**

```json
{
  "name": "get_human_design_definition",
  "arguments": {
    "component": "type"
  }
}
```

## Интеграция с n8n

### Метод 1: Использование HTTP Request Node

Создайте веб-обертку для MCP сервера:

```javascript
// wrapper-server.js
import express from 'express';
import { spawn } from 'child_process';
import readline from 'readline';

const app = express();
app.use(express.json());

app.post('/calculate', async (req, res) => {
  const mcpServer = spawn('node', ['index.js']);
  
  const rl = readline.createInterface({
    input: mcpServer.stdout,
    output: mcpServer.stdin,
  });
  
  // Отправка MCP запроса
  const request = {
    jsonrpc: '2.0',
    id: 1,
    method: 'tools/call',
    params: {
      name: 'calculate_human_design',
      arguments: req.body,
    },
  };
  
  mcpServer.stdin.write(JSON.stringify(request) + '\n');
  
  // Чтение ответа
  rl.once('line', (response) => {
    const result = JSON.parse(response);
    res.json(result.result);
  });
});

app.listen(3000, () => {
  console.log('MCP wrapper server running on port 3000');
});
```

Затем используйте в n8n HTTP Request Node:
- Method: POST
- URL: `http://localhost:3000/calculate`
- Body: `{"birthDate": "...", "birthTime": "...", "birthLocation": "..."}`

### Метод 2: Использование Function Node в n8n

В n8n используйте Function Node с прямым вызовом модуля:

```javascript
const { calculateHumanDesign } = require('/path/to/human_design/src/calculations.js');

// Получить данные из предыдущего узла
const birthDate = $input.item.json.birthDate;
const birthTime = $input.item.json.birthTime;
const birthLocation = $input.item.json.birthLocation;

// Рассчитать Human Design
const result = await calculateHumanDesign({
  birthDate,
  birthTime,
  birthLocation,
});

return {
  json: {
    ...result,
    timestamp: new Date().toISOString(),
  }
};
```

### Метод 3: Использование Sub-workflow

Создайте отдельный workflow в n8n:

1. Webhook Trigger для входящих запросов
2. Function Node с расчетом Human Design
3. HTTP Response Node для отправки результата

**workflow-json:**
```json
{
  "name": "Human Design Calculator",
  "nodes": [
    {
      "parameters": {},
      "name": "Webhook",
      "type": "n8n-nodes-base.webhook",
      "position": [250, 300]
    },
    {
      "parameters": {
        "jsCode": "const { calculateHumanDesign } = require('/path/to/human_design/src/calculations.js');\n\nconst result = await calculateHumanDesign({\n  birthDate: $input.item.json.birthDate,\n  birthTime: $input.item.json.birthTime,\n  birthLocation: $input.item.json.birthLocation,\n});\n\nreturn { json: result };"
      },
      "name": "Calculate HD",
      "type": "n8n-nodes-base.function",
      "position": [450, 300]
    },
    {
      "parameters": {},
      "name": "Respond to Webhook",
      "type": "n8n-nodes-base.respondToWebhook",
      "position": [650, 300]
    }
  ],
  "connections": {
    "Webhook": { "main": [[{ "node": "Calculate HD", "type": "main", "index": 0 }]] },
    "Calculate HD": { "main": [[{ "node": "Respond to Webhook", "type": "main", "index": 0 }]] }
  }
}
```

## Интеграция с другими системами

### Claude Desktop

Добавьте сервер в конфигурацию Claude Desktop:

```json
{
  "mcpServers": {
    "human-design": {
      "command": "node",
      "args": ["/absolute/path/to/human_design/index.js"]
    }
  }
}
```

### Custom MCP Client

Пример использования в Node.js:

```javascript
import { spawn } from 'child_process';
import readline from 'readline';

const mcpServer = spawn('node', ['index.js']);

const rl = readline.createInterface({
  input: mcpServer.stdout,
  output: mcpServer.stdin,
});

async function calculateHumanDesign(birthDate, birthTime, birthLocation) {
  const request = {
    jsonrpc: '2.0',
    id: 1,
    method: 'tools/call',
    params: {
      name: 'calculate_human_design',
      arguments: {
        birthDate,
        birthTime,
        birthLocation,
      },
    },
  };
  
  mcpServer.stdin.write(JSON.stringify(request) + '\n');
  
  return new Promise((resolve, reject) => {
    rl.once('line', (response) => {
      const result = JSON.parse(response);
      if (result.error) {
        reject(new Error(result.error.message));
      } else {
        resolve(result.result);
      }
    });
  });
}

// Использование
const result = await calculateHumanDesign('1990-05-15', '14:30', 'Москва, Россия');
console.log(result);
```

## Структура проекта

```
human_design/
├── http-server.js              # HTTP Server для Railway/n8n
├── index-with-swiss.js         # MCP Server через stdio
├── package.json                # Зависимости проекта
├── README.md                   # Документация
├── QUICKSTART.md              # Быстрый старт
├── RAILWAY_DEPLOY.md          # Инструкция по деплою на Railway
├── N8N_SETUP.md              # Интеграция с n8n
└── src/
    └── calculations-cjs.cjs   # Расчеты Human Design (Swiss Ephemeris)
```

## Разработка

### Запуск в режиме разработки

```bash
npm run dev
```

Сервер будет перезагружаться автоматически при изменении файлов.

### Тестирование

Для тестирования отправьте MCP запрос:

```bash
echo '{"jsonrpc": "2.0", "id": 1, "method": "tools/list"}' | node index.js
```

## Лицензия

MIT

## Поддержка

Для вопросов и предложений создайте issue в репозитории проекта.

## Примечания

- Human Design использует тропический зодиак (не сидерический, как в ведической астрологии)
- Расчеты основаны на Swiss Ephemeris для точности позиций планет
- Проект использует только Swiss Ephemeris версию с точными расчетами
- Требуется компиляция нативных модулей при установке

## Требования для установки Swiss Ephemeris

Для компиляции Swiss Ephemeris требуются build tools:

**macOS:**
```bash
xcode-select --install
```

**Ubuntu/Debian:**
```bash
sudo apt-get update
sudo apt-get install build-essential python3
```

**Windows:**
Установите [Visual Studio Build Tools](https://visualstudio.microsoft.com/downloads/)

См. [SWISS_EPHEMERIS.md](SWISS_EPHEMERIS.md) для детальной информации о установке.

