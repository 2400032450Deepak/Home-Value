# HomeValor - Home Improvement Value Calculator

A full-stack web application for calculating home improvement ROI and getting personalized recommendations.

## Project Structure

```
web project/
├── homevalor/          # React frontend
└── backend/            # Node.js/Express backend
```

## Quick Start

### Backend Setup
1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start MongoDB (ensure MongoDB is running on your system)

4. Seed the database:
   ```bash
   npm run seed
   ```

5. Start the backend server:
   ```bash
   npm run dev
   ```
   Backend runs on http://localhost:5000

### Frontend Setup
1. Navigate to frontend directory:
   ```bash
   cd homevalor
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend:
   ```bash
   npm start
   ```
   Frontend runs on http://localhost:3000

## Features

- User authentication (register/login)
- Browse home improvement ideas with filters
- Create property improvement reports
- Admin panel for managing improvements
- ROI calculations and value projections
- Indian market-specific improvements

## API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/improvements` - Get improvements (with filters)
- `POST /api/reports` - Create improvement report
- `GET /api/reports` - Get user reports
- `GET /api/admin/stats` - Admin statistics

## Tech Stack

**Frontend:**
- React 19
- React Router
- CSS3

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing

## Default Admin Credentials
- Email: admin@homevalor.com
- Password: admin123

The backend is now fully integrated with your React frontend!