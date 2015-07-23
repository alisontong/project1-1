var request = require('request')
  , expect = require('chai').expect;


describe('Home Page', function() {
  it('should have a HTTP of 200 - success', function(done) {
    request('http://localhost:3000/', function(err, res, body) {
      expect(res.statusCode).to.equal(200)
      // expect(res.statusCode).to.equal(300)
      done();
    })
  })
});

describe('Signup Page', function() {
  it('should have a HTTP of 200 - success', function(done) {
    request('http://localhost:3000/signup', function(err, res, body) {
      expect(res.statusCode).to.equal(200)
      // expect(res.statusCode).to.equal(300)
      done();
    })
  })
});

describe('Login Page', function() {
  it('should have a HTTP of 200 - success', function(done) {
    request('http://localhost:3000/login', function(err, res, body) {
      expect(res.statusCode).to.equal(200)
      // expect(res.statusCode).to.equal(300)
      done();
    })
  })
});

describe('Logout Page', function() {
  it('should have a HTTP of 200 - success', function(done) {
    request('http://localhost:3000/logout', function(err, res, body) {
      expect(res.statusCode).to.equal(200)
      // expect(res.statusCode).to.equal(300)
      done();
    })
  })
});



