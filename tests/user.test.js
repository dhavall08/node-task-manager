const request = require('supertest');
const app = require('../src/app');

test('Should signup a new user', async () => {
  await request(app).post('/users').send({
    name: "Test",
    email: "abc@test.com",
    password: "pass1234",
  }).expect(201);
});