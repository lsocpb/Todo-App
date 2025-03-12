# TodoList Assignment  

**TODO list application** with a **React frontend** and a **C# backend API**.  

## Database Configuration

This project uses MongoDB. To set up the database connection:

1. Navigate to `appsettings.json` file in the `backend/Src/TodoList.WebApi/` directory
2. Replace the connection string with the credentials provided separately

Note: Database credentials will be sent separately via mail.

## Running the Application

### Option 1: Using Docker (Recommended)

The easiest way to run the entire application stack is with Docker Compose:

```bash
# Build and start all services
docker-compose up -d

# To view logs
docker-compose logs -f

# To stop all services
docker-compose down
```

This will start:
- MongoDB database at http://localhost:27017
- C# Backend API at http://localhost:5020
- React Frontend at http://localhost:3000

### Option 2: Running Locally

#### Database Setup

1. Install MongoDB locally or use the Connection String provided via mail.
2. Update `appsettings.json` file in `backend/Src/TodoList.WebApi/` with your MongoDB connection:

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "MongoDbSettings": {
    "ConnectionString": "mongodb://localhost:27017", // Update connection string
    "DatabaseName": "TodoListDb",
    "CollectionName": "Todos"
  }
}
```
#### Backend (C# Web API)
```bash
cd backend
dotnet restore
dotnet build
cd Src/TodoList.WebApi
dotnet run
```
The API will be available at https://localhost:7213 and http://localhost:5020.
#### Frontend (Next.js)
```bash
cd frontend/todo-list
npm install
npm run dev
```
The frontend will be available at http://localhost:3000.
## Running Tests
```bash
cd backend/Tests/TodoList.IntegrationTests
dotnet test
```

