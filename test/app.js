const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const jwt = require('jsonwebtoken');

const expect = chai.expect;
chai.use(chaiHttp);


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
    
    it('should return an array of repos when authenticated');
  });
    
  describe('GET /repos/:id', () => {
    it('should respond with status 401 when not authenticated');
    it('should respond with repo json when authenticated');
  });

  describe('GET /repos/search/:id', () => {
    it('should respond with status 401 when not authenticated');
    it('should respond with an array of repos when authenticated');
  });
});