const express = require('express'); 
const router = express.Router(); 
const fs = require('fs'); 
const path = './data.json'; 

router.post('/posts', getBlogs, (req, res) => {
  const lastId = res.blogs.length > 0 ? res.blogs[res.blogs.length - 1].id : 0;
  const blog = {
    id: lastId + 1,
    title: req.body.title, 
    content: req.body.content, 
    category: req.body.category, 
    tags: req.body.tags, 
    createdAt: new Date(), 
    updatedAt: new Date()
  };

  blogs.push(blog); 

  try {
    fs.writeFileSync(path, JSON.stringify(blogs, null, 2)); 
    res.status(201).json(blog);
  } catch (error) {
    res.status(400).json({message: error.message}); 
  }
});

router.put('/posts/:id', getBlogs, (req, res) => {
  const postInfo = { 
    title: req.body.title, 
    content: req.body.content, 
    category: req.body.category, 
    tags: req.body.tags, 
  }; 

  try {
    let updatedPost = {}; 
    (res.blogs).forEach(post => {
      if (post.id == req.params.id) {
        post.title = postInfo.title;
        post.content = postInfo.content; 
        post.category = postInfo.category; 
        post.tags = postInfo.tags; 
        post.updatedAt = new Date(); 

        updatedPost = post; 
      }
    });

    fs.writeFileSync(path, JSON.stringify(res.blogs, null, 2)); 
    res.status(200).json(updatedPost); 
  } catch (error) {
    res.status(404).json({message: 'Blog ID not found'}); 
  }
}); 

router.delete('/posts/:id', getBlogs, (req, res) => {
  try {
    const len = res.blogs.length; 
    res.blogs = res.blogs.filter(post => post.id != req.params.id);

    if (res.blogs.length === len) {
      return res.status(404).json({message: 'Blog ID not found'});
    }

    fs.writeFileSync(path, JSON.stringify(res.blogs, null, 2)); 
    res.status(200).json({message: `Deleted post ID:${req.params.id}`}); 
  } catch (error) {
    res.status(500).json({message: error.message}); 
  }
}); 

router.get('/posts/:id', getBlogs, (req, res) => {
  try {
    const blog = res.blogs.find(blog => blog.id == req.params.id);

    if (!blog) 
      return res.status(404).json({message: 'Blog post ID not found'});

    res.status(200).json(blog); 
      
  } catch (error) {
    res.status(500).json({message: error.message}); 
  }
}); 

router.get('/posts', getBlogs, (req, res) => {
  try {
    console.log('get posts'); 
    return res.status(200).json(res.blogs); 
  } catch (error) {
    res.status(500).json({message: error.message}); 
  }
}); 

function getBlogs(req, res, next) {
  try {
    if(!fs.existsSync(path)) {
      blogs = [];
      fs.writeFileSync(path, JSON.stringify([], null, 2)); 
    } else {
      blogs = JSON.parse(fs.readFileSync(path, 'utf8'));
    }
  } catch (error) {
    return res.status(500).json({message: error.message}); 
  }
  res.blogs = blogs;
  next(); 
}

module.exports = router; 
