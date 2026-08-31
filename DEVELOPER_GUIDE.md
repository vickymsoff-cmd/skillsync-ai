# SkillSync AI - Developer Quick Reference

## 🚀 Getting Started in 5 Minutes

### 1. Start Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows | source venv/bin/activate (Mac/Linux)
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```
✅ Backend running at: http://localhost:8000

### 2. Start Frontend
```bash
cd frontend
npm install --legacy-peer-deps  # if not done yet
npm run dev
```
✅ Frontend running at: http://localhost:3000

### 3. Check What's Working
- Landing page: http://localhost:3000
- Login page: http://localhost:3000/login
- Register page: http://localhost:3000/register
- Dashboard: http://localhost:3000/dashboard (requires login)
- Backend API docs: http://localhost:8000/docs

---

## 📁 Key Files to Know

### Frontend
```
src/
├── app/page.tsx              # Landing page
├── app/login/page.tsx        # Login
├── app/register/page.tsx     # Registration
├── app/dashboard/page.tsx    # Student dashboard
├── components/               # Reusable UI components
├── services/api.ts          # API client & endpoints
├── store/index.ts           # Zustand state management
└── types/index.ts           # TypeScript types
```

### Backend
```
app/
├── main.py                  # FastAPI app initialization
├── core/
│   ├── config.py           # Settings & env variables
│   ├── database.py         # Database connection
│   └── security.py         # JWT & password utilities
├── models/models.py        # SQLAlchemy models (30+)
├── schemas/schemas.py      # Pydantic request/response schemas
└── api/routes/
    ├── auth.py             # Auth endpoints
    ├── users.py            # User management
    ├── students.py         # Student specific
    ├── skills.py           # Skill management
    ├── assessments.py      # Assessment system
    ├── opportunities.py    # Jobs/Internships
    ├── applications.py     # Application tracking
    ├── portfolios.py       # Digital portfolio
    ├── recommendations.py  # AI recommendations
    ├── analytics.py        # Analytics & insights
    ├── academicians.py     # Faculty features
    └── industries.py       # Company/Recruiter features
```

---

## 🔑 Important Credentials & URLs

### Development
- Frontend: http://localhost:3000
- Backend: http://localhost:8000
- API Docs: http://localhost:8000/docs
- Database: PostgreSQL (configure in backend/.env)

### Environment Variables

**Backend (.env)**
```
DATABASE_URL=postgresql://user:password@localhost:5432/skillsync_ai
SECRET_KEY=your-secret-key-change-in-production
```

**Frontend (.env.local)**
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## 🎯 Common Development Tasks

### Adding a New API Endpoint

1. **Define Pydantic Schema** (backend/app/schemas/schemas.py)
```python
class NewFeatureCreate(BaseModel):
    field1: str
    field2: int
```

2. **Define SQLAlchemy Model** (backend/app/models/models.py)
```python
class NewFeature(Base):
    __tablename__ = "new_features"
    id = Column(String, primary_key=True)
    field1 = Column(String)
```

3. **Create Route** (backend/app/api/routes/new_feature.py)
```python
@router.get("")
async def list_features(db: Session = Depends(get_db)):
    return db.query(NewFeature).all()
```

4. **Add to main.py**
```python
from app.api.routes import new_feature
app.include_router(new_feature.router, prefix="/api/new-feature")
```

5. **Add API Service** (frontend/src/services/api.ts)
```typescript
async getFeatures() {
    const response = await this.api.get("/api/new-feature");
    return response.data;
}
```

6. **Use in Component** (frontend/src/app/page.tsx)
```typescript
const data = await apiService.getFeatures();
```

---

### Adding a New Frontend Component

1. **Create Component** (frontend/src/components/MyComponent.tsx)
```typescript
export const MyComponent: React.FC<MyComponentProps> = (props) => {
    return <div>Component</div>
}
```

2. **Use in Page**
```typescript
import { MyComponent } from "@/components/MyComponent"

