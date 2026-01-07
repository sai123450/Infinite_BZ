# Infinite Tech AI - Event Aggregator Web Application

A comprehensive full-stack web application designed to aggregate, filter, and manage professional networking events. Built for "Infinite Tech AI", it features auto-registration capabilities using Playwright automation.

## 🚀 Technologies Used

### Frontend (Client-Side)
*   **React (Vite)**: Fast, modern frontend framework.
*   **Tailwind CSS**: Utility-first CSS framework for the custom "Dark/Cyan" theme.
*   **Lucide React**: Beautiful, consistent icon set.
*   **Axios / Fetch**: For API communication.
*   **React Router**: For navigation between Dashboard, Auth, and Landing pages.

### Backend (Server-Side)
*   **FastAPI (Python 3.10+)**: High-performance "async" web framework.
*   **Uvicorn**: ASGI server implementation.
*   **Playwright**: Browser automation library for the Auto-Registration feature (Anti-CAPTCHA support).
*   **APScheduler**: For scheduling background scraping tasks.
*   **Pydantic**: Data validation and settings management.

### Database & Storage
*   **PostgreSQL**: Primary relational database.
*   **SQLModel / SQLAlchemy**: ORM (Object Relational Mapper) for database interactions.
*   **Alembic**: Database migration tool.

### Authentication
*   **JWT (JSON Web Tokens)**: Secure, stateless user sessions.
*   **Google OAuth2**: "Sign in with Google" integration.
*   **Passlib**: Secure password hashing (Bcrypt).

## 📂 Key Features

1.  **Event Aggregation**: Scrapes multiple sources (Eventbrite, Meetup) to create a central feed.
2.  **Auto-Registration**: "One-Click" registration for free events using a background browser robot.
3.  **Smart Filtering**: Filter events by City, Category, Date, Price, and Mode.
4.  **Premium UI**: Dark mode dashboard with "Infinite Tech" branding.

## 🛠️ Setup Instructions

### 1. Clone Repository
```bash
git clone https://github.com/PradeepShanmugaraj007/Infinite_BZ.git
cd Infinite_BZ
```

### 2. Backend Setup
Navigate to the backend folder:
```bash
cd backend
```

Create a virtual environment & install dependencies:
```bash
python -m venv venv
# Activate: .\venv\Scripts\activate (Windows) or source venv/bin/activate (Mac/Linux)
pip install -r requirements.txt
playwright install
```

Run the server:
```bash
python run.py
```
*(Server runs on http://localhost:8000)*

### 3. Frontend Setup
Navigate to the frontend folder:
```bash
cd frontend
```

Install packages and run:
```bash
npm install
npm run dev
```
*(Frontend runs on http://localhost:5174)*
