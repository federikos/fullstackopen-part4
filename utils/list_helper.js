// eslint-disable-next-line no-unused-vars
const dummy = blogs => {
  return 1;
};

const totalLikes = blogs => {
  return blogs.reduce((acc, blog) => { 
    if (blog.likes === undefined) {
      return acc;
    }
    return acc + blog.likes;
  }, 0);
};

const favoriteBlog = blogs => {
  return blogs.sort((a, b) => b.likes - a.likes)[0];
};

const mostBlogs = blogs => {
  const authors = [];
  
  blogs.forEach(blog => {
    const foundAuthor = authors.find(author => author.author === blog.author);

    if (!foundAuthor) {
      authors.push({
        author: blog.author,
        blogs: 1
      });
    } else {
      foundAuthor.blogs++;
    }
  });

  return authors.sort((a, b) => b.blogs - a.blogs)[0];
};

const mostLikes = blogs => {
  const authors = [];
  
  blogs.forEach(blog => {
    const foundAuthor = authors.find(author => author.author === blog.author);

    if (!foundAuthor) {
      authors.push({
        author: blog.author,
        likes: blog.likes
      });
    } else {
      foundAuthor.likes += blog.likes;
    }
  });

  return authors.sort((a, b) => b.likes - a.likes)[0];
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};