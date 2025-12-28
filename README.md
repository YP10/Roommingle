# Roommingle Deployment Guide

This guide provides step-by-step instructions for deploying the Roommingle application using free-tier services. We will deploy the backend to [Render](https://render.com/) and the frontend to [Vercel](https://vercel.com/).

## Prerequisites

Before you begin, ensure you have the following:

*   A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account and a new M0 (free) cluster for your production database.
*   A [GitHub](https://github.com/) account with your project pushed to a repository.
*   [Node.js and npm](https://nodejs.org/en/download/) installed on your local machine.

---

## 1. Database Setup on MongoDB Atlas

1.  **Create a Free Cluster:** Log in to your MongoDB Atlas account and create a new M0 cluster.
2.  **Get Connection String:** Once the cluster is ready, get the connection string.
    *   Click `Connect` -> `Drivers`.
    *   Select "Node.js" and the latest version.
    *   Copy the connection string. It will look something like this: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`
3.  **Whitelist IP Address:** For simplicity during setup, you can allow access from anywhere by adding `0.0.0.0/0` to your IP access list. For better security, you should update this later to only allow access from your Render service.

**Keep your connection string handy. You will need it for the backend deployment.**

---

## 2. Backend Deployment on Render

1.  **Sign Up:** Create an account on [Render](https://dashboard.render.com/register) using your GitHub account.
2.  **Create a New Web Service:**
    *   On the dashboard, click `New +` -> `Web Service`.
    *   Connect your GitHub repository.
3.  **Configure the Service:**
    *   **Name:** Give your service a name (e.g., `roommingle-backend`).
    *   **Root Directory:** Set this to `BackEnd`.
    *   **Environment:** `Node`.
    *   **Build Command:** `npm install`.
    *   **Start Command:** `node server.js`.
    *   **Instance Type:** Select the `Free` plan.
4.  **Add Environment Variables:**
    *   Go to the `Environment` tab for your new service.
    *   Add the following secret files. You will need to create a `.env` file in your `BackEnd` directory with the following content:
        *   `MONGO_URI`: Your MongoDB Atlas connection string from Step 1.
        *   `JWT_SECRET`: A long, random string for signing tokens. You can generate one using an online generator.
        *   `ALLOWED_ORIGINS`: We will fill this in after deploying the frontend. For now, you can leave it blank or use a placeholder like `http://localhost:3000`.
5.  **Deploy:** Click `Create Web Service`. Render will automatically build and deploy your backend.

---

## 3. Frontend Deployment on Vercel

1.  **Sign Up:** Create an account on [Vercel](https://vercel.com/signup) using your GitHub account.
2.  **Create a New Project:**
    *   On your dashboard, click `Add New...` -> `Project`.
    *   Import your GitHub repository.
3.  **Configure the Project:**
    *   **Framework Preset:** Vercel should automatically detect `Create React App`.
    *   **Root Directory:** Set this to `FrontEnd`.
    *   If Vercel doesn't auto-detect the settings, ensure the **Build Command** is `npm run build` and the **Output Directory** is `build`.
4.  **Add Environment Variables:**
    *   In the project settings, go to the `Environment Variables` section.
    *   Add a variable named `REACT_APP_API_URL` and set its value to the URL of your deployed Render backend (e.g., `https://roommingle-backend.onrender.com`).
5.  **Deploy:** Click `Deploy`. Vercel will build and deploy your frontend.

---

## 4. Final Configuration

1.  **Update Backend `ALLOWED_ORIGINS`:**
    *   Once your Vercel frontend is deployed, you will have a URL for it (e.g., `https://roommingle-frontend.vercel.app`).
    *   Go back to your Render dashboard, navigate to your backend service's `Environment` tab.
    *   Update the `ALLOWED_ORIGINS` environment variable with your Vercel frontend URL. This is crucial for CORS to work correctly.
2.  **Done!** Your application is now live. The frontend on Vercel will make API calls to the backend on Render.
