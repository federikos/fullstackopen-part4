const mostBlogs = require('../utils/list_helper').mostBlogs;
const blogs = require('../utils/blogs_for_test').blogs;
const oneBlogArray = require('../utils/blogs_for_test').oneBlogArray;
const mostProductiveAuthor = require('../utils/blogs_for_test').mostProductiveAuthor;
const oneBlogMostProductiveAuthor = require('../utils/blogs_for_test').oneBlogMostProductiveAuthor;

describe('most blogs', () => {
  test('empty array returns undefined', () => {
    expect(mostBlogs([])).toEqual(undefined);
  });
  test('of a bigger list is returns best author with right quantity of blogs', () => {
    expect(mostBlogs(blogs)).toEqual(mostProductiveAuthor);
  });
  test('when list has only one blog equals that author with one blog', () => {
    expect(mostBlogs(oneBlogArray)).toEqual(oneBlogMostProductiveAuthor);
  });
});