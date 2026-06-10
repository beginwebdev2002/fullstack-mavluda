# 1. Этап сборки (Build stage)
FROM node:20-alpine AS build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы зависимостей для эффективного кэширования
COPY package*.json ./

# Устанавливаем все зависимости (включая dev-зависимости, нужные для сборки)
RUN npm install

# Копируем исходный код проекта
COPY . .

# Собираем проект (компилируем TS в JS, результат по умолчанию в папку /app/dist)
RUN npm run build

# 2. Этап запуска (Production stage)
FROM node:20-alpine

WORKDIR /app

# Копируем только package.json для установки только production-зависимостей
COPY package*.json ./

# Устанавливаем только production-зависимости (облегчаем образ)
RUN npm install --only=production

# Копируем скомпилированный код из этапа build
COPY --from=build /app/dist ./dist

# Открываем порт, на котором работает NestJS (по умолчанию 3000)
EXPOSE 4100

# Запускаем приложение
CMD ["node", "dist/main"]