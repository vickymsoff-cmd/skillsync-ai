# SkillSync AI - Academia-Industry Collaboration Platform

A comprehensive, production-ready AI-powered platform connecting students, academicians, institutions, and industries through intelligent skill assessment, personalized learning recommendations, and opportunity matching.

## 🎯 Project Overview

SkillSync AI solves the critical gap between academic skills and industry requirements by providing:

- **AI-Powered Skill Assessment**: Technical and soft skills evaluation
- **Intelligent Gap Analysis**: Identify and bridge skill gaps dynamically
- **Personalized Learning Paths**: Customized roadmaps based on career goals
- **Smart Opportunity Matching**: ML-based matching between students and opportunities
- **Digital Skill Passport**: Verified credentials and portfolio
- **Institution Analytics**: Comprehensive dashboards for institutions and administrators

## 📋 Table of Contents

- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [Features](#features)
- [API Documentation](#api-documentation)
- [Architecture](#architecture)
- [Contributing](#contributing)

## 📁 Project Structure

```
SKILLSYNC AI/
├── frontend/                 # Next.js React Application
│   ├── src/
│   │   ├── app/             # App Router pages
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── services/        # API services
│   │   ├── store/           # Zustand state management
│   │   ├── types/           # TypeScript type definitions
│   │   ├── utils/           # Utility functions
│   │   └── styles/          # Global styles
│   ├── package.json
│   ├── tsconfig.json
│   └── next.config.ts
│
├── backend/                  # FastAPI Python Application
│   ├── app/
│   │   ├── main.py          # Application entry point
│   │   ├── api/
│   │   │   └── routes/      # API endpoints
│   │   │       ├── auth.py
│   │   │       ├── users.py
│   │   │       ├── students.py
│   │   │       ├── skills.py
│   │   │       ├── assessments.py
│   │   │       ├── opportunities.py
│   │   │       ├── applications.py
│   │   │       ├── portfolios.py
│   │   │       ├── recommendations.py
│   │   │       └── analytics.py
│   │   ├── models/          # SQLAlchemy database models
│   │   ├── schemas/         # Pydantic request/response schemas
│   │   ├── services/        # Business logic services
│   │   ├── core/
│   │   │   ├── config.py    # Configuration
│   │   │   ├── database.py  # Database connection
│   │   │   └── security.py  # JWT & password utilities
│   │   ├── ai_engine/       # AI/ML services
│   │   ├── repositories/    # Data access layer
│   │   └── utils/           # Helper utilities
│   ├── requirements.txt     # Python dependencies
│   ├── .env                 # Environment variables
│   └── .gitignore
│
├── docs/                     # Documentation
└── README.md
```

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 16 (React 19)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React
- **HTTP Client**: Axios

### Backend
- **Framework**: FastAPI
- **Language**: Python 3.10+
- **Database**: PostgreSQL
- **ORM**: SQLAlchemy
- **Authentication**: JWT (python-jose)
- **Password Hashing**: Bcrypt
- **Async**: Uvicorn + AsyncIO
- **Validation**: Pydantic

### DevOps & Tools
- **Version Control**: Git
- **Package Manager**: npm (frontend), pip (backend)
- **Database**: PostgreSQL

## 🚀 Setup Instructions

### Prerequisites
- Node.js 18+ and npm
- Python 3.10+
- PostgreSQL 14+
- Git

### Backend Setup

1. **Navigate to backend directory**
```bash
cd backend
```

2. **Create and activate virtual environment**
```bash
python -m venv venv
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

3. **Install dependencies**
```bash
pip install -r requirements.txt
```

4. **Set up environment variables**
```bash
# Copy and edit .env file
cp .env .env.local
# Update DATABASE_URL, SECRET_KEY, etc.
```

5. **Initialize database**
```bash
# Create database tables
python -c "from app.core.database import Base, engine; Base.metadata.create_all(bind=engine)"
```

6. **Run development server**
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Backend API will be available at: `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install --legacy-peer-deps
```

3. **Set up environment variables**
```bash
# Copy and edit .env.local
cp .env.local .env.local.example
# NEXT_PUBLIC_API_URL should point to your backend
```

4. **Run development server**
```bash
npm run dev
```

Frontend will be available at: `http://localhost:3000`

## ✨ Features

### For Students
- ✅ Skill Assessment (Technical, Soft Skills, Aptitude)
- ✅ Skill Profiling & Verification Levels
- ✅ Skill Gap Analysis for Target Roles
- ✅ Personalized Learning Roadmaps
- ✅ Opportunity Discovery & Matching
- ✅ Application Tracking (Kanban board)
- ✅ Digital Portfolio
- ✅ AI Career Copilot
- ✅ Mentorship System
- ✅ Industry Readiness Score

### For Academicians
- ✅ Faculty Profile & Expertise Showcase
- ✅ Industry Collaboration Opportunities
- ✅ FDP Program Management
- ✅ Student Mentorship
- ✅ Research Collaboration
- ✅ Skill Demand Analytics

### For Industries
- ✅ Post Internships, Jobs, Projects
- ✅ Candidate Discovery & Matching
- ✅ Assessment Creation & Management
- ✅ Mentorship Programs
- ✅ Live Project Collaboration
- ✅ Candidate Analytics

### For Institutions
- ✅ Student Analytics Dashboard
- ✅ Skill Heatmap by Department
- ✅ Industry Demand vs Supply Analysis
- ✅ Placement Tracking
- ✅ Institution Performance Metrics
- ✅ Industry Partnership Management

### Platform Features
- ✅ JWT Authentication & Authorization
- ✅ Role-Based Access Control
- ✅ Dark/Light Mode
- ✅ Responsive Design
- ✅ Real-time Notifications
- ✅ Document Management
- ✅ API Rate Limiting
- ✅ Audit Logging
- ✅ Demo Data Seeding

## 📚 API Documentation

### Authentication Endpoints
```
POST   /api/auth/register      - Register new user
POST   /api/auth/login         - User login
POST   /api/auth/refresh       - Refresh access token
POST   /api/auth/forgot-password
POST   /api/auth/reset-password
POST   /api/auth/verify-email
```

### User Endpoints
```
GET    /api/users/me           - Get current user
GET    /api/users/{user_id}    - Get user by ID
PUT    /api/users/me           - Update current user
GET    /api/users              - List all users (paginated)
```

### Student Endpoints
```
GET    /api/students/me        - Get student profile
GET    /api/students/{id}      - Get student by ID
GET    /api/students/dashboard - Get student dashboard
```

### Skills Endpoints
```
GET    /api/skills             - List skills
GET    /api/skills/{id}        - Get skill details
POST   /api/skills             - Create skill (admin)
GET    /api/skills/user/{id}   - Get user skills
POST   /api/skills/user/skill  - Add skill to user
```

### Assessment Endpoints
```
GET    /api/assessments        - List assessments
GET    /api/assessments/{id}   - Get assessment
POST   /api/assessments/{id}/start
POST   /api/assessments/{id}/submit
GET    /api/assessments/attempts/{user_id}
```

### Opportunities Endpoints
```
GET    /api/opportunities      - List opportunities
GET    /api/opportunities/{id} - Get opportunity
POST   /api/opportunities      - Post opportunity (industry)
GET    /api/opportunities/recommended
```

### Applications Endpoints
```
GET    /api/applications       - Get user applications
POST   /api/applications/{id}  - Apply for opportunity
GET    /api/applications/{id}  - Get application
PUT    /api/applications/{id}/status
```

### Recommendations Endpoints
```
GET    /api/recommendations/opportunities
GET    /api/recommendations/programs
GET    /api/recommendations/careers
GET    /api/recommendations/skills
POST   /api/recommendations/regenerate
```

### Analytics Endpoints
```
GET    /api/analytics/institution/dashboard
GET    /api/analytics/institution/skill-heatmap
GET    /api/analytics/placement-analytics
GET    /api/analytics/platform/overview
```

## 🏗 Architecture

### Database Schema
- Users (with role-based access)
- Student/Academician/Industry/Institution Profiles
- Skills & User Skills
- Assessments & Assessment Attempts
- Career Roles & Requirements
- Opportunities & Applications
- Learning Programs & Progress
- Portfolios & Projects
- Recommendations
- Notifications
- Audit Logs

### AI/ML Pipeline
1. **Skill Extraction**: Parse resume, certificates, projects
2. **Skill Gap Analysis**: Compare user skills vs target role requirements
3. **Opportunity Matching**: Score and rank opportunities for users
4. **Career Recommendation**: Suggest careers based on skills and interests
5. **Learning Recommendation**: Suggest programs based on skill gaps

### Security
- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control (RBAC)
- API rate limiting
- CORS configuration
- Audit logging
- Secure file storage

## 🔄 Development Workflow

1. **Create feature branch**
```bash
git checkout -b feature/your-feature-name
```

2. **Make changes and commit**
```bash
git commit -am "Add feature description"
```

3. **Push to repository**
```bash
git push origin feature/your-feature-name
```

4. **Create Pull Request**

## 📝 Environment Variables

### Backend (.env)
```
DATABASE_URL=postgresql://user:password@localhost:5432/skillsync_ai
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7
CORS_ORIGINS=http://localhost:3000,http://localhost:3001
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

SkillSync AI is developed as part of the Smart India Hackathon 2026.

## 📞 Support

For support, email support@skillsync.ai or open an issue on GitHub.

---

**Happy coding! 🚀**
