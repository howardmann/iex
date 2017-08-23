let API = require('./util/api.js');
let axios = require('axios');

$(document).ready(function(){
  // cache DOM
  let $main = $('#main');

  // Fetch stock
  API.fetchCompany(axios, 'aapl')
    .then(response => API.parse(response.data))
    .then(output => $main.html(output))
})