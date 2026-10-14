const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../models/User');
const Analytics = require('../models/Analytics');

describe('Analytics API Tests', () => {
  let token;

  beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }

    await User.deleteMany();
    await User.create({
      username: 'admin',
      email: 'admin@test.com',
      password: 'password123',
      role: 'admin',
    });

    const loginRes = await request(app).post('/api/auth/login').send({
      email: 'admin@test.com',
      password: 'password123',
    });

    token = loginRes.body.token;
  });

  beforeEach(async () => {
    await Analytics.deleteMany();
  });

  afterAll(async () => {
    await Analytics.deleteMany();
    await User.deleteMany();
    await mongoose.connection.close();
  });

  describe('POST /api/analytics/event', () => {
    it('should create analytics event (public access)', async () => {
      const res = await request(app).post('/api/analytics/event').send({
        event: 'page_view',
        page: '/home',
        referrer: 'https://google.com',
        userAgent: 'Mozilla/5.0',
      });

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.event).toBe('page_view');
      expect(res.body.data.page).toBe('/home');
    });

    it('should validate event type enum', async () => {
      const res = await request(app).post('/api/analytics/event').send({
        event: 'invalid_event',
        page: '/home',
      });

      expect(res.statusCode).toBe(400);
    });

    it('should accept valid event types', async () => {
      const validEvents = ['page_view', 'project_click', 'contact_submit'];

      for (const eventType of validEvents) {
        const res = await request(app).post('/api/analytics/event').send({
          event: eventType,
          page: '/test',
        });

        expect(res.statusCode).toBe(201);
        expect(res.body.data.event).toBe(eventType);
      }
    });

    it('should use user-agent from headers if not provided', async () => {
      const res = await request(app)
        .post('/api/analytics/event')
        .set('User-Agent', 'Test Browser')
        .send({
          event: 'page_view',
          page: '/home',
        });

      expect(res.statusCode).toBe(201);
    });
  });

  describe('GET /api/analytics/dashboard', () => {
    beforeEach(async () => {
      // Create sample analytics data
      const events = [
        { event: 'page_view', page: '/home', timestamp: new Date() },
        { event: 'page_view', page: '/home', timestamp: new Date() },
        { event: 'page_view', page: '/about', timestamp: new Date() },
        { event: 'project_click', page: '/projects', timestamp: new Date() },
        { event: 'contact_submit', page: '/contact', timestamp: new Date() },
      ];

      await Analytics.insertMany(events);
    });

    it('should require auth to access dashboard', async () => {
      const res = await request(app).get('/api/analytics/dashboard');

      expect(res.statusCode).toBe(401);
    });

    it('should return aggregated stats with auth', async () => {
      const res = await request(app)
        .get('/api/analytics/dashboard')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('totalVisits');
      expect(res.body.data).toHaveProperty('visitsToday');
      expect(res.body.data).toHaveProperty('visitsThisWeek');
      expect(res.body.data).toHaveProperty('visitsThisMonth');
      expect(res.body.data).toHaveProperty('eventCounts');
      expect(res.body.data).toHaveProperty('topPages');
      expect(res.body.data).toHaveProperty('visitsByDay');
    });

    it('should return correct event counts', async () => {
      const res = await request(app)
        .get('/api/analytics/dashboard')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(200);

      const eventCounts = res.body.data.eventCounts;
      expect(eventCounts).toBeInstanceOf(Array);

      const pageViews = eventCounts.find((e) => e._id === 'page_view');
      expect(pageViews).toBeDefined();
      expect(pageViews.count).toBe(3);
    });

    it('should return top pages', async () => {
      const res = await request(app)
        .get('/api/analytics/dashboard')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(200);

      const topPages = res.body.data.topPages;
      expect(topPages).toBeInstanceOf(Array);
      expect(topPages.length).toBeGreaterThan(0);

      // Should be sorted by count descending
      if (topPages.length > 1) {
        expect(topPages[0].count).toBeGreaterThanOrEqual(topPages[1].count);
      }
    });

    it('should return visits by day', async () => {
      const res = await request(app)
        .get('/api/analytics/dashboard')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(200);

      const visitsByDay = res.body.data.visitsByDay;
      expect(visitsByDay).toBeInstanceOf(Array);
    });
  });
});
