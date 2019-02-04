var express =require('express');
var bodyParser = require('body-parser');

var {ObjectID} = require('mongodb');
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

app.get('/blogPosts/:id', (req,res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    blogPost.findById(id).then((blogposts) => {
        if (!blogposts){
           return res.status(400).send();
        }
        res.send({blogposts});
    }).catch((e) => {
        res.status(400).send();
    })
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {app};

