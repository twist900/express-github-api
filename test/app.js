const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const jwt = require('jsonwebtoken');

const expect = chai.expect;
chai.use(chaiHttp);

let token = jwt.sign({ name: "Georgy Shabunin"}, process.env.APP_SECRET);

describe('API', () => {
  describe('GET /repos', () => { 
    it('should respond with status 401 when not authenticated', (done) => {
      chai.request(app)
          .get('/repos')
          .end((err, res) => {
            expect(res).to.have.status(401);
            done();
      });  
    });
    
    it('should return an array of repos', (done) => {
      chai.request(app)
          .get('/repos')
          .set('authorization', 'JWT ' + token)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.a('array');
            expect(res.body[1]).to.have.keys(['id', 'name']);
            done();
      });   
    });
  });
    
  describe('GET /repos/:id', () => {
    it('should respond with status 401 when not authenticated', (done) => {
      chai.request(app)
          .get('/repos')
          .end((err, res) => {
            expect(res).to.have.status(401);
            done();
      });
    });

    it('should respond with repo json', (done) => {
      chai.request(app)
          .get('/repos/1')
          .set('authorization', 'JWT ' + token)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.a('object');
            expect(res.body).to.have.keys(['id', 'user', 'name', 'description', 
              'pushed_at', 'created_at', 'updated_at']);
            expect(res.body.user).to.have.keys(['login', 'id']);
            done();
      });   
    });

    it('should respond with status 500 if repo doesn\'t exist', (done) => {
      chai.request(app)
          .get('/repos/2')
          .set('authorization', 'JWT ' + token)
          .end((err, res) => {
            expect(res).to.have.status(500);
            done();
      });   
    });
  });

  describe('GET /repos/search/:id', () => {
    it('should respond with status 401 when not authenticated', (done) => {     
      chai.request(app)
          .get('/repos/search/:query')
          .end((err, res) => {
            expect(res).to.have.status(401);
            done();
      });
    });
    it('should respond with an array of repos when authenticated', (done) => {
      chai.request(app)
          .get('/repos/search/hello')
          .set('authorization', 'JWT ' + token)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.a('array');
            expect(res.body[0]).to.have.keys(['id', 'name', 'description']);
            done();
      });   
    });
  });
});