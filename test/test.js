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

// describe('Registration', function() {
//   it('should be able to register', function(done) {
//     request('http://localhost:3000/signup/', function(err, res, body) {
//       expect(res.statusCode).to.equal(200)
//       // expect(res.statusCode).to.equal(300)
//       done();
//     })
//   })
// });

