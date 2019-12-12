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
  blogs.sort((a, b) => b.likes - a.likes);
  return blogs[0];
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
};