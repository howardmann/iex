var chai = require('chai');
var expect = chai.expect;
let API = require('../src/util/api.js');
var sinon = require('sinon')
let axios = require('axios');

let aapl = {
    data: {
    symbol: 'AAPL',
    companyName: 'Apple Inc.',
    exchange: 'Nasdaq Global Select',
    industry: 'Computer Hardware',
    website: 'http://www.apple.com',
    description: 'Apple Inc is an American multinational technology company. It designs, manufactures, and markets mobile communication and media devices, personal computers, and portable digital music players.',
    CEO: 'Timothy D. Cook',
    issueType: 'cs',
    sector: 'Technology'
  }
}

describe('API', function(){
  it('should exist', () => expect(API).to.not.be.undefined);
  describe('.fetchCompany', function(){
    it('should exist', () => expect(API.fetchCompany).to.not.be.undefined);
    it('should return company data when passed a valid ticker', function(done){
      this.timeout(5000);
      API.fetchCompany(axios, 'aapl').then(function(response){
        let input = response.data;
        let actual = aapl.data;
        expect(input).to.eql(actual);
        done();
      })
    });
    it('should throw error if invalid ticker', function(done){
      this.timeout(5000);
      API.fetchCompany(axios, 'banana').catch(function(err){
        expect(err).to.equal('Invalid ticker')
        done();
      })
    });
    describe('using sinon stub', function(){
      it('should return company data when passed a valid ticker', function (done) {
        let data = Promise.resolve(aapl);
        let stub = sinon.stub(axios, 'get').returns(data);

        API.fetchCompany(axios, 'aapl').then(function (response) {
          let input = response.data;
          let actual = aapl.data;
          expect(input).to.eql(actual);
          stub.restore();
          done();
        })
      });      

      it('should reject with error when passed an invalid ticker', function (done) {
        let banana = {
          data: {
            symbol: 'banana',
            companyName: null,
            exchange: null,
            industry: null,
            website: null,
            description: null,
            CEO: null,
            issueType: null,
            sector: null
          }
        }
        let data = Promise.resolve(banana);
        let stub = sinon.stub(axios, 'get').returns(data);

        API.fetchCompany(axios, 'banana').catch(function (err) {
          let input = err;
          let actual = 'Invalid ticker'
          expect(err).to.equal(actual);
          stub.restore();
          done();
        })
      });      
    })

  })
})