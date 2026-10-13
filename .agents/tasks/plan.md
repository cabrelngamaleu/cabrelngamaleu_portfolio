# Implementation Plan: Full-Stack Portfolio Refactoring — Cabrel Ngamaleu

## Project Context

**Current State:**
- React 18 app created with Create React App
- Existing components: Home, About, Resume, Projects, Blog, Contact, Sidenav
- Tailwind CSS configured with custom theme (designColor: #edff20, bodyColor: #191919)
- Framer Motion animations, react-icons, axios already installed
- 43 existing files in src/ directory (components, assets, index.js, App.js, Home.js)
- French language UI ("À propos", "Projets", "Résumé", etc.)

**Target State:**
- Full-stack monorepo: client/ (React 18) + server/ (Node.js + Express + MongoDB)
- Admin dashboard with JWT authentication
- CI/CD with GitHub Actions
- Docker containerization
- Enhanced security with Helmet, CORS, rate-limiting, Joi validation

**Build & Test Commands:**
- Frontend: `npm start` (dev), `npm run build` (prod), `npm test` (tests)
- Backend (to be created): `npm run dev` (nodemon), `npm test` (jest + supertest)
- Full project: `npm run build:all`, `npm run test:all`

**Key Constraints:**
- MUST preserve Git history when moving files (use `git mv`)
- MUST maintain existing React 18 setup (enhance, don't replace)
- French language interface throughout
- Responsive design: 320px to 1920px
- Minimum 70% test coverage for backend
- All secrets in .env files (never in code)

---

# Implementation Plan

## PHASE 1 — Backend Foundation (7-10 hours)

### 1.1 Repository Restructuring

- [ ] 1. Create client/ and server/ directory structure, preserving Git history.
      Use `git mv` to move existing src/, public/, package.json, tailwind.config.js to client/.
      This preserves Git blame and history for all existing files.
      Files:
      - Create: client/ directory
      - Move: src/ → client/src/
      - Move: public/ → client/public/
      - Move: package.json → client/package.json
      - Move: tailwind.config.js → client/tailwind.config.js
      - Move: .gitignore → client/.gitignore (will create root .gitignore later)
      Verify: Run `git status` and confirm files show as "renamed" not "deleted/added". Run `cd client && npm install && npm start` and confirm app loads at localhost:3000.

- [ ] 2. Create server/ directory structure with all config, middleware, models, routes, controllers folders.
      Includes package.json with Express, Mongoose, JWT, bcrypt, Helmet, CORS, express-rate-limit, Joi, multer, cloudinary, nodemailer, dotenv, mongo-sanitize, hpp.
      Dev dependencies: nodemon, jest, supertest, eslint, prettier.
      Files:
      - server/package.json
      - server/.env.example (MONGODB_URI, JWT_SECRET, JWT_EXPIRE, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS, FRONTEND_URL, PORT)
      - server/config/ (db.js, cloudinary.js, env.js)
      - server/middleware/ (auth.js, rateLimiter.js, errorHandler.js, validate.js, upload.js, security.js)
      - server/models/ (Project.js, BlogPost.js, Message.js, User.js, Analytics.js)
      - server/routes/ (auth.routes.js, projects.routes.js, blog.routes.js, messages.routes.js, analytics.routes.js)
      - server/controllers/ (auth.controller.js, projects.controller.js, blog.controller.js, messages.controller.js, analytics.controller.js)
      - server/utils/ (sendEmail.js, generateToken.js)
      - server/server.js
      Verify: Run `cd server && npm install` and confirm all dependencies install without errors. Check that server/package.json has all required packages.

- [ ] 3. Create root package.json with workspace scripts and root .gitignore.
      Root package.json uses npm workspaces to manage client/ and server/ together.
      Scripts: start:client, start:server, start:all (concurrently), build:client, build:server, build:all, test:client, test:server, test:all, install:all.
      Root .gitignore: node_modules, .env, build, dist, coverage, .DS_Store, logs, *.log.
      Files:
      - package.json (root, with "workspaces": ["client", "server"])
      - .gitignore (root)
      - Install concurrently: `npm install --save-dev concurrently` at root
      Verify: Run `npm run install:all` from root and confirm both client and server dependencies install. Run `npm run start:all` and verify both servers start (client on :3000, server on :5000).

### 1.2 MongoDB Models

- [ ] 4. Implement all five MongoDB models with Mongoose schemas and validation.
      Project: title, description, longDescription, technologies[], category (enum), imageUrl, liveUrl, githubUrl, featured (Boolean), order (Number), timestamps.
      BlogPost: title, slug (unique, indexed), content (markdown), excerpt, coverImage, tags[], category, published (Boolean), timestamps.
      Message: name, email, message, read (Boolean, default false), timestamps.
      User: username (unique), email (unique), password (hashed with bcrypt), role (default 'admin'), lastLogin, timestamps. Include pre-save hook to hash password.
      Analytics: event (enum: 'page_view', 'project_click', 'contact_submit'), page, referrer, userAgent, timestamp.
      Files:
      - server/models/Project.js
      - server/models/BlogPost.js
      - server/models/Message.js
      - server/models/User.js
      - server/models/Analytics.js
      Verify: Create server/scripts/seedDb.js to test model creation. Run `node server/scripts/seedDb.js` and confirm documents insert into MongoDB without errors. Check MongoDB Atlas/Compass to verify collections created.

### 1.3 Authentication & Security Middleware

- [ ] 5. Implement JWT authentication system with login, token generation, and auth middleware.
      auth.controller.js: login (validate credentials, generate JWT), changePassword (verify old password, hash new).
      generateToken.js: JWT sign with 24h expiration, using JWT_SECRET from env.
      auth middleware: verify JWT from Authorization header, attach user to req.user, reject if invalid/expired.
      Password hashing: bcrypt with 12 rounds in User model pre-save hook.
      Files:
      - server/controllers/auth.controller.js
      - server/routes/auth.routes.js
      - server/middleware/auth.js
      - server/utils/generateToken.js
      Verify: Write test in server/tests/auth.test.js using Jest + Supertest. Test POST /api/auth/login with valid/invalid credentials, test protected route access with/without token. Run `npm test` in server/ and confirm all auth tests pass.

- [ ] 6. Implement security middleware: Helmet, CORS, rate-limiter, Joi validation, sanitization, HPP.
      Helmet: secure HTTP headers (CSP, X-Frame-Options, etc.).
      CORS: allow only FRONTEND_URL origin from env.
      Rate limiter: 100 requests per 15 minutes per IP using express-rate-limit.
      Joi validation middleware: validate.js to wrap Joi schemas and return 400 on validation errors.
      mongo-sanitize: prevent NoSQL injection on all req.body, req.query, req.params.
      HPP: prevent HTTP parameter pollution.
      Apply in server.js before routes.
      Files:
      - server/middleware/security.js (combines all security middleware setup)
      - server/middleware/rateLimiter.js
      - server/middleware/validate.js (Joi wrapper)
      - Update server/server.js to use all security middleware
      Verify: Start server and test rate limiting by sending 101 requests rapidly (use bash loop or Postman). Confirm 101st request gets 429 Too Many Requests. Test CORS by sending request from unauthorized origin, confirm rejection. Check response headers for Helmet (X-Content-Type-Options, X-Frame-Options).

### 1.4 API Endpoints Implementation

- [ ] 7. Implement Projects CRUD API with all routes, controllers, Joi validation, and image upload.
      Routes: GET /api/projects (public), GET /api/projects/:id (public), POST /api/projects (admin, auth required), PUT /api/projects/:id (admin), DELETE /api/projects/:id (admin).
      Controller: list (filter by category/featured, sort by order), getById, create (upload image to Cloudinary), update, delete.
      Validation: Joi schemas for create/update (title required, technologies array, category enum, URLs format).
      Image upload: multer middleware to handle file, cloudinary helper to upload and return secure_url.
      Files:
      - server/controllers/projects.controller.js
      - server/routes/projects.routes.js
      - server/middleware/upload.js (multer config for images)
      - server/config/cloudinary.js
      Verify: Write tests in server/tests/projects.test.js. Test GET /api/projects (public access), POST /api/projects without auth (expect 401), POST with auth and valid data (expect 201), PUT/DELETE with auth. Run `npm test` and confirm all project tests pass. Manually test image upload with Postman/Insomnia.

- [ ] 8. Implement Blog CRUD API with slug generation, markdown support, and published status.
      Routes: GET /api/blog (public, filter by published=true), GET /api/blog/:slug (public), POST /api/blog (admin), PUT /api/blog/:id (admin), DELETE /api/blog/:id (admin).
      Controller: list (only published for public), getBySlug, create (auto-generate slug from title), update, delete.
      Slug generation: slugify title (lowercase, hyphens, unique).
      Validation: Joi schemas (title, content, tags array).
      Files:
      - server/controllers/blog.controller.js
      - server/routes/blog.routes.js
      - Install slugify package: `npm install slugify` in server/
      Verify: Write tests in server/tests/blog.test.js. Test slug auto-generation, test published filter (unpublished posts not returned to public), test getBySlug. Run `npm test` and confirm all blog tests pass.

- [ ] 9. Implement Messages API with email notifications using Nodemailer.
      Routes: POST /api/messages (public, for contact form), GET /api/messages (admin), PATCH /api/messages/:id/read (admin), DELETE /api/messages/:id (admin).
      Controller: create (validate, save to DB, send email notification to admin), list (admin sees all, sort by read status), markRead, delete.
      Email: sendEmail.js helper using nodemailer with SMTP config from env. Email template for new message notification.
      Validation: Joi schema (name, email format, message min length).
      Rate limit: stricter limit on POST /api/messages (10 per 15 min per IP) to prevent spam.
      Files:
      - server/controllers/messages.controller.js
      - server/routes/messages.routes.js
      - server/utils/sendEmail.js
      - server/templates/newMessageEmail.js (HTML email template)
      Verify: Write tests in server/tests/messages.test.js. Test POST /api/messages creates message and verify email sent (mock nodemailer in test). Test GET requires auth, test markRead toggles status. Run `npm test` and confirm all message tests pass. Manually test email by submitting contact form and checking email inbox.

- [ ] 10. Implement Analytics API for tracking page views and events.
       Routes: POST /api/analytics/event (public, no auth), GET /api/analytics/dashboard (admin).
       Controller: trackEvent (create analytics document with event type, page, referrer, userAgent), getDashboard (aggregate stats: total visits, visits by day/week/month, top pages, event counts).
       Validation: event enum validation.
       Dashboard aggregation: MongoDB aggregation pipeline for grouping by date and event type.
       Files:
       - server/controllers/analytics.controller.js
       - server/routes/analytics.routes.js
       Verify: Write tests in server/tests/analytics.test.js. Test POST /api/analytics/event creates document, test GET /api/analytics/dashboard returns aggregated stats. Run `npm test` and confirm all analytics tests pass. Test aggregation manually by creating multiple events and checking dashboard response.

- [ ] 11. Create centralized error handler and connect all routes in server.js.
       Error handler middleware: catches all errors, formats response (message, statusCode, stack in dev mode), logs errors.
       404 handler: catch-all for undefined routes.
       server.js: connect MongoDB, apply security middleware, mount all route modules (/api/auth, /api/projects, /api/blog, /api/messages, /api/analytics), error handlers last.
       Add startup seed script to create default admin user if User collection is empty.
       Files:
       - server/middleware/errorHandler.js
       - server/server.js (complete integration)
       - server/scripts/createAdmin.js (seed default admin)
       Verify: Run `npm run dev` in server/. Check console logs confirm MongoDB connected, server listening on configured port. Test all API endpoints with Postman/Insomnia collection. Test 404 for undefined route (e.g., GET /api/invalid). Run full backend test suite `npm test` and confirm minimum 70% coverage using `npm test -- --coverage`.

---

## PHASE 2 — Frontend Public Portfolio (8-12 hours)

### 2.1 Tailwind & Design System Enhancement

- [ ] 12. Enhance Tailwind config with glassmorphism utilities, gradient helpers, and animation presets.
       Add backdrop-blur utilities, gradient text plugin, custom animations for scroll-triggered effects.
       Update index.css with glassmorphism classes (.glass-card, .glass-nav), gradient text utilities (.gradient-text-green), particle animation keyframes.
       Import fonts in index.css: Poppins (body), Montserrat (titles) from Google Fonts.
       Files:
       - client/tailwind.config.js (extend with glass utilities, more animations)
       - client/src/index.css (add utility classes, gradient definitions, animation keyframes)
       Verify: Run `cd client && npm start`. Open browser DevTools and inspect elements to confirm new classes work (.glass-card shows backdrop-blur, gradient-text renders). Test on multiple screen sizes (320px, 768px, 1920px) using responsive design mode.

- [ ] 13. Setup Axios API service with base configuration and interceptors.
       Create api.js with axios instance pointing to backend API (REACT_APP_API_URL from .env).
       Interceptors: add JWT token from localStorage to Authorization header on every request, handle 401 (logout), handle network errors globally.
       Create client/.env.example with REACT_APP_API_URL=http://localhost:5000/api.
       Files:
       - client/src/services/api.js
       - client/.env.example
       - client/.env.local (for local dev: REACT_APP_API_URL=http://localhost:5000/api)
       Verify: Import api.js in a component, make a test GET request to backend (e.g., api.get('/projects')). Start both client and server (`npm run start:all` from root), check Network tab in DevTools to confirm request sent to http://localhost:5000/api/projects with correct headers. Test interceptor by setting invalid token in localStorage and confirming 401 triggers logout.

- [ ] 14. Create AuthContext for global authentication state management.
       AuthContext provides: user state, login function (call API, store token in localStorage, set user), logout function (clear token, clear user), isAuthenticated boolean.
       Wrap app in AuthContext.Provider in index.js.
       Create useAuth custom hook for consuming context.
       Files:
       - client/src/context/AuthContext.jsx
       - client/src/hooks/useAuth.js
       Verify: In Dashboard login component, use useAuth to call login(). Check localStorage for token after login. Test logout clears token and redirects. Start client app, open React DevTools, confirm AuthContext provider wraps app and state updates on login/logout.

### 2.2 Public Portfolio Components

- [ ] 15. Restructure client/src/components/ with new layout: layout/, hero/, about/, skills/, projects/, blog/, contact/, common/.
       Move existing components to new structure: 
       - components/home/Left.js → components/hero/HeroSection.jsx (refactor)
       - components/about/About.js → components/about/AboutSection.jsx (refactor to use glassmorphism)
       - components/resume/Skills.js → components/skills/SkillsSection.jsx (refactor with SVG circles)
       - components/projects/Projects.js → components/projects/ProjectsSection.jsx (refactor to fetch from API)
       - components/blog/Blog.js → components/blog/BlogSection.jsx (refactor to fetch from API)
       - components/contact/Contact.js → components/contact/ContactSection.jsx (refactor form to API)
       - components/home/sidenav/Sidenav.js → components/layout/Navbar.jsx (refactor to glassmorphism + scroll-spy)
       - Create components/layout/Footer.jsx, components/common/SectionTitle.jsx, components/common/GlassCard.jsx
       Keep existing roundDesigns/ components for now (decorative elements).
       Use `git mv` for moves to preserve history.
       Files:
       - Multiple moves and refactors (see list above)
       - New: components/layout/ScrollToTop.jsx, components/common/AnimatedButton.jsx, components/common/LoadingSpinner.jsx
       Verify: After restructure, run `npm start` in client/. Confirm app still renders without errors. Check browser console for no import errors. Use git status to verify moves show as "renamed".

- [ ] 16. Implement new Navbar with glassmorphism, scroll-spy, and mobile hamburger menu.
       Fixed position navbar with backdrop-blur, active link highlighting based on scroll position.
       Desktop: horizontal nav links (À propos, Compétences, Projets, Blog, Contact) with smooth scroll.
       Mobile: hamburger icon triggers slide-in sidebar with nav links, close button, framer-motion animations.
       Scroll-spy: highlight nav link when corresponding section is in viewport (use IntersectionObserver).
       Files:
       - client/src/components/layout/Navbar.jsx
       - client/src/hooks/useScrollSpy.js (custom hook for scroll-spy logic)
       Verify: Start client app, scroll through page and confirm nav links highlight as sections come into view. Test mobile menu (resize to 320px width) and verify hamburger opens/closes sidebar with animation. Check navbar blur effect by scrolling content behind it.

- [ ] 17. Create Hero section with gradient text animation, particles background, and typewriter effect.
       Hero displays: "Bonjour, je suis Cabrel Ngamaleu" with gradient animated text.
       Typewriter effect cycling through roles: "Développeur Full-Stack", "Ingénieur Logiciel", etc. (use react-simple-typewriter, already installed).
       Profile photo with rotating gradient border animation.
       Particles: CSS-only animated particles or simple canvas particles (lightweight, not particles.js library).
       CTA buttons: "Voir mes projets" (scroll to projects), "Me contacter" (scroll to contact).
       Files:
       - client/src/components/hero/HeroSection.jsx
       - client/src/components/hero/ParticlesBackground.jsx (CSS or lightweight canvas)
       Verify: Load homepage and confirm typewriter cycles through phrases, gradient text animates smoothly, photo border rotates continuously. Test CTA buttons scroll to correct sections. Verify responsive layout at 320px, 768px, 1920px widths.

- [ ] 18. Refactor About section with glassmorphism cards and animated stat counters.
       Three cards: "À propos de moi" (bio text), "Mes services" (service icons + descriptions), "Fun Facts" (stats).
       Stats with animated counters: "6+ ans d'expérience", "X projets réalisés", "X clients satisfaits" (animate from 0 to number on scroll into view).
       Use framer-motion for fade-in animations on scroll.
       Cards: glass effect (backdrop-blur-lg, bg-white/10, border).
       Files:
       - client/src/components/about/AboutSection.jsx
       - client/src/components/about/StatsCounter.jsx (animated counter component)
       - client/src/hooks/useInView.js (IntersectionObserver hook to trigger animations)
       Verify: Scroll to About section and confirm cards fade in with framer-motion. Verify counters animate from 0 to target number when section enters viewport. Check glassmorphism effect (blur visible over background). Test responsive layout.

- [ ] 19. Create Skills section with SVG animated circular progress bars and tech icons.
       Display skills in categories: Frontend (React, Tailwind, etc.), Backend (Node.js, Express, MongoDB, etc.), Tools (Git, Docker, etc.).
       Each skill: SVG circle with animated stroke (stroke-dashoffset animation on scroll), percentage label, tech icon (react-icons).
       Skills data: store in client/src/data/skillsData.js for easy updating.
       Animate circles on scroll into view using framer-motion or CSS animations.
       Files:
       - client/src/components/skills/SkillsSection.jsx
       - client/src/components/skills/SkillCircle.jsx (SVG circle component)
       - client/src/components/skills/TechIcon.jsx (icon component)
       - client/src/data/skillsData.js
       Verify: Scroll to Skills section and confirm SVG circles animate (stroke fills from 0% to target %). Verify tech icons display correctly. Test responsive grid layout (1 column mobile, 2-3 columns desktop). Check animation triggers only once per scroll into view.

- [ ] 20. Refactor Projects section to fetch from API, with category filter, 3D tilt effect on cards.
       Fetch projects from GET /api/projects on component mount using axios.
       Filter tabs: "Tous", "Web", "Mobile", "Design", "Autre" (category filter).
       Project cards: image, title, description, technologies tags, live URL, GitHub URL buttons.
       3D tilt effect on hover using vanilla-tilt-react or CSS transform (perspective, rotateX, rotateY).
       Loading state with spinner, error state if API fails, fallback to static data if needed.
       Featured projects shown first (featured: true in DB).
       Files:
       - client/src/components/projects/ProjectsSection.jsx (fetch logic, filter state)
       - client/src/components/projects/ProjectCard.jsx (card with tilt effect)
       - client/src/components/projects/ProjectFilter.jsx (filter tabs)
       - Install vanilla-tilt-react: `npm install vanilla-tilt-react` in client/ (or implement CSS tilt)
       Verify: Start backend and frontend, load page, confirm projects load from API. Open Network tab and verify GET /api/projects called. Test category filters switch displayed projects. Hover over cards and confirm 3D tilt effect. Test with backend stopped (error state should display fallback message).

- [ ] 21. Refactor Blog section to fetch from API, with cards, tags, and date formatting.
       Fetch published blog posts from GET /api/blog on component mount.
       Blog cards: cover image, title, excerpt, publication date (formatted: "12 Jan 2024"), tags, "Lire la suite" button (link to /blog/:slug).
       Date formatting: use date-fns or Intl.DateTimeFormat for French locale.
       Fade-in animation on scroll using framer-motion.
       Display max 3 posts on homepage, "Voir tous les articles" button to full blog page (future).
       Files:
       - client/src/components/blog/BlogSection.jsx
       - client/src/components/blog/BlogCard.jsx
       - Install date-fns: `npm install date-fns` in client/
       Verify: Load page and confirm blog posts fetch from API. Check Network tab for GET /api/blog. Verify cards display with correct date format (French locale). Test fade-in animation on scroll. Test with no posts in DB (show "Aucun article" message).

- [ ] 22. Refactor Contact section with form validation, API submission, and email notification.
       Contact form: name, email, message fields with validation (Formik or react-hook-form recommended, or manual).
       Validation: name required, email valid format, message min 10 characters.
       Submit to POST /api/messages, show success message on success, error message on failure.
       Loading state during submission (disable button, show spinner).
       Success triggers email notification to admin (backend handles this).
       Glassmorphism form design matching overall theme.
       Files:
       - client/src/components/contact/ContactSection.jsx
       - client/src/components/contact/ContactForm.jsx
       - Install react-hook-form: `npm install react-hook-form` in client/ (recommended for form management)
       Verify: Fill form and submit. Check Network tab for POST /api/messages. Verify success message displays. Check backend logs and email inbox for notification. Test validation (submit with invalid email, empty fields) and confirm error messages. Test rate limiting (submit 11 times rapidly, 11th should fail with 429).

- [ ] 23. Create Footer component with social links, copyright, and "Built with ❤️" message.
       Social links: GitHub, LinkedIn, Twitter icons (react-icons) linking to profile URLs.
       Copyright: "© 2024 Cabrel Ngamaleu. Tous droits réservés."
       "Conçu avec ❤️ par Cabrel Ngamaleu" message.
       Footer background matches theme, links change color on hover.
       Files:
       - client/src/components/layout/Footer.jsx
       - Social URLs stored in client/src/data/socialLinks.js
       Verify: Scroll to bottom of page and confirm footer displays. Click social links and verify they open in new tabs. Check hover effects on links. Verify responsive layout on mobile.

- [ ] 24. Create Portfolio.jsx page assembling all sections in order, and update App.js routing.
       Portfolio page structure: Navbar, Hero, About, Skills, Projects, Blog, Contact, Footer (all sections in single page for now).
       Update App.js to render Portfolio as main page, remove old Home.js state-based navigation.
       Smooth scroll behavior for anchor links.
       ScrollToTop component to scroll to top on route change (if adding routing later).
       Files:
       - client/src/pages/Portfolio.jsx
       - Update client/src/App.js (remove old state logic, render Portfolio page)
       - client/src/components/layout/ScrollToTop.jsx
       Verify: Run `npm start` in client/. Load page and confirm all sections render in order: Hero → About → Skills → Projects → Blog → Contact → Footer. Test navbar links scroll to correct sections smoothly. Test at multiple screen sizes (320px, 768px, 1920px) for responsive layout. Run accessibility check (Lighthouse audit) and confirm minimum 90% accessibility score.

---

## PHASE 3 — Admin Dashboard (10-15 hours)

### 3.1 Dashboard Layout & Authentication

- [ ] 25. Create Dashboard layout structure with sidebar navigation, header, and main content area.
       Sidebar: logo, navigation links (Vue d'ensemble, Projets, Blog, Messages, Analytics, Profil, Paramètres), logout button.
       Header: breadcrumb trail, user profile dropdown with logout option.
       Main content area: renders page content based on route.
       Responsive: sidebar collapses to hamburger on mobile, slide-in on toggle.
       Protected route wrapper: redirect to /login if not authenticated.
       Files:
       - client/src/pages/Dashboard/DashboardLayout.jsx
       - client/src/pages/Dashboard/Sidebar.jsx
       - client/src/pages/Dashboard/Header.jsx
       - client/src/components/ProtectedRoute.jsx (HOC or wrapper checking auth)
       Verify: Create dashboard route in App.js (/dashboard). Without logging in, try to access /dashboard and confirm redirect to /login. After login, access /dashboard and confirm layout renders with sidebar and header. Test sidebar collapse on mobile. Test logout button clears auth and redirects to login.

- [ ] 26. Create Login page with JWT authentication and error handling.
       Login form: username, password fields.
       Submit to POST /api/auth/login, receive JWT token, store in localStorage, set user in AuthContext.
       Success: redirect to /dashboard.
       Error handling: display error message for invalid credentials, network errors.
       Form validation: required fields.
       Glassmorphism design matching public portfolio theme.
       Files:
       - client/src/pages/Dashboard/Login.jsx
       Verify: Load /login page. Enter valid credentials (default admin from seed script) and submit. Verify redirect to /dashboard. Check localStorage for JWT token. Enter invalid credentials and verify error message displays. Test network error (stop backend, try login, confirm error message). Run React DevTools and confirm AuthContext user state updates on login.

### 3.2 Dashboard Pages

- [ ] 27. Create Dashboard Overview page with stats cards and Chart.js graphs.
       Stats cards: total projects, total blog posts, unread messages, total page views (fetch from respective APIs).
       Graphs using Chart.js: line chart (visits per day last 30 days), bar chart (projects by category), doughnut chart (blog posts published vs drafts).
       Fetch data from GET /api/analytics/dashboard, /api/projects, /api/blog, /api/messages.
       Loading states, error handling.
       Refresh button to reload stats.
       Files:
       - client/src/pages/Dashboard/Overview.jsx
       - client/src/components/dashboard/StatsCard.jsx
       - Install chart.js and react-chartjs-2: `npm install chart.js react-chartjs-2` in client/
       Verify: Login to dashboard, navigate to Overview. Confirm stats cards display correct counts. Verify graphs render with data from backend APIs. Check Network tab for API calls to /api/analytics/dashboard, /api/projects, etc. Test refresh button reloads data. Test with empty data (no projects/blog posts) and confirm UI handles gracefully.

- [ ] 28. Create Projects CRUD page with form, image upload, drag & drop reordering.
       List view: table/grid showing all projects (thumbnail, title, category, featured status, order), edit/delete actions.
       Create/Edit modal: form with fields (title, description, longDescription, technologies (multi-input), category dropdown, imageUrl upload, liveUrl, githubUrl, featured checkbox).
       Image upload: file input, preview uploaded image, send file to POST /api/projects with multipart/form-data, backend uploads to Cloudinary and returns URL.
       Drag & drop reordering: react-beautiful-dnd or dnd-kit to reorder projects, update order field via API on drop.
       Validation: required fields, URL format validation.
       Delete confirmation modal.
       Files:
       - client/src/pages/Dashboard/ProjectsManagement.jsx
       - client/src/components/dashboard/ProjectForm.jsx
       - client/src/components/dashboard/ProjectList.jsx
       - Install react-beautiful-dnd or @dnd-kit/core: `npm install react-beautiful-dnd` in client/
       Verify: Login to dashboard, navigate to Projects. Confirm existing projects list displays. Click "Add Project" and fill form with image upload, submit, verify project created (check API and page refreshes). Edit project and update fields, verify changes saved. Delete project with confirmation, verify deletion. Test drag & drop reorder and verify order updates in API. Test image upload preview before submission.

- [ ] 29. Create Blog CRUD page with Markdown editor and live preview.
       List view: table showing all blog posts (title, status published/draft, date, tags), edit/delete actions.
       Create/Edit page: form with title, slug (auto-generated, editable), content (Markdown editor with toolbar), excerpt, coverImage upload, tags (multi-input), category, published toggle.
       Markdown editor: use react-markdown-editor-lite or simple-react-markdown-editor with live preview pane.
       Live preview: renders Markdown as HTML in split view using react-markdown.
       Cover image upload: same pattern as projects (Cloudinary).
       Validation: title and content required.
       Drafts: unpublished posts saved as published=false.
       Files:
       - client/src/pages/Dashboard/BlogManagement.jsx
       - client/src/components/dashboard/BlogForm.jsx
       - client/src/components/dashboard/BlogList.jsx
       - Install react-markdown-editor-lite, react-markdown: `npm install react-markdown-editor-lite react-markdown` in client/
       Verify: Navigate to Blog in dashboard. Create new post with Markdown content, verify live preview renders formatting (headings, lists, bold, etc.). Toggle published status and save, verify status updates. Edit post and change content, verify changes saved. Delete post with confirmation. Check slug auto-generation from title. Test cover image upload.

- [ ] 30. Create Messages inbox page with read/unread status, pagination, and delete actions.
       List view: table showing all messages (name, email, message preview, date, read/unread status), mark read/unread button, delete button.
       Badge on sidebar "Messages" link showing unread count.
       Filter tabs: "Tous", "Non lus", "Lus".
       Pagination: 20 messages per page.
       Mark as read: PATCH /api/messages/:id/read toggles read status, updates list.
       Delete: DELETE /api/messages/:id with confirmation modal.
       Sort by date descending (newest first).
       Files:
       - client/src/pages/Dashboard/MessagesInbox.jsx
       - client/src/components/dashboard/MessageRow.jsx
       Verify: Submit messages via public contact form to populate inbox. Navigate to Messages in dashboard. Confirm messages display with correct read/unread status. Click mark as read and verify status updates instantly (optimistic update or refetch). Test filter tabs switch between all/unread/read. Test delete removes message. Verify pagination if more than 20 messages. Check unread badge count on sidebar matches actual unread count.

- [ ] 31. Create Analytics page with visit graphs and event statistics.
       Line chart: page views per day (last 7, 30, 90 days, selectable).
       Bar chart: top 5 most visited pages.
       Stats cards: total visits, total project clicks, total contact submits.
       Event breakdown: pie chart of event types.
       Date range picker for filtering (last 7 days, 30 days, custom range).
       Fetch from GET /api/analytics/dashboard with query params for date range.
       Export button: download analytics as CSV (optional).
       Files:
       - client/src/pages/Dashboard/Analytics.jsx
       - client/src/components/dashboard/AnalyticsChart.jsx
       - Install date picker if needed: `npm install react-datepicker` in client/
       Verify: Navigate to Analytics in dashboard. Confirm graphs display with data from backend. Test date range selector changes graph data (check Network tab for API call with date params). Verify stats cards show correct totals. Test with no data (empty DB) and confirm charts show "No data" message. Optionally test CSV export downloads file.

- [ ] 32. Create Profile/Settings page with change password and theme toggle.
       Profile section: display user info (username, email, role), edit profile button (update bio, photo, social links - extend User model if needed).
       Change password: form with old password, new password, confirm new password fields, submit to POST /api/auth/change-password.
       Theme toggle: dark mode / light mode toggle (store preference in localStorage, apply CSS class to body).
       Settings: general app settings (notifications preferences, etc. - can be placeholder for now).
       Files:
       - client/src/pages/Dashboard/Profile.jsx
       - client/src/pages/Dashboard/Settings.jsx
       - client/src/components/dashboard/ChangePasswordForm.jsx
       - client/src/hooks/useTheme.js (theme management hook)
       Verify: Navigate to Profile in dashboard. Test change password form with valid old password and new password, verify success message and password actually changes (try logging out and back in with new password). Test theme toggle switches between dark and light mode (check CSS class on body). Verify profile info displays correctly. Test validation on change password (mismatched passwords, wrong old password).

### 3.3 Dashboard Enhancements (Bonus)

- [ ] 33. Add real-time unread message badge on sidebar using polling or WebSockets (optional).
       Poll GET /api/messages?read=false every 30 seconds to get unread count, update badge.
       Alternatively, implement WebSocket connection for real-time updates (more complex).
       Badge: red circle with count on "Messages" sidebar link.
       Files:
       - Update client/src/pages/Dashboard/DashboardLayout.jsx (polling logic)
       - Or create client/src/services/websocket.js for WebSocket approach
       Verify: Open dashboard, submit message via public contact form, wait max 30 seconds, confirm badge updates with new unread count. (If WebSocket: should update instantly.)

- [ ] 34. Implement responsive dashboard for mobile use.
       Sidebar: hamburger menu on mobile, slide-in/out animation.
       Tables: responsive design (cards on mobile instead of tables, or horizontal scroll).
       Forms: stack fields vertically on small screens.
       Charts: adjust size for mobile viewports.
       Files:
       - Update all dashboard page components with responsive Tailwind classes
       Verify: Open dashboard at 320px, 768px, 1024px widths. Confirm sidebar toggles correctly on mobile. Verify all pages (Overview, Projects, Blog, Messages, Analytics, Profile) render correctly and are usable on mobile. Test form submissions on mobile. Test chart responsiveness.

---

## PHASE 4 — CI/CD & DevSecOps (5-8 hours)

### 4.1 Docker Setup

- [ ] 35. Create multi-stage Dockerfile for building client and running server.
       Stage 1 (build-client): Node base image, copy client/, run npm install, run npm run build, output to /app/client/build.
       Stage 2 (production): Node slim image, copy server/ and client/build/, install server dependencies (production only), expose port, run node server/server.js.
       Optimize: use .dockerignore to exclude node_modules, .git, .env files.
       Files:
       - Dockerfile (root)
       - .dockerignore (root: node_modules, .git, .env, .env.*, coverage, build, dist, *.log, README.md)
       Verify: Build Docker image: `docker build -t cabrel-portfolio .` from root. Verify build succeeds without errors. Check image size (should be reasonable, <500MB). Run container: `docker run -p 5000:5000 --env-file server/.env cabrel-portfolio` and confirm app accessible at localhost:5000. Test both frontend (served from server) and backend APIs work in container.

- [ ] 36. Create docker-compose.yml for local development with MongoDB service.
       Services: app (build from Dockerfile, ports 3000 and 5000), mongo (official MongoDB image, persist data with volume).
       App environment variables from .env files.
       MongoDB connection string in app env: MONGODB_URI=mongodb://mongo:27017/portfolio_db.
       Networks: app and mongo on same network for communication.
       Volumes: mongo data persistence, bind mount for app source code (hot reload in dev).
       Files:
       - docker-compose.yml (root)
       Verify: Run `docker-compose up --build` from root. Verify both app and mongo containers start. Check logs confirm MongoDB connected. Access client at localhost:3000 and server at localhost:5000. Test API calls work (data persists in MongoDB container). Stop containers with Ctrl+C, restart with `docker-compose up`, verify data persists (not lost). Test hot reload: edit a file, save, verify container detects change.

- [ ] 37. Create docker-compose.prod.yml for production deployment configuration.
       Production optimizations: no bind mounts (use image code), restart policies (always), resource limits (memory, CPU).
       Env variables from .env.production file.
       MongoDB: use managed service (Atlas) instead of container, or persistent volume for container.
       Reverse proxy ready (Nginx optional, or direct port mapping).
       Files:
       - docker-compose.prod.yml (root)
       - .env.production.example (template for production env vars)
       Verify: Run `docker-compose -f docker-compose.prod.yml up --build -d` to start in detached mode. Verify containers start and remain running (`docker ps`). Test app accessibility. Check restart policy: stop container manually, verify it restarts automatically. Test resource limits by monitoring container stats (`docker stats`).

### 4.2 GitHub Actions CI/CD

- [ ] 38. Create CI pipeline (.github/workflows/ci.yml) for linting, testing, security scanning on every PR.
       Triggers: pull_request to main branch.
       Jobs:
       1. Lint: ESLint on client/ and server/, Prettier check.
       2. Test Client: npm test in client/, upload coverage report.
       3. Test Server: npm test in server/, require 70% coverage, upload coverage.
       4. Security: npm audit --audit-level=high on both workspaces, Snyk test (setup Snyk token secret).
       5. Build: npm run build:all to ensure build passes.
       Matrix strategy: test on Node 18 and 20.
       Fail PR if any job fails.
       Files:
       - .github/workflows/ci.yml
       Verify: Create PR with intentional lint error, commit, push. Check GitHub Actions tab, verify CI runs and fails on lint job. Fix lint error, push, verify CI passes. Check coverage reports uploaded as artifacts. Test Snyk integration (setup SNYK_TOKEN secret in repo settings, verify Snyk job runs). Verify build job runs successfully.

- [ ] 39. Create CD pipeline (.github/workflows/cd.yml) for Docker build and deployment on push to main.
       Triggers: push to main branch.
       Prerequisites: CI must pass (can be separate workflow or job dependency).
       Jobs:
       1. Build Docker image, tag with commit SHA and 'latest'.
       2. Push image to container registry (Docker Hub, GitHub Container Registry, or AWS ECR - choose based on deployment target).
       3. Deploy: SSH to server or trigger deployment platform webhook (Railway, Render, AWS ECS, etc.).
       Secrets required: DOCKER_USERNAME, DOCKER_PASSWORD (or registry credentials), DEPLOY_SSH_KEY or platform API key.
       Files:
       - .github/workflows/cd.yml
       Verify: Setup deployment target (Railway, Render, or VPS) and configure secrets in GitHub repo settings. Merge PR to main, verify CD workflow triggers. Check Actions tab for build job. Verify Docker image pushed to registry (check Docker Hub/GHCR). Verify deployment succeeds (check deployment platform or SSH to server). Access deployed app URL and test functionality end-to-end.

- [ ] 40. Create dependency-review workflow (.github/workflows/dependency-review.yml) for scanning dependencies on PRs.
       Triggers: pull_request.
       Uses GitHub's dependency-review-action to check for vulnerable dependencies in PR changes.
       Fails if high or critical vulnerabilities introduced.
       Files:
       - .github/workflows/dependency-review.yml
       Verify: Create PR that adds a dependency with known vulnerability (or use test package). Verify dependency-review workflow runs and fails/warns. Check Actions summary for vulnerability details. Remove vulnerable dependency, verify workflow passes.

### 4.3 Code Quality & Project Documentation

- [ ] 41. Create ESLint and Prettier configurations for both client and server, plus Jest config for server tests.
       ESLint: extend recommended configs for React (client) and Node (server), add rules for code quality.
       Prettier: consistent formatting (semi, singleQuote, printWidth, etc.).
       Jest config for server: coverage thresholds (70% minimum), testMatch patterns, setup files.
       EditorConfig: consistent editor settings across team.
       Files:
       - .eslintrc.js (root or separate for client/ and server/)
       - .prettierrc (root)
       - jest.config.js (server/)
       - .editorconfig (root)
       Verify: Run `npm run lint` in client/ and server/, fix all lint errors. Run `npx prettier --check .` from root, verify all files formatted. Run `npm test` in server/, verify coverage meets 70% threshold. Commit all configs and verify CI pipeline uses them.

- [ ] 42. Create comprehensive README.md with setup instructions, architecture diagram, deployment guide.
       Sections:
       - Project overview (brief description, features)
       - Tech stack (list all major technologies)
       - Architecture (link to diagram or embed mermaid)
       - Prerequisites (Node.js version, MongoDB, Cloudinary account, etc.)
       - Installation (clone repo, install deps, setup .env files, seed DB)
       - Development (start dev servers, run tests, lint)
       - Deployment (Docker, Railway/Render instructions, environment variables)
       - API documentation (link to endpoints list or Swagger if implemented)
       - Contributing guidelines (link to CONTRIBUTING.md if exists)
       - License
       Available in French (primary) and optionally English.
       Files:
       - README.md (root, replace existing CRA boilerplate README)
       Verify: Follow README instructions from scratch on fresh clone (or ask someone else to test). Verify all commands work, links are correct, instructions clear. Check README renders correctly on GitHub with proper formatting.

- [ ] 43. Create SECURITY.md with security policy, vulnerability reporting instructions, and CODEOWNERS file.
       SECURITY.md:
       - Supported versions for security updates
       - How to report security vulnerabilities (private email, GitHub Security Advisories)
       - Security features implemented (Helmet, rate limiting, JWT, etc.)
       - Security best practices for deployment (env vars, HTTPS, etc.)
       CODEOWNERS:
       - Assign code ownership for automatic review requests (e.g., @cabrelngamaleu for all files, or specific paths)
       pull_request_template.md:
       - Checklist for PR submissions (tests pass, lint pass, description added, screenshots for UI changes)
       Files:
       - SECURITY.md (root)
       - .github/CODEOWNERS
       - .github/pull_request_template.md
       Verify: Create test PR and verify CODEOWNERS triggers review request. Check PR template auto-populates on new PR. Read through SECURITY.md and verify all listed security features are actually implemented.

- [ ] 44. Create seed scripts for initial data and default admin user.
       Seed scripts:
       - createAdmin.js: creates default admin user (username: admin, email: admin@example.com, password: Admin123! - prompt to change on first login) if no users exist.
       - seedProjects.js: inserts sample projects for demo (optional, use existing assets/work images).
       - seedBlog.js: inserts sample blog posts for demo (optional).
       Run seed scripts in production setup instructions (or in Docker entrypoint for demo environments).
       Files:
       - server/scripts/createAdmin.js
       - server/scripts/seedProjects.js (optional)
       - server/scripts/seedBlog.js (optional)
       - Update README with seed script instructions
       Verify: Run `node server/scripts/createAdmin.js` on empty DB, verify admin user created. Login to dashboard with default credentials. Run optional seed scripts and verify data appears in app. Test that createAdmin script doesn't duplicate admin if user already exists (idempotent).

---

## Verification & Testing Plan

### Final Integration Tests

- [ ] 45. Run full test suite for both client and server, verify minimum 70% coverage for server.
       Commands: `npm run test:all` from root (runs both client and server tests).
       Server: verify coverage report shows ≥70% lines covered.
       Client: verify React component tests pass (if any, add basic tests for critical components).
       CI: verify all tests pass in GitHub Actions.
       Files: Review coverage reports in coverage/ directories
       Verify: Run `npm run test:all` from root. Check server/coverage/lcov-report/index.html for coverage percentage. If below 70%, add tests to critical untested code. Fix any failing tests. Push to trigger CI and verify tests pass in Actions.

- [ ] 46. Perform end-to-end manual testing of entire application flow: public portfolio, contact form, admin dashboard, CRUD operations.
       Test scenarios:
       1. Public portfolio: load homepage, navigate through all sections, click project cards, read blog post, submit contact form.
       2. Login: access /dashboard (redirect to /login), login with admin credentials, verify redirect to dashboard.
       3. Dashboard overview: verify stats display correctly.
       4. Projects management: create new project with image upload, edit project, delete project, reorder projects via drag & drop.
       5. Blog management: create blog post with Markdown, preview rendering, publish post, edit post, delete post.
       6. Messages inbox: verify contact form submission appears in inbox, mark as read, delete message.
       7. Analytics: verify page views and events tracked, graphs display data.
       8. Profile: change password, verify logout, login with new password.
       9. Responsive: test all pages at 320px, 768px, 1920px widths.
       10. Security: test protected routes without auth (expect 401/redirect), test rate limiting (expect 429 after limit).
       Document any bugs found, fix before final deployment.
       Verify: Manually execute all test scenarios. Record results in .agents/tasks/testing-results.md. Fix any issues discovered. Re-test after fixes.

- [ ] 47. Run security audit and OWASP ZAP scan (or manual security checklist).
       Security checks:
       - npm audit on both workspaces (fix high/critical vulnerabilities)
       - Snyk scan (if configured)
       - Manual checks: verify all .env files excluded from git, verify JWT secret is strong, verify CORS configured correctly, verify Helmet headers present, verify rate limiting works, verify input validation on all endpoints, verify file upload restrictions (image types, size limits), verify SQL/NoSQL injection prevention (Joi validation, mongo-sanitize)
       - OWASP ZAP (optional): run automated scan against deployed app
       Files: Document findings in .agents/tasks/security-audit.md
       Verify: Run `npm audit` in client/ and server/, fix or acknowledge vulnerabilities. Check git history doesn't contain .env files (`git log --all --full-history -- "**/.env"`). Review backend routes and confirm all have proper auth middleware and validation. If using OWASP ZAP, run scan and review report.

- [ ] 48. Deploy to staging environment (Railway/Render) and verify all functionality in production-like environment.
       Setup deployment:
       - Create account on Railway or Render
       - Create new project/service
       - Connect GitHub repo (auto-deploy on push to main)
       - Configure environment variables (all secrets from .env.example)
       - Configure MongoDB Atlas (whitelist deployment IP, create DB user)
       - Set build and start commands
       - Deploy and verify deployment succeeds
       Test deployed app:
       - Access public URL, test all portfolio sections
       - Test contact form (verify email received)
       - Login to dashboard, test all admin features
       - Test image uploads (verify Cloudinary integration works)
       - Check browser console for errors
       - Run Lighthouse audit (Performance, Accessibility, Best Practices, SEO)
       Files: Document deployment steps in README.md, document staging URL in .agents/tasks/deployment.md
       Verify: Successfully deploy to staging. Access staging URL and perform smoke tests (load homepage, login, create project, submit contact form). Verify no console errors. Review Lighthouse report (aim for >80 in all categories). If issues found, fix and redeploy.

---

## Summary of Files Created/Modified

### Root Level (13 files)
- package.json (NEW - workspace root)
- .gitignore (NEW - root level)
- Dockerfile (NEW)
- .dockerignore (NEW)
- docker-compose.yml (NEW)
- docker-compose.prod.yml (NEW)
- .eslintrc.js (NEW)
- .prettierrc (NEW)
- .editorconfig (NEW)
- README.md (MODIFIED - replace CRA boilerplate)
- SECURITY.md (NEW)
- .env.production.example (NEW)

### .github/ (5 files)
- .github/workflows/ci.yml (NEW)
- .github/workflows/cd.yml (NEW)
- .github/workflows/dependency-review.yml (NEW)
- .github/CODEOWNERS (NEW)
- .github/pull_request_template.md (NEW)

### client/ (35+ files, many moved from root)
- client/package.json (MOVED from root, MODIFIED - add new deps)
- client/tailwind.config.js (MOVED from root, MODIFIED - glassmorphism)
- client/.gitignore (MOVED from root)
- client/.env.example (NEW)
- client/.env.local (NEW)
- client/src/ (MOVED from root, all existing files)
  - index.js (MODIFIED)
  - App.js (MODIFIED - new routing)
  - index.css (MODIFIED - glassmorphism utilities)
  - services/api.js (NEW)
  - context/AuthContext.jsx (NEW)
  - hooks/useAuth.js, useScrollSpy.js, useInView.js, useTheme.js (NEW)
  - data/skillsData.js, socialLinks.js (NEW)
  - components/ (RESTRUCTURED - see step 15)
    - layout/ Navbar.jsx, Footer.jsx, ScrollToTop.jsx (NEW/REFACTORED)
    - hero/ HeroSection.jsx, ParticlesBackground.jsx (NEW)
    - about/ AboutSection.jsx (REFACTORED), StatsCounter.jsx (NEW)
    - skills/ SkillsSection.jsx, SkillCircle.jsx, TechIcon.jsx (NEW)
    - projects/ ProjectsSection.jsx (REFACTORED), ProjectCard.jsx, ProjectFilter.jsx (NEW)
    - blog/ BlogSection.jsx (REFACTORED), BlogCard.jsx (MODIFIED)
    - contact/ ContactSection.jsx (REFACTORED), ContactForm.jsx (NEW)
    - common/ SectionTitle.jsx, GlassCard.jsx, AnimatedButton.jsx, LoadingSpinner.jsx (NEW)
    - dashboard/ (ALL NEW - 15+ components)
  - pages/ Portfolio.jsx (NEW), Dashboard/ (ALL NEW - 8+ pages)

### server/ (55+ files, all new)
- server/package.json (NEW)
- server/.env.example (NEW)
- server/server.js (NEW)
- server/config/ db.js, cloudinary.js, env.js (NEW)
- server/middleware/ auth.js, rateLimiter.js, errorHandler.js, validate.js, upload.js, security.js (NEW)
- server/models/ Project.js, BlogPost.js, Message.js, User.js, Analytics.js (NEW)
- server/routes/ auth.routes.js, projects.routes.js, blog.routes.js, messages.routes.js, analytics.routes.js (NEW)
- server/controllers/ auth.controller.js, projects.controller.js, blog.controller.js, messages.controller.js, analytics.controller.js (NEW)
- server/utils/ sendEmail.js, generateToken.js (NEW)
- server/templates/ newMessageEmail.js (NEW)
- server/scripts/ seedDb.js, createAdmin.js, seedProjects.js, seedBlog.js (NEW)
- server/tests/ auth.test.js, projects.test.js, blog.test.js, messages.test.js, analytics.test.js (NEW)
- server/jest.config.js (NEW)

**Total: ~120 files (13 root + 5 GitHub + 35+ client + 55+ server + documentation)**

---

## Risk Assessment & Mitigation

### High Risk
1. **Git history loss during restructuring** (Step 1)
   - Mitigation: Use `git mv` commands exclusively, verify with `git status` before committing. Create backup branch before restructuring.

2. **Data loss during MongoDB migration** (Steps 4, 11)
   - Mitigation: Use MongoDB Atlas with automated backups. Test seed scripts thoroughly. Never run destructive operations without backup.

3. **Secrets exposed in code/commits** (Throughout)
   - Mitigation: Create .env.example files first, add .env to .gitignore before any code, use git-secrets or similar tool, audit commits before push.

### Medium Risk
1. **CI/CD pipeline failures blocking development** (Steps 38-40)
   - Mitigation: Test workflows locally with act or similar tool before pushing. Keep workflows simple initially, add complexity incrementally.

2. **Cloudinary/email integration failures** (Steps 7, 9)
   - Mitigation: Implement fallback mechanisms (local file storage for dev, error logging for email failures). Test with real services early.

3. **Authentication/authorization bugs** (Step 5, 25-26)
   - Mitigation: Write comprehensive tests for auth flows, test expired tokens, test protected routes, security audit before deployment.

### Low Risk
1. **Responsive design issues** (Throughout frontend)
   - Mitigation: Test at multiple breakpoints continuously during development, use browser DevTools device emulation, test on real devices.

2. **Performance issues with animations/particles** (Steps 17-19)
   - Mitigation: Use CSS animations over JS when possible, lazy load heavy components, profile with Chrome DevTools, optimize images.

---

## Notes & Assumptions

1. **Default deployment target**: Railway or Render (both free tiers support Node + MongoDB Atlas). Instructions for both will be in README.
2. **MongoDB**: Assuming MongoDB Atlas free tier (512MB). Connection string format: `mongodb+srv://...`.
3. **Cloudinary**: Assuming free tier (25GB storage, 25GB bandwidth/month). Requires account signup.
4. **Email**: Assuming SMTP provider (Gmail, SendGrid, Mailgun). Nodemailer configuration in .env.
5. **French language**: All UI text in French as per existing codebase. Add i18n support as future enhancement if needed.
6. **Testing**: Backend priority (70% coverage required). Frontend basic tests for critical paths only (time permitting).
7. **Admin user**: Default username/password created by seed script. MUST change on first login (prompt in UI as future enhancement).
8. **Image uploads**: Using Cloudinary. Fallback to local filesystem not implemented (add if Cloudinary fails in dev).
9. **Real-time features**: WebSocket implementation for message notifications is optional (polling simpler, good enough for MVP).
10. **Blog routing**: Single-page portfolio for Phase 2. Separate blog post detail pages as future enhancement.

---

## Execution Order Summary

**Phases are sequential, but steps within phases can be parallelized where noted:**

1. **Phase 1 (Backend)**: Steps 1-11 must be sequential (restructure → models → auth → endpoints → integration). Steps 4-10 (individual API endpoints) can be partially parallelized after step 5 (auth) is complete.

2. **Phase 2 (Frontend)**: Steps 12-14 must be sequential (design system → API client → AuthContext). Steps 15-23 (individual sections) can be parallelized after step 15 (restructure) is complete. Step 24 (assembly) must be last.

3. **Phase 3 (Dashboard)**: Steps 25-26 must be sequential (layout → login). Steps 27-32 (dashboard pages) can be parallelized after step 25 is complete. Steps 33-34 (enhancements) last.

4. **Phase 4 (CI/CD)**: Steps 35-37 (Docker) sequential. Steps 38-40 (GitHub Actions) can be parallel. Steps 41-44 (docs/config) can be parallel with CI/CD setup. Steps 45-48 (verification) must be sequential and last.

**Estimated total time**: 30-45 hours for one developer, depending on experience with stack.

---

## Post-Implementation Checklist

- [ ] All 48 implementation steps completed
- [ ] All tests passing (client + server)
- [ ] Test coverage ≥70% for server
- [ ] Docker build succeeds
- [ ] CI/CD pipelines configured and passing
- [ ] Deployed to staging environment
- [ ] End-to-end manual testing complete
- [ ] Security audit complete
- [ ] Documentation complete (README, SECURITY.md, code comments)
- [ ] .env.example files accurate
- [ ] No secrets in git history
- [ ] Lighthouse audit >80 in all categories
- [ ] Responsive design verified 320px-1920px
- [ ] Default admin user created and tested
- [ ] All API endpoints tested with Postman/Insomnia
- [ ] Email notifications tested
- [ ] Image uploads tested (Cloudinary)
- [ ] Rate limiting tested
- [ ] CORS configured and tested
- [ ] JWT authentication tested (login, protected routes, token expiration)
- [ ] All French translations correct
- [ ] Git history preserved for moved files
- [ ] Code formatted with Prettier
- [ ] No ESLint errors
- [ ] Browser console errors cleared
- [ ] Production deployment ready

---

**This plan is ready for implementation. Each step includes specific files, verification commands, and expected outcomes. Follow the steps sequentially within each phase for best results.**
