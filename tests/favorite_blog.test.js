const favoriteBlog = require('../utils/list_helper/').favoriteBlog;

describe('favorite blog', () => {
  test('empty array returns undefined', () => {
    expect(favoriteBlog([])).toEqual(undefined);
  });
  test('of a bigger list is returns best blog correctly', () => {
    const result = favoriteBlog([
      {likes: 2},
      {likes: 3},
      {likes: 5}
    ]);
    expect(result).toEqual({likes: 5});
  });
  test('when list has only one blog equals that blog', () => {
    expect(favoriteBlog([{likes: 5}])).toEqual({likes: 5});
  });
});