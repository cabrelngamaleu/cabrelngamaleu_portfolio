const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../models/User');
const BlogPost = require('../models/BlogPost');

describe('Blog API Tests', () => {
  let token;
  let publishedPost;

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
    await BlogPost.deleteMany();

    publishedPost = await BlogPost.create({
      title: 'Published Post',
      content: 'This is published content',
      slug: 'published-post',
      published: true,
    });

    // Draft post for testing unpublished filter
    await BlogPost.create({
      title: 'Draft Post',
      content: 'This is draft content',
      slug: 'draft-post',
      published: false,
    });
  });

  afterAll(async () => {
    await BlogPost.deleteMany();
    await User.deleteMany();
    await mongoose.connection.close();
  });

  describe('GET /api/blog', () => {
    it('should return only published posts by default', async () => {
      const res = await request(app).get('/api/blog');

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].published).toBe(true);
    });

    it('should filter unpublished posts when requested', async () => {
      const res = await request(app).get('/api/blog?published=false');

      expect(res.statusCode).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].published).toBe(false);
    });
  });

  describe('GET /api/blog/:slug', () => {
    it('should get blog post by slug', async () => {
      const res = await request(app).get('/api/blog/published-post');

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.slug).toBe('published-post');
      expect(res.body.data.title).toBe('Published Post');
    });

    it('should return 404 for non-existent slug', async () => {
      const res = await request(app).get('/api/blog/non-existent-slug');

      expect(res.statusCode).toBe(404);
    });
  });

  describe('POST /api/blog', () => {
    it('should auto-generate slug from title', async () => {
      const res = await request(app)
        .post('/api/blog')
        .set('Authorization', `Bearer ${token}`)
        .field('title', 'Mon Nouvel Article')
        .field('content', "Contenu de l'article")
        .field('published', 'true');

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.slug).toBe('mon-nouvel-article');
    });

    it('should create blog post with tags', async () => {
      const res = await request(app)
        .post('/api/blog')
        .set('Authorization', `Bearer ${token}`)
        .field('title', 'Article with Tags')
        .field('content', 'Content here')
        .field('tags', 'React,JavaScript,Tutorial')
        .field('published', 'true');

      expect(res.statusCode).toBe(201);
      expect(res.body.data.tags).toEqual(['React', 'JavaScript', 'Tutorial']);
    });

    it('should reject post without auth', async () => {
      const res = await request(app).post('/api/blog').send({
        title: 'Unauthorized Post',
        content: 'Content',
      });

      expect(res.statusCode).toBe(401);
    });

    it('should reject post without required fields', async () => {
      const res = await request(app)
        .post('/api/blog')
        .set('Authorization', `Bearer ${token}`)
        .field('title', 'Incomplete Post');

      expect(res.statusCode).toBe(400);
    });
  });

  describe('PUT /api/blog/:id', () => {
    it('should update blog post', async () => {
      const res = await request(app)
        .put(`/api/blog/${publishedPost._id}`)
        .set('Authorization', `Bearer ${token}`)
        .field('title', 'Updated Title')
        .field('content', 'Updated content');

      expect(res.statusCode).toBe(200);
      expect(res.body.data.title).toBe('Updated Title');
      expect(res.body.data.slug).toBe('updated-title');
    });

    it('should reject update without auth', async () => {
      const res = await request(app)
        .put(`/api/blog/${publishedPost._id}`)
        .send({ title: 'Updated' });

      expect(res.statusCode).toBe(401);
    });
  });

  describe('DELETE /api/blog/:id', () => {
    it('should delete blog post with auth', async () => {
      const res = await request(app)
        .delete(`/api/blog/${publishedPost._id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(200);

      const post = await BlogPost.findById(publishedPost._id);
      expect(post).toBeNull();
    });

    it('should reject delete without auth', async () => {
      const res = await request(app).delete(`/api/blog/${publishedPost._id}`);

      expect(res.statusCode).toBe(401);
    });
  });
});
