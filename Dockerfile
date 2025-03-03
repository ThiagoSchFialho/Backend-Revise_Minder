FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
ENV NODE_ENV=production
RUN npm install --only=production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.env* ./

EXPOSE 3000

CMD ["npm", "start"]