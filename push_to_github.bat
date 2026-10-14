@echo off
echo Configuring Git identity...
git config user.name "Cabrel Ngamaleu"
git config user.email "cabrel@portfolio.com"

echo.
echo Staging all changes...
git add -A

echo.
echo Creating commit...
git commit -m "feat: transform portfolio into full-stack application with admin dashboard

- Restructured project as monorepo (client/ and server/)
- Implemented complete REST API with Express and MongoDB
- Added JWT authentication and security middleware
- Built admin dashboard with CRUD operations for projects, blog, and messages
- Enhanced frontend with glassmorphism design and animations
- Integrated analytics and Chart.js visualizations
- Added Docker support with multi-stage builds
- Configured CI/CD pipeline with GitHub Actions
- Implemented comprehensive security practices (Helmet, CORS, rate limiting)
- Added Cloudinary integration for image uploads
- Configured email notifications with Nodemailer
- Created Jest tests with 70%% coverage threshold

Tech Stack: React 18, Node.js, Express, MongoDB, Tailwind CSS, JWT, Docker"

echo.
echo Pushing to GitHub...
git push origin main

echo.
echo Done! Check your GitHub repository.
pause
