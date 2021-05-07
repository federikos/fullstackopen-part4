const totalLikes = require('../utils/list_helper').totalLikes;
const blogs = require('../utils/blogs_for_test').blogs;
const oneBlogArray = require('../utils/blogs_for_test').oneBlogArray;

describe('total likes', () => {
  test('empty array returns zero', () => {
    expect(totalLikes([])).toBe(0);
  });

  test('of a bigger list is calculated right', () => {
    const result = totalLikes(blogs);
    expect(result).toBe(36);
  });

  test('when list has only one blog equals the likes of that', () => {
    expect(totalLikes(oneBlogArray)).toBe(oneBlogArray[0].likes);
  });

  test('returns number if one of blog likes property is undefined', () => {
    const result = totalLikes([
      ...blogs,
      {
        _id: '5a422bc61b54a676234d17fc',
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: undefined,
        __v: 0
      }  
    ]);
    expect(result).toBe(36);
  });
});