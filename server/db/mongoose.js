var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

let db = {
    localhost: 'mongodb://localhost:27017/blogPosts',
    mlab: 'mongodb://yusufertas:R1_nappe@ds129904.mlab.com:29904/yusufertas-blogposts'
  };

mongoose.connect(db.mlab);

module.exports = {
    mongoose
};