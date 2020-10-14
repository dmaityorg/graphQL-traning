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
        .send({query: '{ getUser(id: '+ dummyUser.id +') { id first_name posts{ title } } }'})
        .end((err, res) => {
          if (err) return done(err);
          console.log(res.body)
          res.body.data.getUser.should.have.property('id');
          res.body.data.getUser.should.have.property('first_name');
          done();
        });
    });

    it("Lists all users", function (done) {
      requester.post("/graphql")
        .send({ query: '{ getAllUsers { id first_name last_name posts { title } } }' })
        .end((err, res) => {
          if (err) return done(err);
          res.body.data.getAllUsers[0].should.have.property("id");
          res.body.data.getAllUsers[0].should.not.have.property("email");
          res.body.data.getAllUsers[0].should.have.property("last_name");
          done();
        });
    });

    it("Create users", function (done) {
      requester.post("/graphql")
        .send({ query: 'mutation{ createUser(first_name: "Celestial", last_name: "system", email: "dmaity@gmail.com") { id first_name last_name } }' })
        .end((err, res) => {
          if (err) return done(err);
          res.body.data.createUser.should.have.property("id");
          res.body.data.createUser.should.not.have.property("email");
          res.body.data.createUser.should.have.property("last_name");
          done();
        });
    });
  });
});
