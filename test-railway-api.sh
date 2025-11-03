#!/bin/bash

# Скрипт для тестирования Railway API
# Использование: ./test-railway-api.sh [RAILWAY_URL]

RAILWAY_URL=${1:-"https://your-project.up.railway.app"}

echo "🧪 Тестирование Railway API: $RAILWAY_URL"
echo ""

# Health check
echo "1️⃣  Health Check:"
curl -s "$RAILWAY_URL/health" | jq .
echo ""
echo "---"
echo ""

# Human Design расчет
echo "2️⃣  Human Design Calculation:"
curl -s -X POST "$RAILWAY_URL/api/human-design" \
  -H "Content-Type: application/json" \
  -d '{
    "birthDate": "1990-05-15",
    "birthTime": "14:30",
    "birthLocation": "Москва, Россия"
  }' | jq .

echo ""
echo "✅ Тестирование завершено!"

