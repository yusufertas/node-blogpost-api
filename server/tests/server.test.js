const expect = require('expect');
const request = require('supertest');

const {ObjectID} = require('mongodb');
const {app} = require('./../server');
const {blogPost} = require('./../models/blogPost');

const blogposts = [{
    _id: new ObjectID(),
    content:"The world as we have created it is a process of our thinking. It cannot be changed without changing our thinking.",
    author:"Albert Einstein",
    tags:[]
},{
    _id: new ObjectID(),
    content:"It is our choices, Harry, that show what we truly are, far more than our abilities.",
    author:"J.K. Rowling",
    tags:[]
}];

blogposts[0].tags.push(['change', 'deep-thoughts', 'thinking', 'world']);
blogposts[1].tags.push(['abilities', 'choices']);

beforeEach((done) => {
    blogPost.remove({}).then(() => {
       return blogPost.insertMany(blogposts);
    }).then(() => done());
});

describe('POST/ blogPosts',() => {
    it('should create a new blog post',(done) => {
        var content = "Some content to test";
        var author = "Yusuf Ertas"
        request(app).
        post('/blogPosts')
        .send({content,author})
        .expect(200)
        .expect((res) => {
            expect(res.body.content).toBe(content);
            expect(res.body.author).toBe(author);
        })
        .end((err,res) => {
            if (err){
                return done(err);
            }
            blogPost.find({content,author}).then((blogPosts) => {
                expect(blogPosts.length).toBe(1);
                expect(blogPosts[0].content).toBe(content);
                expect(blogPosts[0].author).toBe(author);
                done();
            }).catch((e) => done(e));
        });
    });
    it('should not create blog post with invalid data',(done) => {
        request(app).
        post('/blogPosts')
        .send({})
        .expect(400)
        .end((err,res) => {
            if (err){
                return done(err);
            }
            blogPost.find().then((blogPosts) => {
                expect(blogPosts.length).toBe(2);
                done();
            }).catch((e) => done(e));
        });
    });
});

describe('GET /blogPosts',() => {
    it('should get all blog posts', (done) => {
        request(app)
        .get('/blogPosts')
        .expect(200)
        .expect((res) => {
            expect(res.body.blogposts.length).toBe(2)
        
        }).end(done);
    });
});

describe('GET /blogPosts/:id', () =>{
    it('should return blog post doc',(done) =>{
        request(app)
        .get(`/blogPosts/${blogposts[0]._id.toHexString()}`)
        .expect((res) => {
            expect(res.body.blogposts.content).toBe(blogposts[0].content);
            expect(res.body.blogposts.author).toBe(blogposts[0].author);
        })
        .end(done);
    });
    it('should return a 404 if no blog post is found',(done) => {
        var hexId = new ObjectID().toHexString();

        request(app)
        .get(`/blogPosts/${hexId}`)
        .expect(400)
        .end(done);
    });
    it('should return 404 for non object-ids',(done) => {
        request(app)
        .get('/blogPosts/123abc')
        .expect(404)
        .end(done);
        
    })
    
});