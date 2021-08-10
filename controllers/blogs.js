const blogsRouter = require('express').Router();
const { request, response } = require('express');
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  if(!request.body.title && !request.body.url) {
    return response.status(400).end();
  }

  const blog = new Blog({
    ...request.body,
    likes: request.body.likes || 0
  });

  const result = await blog.save();
  response.status(201).json(result);
});

blogsRouter.delete('/:id', async (request, response) => {
  Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

module.exports = blogsRouter;