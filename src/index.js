let API = require('./util/api.js');
let axios = require('axios');

$(document).ready(function(){
  // cache DOM
  let $main = $('#main');
  let $form = $('#form-search');
  let $input = $('#input-search');

  // Event handler listen for search submit
  $form.on('submit', function(e){
    e.preventDefault();
    let ticker = $input.val();
    fetchTicker(ticker);
  })

  // Fetch stock
  function fetchTicker(ticker){
    API.fetchCompany(axios, ticker)
      .then(response => API.parse(response.data))
      .then(output => $main.html(output))
      .catch(err => $main.html(err))
  }
})