const mocha = require("mocha");
const chai = require("chai");
const chaiHttp = require("chai-http");
const models = require('../models');
const { EXISTING_POST } = require('./constants');
const app = require('../server');
let should = chai.should();
chai.use(chaiHttp);
let expect = chai.expect;

describe("Curd operations", function () {
  const requester = chai.request(app).keepOpen();
  before(async () => {
    dummyUser = await models.user.create({first_name: "debasish", last_name: "maity", email: "xxx", address: "xxx"});
    dummyPost = await models.post.create({title: "The title", last_name: "The Description", user_id: dummyUser.id});
});

  after(async () => {
    if (requester) await requester.close();
    await models.post.destroy({
        where: {
            id: dummyPost.id
        }
      });
    await models.user.destroy({
      where: {
          id: dummyUser.id
      }
    });
  });

  describe("#Graphql", function () {
    it("Find post", function (done) {
      requester.post("/graphql")
        .send({query: '{ getPost(id: '+ dummyPost.id +') { id title description user { first_name } } }'})
        .end((err, res) => {
          if (err) return done(err);
          console.log(res.body)
          res.body.data.getPost.should.have.property('id');
          res.body.data.getPost.should.have.property('title');
          done();
        });
    });

    it("Lists all posts", function (done) {
      requester.post("/graphql")
        .send({ query: '{ getAllPosts { id title description user { first_name } } }' })
        .end((err, res) => {
          if (err) return done(err);
          res.body.data.getAllPosts[0].should.have.property("id");
          res.body.data.getAllPosts[0].should.have.property("title");
          res.body.data.getAllPosts[0].should.have.property("description");
          done();
        });
    });

    it("Create posts", function (done) {
        requester.post("/graphql")
          .send({ query: 'mutation{ createPost(title: "Celestial", description: "Good Company", user_id: '+ dummyUser.id +') { id title description } }' })
          .end((err, res) => {
            if (err) return done(err);
            console.log(res.body)
            res.body.data.createPost.should.have.property("id");
            res.body.data.createPost.should.have.property("title");
            res.body.data.createPost.should.have.property("description");
            done();
          });
    });
  });
});
