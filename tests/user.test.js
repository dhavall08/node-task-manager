const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');

const userOne = {
  name: "User4",
  password: "Test_123",
  email: "usertest5@mailinator.com",
}

beforeEach(async () => {
  // run before every test case
  await User.deleteMany();
  await new User(userOne).save();
})

test('Should signup a new user', async () => {
  await request(app).post('/users').send({
    name: "Test",
    email: "abc@test.com",
    password: "Test@123",
  }).expect(201);
});

test('Should login existing user', async () => {
  await request(app).post('/login').send({
    email: userOne.email,
    password: userOne.password
  }).expect(200);
});

test('Should not login nonexisting user', async () => {
  await request(app).post('/login').send({
    email: userOne.email,
    password: 'abc'
  }).expect(400);
})