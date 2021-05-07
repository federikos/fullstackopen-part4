const favoriteBlog = require('../utils/list_helper').favoriteBlog;
const blogs = require('../utils/blogs_for_test').blogs;
const oneBlogArray = require('../utils/blogs_for_test').oneBlogArray;
const favoriteBlogResult = require('../utils/blogs_for_test').favoriteBlog;
const oneBlogFavoriteBlog = require('../utils/blogs_for_test').oneBlogFavoriteBlog;

describe('favorite blog', () => {
  test('empty array returns undefined', () => {
    expect(favoriteBlog([])).toEqual(undefined);
  });
  test('of a bigger list is returns best blog correctly', () => {
    expect(favoriteBlog(blogs)).toEqual(favoriteBlogResult);
  });
  test('when list has only one blog equals that blog', () => {
    expect(favoriteBlog(oneBlogArray)).toEqual(oneBlogFavoriteBlog);
  });
});