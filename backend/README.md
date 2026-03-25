# HomeValor Backend API

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file with your MongoDB URI and JWT secret

3. Seed the database:
```bash
node config/seedData.js
```

4. Start the server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register user
- POST `/api/auth/login` - Login user

### Improvements
- GET `/api/improvements` - Get all improvements (with filters)
- GET `/api/improvements/:id` - Get specific improvement

### Reports
- POST `/api/reports` - Create report (auth required)
- GET `/api/reports` - Get user reports (auth required)
- GET `/api/reports/:id` - Get specific report (auth required)

### Admin
- POST `/api/admin/improvements` - Add improvement (admin only)
- PUT `/api/admin/improvements/:id` - Update improvement (admin only)
- GET `/api/admin/stats` - Get admin statistics (admin only)

Server runs on port 5000 by default.