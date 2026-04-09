# Calendar Backend

Simple Express + MongoDB backend for calendar authentication.

## Requirements

- Node.js 18+
- npm
- MongoDB connection string

## Setup

1. Copy environment variables:

```bash
cp .env.example .env
```

2. Fill `.env` with your values.

3. Install dependencies:

```bash
npm install
```

4. Start the server in development mode:

```bash
npm run dev
```

## API Endpoints

- `POST /api/auth/new` - register user
- `POST /api/auth/` - login user
- `GET /api/auth/renew` - renew JWT token

## Notes

- Static files are served from `public/`.
- JWT secret should be kept private.
