# Infra Validator API Documentation

This document describes the endpoints, usage examples (using cURL), and the general behavior of the **Infra Validator** NodeJS application.

---

# Overview

**Infra Validator** is a lightweight Node.js application designed to validate infrastructure setup, database connectivity (Redis, MongoDB, PostgreSQL), centralized logging (Loki), and expose basic metrics for Prometheus monitoring.

The application:
- Connects to **Redis**, **MongoDB**, and **PostgreSQL**.
- Exposes endpoints to validate operations on each database.
- Sends structured logs to **Loki**.
- Exposes application metrics to **Prometheus**.

---

# Base URL

Local environment (example):
```text
http://localhost:4000
```

Deployed environment (via Drone CI and server IP):
```text
http://{SERVER_IP}:4000
```

---

# Endpoints

## 1. Health Check

### Description
Basic health check to verify if the application is running.

### Endpoint
```http
GET /health
```

### Response
```json
{
  "status": "ok"
}
```

### Example cURL
```bash
curl -X GET http://localhost:4000/health
```

---

## 2. Redis Test

### Description
Performs a simple `set` and `get` operation in Redis.

### Endpoint
```http
GET /test/redis
```

### Response
```json
{
  "result": "online"
}
```

### Example cURL
```bash
curl -X GET http://localhost:4000/test/redis
```

---

## 3. MongoDB Test

### Description
Inserts a document into the `InfraValidators` collection and returns the inserted document.

### Endpoint
```http
GET /test/mongo
```

### Response
```json
{
  "result": {
    "_id": "...",
    "status": "online",
    "timestamp": "..."
  }
}
```

### Example cURL
```bash
curl -X GET http://localhost:4000/test/mongo
```

---

## 4. PostgreSQL Test

### Description
Creates a table `infra_validator` (if it doesn't exist), inserts a record, and returns the last inserted row.

### Endpoint
```http
GET /test/postgres
```

### Response
```json
{
  "result": {
    "id": 1,
    "status": "online",
    "created_at": "..."
  }
}
```

### Example cURL
```bash
curl -X GET http://localhost:4000/test/postgres
```

---

## 5. Prometheus Metrics

### Description
Exposes default application metrics and a custom counter for requests.

### Endpoint
```http
GET /metrics
```

### Response
Text format (Prometheus scrape compatible).

Example snippet:
```text
# HELP infra_validator_requests_total Total number of requests received
# TYPE infra_validator_requests_total counter
infra_validator_requests_total{endpoint="/test/redis"} 5
```

### Example cURL
```bash
curl -X GET http://localhost:4000/metrics
```

---

# Environment Variables Required

| Variable Name | Description |
|---------------|-------------|
| REDIS_HOST | Redis server IP address |
| REDIS_PORT | Redis server port |
| MONGO_URI | MongoDB connection URI |
| PG_HOST | PostgreSQL server IP address |
| PG_PORT | PostgreSQL server port |
| PG_DATABASE | PostgreSQL database name |
| PG_USER | PostgreSQL username |
| PG_PASSWORD | PostgreSQL password |
| LOKI_HOST | Loki server URL |

---

# Notes

- If any database connection fails, the application will log the error and terminate.
- Loki logs include successful and failed operations.
- Prometheus metrics automatically increment for each endpoint hit.

---

# License

MIT License