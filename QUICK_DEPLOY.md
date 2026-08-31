# ⚡ QUICK DEPLOYMENT CHECKLIST

## 🎯 15-MINUTE DEPLOYMENT

Follow these steps exactly in order. Takes ~15 minutes total.

---

## ✅ PRE-DEPLOYMENT (5 minutes)

### Accounts Setup
- [ ] Create [Vercel Account](https://vercel.com/signup) (via GitHub)
- [ ] Create [Railway Account](https://railway.app/dashboard) (via GitHub)
- [ ] Have GitHub repository ready

### Generate Secret Key
```bash
# Run this and COPY the output
openssl rand -hex 32
# Output: abc123def456... (SAVE THIS)
```

---

## ✅ STEP 1: Deploy Frontend to Vercel (3 minutes)

### Option A: CLI (Recommended)
```bash
# 1. Install
npm install -g vercel

# 2. Deploy
cd frontend
vercel --prod

# 3. Follow prompts (press Y, Enter through questions)
# 4. Save URL: https://skillsync-ai.vercel.app (or your-name.vercel.app)
```

### Option B: Dashboard
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Import GitHub repo
3. Select `frontend` folder
4. Click Deploy
5. Save URL

**✅ Frontend Live!**

---

## ✅ STEP 2: Deploy Backend to Railway (5 minutes)

### Setup
1. Go to [railway.app](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub"
4. Choose your repo

### Add PostgreSQL
1. Click "Add"
2. Select "PostgreSQL"
3. Click Add
4. Wait for setup (~1 min)

### Configure Backend
1. Click "New Service"
2. Select "GitHub Repo"
3. Choose your repo
4. Set `ROOT_DIRECTORY`: `backend`

### Add Variables
1. Click "Variables"
2. Copy/paste these:

```
SECRET_KEY = [PASTE YOUR GENERATED SECRET]
ALGORITHM = HS256
ACCESS_TOKEN_EXPIRE_MINUTES = 30
REFRESH_TOKEN_EXPIRE_DAYS = 7
CORS_ORIGINS = https://skillsync-ai.vercel.app
ENVIRONMENT = production
DEBUG = false
```

3. Click Deploy
4. Wait for build (~2 min)
5. Save backend URL (shown in railway.app)

**✅ Backend Live!**

---

## ✅ STEP 3: Link Frontend to Backend (2 minutes)

### Get Backend URL
```
railway.app → Select Project → Backend Service → Copy Public URL
Example: https://skillsync-api.railway.app
```

### Update Vercel Environment
1. Go to [vercel.com](https://vercel.com)
2. Select your project
3. Settings → Environment Variables
4. Add:
   ```
   Name: NEXT_PUBLIC_API_URL
   Value: [PASTE BACKEND URL]
   Environment: Production
   ```
5. Click Save
6. Click "Redeploy" (auto or manual)

**✅ Frontend & Backend Connected!**

---

## ✅ STEP 4: Verify Everything Works (3 minutes)

### Test Frontend
```bash
# Open in browser
https://skillsync-ai.vercel.app
# Should see landing page
```

### Test Backend
```bash
# Test health
curl https://[YOUR_BACKEND_URL]/health
# Should return: {"status": "healthy"}

# View API docs
https://[YOUR_BACKEND_URL]/docs
# Should see Swagger UI
```

### Test Connection
1. Open Frontend
2. Click "Get Started"
3. Fill Registration Form
4. Click "Create Account"
5. Should try to connect to backend
6. Check browser Console (F12) for no CORS errors

**✅ Application Working End-to-End!**

---

## 🎉 DEPLOYMENT COMPLETE!

### Your Production URLs:
```
Frontend:  https://skillsync-ai.vercel.app
Backend:   https://skillsync-api.railway.app
API Docs:  https://skillsync-api.railway.app/docs
```

### Share with Team:
```
App: https://skillsync-ai.vercel.app
Docs: https://skillsync-api.railway.app/docs
Admin: https://railway.app/project
```

---

## 🐛 Quick Troubleshooting

### Frontend Shows Errors
```
→ Clear cache: Ctrl+Shift+Delete
→ Hard refresh: Ctrl+F5
→ Check console: F12 → Console tab
```

### API Connection Failed
```
→ Check CORS_ORIGINS in Railway Variables
→ Verify backend URL in Vercel environment
→ Redeploy frontend after updating variables
```

### Backend Won't Deploy
```
→ Check Railway logs: Project → Logs
→ Verify DATABASE_URL exists
→ Ensure backend folder exists in repo
→ Check requirements.txt is valid
```

### Database Connection Failed
```
→ Check DATABASE_URL in Railway Variables
→ Verify PostgreSQL plugin is added
→ Test connection in Railway UI
→ Check firewall rules
```

---

## 📊 Auto-Deployment Setup (Optional)

Once deployed, every git push automatically redeploys:

1. Push code to GitHub
2. GitHub Actions runs tests
3. Vercel auto-deploys frontend
4. Railway auto-deploys backend
5. Done! ✅

**Already configured in your repo!**

---

## 📞 Need Help?

### Common Issues:

**"CORS Error"**
- Update CORS_ORIGINS in Railway with Vercel URL
- Redeploy backend
- Hard refresh frontend

**"Cannot reach API"**
- Verify backend URL in frontend .env
- Check Railway backend is running (view logs)
- Test: `curl https://backend-url/health`

**"Database Error"**
- Check PostgreSQL plugin in Railway
- Verify DATABASE_URL in variables
- Check firewall allows connections

**"Build Failed"**
- Check build logs (Vercel/Railway)
- Verify code has no syntax errors
- Try local build: `npm run build`

---

## ✨ NEXT STEPS

After deployment, you can:

1. **Monitor**: Check Vercel & Railway dashboards
2. **Scale**: Upgrade plans if needed
3. **Optimize**: Enable caching, add indexes
4. **Extend**: Add more features following existing patterns
5. **Team**: Add collaborators to Vercel/Railway projects

---

## 🚀 PERFORMANCE TIPS

### Frontend
- Images: Vercel automatically optimizes
- Caching: Set in vercel.json (done)
- CDN: Vercel uses global CDN (automatic)

### Backend
- Database: Add indexes for queries
- Caching: Add Redis later
- API: Use pagination for large lists

---

**Status**: Ready to deploy! 🎯

**Estimated Time**: 15 minutes  
**Cost**: Free tier works! ($0/month with limits)  
**Uptime**: 99.9% SLA  

**Let's go live!** 🚀
