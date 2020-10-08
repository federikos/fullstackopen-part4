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

const mostBlogs = blogs => {
  const authors = [];
  
  blogs.forEach(blog => {
    let isAuthor = false;
    
    authors.forEach((author, i) => {
      if (author.author !== blog.author) return;

      isAuthor = true;
      authors[i] = {...author, blogs: author.blogs + 1}
    });

    if (!isAuthor) {
      authors.push({
        author: blog.author,
        blogs: 1
      })
    }
  })

  return authors.sort((a, b) => b.blogs - a.blogs)[0];
}

const mostLikes = blogs => {
  const authors = [];
  
  blogs.forEach(blog => {
    let isAuthor = false;
    authors.forEach((author, i) => {
      if (author.author === blog.author) {
        isAuthor = true;
        authors[i] = {...author, likes: author.likes + blog.likes}
        return;
      }
    });
    if (!isAuthor) {
      authors.push({
        author: blog.author,
        likes: blog.likes
      })
    }
  })

  return authors.sort((a, b) => b.likes - a.likes)[0];
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};