# Настройка GitHub репозитория

## Шаг 1: Создайте репозиторий на GitHub

1. Откройте [GitHub](https://github.com) и войдите в свой аккаунт
2. Нажмите кнопку **"New"** или **"+"** в правом верхнем углу
3. Выберите **"New repository"**
4. Заполните форму:
   - **Repository name**: `human-design-mcp-server`
   - **Description**: `MCP Server for Human Design calculations compatible with n8n`
   - **Public** или **Private** (на ваш выбор)
   - НЕ инициализируйте репозиторий (README, .gitignore, license) - они уже есть
5. Нажмите **"Create repository"**

## Шаг 2: Добавьте remote и запушьте код

После создания репозитория GitHub покажет вам инструкции. Выполните:

```bash
cd /Users/dmitry/Downloads/human_design
git remote add origin https://github.com/YOUR_USERNAME/human-design-mcp-server.git
git branch -M main
git push -u origin main
```

**Замените `YOUR_USERNAME` на ваш GitHub username!**

## Шаг 3: Проверьте

Откройте ваш репозиторий на GitHub:
```
https://github.com/YOUR_USERNAME/human-design-mcp-server
```

Все файлы должны быть видны!

## Альтернативный вариант: SSH

Если вы используете SSH ключи:

```bash
git remote add origin git@github.com:YOUR_USERNAME/human-design-mcp-server.git
git push -u origin main
```

## Дальнейшая работа

После успешного push, для обновления кода:

```bash
git add .
git commit -m "Описание изменений"
git push
```

## Добавьте теги

Для создания релизов:

```bash
git tag -a v1.0.0 -m "First release: Human Design MCP Server"
git push origin v1.0.0
```

