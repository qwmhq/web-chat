# Web Chat Application

A modern real-time chat application built with React, Express, and Socket.IO, featuring a beautiful UI powered by shadcn/ui components.

## Features

- Real-time messaging using Socket.IO
- Modern and responsive UI built with shadcn/ui
- User authentication and authorization
- MongoDB database for data persistence
- TypeScript for type safety
- Dark/Light mode support

## Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- shadcn/ui (UI components)
- Socket.IO Client
- React Router DOM
- TailwindCSS
- Axios

### Backend
- Express.js
- TypeScript
- MongoDB with Mongoose
- Socket.IO
- JWT Authentication
- Zod for validation
- bcrypt for password hashing

## Prerequisites

- Node.js (v18 or higher)
- MongoDB
- npm or yarn

## Getting Started

### Clone the repository

```bash
git clone <repository-url>
cd web-chat
```

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the server directory with the following variables:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

4. Start the development server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the client directory:
```env
VITE_API_URL=http://localhost:5000
```

4. Start the development server:
```bash
npm run dev
```

## Available Scripts

### Backend Scripts
- `npm run dev` - Start development server
- `npm run build` - Build the project
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests

### Frontend Scripts
- `npm run dev` - Start development server
- `npm run build` - Build the project
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
web-chat/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/        # Page components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utility functions
│   │   └── types/        # TypeScript types
│   └── public/           # Static assets
│
└── server/                # Backend Express application
    ├── src/
    │   ├── controllers/  # Route controllers
    │   ├── models/       # Mongoose models
    │   ├── routes/       # Express routes
    │   ├── middleware/   # Custom middleware
    │   ├── services/     # Business logic
    │   └── utils/        # Utility functions
    └── tests/            # Test files
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.
