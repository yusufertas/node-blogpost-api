const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => {
    if (err){
       return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    // db.collection('Todos').findOneAndUpdate({
    //     _id:new ObjectID('5c54a103f6d0341a18fdbe83')
    // },{
    //     $set:{
    //         completed:false
    //     }
    // },{
    //     returnOriginal:false
    // }).then((result) => {
    //     console.log(result);
    // });
    db.collection('Users').findOneAndUpdate({
        _id:new ObjectID('5c548274d0d6ce1dd45ce4fb')
    },{
        $set:{
            name:"Yusuf",
            age:38
        }
    },{
        returnOriginal:false
    }).then((result) => {
       
        console.log(result);
    });

});