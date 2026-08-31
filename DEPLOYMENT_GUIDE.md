# 🚀 DEPLOYMENT GUIDE - SkillSync AI

## 📋 DEPLOYMENT OVERVIEW

This guide covers deploying SkillSync AI to production with:
- **Frontend**: Vercel (Next.js)
- **Backend**: Railway, Render, or Heroku (FastAPI)
- **Database**: PostgreSQL on Supabase or AWS RDS

---

## ⚡ QUICK DEPLOYMENT (15 minutes)

### Option 1: Deploy Frontend to Vercel (Fastest)

1. **Connect GitHub Repository**
   ```bash
   # Push your code to GitHub
   git init
   git add .
   git commit -m "Initial commit: SkillSync AI MVP"
   git remote add origin https://github.com/yourusername/skillsync-ai.git
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import GitHub repository
   - Select `frontend` folder as root
   - Set environment variables:
     ```
     NEXT_PUBLIC_API_URL=https://skillsync-api.railway.app
     NEXT_PUBLIC_APP_URL=https://skillsync-ai.vercel.app
     ```
   - Click "Deploy"
   - ✅ Frontend live in 2 minutes!

### Option 2: Deploy Backend to Railway (Easy)

1. **Create Railway Account**
   - Visit [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub"
   - Choose your repository

3. **Configure Backend**
   - Set up PostgreSQL plugin
   - Add environment variables:
     ```
     DATABASE_URL=${{ DATABASE_URL }}
     SECRET_KEY=<your-secret-key>
     ALGORITHM=HS256
     ACCESS_TOKEN_EXPIRE_MINUTES=30
     REFRESH_TOKEN_EXPIRE_DAYS=7
     CORS_ORIGINS=https://skillsync-ai.vercel.app
     ```
   - Deploy!
   - ✅ Backend live in 3 minutes!

---

## 📦 STEP-BY-STEP DEPLOYMENT

### Step 1: Prepare Your Repository

```bash
# 1. Initialize git if not already done
cd c:\Users\vicky\SKILLSYNC AI
git init

# 2. Create .gitignore
# Already in place - verifies frontend/.next, backend/venv, etc.

# 3. Commit everything
git add .
git commit -m "SkillSync AI MVP - Ready for deployment"

# 4. Add remote
git remote add origin https://github.com/yourusername/skillsync-ai.git

# 5. Push to GitHub
git branch -M main
git push -u origin main
```

### Step 2: Deploy Frontend to Vercel

#### Method A: Using Vercel CLI (Recommended)

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Navigate to frontend
cd frontend

# 3. Deploy
vercel

# 4. Follow prompts:
#    - Link to existing project? No
#    - Project name: skillsync-ai
#    - Directory: ./
#    - Build command: npm run build
#    - Output directory: .next

# 5. Add production environment variables
vercel env add NEXT_PUBLIC_API_URL
#    → Enter: https://skillsync-api.railway.app (or your backend URL)
#    → Select: Production

vercel env add NEXT_PUBLIC_APP_URL
#    → Enter: https://skillsync-ai.vercel.app
#    → Select: Production

# 6. Redeploy with env vars
vercel --prod

# ✅ Frontend URL: https://skillsync-ai.vercel.app
```

#### Method B: Via Vercel Dashboard

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Select your GitHub repository
4. Set project settings:
   - Framework: Next.js
   - Root Directory: frontend
   - Build Command: npm run build
   - Output Directory: .next
5. Add Environment Variables:
   - `NEXT_PUBLIC_API_URL` = `https://skillsync-api.railway.app`
   - `NEXT_PUBLIC_APP_URL` = `https://skillsync-ai.vercel.app`
6. Click "Deploy"
7. ✅ Done! Visit the generated URL

### Step 3: Deploy Backend to Railway

