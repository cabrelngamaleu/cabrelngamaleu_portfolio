const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../models/User');
const Message = require('../models/Message');
const sendEmail = require('../utils/sendEmail');

// Mock sendEmail
jest.mock('../utils/sendEmail');

describe('Messages API Tests', () => {
  let token;
  let testMessage;

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

    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@test.com',
        password: 'password123',
      });

    token = loginRes.body.token;
  });

  beforeEach(async () => {
    await Message.deleteMany();
    sendEmail.mockClear();
    
    testMessage = await Message.create({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Test message',
      read: false,
    });
  });

  afterAll(async () => {
    await Message.deleteMany();
    await User.deleteMany();
    await mongoose.connection.close();
  });

  describe('POST /api/messages', () => {
    it('should create message and send email', async () => {
      sendEmail.mockResolvedValue({ messageId: 'test-id' });

      const res = await request(app)
        .post('/api/messages')
        .send({
          name: 'Jane Doe',
          email: 'jane@example.com',
          message: 'Hello, this is a test message',
        });

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.name).toBe('Jane Doe');
      expect(sendEmail).toHaveBeenCalledTimes(1);
    });

    it('should create message even if email fails', async () => {
      sendEmail.mockRejectedValue(new Error('Email failed'));

      const res = await request(app)
        .post('/api/messages')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          message: 'Test message',
        });

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
    });

    it('should reject message without required fields', async () => {
      const res = await request(app)
        .post('/api/messages')
        .send({
          name: 'Test User',
        });

      expect(res.statusCode).toBe(400);
    });

    it('should reject message with invalid email', async () => {
      const res = await request(app)
        .post('/api/messages')
        .send({
          name: 'Test User',
          email: 'invalid-email',
          message: 'Test message',
        });

      expect(res.statusCode).toBe(400);
    });
  });

  describe('GET /api/messages', () => {
    it('should require auth to get messages', async () => {
      const res = await request(app).get('/api/messages');

      expect(res.statusCode).toBe(401);
    });

    it('should get all messages with auth', async () => {
      const res = await request(app)
        .get('/api/messages')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toBeInstanceOf(Array);
      expect(res.body.count).toBeGreaterThan(0);
    });

    it('should sort messages by read status and date', async () => {
      await Message.create({
        name: 'User 2',
        email: 'user2@example.com',
        message: 'Second message',
        read: true,
      });

      const res = await request(app)
        .get('/api/messages')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      // Unread messages should come first
      expect(res.body.data[0].read).toBe(false);
    });
  });

  describe('PATCH /api/messages/:id/read', () => {
    it('should toggle read status', async () => {
      expect(testMessage.read).toBe(false);

      const res = await request(app)
        .patch(`/api/messages/${testMessage._id}/read`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.data.read).toBe(true);

      // Toggle again
      const res2 = await request(app)
        .patch(`/api/messages/${testMessage._id}/read`)
        .set('Authorization', `Bearer ${token}`);

      expect(res2.body.data.read).toBe(false);
    });

    it('should require auth to toggle read status', async () => {
      const res = await request(app).patch(`/api/messages/${testMessage._id}/read`);

      expect(res.statusCode).toBe(401);
    });
  });

  describe('DELETE /api/messages/:id', () => {
    it('should delete message with auth', async () => {
      const res = await request(app)
        .delete(`/api/messages/${testMessage._id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(200);

      const message = await Message.findById(testMessage._id);
      expect(message).toBeNull();
    });

    it('should require auth to delete', async () => {
      const res = await request(app).delete(`/api/messages/${testMessage._id}`);

      expect(res.statusCode).toBe(401);
    });
  });
});
