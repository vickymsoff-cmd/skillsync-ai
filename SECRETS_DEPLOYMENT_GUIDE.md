# 🔐 DEPLOYMENT SECRETS & CONFIGURATION GUIDE

## ⚠️ IMPORTANT: SECRETS MANAGEMENT

**NEVER commit secrets to GitHub!** Use platform-specific secret management:

- **Vercel**: Environment Variables Dashboard
- **Railway**: Project Variables
- **GitHub**: Repository Secrets
- **Keep .env* files in .gitignore**

---

## 📋 REQUIRED SECRETS

### Frontend (Vercel Dashboard)

#### Step 1: Open Vercel Project Settings
```
vercel.com → Your Project → Settings → Environment Variables
```

#### Add these Production Variables:

```
Name: NEXT_PUBLIC_API_URL
Value: https://skillsync-api.railway.app  (or your backend URL)
Environment: Production

Name: NEXT_PUBLIC_APP_URL
Value: https://skillsync-ai.vercel.app
Environment: Production
```

### Backend (Railway Dashboard)

#### Step 1: Open Railway Project Variables
```
railway.app → Your Project → Variables
```

#### Auto-Provided by Railway:
```
DATABASE_URL  (auto-populated from PostgreSQL plugin)
PORT          (auto-set to 8000)
```

#### Add these Variables:

```
SECRET_KEY: (Generate below)
ALGORITHM: HS256
ACCESS_TOKEN_EXPIRE_MINUTES: 30
REFRESH_TOKEN_EXPIRE_DAYS: 7
CORS_ORIGINS: https://skillsync-ai.vercel.app,https://www.skillsync-ai.vercel.app
DEBUG: false
ENVIRONMENT: production
```

---

## 🔑 GENERATE SECRET_KEY

### Option 1: Using OpenSSL (Recommended)
```bash
openssl rand -hex 32
# Output: 3f8e9c2a1b5d7f9e4c6a8b2d9f5e7c1a9d3b6f8e2a4c7e9b1d5f8a2c4e7
# Use this as SECRET_KEY
```

### Option 2: Using Python
```bash
python -c "import secrets; print(secrets.token_hex(32))"
# Output: 7a9b2c5d8e1f4a6d9c2e5f8a1b4c7d0e3a6b9c2d5e8f1a4b7c0d3e6f9a2b
# Use this as SECRET_KEY
```

### Option 3: Using Node.js
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
# Output: 9e2f4a7c1d5b8e3f6a0c2e5a9d1f4c7a0b3e6d9c2f5a8b1e4d7a0c3f6a9
# Use this as SECRET_KEY
```

**Copy the generated value and paste into Railway Variables**

---

## 🔐 GitHub Secrets (for CI/CD)

### Step 1: Add GitHub Secrets
```
GitHub → Your Repo → Settings → Secrets and Variables → Actions
```

### Add these secrets:

```
VERCEL_TOKEN:
  - Get from: vercel.com → Settings → Tokens
  - Create new token
  - Copy and paste here

RAILWAY_TOKEN:
  - Get from: railway.app → Account → API Tokens
  - Create new token
  - Copy and paste here

SLACK_WEBHOOK (Optional):
  - For deployment notifications
```

---

## 🚀 STEP-BY-STEP DEPLOYMENT

### Step 1: Prepare Repository

```bash
# 1. Navigate to project
cd c:\Users\vicky\SKILLSYNC AI

# 2. Ensure .gitignore is correct
cat .gitignore
# Should exclude: .env, .env.*, node_modules/, venv/, etc.

# 3. Initialize git
git init
git add .
git commit -m "SkillSync AI MVP - Ready for production deployment"

# 4. Add GitHub remote
git remote add origin https://github.com/yourusername/skillsync-ai.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy Frontend to Vercel

#### Method A: CLI (Faster)
```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login to Vercel
vercel login
# Opens browser, sign in with GitHub

# 3. Deploy frontend
cd frontend
vercel --prod --name skillsync-ai

# 4. Follow prompts:
#    Linked to yourname/skillsync-ai
#    Default project settings? Yes
#    Detected Next.js project
#    Deploy to production? Yes

# ✅ Frontend URL will be displayed
# Save this URL for CORS configuration
```

#### Method B: Dashboard
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Select your GitHub repo
4. Configure:
   - Framework: Next.js
   - Root Directory: frontend
   - Build: npm run build
   - Output: .next
5. Add environment variables (see above)
6. Click Deploy

### Step 3: Deploy Backend to Railway