1. **Create Railway Account**
   - Visit [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Click "Deploy from Repo"
   - Select your GitHub repo

3. **Add PostgreSQL Plugin**
   - Click "Add"
   - Find "PostgreSQL"
   - Click to add

4. **Configure Backend Service**
   - Select your repo → backend folder
   - Set environment variables:
     ```
     DATABASE_URL = ${{ DATABASE_URL }}  (auto-populated from PostgreSQL)
     SECRET_KEY = your-super-secret-key-here-change-in-production
     ALGORITHM = HS256
     ACCESS_TOKEN_EXPIRE_MINUTES = 30
     REFRESH_TOKEN_EXPIRE_DAYS = 7
     CORS_ORIGINS = https://skillsync-ai.vercel.app
     ```

5. **Deploy**
   - Wait for build to complete
   - ✅ Backend URL: https://skillsync-api.railway.app (or generated URL)

6. **Update Frontend Environment Variables**
   - On Vercel: Set `NEXT_PUBLIC_API_URL` = `https://skillsync-api.railway.app`
   - Redeploy frontend

### Step 4: Test Deployment

```bash
# Test frontend
curl -I https://skillsync-ai.vercel.app
# Should return: HTTP/2 200

# Test backend
curl -I https://skillsync-api.railway.app/health
# Should return: HTTP/2 200 with {"status": "healthy"}

# Test API
curl https://skillsync-api.railway.app/docs
# Should show Swagger UI documentation
```

---

## 🗄️ DATABASE SETUP

### Option 1: PostgreSQL on Supabase (Free)

1. Visit [supabase.com](https://supabase.com)
2. Create new project
3. Create PostgreSQL database
4. Copy connection string:
   ```
   postgresql://username:password@host:5432/database
   ```
5. Use in Railway environment variable `DATABASE_URL`

### Option 2: PostgreSQL on AWS RDS

1. Go to [AWS RDS](https://aws.amazon.com/rds/)
2. Create PostgreSQL instance
3. Copy endpoint
4. Create connection string:
   ```
   postgresql://username:password@endpoint:5432/skillsync_ai
   ```
5. Use in Railway environment variable `DATABASE_URL`

### Option 3: Railway Managed PostgreSQL

- Auto-provided when you add PostgreSQL plugin in Railway
- Connection string auto-populated as `DATABASE_URL`
- ✅ Easiest option!

---

## 🔐 SECURITY CHECKLIST

Before going live:

- [ ] Generate strong `SECRET_KEY` (use: `openssl rand -hex 32`)
- [ ] Update `CORS_ORIGINS` to your production URL
- [ ] Enable HTTPS (automatic on Vercel & Railway)
- [ ] Set database backup schedule
- [ ] Configure database encryption at rest
- [ ] Enable PostgreSQL SSL connections
- [ ] Set up monitoring & alerts
- [ ] Configure rate limiting
- [ ] Enable database access logs
- [ ] Review security headers in vercel.json

---

## 📊 MONITORING & DEBUGGING

### View Logs

**Vercel Frontend:**
```
https://vercel.com/dashboard → Select Project → Deployments → Runtime Logs
```

**Railway Backend:**
```
https://railway.app → Select Project → Logs
```

### Common Issues & Solutions

**Issue: CORS Error**
```
Solution: Update CORS_ORIGINS in Railway env vars with your Vercel URL
```

**Issue: 502 Bad Gateway**
```
Solution: Check backend logs, verify DATABASE_URL is correct, check health endpoint
```

**Issue: Database Connection Failed**
```
Solution: Verify DATABASE_URL, check PostgreSQL is running, check firewall rules
```

**Issue: Slow API Response**
```
Solution: Check database indexes, enable caching, consider upgrading Railway plan
```

---

## 🔄 CI/CD PIPELINE

### Auto-Deploy on Git Push

**Vercel** (Already configured):
- Automatically deploys on git push to main
- Preview deployments for PRs
- Rollback available for any commit

**Railway** (Setup required):
- Add GitHub integration
- Configure branch to deploy from (main)
- Auto-deploys on push

### GitHub Actions Workflow (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Deploy Frontend
        run: |
          npm install -g vercel
          cd frontend
          vercel --prod --token ${{ secrets.VERCEL_TOKEN }}
      
      - name: Deploy Backend
        run: |
          # Railway auto-deploys on git push
          echo "Backend deployment handled by Railway"
```

---

## 💰 COST ESTIMATION

| Service | Free Tier | Production Cost |
|---------|-----------|-----------------|
| Vercel | ✅ Yes | $20-100/month |
| Railway | ✅ Yes ($5 credit) | $5-50/month |
| Supabase | ✅ Yes | $25-100/month |
| **Total** | | **$50-250/month** |

---

## 📈 PERFORMANCE METRICS

### Expected Performance:

```
Frontend (Vercel):
- Time to First Byte: 100-200ms
- Time to Interactive: 1-2s
- Lighthouse Score: 90+

Backend (Railway):
- API Response Time: 50-100ms
- Database Query Time: 10-50ms
- Uptime SLA: 99.9%
```

### Optimize Performance:

1. **Frontend**
   - Enable image optimization
   - Enable caching headers
   - Minify CSS/JS
   - Lazy load components

2. **Backend**
   - Add database indexes
   - Enable query caching
   - Use connection pooling
   - Add Redis for caching

---

## 🚨 TROUBLESHOOTING

### Deploy Fails

```bash
# Check build locally
cd frontend
npm run build

# Check backend locally
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Connection Issues

```bash
# Test backend connectivity
curl https://skillsync-api.railway.app/health

# Check CORS headers
curl -H "Origin: https://skillsync-ai.vercel.app" \
  -H "Access-Control-Request-Method: GET" \
  -H "Access-Control-Request-Headers: Content-Type" \
  -X OPTIONS https://skillsync-api.railway.app/health
```

### Database Issues

```bash
# Test database connection from Railway logs
# Check table creation status
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';
```

---

## 🎯 PRODUCTION CHECKLIST

- [ ] Frontend deployed to Vercel
- [ ] Backend deployed to Railway
- [ ] PostgreSQL database configured
- [ ] All environment variables set
- [ ] CORS configured correctly
- [ ] Health endpoints tested
- [ ] Swagger docs accessible
- [ ] API endpoints tested
- [ ] Frontend-backend connectivity verified
- [ ] Error handling tested
- [ ] Monitoring configured
- [ ] Backups configured
- [ ] Team access configured
- [ ] Documentation updated

---

## 📞 NEED HELP?

- **Vercel Docs**: https://vercel.com/docs
- **Railway Docs**: https://docs.railway.app
- **Supabase Docs**: https://supabase.com/docs
- **Next.js Deployment**: https://nextjs.org/docs/deployment

---

## ✅ NEXT STEPS

1. ✅ Deploy frontend to Vercel
2. ✅ Deploy backend to Railway
3. ✅ Configure database
4. ✅ Test end-to-end
5. ✅ Monitor logs
6. ✅ Optimize performance
7. ✅ Add team members
8. ✅ Set up CI/CD
9. ✅ Plan scaling

---

**Status**: Ready for production deployment 🚀

*All files prepared. Just follow the steps above and you'll be live in minutes!*
