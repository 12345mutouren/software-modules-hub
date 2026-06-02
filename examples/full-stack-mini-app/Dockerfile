FROM node:22-alpine

WORKDIR /app

COPY package.json ./
COPY src ./src
COPY public ./public
COPY docs ./docs

ENV NODE_ENV=production
ENV PORT=3000
ENV DATA_FILE=/app/data/app.json

EXPOSE 3000

CMD ["npm", "start"]

