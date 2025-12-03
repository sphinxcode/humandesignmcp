# 🚀 Быстрая публикация на GitHub

## Способ 1: Автоматический (рекомендуется)

```bash
cd /Users/dmitry/Downloads/human_design
./deploy-to-github.sh YOUR_GITHUB_USERNAME
```

Готово! Скрипт создаст и запушит всё автоматически.

## Способ 2: Вручную

### 1. Создайте репозиторий на GitHub

Откройте: https://github.com/new

- **Name**: `human-design-mcp-server`
- **Description**: `MCP Server for Human Design calculations compatible with n8n`
- **Public** или **Private**
- **НЕ** добавляйте README, .gitignore, license (они уже есть!)

Нажмите **"Create repository"**

### 2. Выполните команды

```bash
cd /Users/dmitry/Downloads/human_design

# Добавьте remote (замените YOUR_USERNAME на ваш username)
git remote add origin https://github.com/YOUR_USERNAME/human-design-mcp-server.git

# Убедитесь что branch называется main
git branch -M main

# Загрузите код
git push -u origin main
```

### 3. Проверьте результат

Откройте: https://github.com/YOUR_USERNAME/human-design-mcp-server

Все файлы должны быть там!

## Способ 3: Через GitHub CLI

Если установлен `gh`:

```bash
cd /Users/dmitry/Downloads/human_design
gh repo create human-design-mcp-server --public --source=. --remote=origin --push
```

## Создание релиза

После успешного push создайте первый релиз:

```bash
git tag -a v1.0.0 -m "First release: Human Design MCP Server"
git push origin v1.0.0
```

Затем на GitHub:
1. Откройте **Releases** → **Create a new release**
2. Выберите тег **v1.0.0**
3. Название: **"Human Design MCP Server v1.0.0"**
4. Описание: используйте текст из SUMMARY.md
5. Нажмите **"Publish release"**

## Проверьте автора коммитов

Если нужно изменить имя и email:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Исправить последние коммиты
git commit --amend --reset-author --no-edit
git push -f origin main
```

## Дальнейшая работа

Теперь для обновления кода:

```bash
git add .
git commit -m "Описание изменений"
git push
```

---

**Проблемы?** Смотрите GITHUB_SETUP.md для детальной инструкции.

