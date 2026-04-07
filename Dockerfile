FROM node:24-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV NODE_ENV=production \
    DB_URL="postgresql://dummy:dummy@localhost:5432/dummy" \
    DB_HOST="localhost" \
    DB_USER="dummy" \
    DB_PASSWORD="dummy" \
    DB_NAME="dummy" \
    DB_PORT="5432"

RUN npx prisma generate

RUN npm run build

EXPOSE 4000

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/index.js"]