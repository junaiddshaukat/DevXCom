# Vercel Deployment Guide

## Better Approach: Deploy Frontend and Backend Separately

This is the recommended approach for your project structure.

## Prerequisites
1. Install Vercel CLI: `npm install -g vercel`
2. Create a Vercel account at https://vercel.com

## Deployment Steps

### 1. Login to Vercel
```bash
vercel login
```

### 2. Deploy Backend First
```bash
cd d:\DevXCom\backend
vercel
```
- Choose a project name like `devxcom-backend`

### 3. Deploy Frontend
```bash
cd d:\DevXCom\frontend
vercel
```
- Choose a project name like `devxcom-frontend`
- Note the deployment URL (e.g., `https://devxcom-frontend.vercel.app`)

### 4. Configure Environment Variables

**For Backend Project (devxcom-backend):**
In Vercel dashboard → Backend project → Settings → Environment Variables:
- `PORT=8000`
- `NODE_ENV=PRODUCTION`
- `DB_URL=your_mongodb_connection_string`
- `JWT_SECRET_KEY=your_jwt_secret`
- `JWT_EXPIRES=7d`
- `ACTIVATION_SECRET=your_activation_secret`
- `SMPT_HOST=smtp.gmail.com`
- `SMPT_PORT=587`
- `SMPT_PASSWORD=your_smtp_password`
- `SMPT_MAIL=your_smtp_email`
- `STRIPE_API_KEY=your_stripe_api_key`
- `STRIPE_SECRET_KEY=your_stripe_secret_key`

**For Frontend Project (devxcom-frontend):**
In Vercel dashboard → Frontend project → Settings → Environment Variables:
- `VITE_API_URL=https://devxcom-backend.vercel.app/api/v2`
- `VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key`

### 5. Update CORS Configuration
After backend deployment, update `backend/app.js`:
```javascript
app.use(cors({
    origin: process.env.NODE_ENV === "PRODUCTION" 
        ? ["https://devxcom-frontend.vercel.app", "https://your-custom-domain.com"] 
        : "http://localhost:5173",
    credentials: true,
}));
```

### 6. Update Frontend API Configuration
Make sure your frontend is using the environment variable for API calls:
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v2';
```

## Why This Approach is Better

1. **Simpler Configuration**: No need for complex routing rules
2. **Better Performance**: Frontend served as static files, backend as serverless functions
3. **Easier Debugging**: Separate logs and metrics for frontend/backend
4. **Scalability**: Can scale frontend and backend independently
5. **Custom Domains**: Easier to set up custom domains for each service

## Important Notes
1. Update all API calls in your frontend to use the backend URL
2. Static files (uploads) should be moved to cloud storage (Cloudinary)
3. Make sure MongoDB allows connections from Vercel IPs
4. Test CORS configuration thoroughly

## File Structure After Deployment
```
├── frontend/
│   ├── vercel.json (Frontend deployment config)
│   ├── package.json
│   └── src/
├── backend/
│   ├── vercel.json (Backend deployment config)
│   ├── package.json
│   └── server.js
```
