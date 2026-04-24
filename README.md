# AI Act Compliance Application

A full-stack web application for managing and tracking EU AI Act compliance across an organization's AI tools. Companies can register their AI tools, assess risk levels, assign departmental ownership, and generate compliance reports.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Angular 19, TypeScript |
| Backend | ASP.NET Core 8 (C#), Entity Framework Core |
| Database | PostgreSQL |

## Features

- **AI Tool Registry** — Add, edit, and delete AI tools with vendor, type, risk level, and data handling attributes
- **Company & Department Management** — Organize tools by company and department
- **Risk Assessment** — Classify tools by EU AI Act risk categories (Minimal, Limited, High, Unacceptable)
- **Compliance Reporting** — Generate and view compliance reports per company
- **Employee Survey** — Token-based survey questionnaire for gathering departmental AI usage data
- **Admin Dashboard** — Overview of compliance status, pending assessments, and data flows

## Project Structure

```
├── backend/                  # ASP.NET Core Web API
│   ├── Controllers/          # REST API endpoints
│   ├── Models/               # Entity models
│   ├── Data/                 # EF Core DbContext
│   └── Migrations/           # Database migrations
├── frontend/                 # Angular application
│   └── src/app/
│       ├── components/       # UI components
│       └── services/         # HTTP services
└── database/
    └── seed.sql              # Initial seed data
```

## Getting Started

### Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download)
- [Node.js 18+](https://nodejs.org/)
- [PostgreSQL 15+](https://www.postgresql.org/)

### Database Setup

1. Create a PostgreSQL database named `aiactapp`
2. Update the connection string in `backend/appsettings.json` if needed:

```json
"ConnectionStrings": {
  "DefaultConnection": "Host=localhost;Port=5432;Database=aiactapp;Username=<your-user>;Password=<your-password>"
}
```

3. Apply migrations:

```bash
cd backend
dotnet ef database update
```

4. Optionally seed initial data:

```bash
psql -d aiactapp -f database/seed.sql
```

### Backend

```bash
cd backend
dotnet run
```

API runs on `http://localhost:5000` (or as configured in `launchSettings.json`).

### Frontend

```bash
cd frontend
npm install
npm run dev
```

App runs on `http://localhost:4200`.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET/POST/PUT/DELETE | `/api/tools` | AI tool CRUD |
| GET/POST/PUT/DELETE | `/api/companies` | Company CRUD |
| GET/POST/DELETE | `/api/departments` | Department management |
| GET | `/api/compliance` | Compliance reports |
| GET/POST | `/api/assessments` | Risk assessments |
| GET/POST | `/api/surveys` | Survey management |

## Data Model

```
Company
  └── Department (many)
  └── AITool (many)
        └── RiskAssessment
        └── DataFlow
        └── ComplianceReport
  └── SurveyToken
        └── SurveyResponse
              └── SurveyAnswer
```

## Development

Run both servers concurrently in separate terminals. The Angular dev server proxies API calls to the .NET backend via CORS (allowed origin: `http://localhost:4200`).

## Team

Alvin is scrum master.
