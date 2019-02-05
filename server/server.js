const _ = require('lodash')
const express =require('express');
const bodyParser = require('body-parser');

const {ObjectID} = require('mongodb');
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

app.delete('/blogPosts/:id', (req,res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    blogPost.findByIdAndRemove(id).then((blogposts) => {
        if (!blogposts){
            res.status.send(404);
        }
        res.send(blogposts);
    }).catch((e) => {
        res.status(400).send();
    })
});

app.patch('/blogPosts/:id',(req,res) => {
    var id = req.params.id;
    var body = _.pick(req.body,['content','author','tags']);
    if (!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    blogPost.findOneAndUpdate(id,{$set:body},{new:true}).then((blogposts) =>{
        if (!blogposts){
            return res.status(404).send();
        }
        res.send({blogposts});
    }).catch((e) => {
        res.status(400).send();
    });
});

const port = 3000 || process.env.PORT;
app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {app};

