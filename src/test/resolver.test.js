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
  let dummyPost;
  before(async () => {
    dummyUser = await models.user.create({first_name: "debasish", last_name: "maity", email: "xxx", address: "xxx"});
    console.log(dummyUser)
  });

  after(async () => {
    if (requester) await requester.close();
    await models.user.destroy({
      where: {
          id: dummyUser.id
      }
    });
  });

  describe("#Graphql", function () {
    it("Find user", function (done) {
      requester.post("/graphql")
        .send({query: '{ getUser(id: '+ dummyUser.id +') { id first_name } }'})
        .end((err, res) => {
          if (err) return done(err);
          res.body.data.getUser.should.have.property('id');
          res.body.data.getUser.should.have.property('first_name');
          done();
        });
    });
  });
});
