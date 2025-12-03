#!/bin/bash

# Скрипт для публикации Human Design MCP Server на GitHub
# Использование: ./deploy-to-github.sh YOUR_USERNAME

if [ -z "$1" ]; then
    echo "Ошибка: Укажите ваш GitHub username"
    echo "Использование: ./deploy-to-github.sh YOUR_USERNAME"
    exit 1
fi

USERNAME=$1
REPO_NAME="human-design-mcp-server"
REMOTE_URL="https://github.com/${USERNAME}/${REPO_NAME}.git"

echo "🚀 Публикация Human Design MCP Server на GitHub..."
echo "📦 Репозиторий: ${REPO_NAME}"
echo "👤 Пользователь: ${USERNAME}"
echo ""

# Проверяем, есть ли уже remote
if git remote | grep -q "^origin$"; then
    echo "⚠️  Remote 'origin' уже существует"
    read -p "Заменить? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git remote set-url origin $REMOTE_URL
        echo "✅ Remote обновлен"
    fi
else
    echo "➕ Добавление remote..."
    git remote add origin $REMOTE_URL
    echo "✅ Remote добавлен"
fi

# Проверяем branch
BRANCH=$(git branch --show-current)
if [ "$BRANCH" != "main" ]; then
    echo "🔄 Переименование branch в main..."
    git branch -M main
    echo "✅ Branch переименован"
fi

# Push
echo "⬆️  Загрузка на GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 Успешно!"
    echo "📂 Откройте: https://github.com/${USERNAME}/${REPO_NAME}"
    echo ""
    echo "Для создания релиза выполните:"
    echo "  git tag -a v1.0.0 -m \"First release\""
    echo "  git push origin v1.0.0"
else
    echo ""
    echo "❌ Ошибка при загрузке"
    echo "Возможные причины:"
    echo "  1. Репозиторий еще не создан на GitHub"
    echo "  2. Неправильные credentials"
    echo "  3. Проблемы с доступом"
    echo ""
    echo "Сначала создайте репозиторий на GitHub:"
    echo "  https://github.com/new"
fi

