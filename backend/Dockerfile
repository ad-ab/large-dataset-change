# build Stage
FROM node:17 AS builder

WORKDIR /app
COPY . .

RUN npm ci

FROM node:17-alpine

ENV NODE_ENV production

ENV APP_RANDOM_SEED APP_RANDOM_SEED
ENV APP_SIZE 8000
ENV APP_PORT 3001

WORKDIR /app
COPY --from=builder /app .

EXPOSE 3001
CMD ["npm", "run", "start"]