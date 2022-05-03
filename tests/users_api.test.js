const supertest = require('supertest');
const mongoose = require('mongoose');
const { usersInDb } = require('./test_helper');

let api = null;

const User = require('../models/user');
const initialUsers = require('../utils/users_for_test').users;

beforeEach(async () => {
  const app = require('../app');
  api = supertest(app);
  await User.deleteMany({});
  const userObjects = initialUsers.map(user => new User(user));
  const promiseArr = userObjects.map(user => user.save());
  await Promise.all(promiseArr);
});

describe('user creation', () => {
  test('POST request to the /api/users creates a new user', async () => {
    const userToCreate = { 
      username: 'newUser',
      password: 'keklol'
    };

    await api.post('/api/users')
      .send(userToCreate)
      .expect(201)
      .expect('Content-Type', /application\/json/);
  
    const usersAtEnd = await usersInDb();
    const usernames = usersAtEnd.map(user => user.username);
  
    expect(usersAtEnd).toHaveLength(initialUsers.length + 1);
    expect(usernames).toContain(initialUsers[0].username);
  });

  test('invalid add user operation return 400 status code and error message', async () => {
    const userToCreate = { 
      password: 'keklol'
    };

    const response = await api.post('/api/users')
      .send(userToCreate)
      .expect(400);

    expect(response.body.error).toHaveLength;
  
    const usersAtEnd = await usersInDb();
  
    expect(usersAtEnd).toHaveLength(initialUsers.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});