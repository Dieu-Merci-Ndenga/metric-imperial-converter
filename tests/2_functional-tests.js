const { assert } = require('chai');
const request = require('supertest');
const app = require('../server');

suite('Functional Tests', () => {
  test('GET /api/convert?input=10L', async () => {
    const response = await request(app).get('/api/convert?input=10L');
    assert.strictEqual(response.status, 200);
    assert.deepEqual(response.body, {
      initNum: 10,
      initUnit: 'L',
      returnNum: 2.64172,
      returnUnit: 'gal',
      string: '10 liters converts to 2.64172 gallons'
    });
  });

  test('GET /api/convert?input=32g', async () => {
    const response = await request(app).get('/api/convert?input=32g');
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.text, 'invalid unit');
  });

  test('GET /api/convert?input=3/7.2/4kg', async () => {
    const response = await request(app).get('/api/convert?input=3%2F7.2%2F4kg');
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.text, 'invalid number');
  });

  test('GET /api/convert?input=3/7.2/4kilomegagram', async () => {
    const response = await request(app).get('/api/convert?input=3%2F7.2%2F4kilomegagram');
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.text, 'invalid number and unit');
  });

  test('GET /api/convert?input=kg', async () => {
    const response = await request(app).get('/api/convert?input=kg');
    assert.strictEqual(response.status, 200);
    assert.deepEqual(response.body, {
      initNum: 1,
      initUnit: 'kg',
      returnNum: 2.20462,
      returnUnit: 'lbs',
      string: '1 kilograms converts to 2.20462 pounds'
    });
  });
});
