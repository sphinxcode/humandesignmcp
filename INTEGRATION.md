# Интеграция Human Design MCP Server с n8n

## Вариант 1: Использование MCP Server напрямую

### Шаг 1: Установите зависимости

```bash
cd human_design
npm install
```

### Шаг 2: Настройте MCP сервер

Создайте файл конфигурации для вашего MCP клиента (например, для Claude Desktop):

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

### Шаг 3: Используйте через MCP клиент

MCP сервер будет доступен через любой MCP-совместимый клиент.

## Вариант 2: Использование через HTTP API

### Создайте HTTP обертку

Создайте файл `http-wrapper.js`:

```javascript
import express from 'express';
import { spawn } from 'child_process';
import readline from 'readline';

const app = express();
app.use(express.json());

app.post('/calculate', async (req, res) => {
  try {
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
    rl.once('line', (line) => {
      const result = JSON.parse(line);
      if (result.result) {
        res.json(result.result);
      } else {
        res.status(500).json({ error: result.error });
      }
    });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Human Design API server running on http://localhost:3000');
});
```

Запустите обертку:

```bash
node http-wrapper.js
```

### Используйте в n8n

В n8n создайте workflow с HTTP Request node:

1. **Trigger**: Webhook или Manual
2. **HTTP Request Node**:
   - Method: POST
   - URL: `http://localhost:3000/calculate`
   - Body Type: JSON
   - Body:
     ```json
     {
       "birthDate": "{{ $json.birthDate }}",
       "birthTime": "{{ $json.birthTime }}",
       "birthLocation": "{{ $json.birthLocation }}"
     }
     ```

## Вариант 3: Прямая интеграция через Code Node

### Импорт через файловую систему

Если n8n запущен локально и установлены build tools:

```javascript
const { calculateHumanDesign } = require('/path/to/human_design/src/calculations-cjs.cjs');

const result = await calculateHumanDesign({
  birthDate: $input.item.json.birthDate,
  birthTime: $input.item.json.birthTime,
  birthLocation: $input.item.json.birthLocation,
});

return { json: result };
```

**Примечание:** Для n8n рекомендуется использовать HTTP API через Railway, чтобы избежать проблем с компиляцией Swiss Ephemeris на сервере n8n.

## Вариант 4: Использование готового workflow

Импортируйте файл `n8n-example-workflow.json` в n8n:

1. Откройте n8n
2. Нажмите "Import from File"
3. Выберите `n8n-example-workflow.json`
4. Активируйте workflow
5. Используйте Webhook URL для отправки запросов

### Пример запроса к Webhook:

```bash
curl -X POST http://your-n8n-instance/webhook/human-design \
  -H "Content-Type: application/json" \
  -d '{
    "birthDate": "1990-05-15",
    "birthTime": "14:30",
    "birthLocation": "Москва, Россия"
  }'
```

## Тестирование

### Тест MCP сервера напрямую

```bash
echo '{"jsonrpc":"2.0","id":1,"method":"tools/list"}' | node index.js
```

### Тест HTTP обертки

```bash
curl -X POST http://localhost:3000/calculate \
  -H "Content-Type: application/json" \
  -d '{
    "birthDate": "1990-05-15",
    "birthTime": "14:30",
    "birthLocation": "Москва, Россия"
  }'
```

### Тест n8n workflow

Откройте Webhook в браузере или используйте curl:

```bash
curl -X POST https://your-n8n-instance/webhook/human-design \
  -H "Content-Type: application/json" \
  -d '{
    "birthDate": "1990-05-15",
    "birthTime": "14:30",
    "birthLocation": "Москва, Россия"
  }'
```

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
      "line": 2
    },
    {
      "planet": "Moon",
      "gate": 49,
      "line": 4
    }
  ]
}
```

## Production настройки

### Использование Docker

Создайте `Dockerfile`:

```dockerfile
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "http-wrapper.js"]
```

Соберите и запустите:

```bash
docker build -t human-design-server .
docker run -p 3000:3000 human-design-server
```

### Использование Environment Variables

Создайте `.env` файл:

```
PORT=3000
NODE_ENV=production
```

Используйте в коде:

```javascript
const port = process.env.PORT || 3000;
app.listen(port);
```

## Безопасность

- Добавьте authentication для production
- Используйте HTTPS
- Ограничьте rate limiting
- Валидируйте входные данные
- Логируйте все запросы

## Мониторинг

Добавьте health check endpoint:

```javascript
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
```

## Проблемы и решения

### Ошибка: Cannot find module '@modelcontextprotocol/sdk'

```bash
npm install @modelcontextprotocol/sdk
```

### Ошибка: spawn ENOENT

Убедитесь, что путь к `node` правильный:

```bash
which node
```

### Ошибка времени выполнения в n8n

Убедитесь, что используете правильную версию Node.js (>= 18).

## Дополнительные ресурсы

- [MCP Documentation](https://modelcontextprotocol.io)
- [n8n Documentation](https://docs.n8n.io)
- [Human Design System](https://www.humandesign.me)