#### Step 1: Create Railway Project
1. Go to [railway.app](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub"
4. Choose your repository

#### Step 2: Add PostgreSQL
1. Click "Add Service"
2. Select "PostgreSQL"
3. Click "Add"

#### Step 3: Configure Backend Service
1. Select your repository
2. Set root directory to: `backend`
3. Add Variables (see above)
4. Click Deploy

#### Step 4: Get Backend URL
1. After deployment, Railway shows public URL
2. Copy the URL (e.g., https://skillsync-api.railway.app)
3. Update Vercel `NEXT_PUBLIC_API_URL` with this URL

### Step 4: Verify Deployment

```bash
# Test Frontend
curl -I https://skillsync-ai.vercel.app
# Should return: HTTP/2 200

# Test Backend
curl https://skillsync-api.railway.app/health
# Should return: {"status": "healthy"}

# Test API Docs
curl https://skillsync-api.railway.app/docs
# Should return Swagger UI HTML

# Test CORS
curl -H "Origin: https://skillsync-ai.vercel.app" \
  https://skillsync-api.railway.app/health
# Should include CORS headers
```

### Step 5: Test Application Flow

1. **Visit Frontend**: https://skillsync-ai.vercel.app
2. **Click Login** → Form loads
3. **Try Invalid Email** → Validation error
4. **Try Short Password** → Validation error
5. **Submit Form** → Should attempt to call backend
6. **Check Console** → Should see API calls to backend URL

---

## 🐛 TROUBLESHOOTING DEPLOYMENT

### Issue: Vercel Build Fails

**Check**:
```bash
# Build locally
cd frontend
npm run build

# Fix common issues
npm cache clean --force
rm -rf .next
npm install --legacy-peer-deps
npm run build
```

**Fix**:
- Update package.json
- Clear Vercel cache (Vercel → Settings → Storage)
- Redeploy

### Issue: Railway Build Fails

**Check Logs**:
1. Railway → Your Project → Logs
2. Look for error messages
3. Common issues:
   - Missing Python dependencies
   - Wrong working directory
   - PORT not set

**Fix**:
```bash
# Verify requirements.txt
cd backend
pip install -r requirements.txt

# Test locally
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --port 8000
```

### Issue: API Connection Failed

**Check CORS**:
1. Verify `CORS_ORIGINS` includes Vercel URL
2. Railway → Variables → Update CORS_ORIGINS
3. Redeploy backend

**Test CORS**:
```bash
curl -H "Origin: https://skillsync-ai.vercel.app" \
  -H "Access-Control-Request-Method: GET" \
  -X OPTIONS https://skillsync-api.railway.app/health
```

### Issue: Database Connection Failed

**Check Variables**:
1. Railway → Variables → Verify DATABASE_URL
2. Should look like: `postgresql://user:pass@host:5432/db`
3. Check for special characters (URL encode if needed)

**Test Connection**:
1. Railway → PostgreSQL Plugin → Connect
2. Run: `SELECT 1` → Should return 1
3. If fails, check firewall rules

---

## 📊 MONITORING DEPLOYMENT

### Vercel Monitoring
```
vercel.com → Project → Analytics
- Page performance
- Web Vitals
- HTTP status codes
- Error rates
```

### Railway Monitoring
```
railway.app → Project → Metrics
- CPU usage
- Memory usage
- Network I/O
- Database connections
```

### View Logs

**Vercel Logs**:
```
Vercel → Deployments → Select Deployment → Logs
```

**Railway Logs**:
```
Railway → Project → Logs
Filter by service: backend, postgres, etc.
```

---

## 🔄 CONTINUOUS DEPLOYMENT (CD)

### GitHub Actions Setup

Once you push to main, GitHub Actions automatically:

1. **Tests** code
2. **Builds** frontend
3. **Tests** backend
4. **Deploys** to Vercel
5. **Deploys** to Railway
6. **Notifies** (Slack - optional)

**To trigger manually**:
```
GitHub → Actions → Deploy to Production → Run Workflow
```

---

## 🎯 POST-DEPLOYMENT CHECKLIST

- [ ] Frontend loads at https://skillsync-ai.vercel.app
- [ ] Backend responds at https://skillsync-api.railway.app/health
- [ ] API docs available at /docs
- [ ] CORS headers present
- [ ] Login form submits (validation works)
- [ ] Register form submits (validation works)
- [ ] Database connects (check Railway logs)
- [ ] Environment variables set correctly
- [ ] SSL certificate valid (HTTPS working)
- [ ] Health check endpoint working
- [ ] Error pages display correctly
- [ ] Mobile responsive design works
- [ ] Dark mode works (if implemented)
- [ ] Animations smooth at 60fps

---

## 📈 SCALING CONSIDERATIONS

### When Traffic Increases:

**Frontend (Vercel)**:
- Already auto-scales
- No action needed
- Check analytics for bottlenecks

**Backend (Railway)**:
- Upgrade plan
- Add more CPU/RAM
- Enable auto-scaling
- Add database replicas

**Database**:
- Add indexes for slow queries
- Enable caching (Redis)
- Upgrade storage
- Set up read replicas

---

## 🚨 EMERGENCY PROCEDURES

### Rollback Frontend
```bash
vercel rollback
# Select previous deployment
# Redeploy automatically
```

### Rollback Backend
```
Railway → Deployments → Select Previous → Click "Rollback"
```

### Emergency Disable
```bash
# Disable Vercel deployment
vercel rm deployment-url --yes

# Disable Railway service
railway service remove backend
```

---

## 📞 SUPPORT LINKS

- **Vercel**: https://vercel.com/support
- **Railway**: https://railway.app/support
- **GitHub Actions**: https://docs.github.com/en/actions
- **PostgreSQL**: https://www.postgresql.org/docs/

---

**Status**: All deployment files ready ✅

Start with Step 1 and follow through to go live! 🚀
