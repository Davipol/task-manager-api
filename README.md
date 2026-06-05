# Taskflow API

A REST API built with Node.js, Express and TypeScript.

## Stack

- Node.js / Express
- TypeScript

## Run locally

```bash
npm install
npx ts-node src/index.ts
```

## Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/tasks | Get all tasks |
| GET | /api/tasks/:id | Get a task |
| POST | /api/tasks | Create a task |
| PATCH | /api/tasks/:id | Update a task |
| PATCH | /api/tasks/:id/complete | Complete a task |
| DELETE | /api/tasks/:id | Delete a task |

## Filtering

```
GET /api/tasks?status=todo
GET /api/tasks?priority=high
```

## Notes

Data is stored in memory and resets on server restart.
