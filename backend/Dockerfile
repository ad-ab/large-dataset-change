# build Stage
FROM node:17 AS builder

WORKDIR /app
COPY . .

RUN npm ci

FROM node:17-alpine

ENV NODE_ENV production
WORKDIR /app
COPY --from=builder /app .

EXPOSE 3001
CMD ["npm", "run", "start"]