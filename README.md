# Task Management App

A comprehensive task management application with a modern web frontend and a robust Node.js backend. The system allows users to create multiple boards and organize tasks within them, complete with labels for better categorization and organization.

## 📦 Features

- **Board Management**: Create, view, update, and delete boards to organize your tasks
- **Task Organization**: Create tasks with titles and custom labels
- **Label System**: Assign multiple labels to tasks for better categorization
- **Responsive UI**: Modern interface that works on desktop and mobile devices
- **RESTful API**: Well-structured backend with comprehensive API endpoints
- **Database Persistence**: All data is stored in a PostgreSQL database
- **Docker Support**: Easy setup with Docker for development and deployment

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router for navigation
- Modern UI with Tailwind CSS
- Axios API for data fetching
- Redux toolkit for state managment

### Backend
- Node.js
- Express.js framework
- Prisma ORM for database operations
- PostgreSQL database
- ES Modules syntax
- Express Validator for input validation
- Docker and Docker Compose for containerization

## Database Schema

The application uses two main data models:

**Board**
```
Board {
  id        Int      @id @default(autoincrement())
  name      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  tasks     Task[]
}
```

**Task**
```
Task {
  id        Int      @id @default(autoincrement())
  title     String
  labels    String[] // Array of strings for labels
  boardId   Int
  board     Board    @relation(fields: [boardId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## API Endpoints & Examples

### Boards

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/boards | Get all boards |
| GET | /api/boards/:id | Get board by ID with its tasks |
| POST | /api/boards | Create a new board |
| PUT | /api/boards/:id | Update a board |
| DELETE | /api/boards/:id | Delete a board |

**Example Requests:**

Get all boards:
```bash
curl -X GET http://localhost:3000/api/boards
```

Create a new board:
```bash
curl -X POST http://localhost:3000/api/boards \
  -H "Content-Type: application/json" \
  -d '{"name": "Project Alpha"}'
```

### Tasks

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/tasks | Get all tasks (can filter by boardId) |
| GET | /api/tasks/:id | Get task by ID |
| POST | /api/tasks | Create a new task |
| PUT | /api/tasks/:id | Update a task |
| DELETE | /api/tasks/:id | Delete a task |

**Example Requests:**

Get tasks for a specific board:
```bash
curl -X GET http://localhost:3000/api/tasks?boardId=1
```

Create a new task:
```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Implement login feature", "labels": ["backend", "auth"], "boardId": 1}'
```

## 🖥️ Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16+)
- npm or yarn
- Docker and Docker Compose (for containerized setup)
- Git

## 📥 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/task-management-app.git
   cd task-management-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or with yarn
   yarn install
   ```

## ⚙️ Environment Configuration

1. Create an environment file by copying the example:
   ```bash
   cp .env.example .env
   ```

2. Update the `.env` file with your specific configuration:
   ```
   # Database configuration
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/taskdb"
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=postgres
   POSTGRES_DB=taskdb

   # Server configuration
   PORT=3000
   NODE_ENV=development
   ```

## 🐳 Run with Docker

The easiest way to run the application is with Docker:

1. Start the containers:
   ```bash
   docker-compose up -d
   ```

2. Apply database migrations:
   ```bash
   docker-compose exec api npm run migrate
   ```

3. Access the application:
   - Backend API: http://localhost:3000

4. Run the frontend application:
    ```bash
    cd client && npm run dev
    ```
   - Frontend: http://localhost:5173

## Running Manually

If you prefer to run the application without Docker:

1. Make sure PostgreSQL is installed and running
2. Update the `.env` file with your database connection details
3. Apply database migrations:
   ```bash
   npm run migrate
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Start the frontend server:
   ```bash
   cd client && npm run dev
   ```

## 🔍 Health Check

The API includes a health check endpoint to verify the service is running correctly:

```bash
curl -X GET http://localhost:3000/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

## ✅ Improvements Made

- **Input Validation**: Added comprehensive request validation using express-validator
- **Error Handling**: Implemented centralized error handling with appropriate HTTP status codes
- **Database Indexing**: Added indexes to improve query performance
- **Docker Configuration**: Created production-ready Docker setup with health checks
- **API Documentation**: Detailed API documentation with examples

## 🚀 Future Improvements

- Add user authentication and authorization
- Implement task comments system
- Add due dates and priority levels for tasks
- Create activity logging for audit trails
- Implement real-time updates with WebSockets
- Add task search and filtering functionality
- Implement automated testing with Jest

## 🎥 Demo Video

[Watch the demo video](https://youtu.be/your-demo-video-link) to see the application in action.

## 📝 Author  
**Vaibhav Chaudhari**  
[LinkedIn](https://www.linkedin.com/in/vaibhavchaudhari8625/) | [GitHub](https://github.com/ddarkclay)
