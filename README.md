# real-time-stocks

# Backend
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
- `/api/v1/health` - a basic health check route