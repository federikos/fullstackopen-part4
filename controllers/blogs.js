const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1, id: 1 });
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  if (!request.body.title && !request.body.url) {
    return response.status(400).end();
  }

  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    ...request.body,
    likes: request.body.likes || 0,
    user: user._id
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const blog = await Blog.findByIdAndRemove(request.params.id, { useFindAndModify: false });
  
  if (blog.user.toString() === decodedToken.id.toString()) {
    return response.status(204).end();
  }

  return response.status(401).json({ error: 'not authorized' });
});

blogsRouter.put('/:id', async (request, response) => {
  const blog = request.body;
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true, useFindAndModify: false });
  response.json(updatedBlog);
});

module.exports = blogsRouter;