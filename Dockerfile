# Stage 1: Build the Angular frontend
FROM node:22-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install --legacy-peer-deps
COPY frontend/ ./
RUN npm run build

# Stage 2: Build the NestJS backend
FROM node:22-alpine AS backend-build
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install
COPY backend/ ./
RUN npm run build

# Stage 3: Production Backend Server (Node.js)
FROM node:22-alpine AS backend-prod
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install --only=production
COPY --from=backend-build /app/backend/dist ./dist
EXPOSE 3000
CMD ["node", "dist/main.js"]

# Stage 4: Production Frontend Server (Nginx)
FROM nginx:alpine AS frontend-prod
COPY --from=frontend-build /app/frontend/dist/mavluda-beauty/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
