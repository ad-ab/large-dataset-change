# build Stage
FROM node:17 AS builder

WORKDIR /app
COPY . .

RUN npm install && npm run build

# nginx server
FROM nginx:alpine

WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/build .

EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]