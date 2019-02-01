const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => {
    if (err){
       return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    db.collection('Users').deleteMany({
        name:'Yusuf'
    }).then((result) => {
        console.log(result);
    });

    db.collection('Users').findOneAndDelete({
        _id:new ObjectID('5c548eff9ea36d02ecf20ddb')
    }).then((result) => {
        console.log(result);
    });

    // db.collection('Todos').deleteOne({
    //     text:'Walk the dog'
    // }).then((result) => {
    //     console.log(result)
    // });

    // db.collection('Todos').findOneAndDelete({
    //     completed:false
    // }).then((result) => {
    //     console.log(result)
    // });
});