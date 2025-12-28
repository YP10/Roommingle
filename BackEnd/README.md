Roommingle BackEnd

This README explains environment variables and basic deployment notes.

Environment variables (set in your host or .env locally):
- PORT - port to run the server (default: 1000)
- MONGO_URI - MongoDB connection string (use Atlas)
- JWT_SECRET - secret for signing JWT tokens
- CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET - optional for image uploads
- ALLOWED_ORIGINS - comma-separated list of allowed CORS origins (e.g. https://app.example.com,https://www.example.com)
- NODE_ENV - set to production in production environments

Quick deployment checklist:
1. Push repo to GitHub (ensure .env is not committed).
2. Create a MongoDB Atlas cluster and get MONGO_URI.
3. Configure production environment variables on the host.
4. Build the React frontend (cd FrontEnd && npm run build) and ensure BackEnd serves the build or deploy frontend separately (Vercel/Netlify).
5. Deploy Backend to a host that supports websockets (Fly.io, Render, Railway, or a Docker host). Use the included Dockerfile if desired.
6. Update ALLOWED_ORIGINS to include your frontend origin(s).

Notes:
- If using Vercel for frontend and Render/Fly for backend, configure the frontend to connect to the backend socket.io endpoint (e.g. https://api.example.com/socket.io).
- For zero-downtime/production readiness, consider setting up HTTPS via host and enabling proper logging and monitoring.
