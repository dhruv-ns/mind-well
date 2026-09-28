# MindWell Backend

The official backend API for the MindWell mental wellness application.
Built with Node.js, Express, TypeScript, and MongoDB.

## Features

- **Secure Authentication**: Uses HttpOnly cookies for Access & Refresh tokens, defending against XSS. Passwords hashed via bcrypt.
- **Zod Validation**: Strict input validation on all routes to prevent malformed data.
- **Centralized Error Handling**: Unified response structure for all errors.
- **Security Middlewares**: Uses Helmet for secure headers and express-rate-limit to prevent brute force attacks.
- **Anonymous Community**: Posts and comments are strictly anonymized at the API level, stripping out author IDs and exposing only a safe `personaTag`.

## Project Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Rename `.env.example` to `.env` and fill in the values:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/mindwell
   JWT_ACCESS_SECRET=your_super_secret_access_key
   JWT_REFRESH_SECRET=your_super_secret_refresh_key
   FRONTEND_URL=http://localhost:3000
   ```

3. **Start the Development Server**
   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

## Documentation

See [API_DOCS.md](./API_DOCS.md) for detailed information on the available endpoints and request payloads.
