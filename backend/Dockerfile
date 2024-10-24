FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm rebuild sqlite3

COPY . .

# Setup the environment variables to sane defaults
ENV APP_PORT=5000
ENV FAKE_STOCK_COUNT=100
ENV FAKE_STOCK_PRICE_COUNT=100
ENV JWT_SECRET='super-secret'

EXPOSE 5000

CMD ["npm", "start"]
