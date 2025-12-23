const express = require('express'); 
const router = express.Router(); 
const fs = require('fs'); 
const path = './data.json'; 

router.post('/posts', getBlogs, (req, res) => {
  console.log(blogs); 
  const blog = {
    title: req.body.title, 
    content: req.body.content, 
    category: req.body.category, 
    tags: req.body.tags, 
    createdAt: new Date.now(), 
    updatedAt: new Date.now()
  };

  blogs.push(blog); 

  try {
    fs.writeFileSync(path, JSON.stringify(blog, null, 2)); 
    res.status(201).json(blogs);
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
      if (post.id === req.params.id) {
        post.title = postInfo.title;
        post.content = postInfo.content; 
        post.category = postInfo.category; 
        post.tags = postInfo.tags; 
        post.updatedAt = new Date.now(); 

        updatedPost = post; 
      }
    });
    
    fs.writeFileSync(path, JSON.stringify([res.blogs], null, 2); 
    res.status(200).json(updatedPost); 
  } catch (error) {
    res.status(404).json({message: 'Blog ID not found'}); 
  }
}); 

router.get('/posts/:id', getBlogs, (req, res) => {
  try {
    (res.blogs).forEach(blog => {
      if (blog.id === req.params.id) {
        return res.status(200).json(blog);
      }
    });
  } catch (error) {
    res.status(404).json({message: 'Blog post ID not found'}); 
  }
}); 

router.get('/posts', getBlogs, (req, res) => {
  try {
    return res.status(200).json(res.blogs); 
  } catch (error) {
    res.status(500).json({message: error.message}); 
  }
}); 

function getBlogs(req, res, next) {
  try {
    if(!fs.existsSync(path)) return res.status(404).json({message: 'File not found'}); 
    blogs = fs.readFileSync(path, 'utf8'); 
  } catch (error) {
    return res.status(500).json({message: error.message}); 
  }
  res.blogs = blogs;
  next(); 
}

module.exports = router; 
