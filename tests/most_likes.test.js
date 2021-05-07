const mostLikes = require('../utils/list_helper').mostLikes;
const blogs = require('../utils/blogs_for_test').blogs;
const oneBlogArray = require('../utils/blogs_for_test').oneBlogArray;
const favoriteAuthor = require('../utils/blogs_for_test').favoriteAuthor;
const oneBlogFavoriteAuthor = require('../utils/blogs_for_test').oneBlogFavoriteAuthor;

describe('most likes', () => {
  test('empty array returns undefined', () => {
    expect(mostLikes([])).toEqual(undefined);
  });
  test('of a bigger list is returns best author with right quantity of likes', () => {
    expect(mostLikes(blogs)).toEqual(favoriteAuthor);
  });
  test('when list has only one blog equals that author with amount of likes', () => {
    expect(mostLikes(oneBlogArray)).toEqual(oneBlogFavoriteAuthor);
  });
});