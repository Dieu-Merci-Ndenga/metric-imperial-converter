const { assert } = require('chai');
const request = require('supertest');
const app = require('../server');

describe('Functional tests', () => {
  it('should convert a valid input such as 10L', async () => {
    const response = await request(app).get('/api/convert/10L');
    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.returnNum, 2.64172);
  });

  it('should reject an invalid input such as 32g', async () => {
    const response = await request(app).get('/api/convert/32g');
    assert.deepEqual(response.body, { error: 'invalid unit' });
  });

  it('should reject an invalid number such as 3/7.2/4kg', async () => {
    const response = await request(app).get('/api/convert/3%2F7.2%2F4kg');
    assert.deepEqual(response.body, { error: 'invalid number' });
  });

  it('should reject an invalid number and unit', async () => {
    const response = await request(app).get('/api/convert/3%2F7.2%2F4kilomegagram');
    assert.deepEqual(response.body, { error: 'invalid number and unit' });
  });

  it('should convert with no number such as kg', async () => {
    const response = await request(app).get('/api/convert/kg');
    assert.strictEqual(response.body.initNum, 1);
    assert.strictEqual(response.body.initUnit, 'kg');
  });
});