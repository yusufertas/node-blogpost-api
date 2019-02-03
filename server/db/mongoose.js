var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://yusufertas:R1_nappe@ds129904.mlab.com:29904/yusufertas-blogposts' || 'mongodb://localhost:27017/blogPosts');

module.exports = {
    mongoose
};