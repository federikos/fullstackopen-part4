const dummy = blogs => {
  return 1;
};


const totalLikes = blogs => {
  return blogs.reduce((acc, blog) => { 
    if (blog.likes === undefined) {
      return acc;
    }
    return acc + blog.likes 
  }, 0);
};

const favoriteBlog = blogs => {
  return blogs.sort((a, b) => b.likes - a.likes)[0];
}

// const mostBlogs = blogs => {
//   blogs.sort
// }

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
};