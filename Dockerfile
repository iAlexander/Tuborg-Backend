FROM node:14-alpine as builder
RUN apk --no-cache --update --virtual build-dependencies add tzdata build-base python
WORKDIR /app
COPY ./package*.json ./
RUN npm install
COPY src .
RUN npm run build

FROM node:14-alpine
RUN apk add --no-cache tzdata
RUN wget -O /usr/local/bin/dumb-init https://github.com/Yelp/dumb-init/releases/download/v1.2.2/dumb-init_1.2.2_amd64
RUN chmod +x /usr/local/bin/dumb-init
WORKDIR /app
COPY --from=builder /app .

ENTRYPOINT ["/usr/local/bin/dumb-init", "--"]
CMD ["npm", "run", "node", "./dist/main.js"]
