const mocha = require("mocha");
const chai = require("chai");
const chaiHttp = require("chai-http");
const models = require('../models');
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
    it("Lists all commnets", function (done) {
      requester.post("/graphql")
        .send({ query: '{ getAllComments { id description }}' })
        .end((err, res) => {
          if (err) return done(err);
          res.body.data.getAllComments[0].should.have.property("description");
          done();
        });
    });

    it("Create Comment", function (done) {
        requester.post("/graphql")
          .send({ query: 'mutation{ addComment(description: "Good Company!!", post_id: '+ dummyPost.id +') { description } }' })
          .end((err, res) => {
            if (err) return done(err);
            res.body.data.addComment.should.have.property("description");
            done();
          });
    });
  });
});
