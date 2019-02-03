var express =require('express');
var bodyParser = require('body-parser');


var {mongoose} = require('./db/mongoose');
var {blogPost} = require('./models/blogPost');

var app = express();

app.use(bodyParser.json());
app.post('/blogPosts',(req,res) => {
    var newBlogPost2 = new blogPost({
        content:req.body.content,
        author:req.body.author
    });
    newBlogPost2.tags.push(req.body.tags);
    newBlogPost2.save().then((doc) => {
        res.send(doc);
    },(e) => {
        res.status(400).send(e);
    });

});

app.get('/blogPosts',(req,res) => {
    blogPost.find().then((blogposts)=>{
        res.send({blogposts});
    },(e) => {
        res.status(400).send(e);
    });
});

app.listen(3000, () => {
    console.log('Started on port 3000');
});

module.exports = {app};


