let API = require('./util/webhose.js');
let axios = require('axios');

$(document).ready(function(){
  // cache DOM
  let $main = $('#main');
  let $form = $('#form-search');
  let $input = $('#input-search');

  // Event handler listen for search submit
  $form.on('submit', function(e){
    e.preventDefault();
    let text = $input.val();
    fetchNews(text);
  })

  // Fetch news
  function fetchNews(string){
    $main.html('...loading');
    API.fetchRender(string)
      .then(output => $main.html(output))
      .catch(err => $main.html(err))
  }
})