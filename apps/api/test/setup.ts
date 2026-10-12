// Test setup for API
process.env.NODE_ENV = 'test'
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/nemt_test'
process.env.JWT_SECRET = 'test-secret-key'
process.env.REDIS_URL = 'redis://localhost:6379'
