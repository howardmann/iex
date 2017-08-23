let api = module.exports = {}

// Dependencies
const apiURL = 'https://api.iextrading.com/1.0';

api.fetchCompany = function($, ticker){
  let url = `${apiURL}/stock/${ticker}/company`;
  
  return new Promise(function(resolve, reject){
    $.get(url).then(function(response){
      if (response.data.companyName) {
        resolve(response)
      } else {        
        reject('Invalid ticker');      
      }      
    });
  }) 
}