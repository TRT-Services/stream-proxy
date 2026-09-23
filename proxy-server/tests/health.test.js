process.env.PROXY_API_KEY = 'test-key';

const request = require('supertest');
const app = require('../src/app');

describe('GET /health', () => {
  it('returns status UP', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'UP' });
  });
});

describe('GET /stream', () => {
  it('rejects requests without an API key', async () => {
    const response = await request(app).get('/stream?url=https://example.com/video.mp4');
    expect(response.status).toBe(401);
  });

  it('rejects requests with an invalid url', async () => {
    const response = await request(app)
      .get('/stream?url=not-a-url')
      .set('X-Internal-Api-Key', 'test-key');
    expect(response.status).toBe(400);
  });
});
