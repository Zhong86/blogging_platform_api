const express = require('express');


const port = process.env.PORT || 8080; 
const app = express(); 
app.use(express.json()); 

const blogRoute = require('./blogRoute'); 
app.use('/api', blogRoute);
app.listen(port, () => {
    console.log('Server connected: ', port);
});
