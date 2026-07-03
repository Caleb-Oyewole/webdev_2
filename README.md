# Houdy Landing Page Backend

This project includes a simple Node.js backend to serve the landing page and support sample search and newsletter subscription flows.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm start
   ```
3. Open the site:
   ```
   http://localhost:3000
   ```

## API Endpoints

- `GET /api/search?location=&budget=`
- `POST /api/newsletter` with JSON body `{ "email": "you@school.edu" }`
