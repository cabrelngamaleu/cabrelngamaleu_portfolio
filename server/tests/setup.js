// Test setup file
process.env.NODE_ENV = 'test';
process.env.MONGODB_URI =
  process.env.MONGODB_URI_TEST || 'mongodb://localhost:27017/portfolio_test';
process.env.JWT_SECRET = 'test_jwt_secret';
process.env.JWT_EXPIRE = '24h';
process.env.FRONTEND_URL = 'http://localhost:3000';