export default function Page() {
    return <MyComponent prop1="value" />
}
```

---

### Updating Database Schema

1. Edit model in backend/app/models/models.py
2. Create new table or modify existing one
3. If using migration tools, create migration
4. Recreate database: `python -c "from app.core.database import Base, engine; Base.metadata.create_all(bind=engine)"`

---

## 🧪 Testing Endpoints

### Using curl
```bash
# Register
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "full_name": "John Doe",
    "password": "password123",
    "role": "student"
  }'

# Login
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

### Using Swagger UI
Visit: http://localhost:8000/docs
- All endpoints are interactive
- Can test directly from browser

---

## 📊 Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                  Frontend (Next.js)                      │
│  Landing → Login/Register → Dashboard → Features        │
└───────────────────┬─────────────────────────────────────┘
                    │ Axios API Client
                    │ (JWT in headers)
┌───────────────────▼─────────────────────────────────────┐
│                 Backend (FastAPI)                        │
│  ┌──────────────────────────────────────────────────┐   │
│  │ Routes: Auth, Users, Skills, Assessments, etc    │   │
│  ├──────────────────────────────────────────────────┤   │
│  │ Services: Business logic layer                   │   │
│  ├──────────────────────────────────────────────────┤   │
│  │ Repositories: Data access layer                  │   │
│  └──────────────────────────────────────────────────┘   │
└───────────────────┬─────────────────────────────────────┘
                    │ SQLAlchemy ORM
┌───────────────────▼─────────────────────────────────────┐
│              Database (PostgreSQL)                       │
│  Users, Skills, Assessments, Opportunities, etc         │
└─────────────────────────────────────────────────────────┘
```

---

## 🐛 Debugging Tips

### Frontend
- Open browser DevTools (F12)
- Check Network tab for API calls
- Check Console for errors
- Use React DevTools extension
- Check localStorage for tokens: `localStorage.getItem('access_token')`

### Backend
- Check terminal for logs: `uvicorn app.main:app --reload`
- Visit http://localhost:8000/docs for interactive API testing
- Check .env file for configuration issues
- Use Python debugger: `import pdb; pdb.set_trace()`

### Database
- Connect with `psql` or pgAdmin
- Check tables: `\dt`
- Check schema: `\d table_name`

---

## 📈 Performance Tips

- Frontend: Use React DevTools Profiler
- Backend: Use FastAPI's async capabilities
- Database: Add indexes for frequently queried fields
- Caching: Implement Redis for frequently accessed data

---

## 🔒 Security Checklist

- [ ] Never commit .env files
- [ ] Rotate SECRET_KEY regularly
- [ ] Use HTTPS in production
- [ ] Validate all user inputs
- [ ] Implement rate limiting
- [ ] Add CORS restrictions
- [ ] Use secure password requirements
- [ ] Implement refresh token rotation
- [ ] Add audit logging

---

## 📚 Additional Resources

- FastAPI Docs: https://fastapi.tiangolo.com
- Next.js Docs: https://nextjs.org
- SQLAlchemy Docs: https://sqlalchemy.org
- Tailwind CSS: https://tailwindcss.com
- Framer Motion: https://www.framer.com/motion

---

## 🤝 Code Style Guidelines

- Use TypeScript for all frontend code
- Use type hints for all Python functions
- Follow PEP 8 for Python
- Follow Prettier for JavaScript/TypeScript
- Use meaningful variable names
- Add comments for complex logic
- Keep functions small and focused

---

## 🚀 Deployment Preparation

When ready for production:
1. Set `DEBUG = False` in backend
2. Use strong SECRET_KEY
3. Configure proper CORS origins
4. Set up database migrations
5. Configure static file serving
6. Set up monitoring & logging
7. Configure CI/CD pipeline
8. Set up backup strategy
9. Configure domain & SSL
10. Test all features thoroughly

---

**Last Updated**: August 31, 2026
**Version**: 1.0.0 (MVP Foundation)
