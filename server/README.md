# Task Management API

A RESTful API for managing tasks and boards using Node.js, Express, PostgreSQL, and Prisma ORM.

## Features

- CRUD operations for boards and tasks
- PostgreSQL database with Prisma ORM
- Input validation and error handling
- Docker setup for local development

## Getting Started

### Prerequisites

- Node.js (v16+)
- Docker and Docker Compose
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd task-management-api
   ```

2. Create an `.env` file:
   ```bash
   cp .env.example .env
   ```

3. Start the containers:
   ```bash
   docker-compose up -d
   ```

4. Apply database migrations:
   ```bash
   docker-compose exec api npm run migrate
   ```

The API will be available at http://localhost:3000

## API Endpoints

### Boards

- `GET /api/boards` - Get all boards
- `GET /api/boards/:id` - Get a board by ID
- `POST /api/boards` - Create a new board
- `PUT /api/boards/:id` - Update a board
- `DELETE /api/boards/:id` - Delete a board

### Tasks

- `GET /api/tasks` - Get all tasks (can filter by boardId using query parameter)
- `GET /api/tasks/:id` - Get a task by ID
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Development

### Running Manually

1. Install dependencies:
   ```bash
   npm install
   ```

2. Generate Prisma client:
   ```bash
   npx prisma generate
   ```

3. Apply migrations:
   ```bash
   npx prisma migrate dev
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

## License

MIT