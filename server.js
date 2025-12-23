const express = require('express');


const port = process.env.PORT || 8080; 
const app = express(); 

const blogRoute = require('./blogRoute'); 
app.use('/api', blogRoute);
app.listen(port, () => {
    console.log('Server connected');
});
