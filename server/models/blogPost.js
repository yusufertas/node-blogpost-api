var mongoose = require('mongoose')

var blogPost = mongoose.model('blogPost',{
    content: {
        type: String,
        required:true,
        minlength:1,
        maxlength:3000,
        trim:true
    },
    author: {
        type: String,required:true,minlength:3,maxlength:100,trim:true
    },
    tags: [{
        type: String
    }]
});

module.exports = {blogPost}