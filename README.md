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
- `POST /api/login` with JSON body `{ "email": "you@school.edu", "password": "yourpassword" }`
- `POST /api/listings` with JSON listing payload

## Vercel Deployment

This project is ready for Vercel deployment using a static front end and serverless API routes in the `api/` directory.

1. Ensure your local Node version is compatible with the Vercel CLI (Node 24 is recommended).
2. Use the Vercel dashboard import flow or install the CLI when your environment is updated.
3. The project includes `vercel.json` to rewrite routes and expose clean URLs.

If CLI installation fails because Node is unsupported, switch to a supported Node version before retrying.
