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


app.listen(3000, () => {
    console.log('Started on port 3000');
});

module.exports = {app};
// var newBlogPost1 = new blogPost({
//     content:"The world as we have created it is a process of our thinking. It cannot be changed without changing our thinking.",
//     author:"Albert Einstein"
// });

// newBlogPost1.tags.push(['change', 'deep-thoughts', 'thinking', 'world']);

// newBlogPost1.save().then((doc) => {
//     console.log(JSON.stringify(doc));
// },(e) => {
//     console.log('Unable to save blog post',e);
// });

