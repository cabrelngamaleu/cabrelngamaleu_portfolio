const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../models/User');
const Project = require('../models/Project');

describe('Projects API Tests', () => {
  let token;
  let testProject;

  beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }

    // Create admin user and get token
    await User.deleteMany();
    await User.create({
      username: 'admin',
      email: 'admin@test.com',
      password: 'password123',
      role: 'admin',
    });

    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@test.com',
        password: 'password123',
      });

    token = loginRes.body.token;
  });

  beforeEach(async () => {
    await Project.deleteMany();
    testProject = await Project.create({
      title: 'Test Project',
      description: 'Test description',
      technologies: ['React', 'Node.js'],
      category: 'web',
    });
  });

  afterAll(async () => {
    await Project.deleteMany();
    await User.deleteMany();
    await mongoose.connection.close();
  });

  describe('GET /api/projects', () => {
    it('should get all projects (public access)', async () => {
      const res = await request(app).get('/api/projects');

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toBeInstanceOf(Array);
      expect(res.body.count).toBeGreaterThan(0);
    });

    it('should filter projects by category', async () => {
      await Project.create({
        title: 'Mobile App',
        description: 'Test mobile',
        technologies: ['React Native'],
        category: 'mobile',
      });

      const res = await request(app).get('/api/projects?category=mobile');

      expect(res.statusCode).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].category).toBe('mobile');
    });

    it('should filter featured projects', async () => {
      await Project.create({
        title: 'Featured Project',
        description: 'Featured test',
        technologies: ['Vue.js'],
        category: 'web',
        featured: true,
      });

      const res = await request(app).get('/api/projects?featured=true');

      expect(res.statusCode).toBe(200);
      expect(res.body.data.every(p => p.featured)).toBe(true);
    });
  });

  describe('GET /api/projects/:id', () => {
    it('should get single project by ID', async () => {
      const res = await request(app).get(`/api/projects/${testProject._id}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.title).toBe('Test Project');
    });

    it('should return 404 for non-existent project', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app).get(`/api/projects/${fakeId}`);

      expect(res.statusCode).toBe(404);
    });
  });

  describe('POST /api/projects', () => {
    it('should reject POST without auth', async () => {
      const res = await request(app)
        .post('/api/projects')
        .send({
          title: 'New Project',
          description: 'New description',
          technologies: ['React'],
          category: 'web',
        });

      expect(res.statusCode).toBe(401);
    });

    it('should create project with valid auth and data', async () => {
      const res = await request(app)
        .post('/api/projects')
        .set('Authorization', `Bearer ${token}`)
        .field('title', 'New Project')
        .field('description', 'New description')
        .field('technologies', 'React,Node.js')
        .field('category', 'fullstack');

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.title).toBe('New Project');
      expect(res.body.data.technologies).toEqual(['React', 'Node.js']);
    });

    it('should reject project without required fields', async () => {
      const res = await request(app)
        .post('/api/projects')
        .set('Authorization', `Bearer ${token}`)
        .field('title', 'Incomplete Project');

      expect(res.statusCode).toBe(400);
    });

    it('should reject project with invalid category', async () => {
      const res = await request(app)
        .post('/api/projects')
        .set('Authorization', `Bearer ${token}`)
        .field('title', 'Invalid Category Project')
        .field('description', 'Test')
        .field('category', 'invalid_category');

      expect(res.statusCode).toBe(400);
    });
  });

  describe('PUT /api/projects/:id', () => {
    it('should update project with auth', async () => {
      const res = await request(app)
        .put(`/api/projects/${testProject._id}`)
        .set('Authorization', `Bearer ${token}`)
        .field('title', 'Updated Project')
        .field('description', 'Updated description');

      expect(res.statusCode).toBe(200);
      expect(res.body.data.title).toBe('Updated Project');
    });

    it('should reject update without auth', async () => {
      const res = await request(app)
        .put(`/api/projects/${testProject._id}`)
        .send({ title: 'Updated' });

      expect(res.statusCode).toBe(401);
    });
  });

  describe('DELETE /api/projects/:id', () => {
    it('should delete project with auth', async () => {
      const res = await request(app)
        .delete(`/api/projects/${testProject._id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);

      // Verify deletion
      const project = await Project.findById(testProject._id);
      expect(project).toBeNull();
    });

    it('should reject delete without auth', async () => {
      const res = await request(app).delete(`/api/projects/${testProject._id}`);

      expect(res.statusCode).toBe(401);
    });
  });
});
