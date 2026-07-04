# Houdy Landing Page Backend

This project includes a simple Node.js backend and static landing pages for Houdy.
The site is served from `landing.html` at the root (`/`), and backend routes are handled by `server.js`.

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
   ```bash
   http://localhost:3000
   ```

## Project Structure

- `landing.html` — canonical homepage served at `/`
- `listings.html` — search listings page
- `list-property.html` — property submission page
- `signin.html` — sign-in page
- `server.js` — Express backend serving static assets and API endpoints
- `scripts.js` — shared client-side logic for forms and search
- `styles.css` — shared site styling
- `vercel.json` — Vercel deployment configuration

## Vercel Deployment

This project is configured for Vercel using a custom Node.js deployment.
The `vercel.json` file routes all incoming requests through `server.js`, including:

- `/api/*` → Node API endpoints
- `/*` → static site / homepage routing

To deploy on Vercel:

1. Install the Vercel CLI if needed:
   ```bash
   npm install -g vercel
   ```
2. Deploy from the project root:
   ```bash
   vercel
   ```

## API Endpoints

- `GET /api/search?location=&budget=`
- `POST /api/newsletter` with JSON body `{ "email": "you@school.edu" }`
- `POST /api/login` with JSON body `{ "email": "you@school.edu", "password": "your-password" }`
- `POST /api/listings` with JSON body `{ "title": "...", "tag": "...", "location": "...", "type": "...", "price": 85000, "rating": 4.8, "badge": "Verified" }`
