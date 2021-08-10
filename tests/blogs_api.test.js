const app = require('../app');
const supertest = require('supertest');
const mongoose = require('mongoose');

const api = supertest(app);

const Blog = require('../models/blog');
const initialBlogs = require('../utils/blogs_for_test').blogs;

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = initialBlogs.map(blog => new Blog(blog));
  const promiseArr = blogObjects.map(blog => blog.save());
  await Promise.all(promiseArr);
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('there are the right amount of blogs', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body).toHaveLength(initialBlogs.length);
});

test('the unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs');
  for (let blog of response.body) {
    expect(blog.id).toBeDefined();
  }
});

test('POST request to the /api/blogs creates a new blog post', async () => {
  await api.post('/api/blogs')
    .send(initialBlogs[0])
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');
  const titles = response.body.map(blog => blog.title);

  expect(response.body).toHaveLength(initialBlogs.length + 1);
  expect(titles).toContain(initialBlogs[0].title);
});

test('missing "likes" property defaults to the value "0"', async () => {
  const blogWithoutLikes = { ...initialBlogs[0] };
  delete blogWithoutLikes.likes;
  const result = await api.post('/api/blogs').send(blogWithoutLikes);
  expect(result.body.likes).toBe(0);
});

afterAll(() => {
  mongoose.connection.close();
});