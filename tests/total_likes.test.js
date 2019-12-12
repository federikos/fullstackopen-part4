const totalLikes = require('../utils/list_helper/').totalLikes;

describe('total likes', () => {
  test('empty array returns zero', () => {
    expect(totalLikes([])).toBe(0);
  });
  test('of a bigger list is calculated right', () => {
    const result = totalLikes([
      {likes: 5},
      {likes: 3},
      {likes: 2}
    ]);
    expect(result).toBe(10);
  });
  test('when list has only one blog equals the likes of that', () => {
    expect(totalLikes([{likes: 5}])).toBe(5);
  });
  test('returns number if one of blog likes property is undefined', () => {
    const result = totalLikes([
      {likes: 5},
      {likes: 3},
      {likes: 2},
      {likes: undefined}
    ]);
    expect(result).toBe(10);
  });
});