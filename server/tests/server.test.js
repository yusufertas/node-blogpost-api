const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {blogPost} = require('./../models/blogPost');

beforeEach((done) => {
    blogPost.remove({}).then(() => done());
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
            blogPost.find().then((blogPosts) => {
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
                expect(blogPosts.length).toBe(0);
                done();
            }).catch((e) => done(e));
        });
    });
});

