# Lumves CRM - Phone Sales Management System

A full-stack CRM application for managing phone sales operations at Lumves.com.

## Tech Stack

### Frontend
- React.js 18 with TypeScript
- Vite (build tool)
- Tailwind CSS
- React Router v6
- Axios
- React Hot Toast

### Backend
- Node.js with Express.js
- TypeScript
- MySQL with Sequelize ORM
- JWT Authentication
- bcrypt for password hashing

## Prerequisites

- Node.js 18+
- MySQL 8.0+
- npm or yarn

## Getting Started

### 1. Clone and Setup

```bash
# Navigate to project directory
cd "lumves crm"

# Copy environment file
cp .env.example .env
```

### 2. Configure Database

Edit `.env` file with your MySQL credentials:

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=lumves_crm
DB_USER=root
DB_PASSWORD=your_password
```

Create the database in MySQL:

```sql
CREATE DATABASE lumves_crm;
```

### 3. Install Dependencies

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 4. Start Development Servers

Terminal 1 - Backend:
```bash
cd server
npm run dev
```

Terminal 2 - Frontend:
```bash
cd client
npm run dev
```

### 5. Seed Sample Data

```bash
cd server
npm run seed
```

This creates sample users and products.

## Default Login Credentials

| Role    | Email               | Password   |
|---------|---------------------|------------|
| Admin   | admin@lumves.com    | admin123   |
| Manager | manager@lumves.com  | manager123 |
| Agent   | agent@lumves.com    | agent123   |

## Project Structure

```
lumves-crm/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React Context providers
│   │   ├── services/       # API service functions
│   │   ├── types/          # TypeScript interfaces
│   │   └── App.tsx         # Main app with routing
│   └── package.json
│
├── server/                 # Node.js backend
│   ├── src/
│   │   ├── config/         # Database & app configuration
│   │   ├── controllers/    # Route handlers
│   │   ├── middleware/     # Auth, validation middleware
│   │   ├── models/         # Sequelize models
│   │   ├── routes/         # API routes
│   │   └── app.ts          # Express app
│   ├── seeders/            # Sample data seeders
│   └── package.json
│
├── .env.example            # Environment template
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout
- `POST /api/auth/change-password` - Change password

### Users (Admin only)
- `GET /api/users` - List all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Deactivate user
- `POST /api/users/:id/reset-password` - Reset user password

## User Roles

| Role    | Permissions                              |
|---------|------------------------------------------|
| Agent   | Manage own customers, calls, leads       |
| Manager | View team stats, agent performance       |
| Admin   | Full access, user management, settings   |

## Development Phases

- [x] Phase 1: Authentication, user management, dashboard (Current)
- [ ] Phase 2: Customer management, call logging, lead tracking
- [ ] Phase 3: Product catalog, inventory, order management
- [ ] Phase 4: Follow-up system, reporting, analytics
- [ ] Phase 5: Admin panel, activity logs, deployment

## Building for Production

```bash
# Build frontend
cd client
npm run build

# Build backend
cd server
npm run build
```

## Deployment

1. Set `NODE_ENV=production` in environment
2. Configure production MySQL database
3. Set a strong `JWT_SECRET`
4. Update `CORS_ORIGIN` to your domain
5. Deploy built files to your hosting provider

## License

Private - Lumves.com
