# real-time-stocks

# Backend/
Language: Typescript
Frameworks: 
- Express - The backend web application framework.
- SQLite3 - A simple and portable database that can easily run inside docker.
- Sequelize - The ORM layer.
- Nodemon - Useful for local testing and auto reloading code on changes.

## To Start the App Locally (Without Docker - YMMV based on your underlying OS)
1. `npm install`
2. `export APP_PORT=8080`
3. With Auto Reload: `npm run start:nodemon`

## To start with Docker
TBD

## API Docs
- [GET `/api/v1/health`](backend/src/routes/health/get.ts) - a basic health check route
- [GET `/api/v1/stock/:id`](backend/src/routes/health/get.ts) - get a stock

## [Database](backend/src/database/)
The ERD is below.
![ERD](docs/erd.png)

### [Models](backend/src/database/models/)
- `Users` - Stores basic information about a user
- `Stocks` -
- `StockPrices` - 
- `UserWatchlists` - a junction table that allows us to query a user's watch list

# Frontend/

# Docs/
- [models.erd](docs/models.erc) - An ERD diagram as JSON. Viewable with the VS Code extension [here](https://marketplace.visualstudio.com/items?itemName=dineug.vuerd-vscode).