let webhose = module.exports = {}

// Dependencies
let axios = require('axios');
let helpers = require('./helpers');
let moment = require('moment');
moment().format();

// http://webhose.io/filterWebContent?token=da347ad6-b6b4-4135-839d-4308c3989db4&format=json&sort=relevancy&q=donald%20trump%20language%3Aenglish%20site_type%3Anews


const baseURL = 'http://webhose.io/filterWebContent?token=';
const APIKEY = 'da347ad6-b6b4-4135-839d-4308c3989db4'
const endpoint = `${baseURL}${APIKEY}&format=json&sort=relevancy&size=250&q=`

webhose.query = function(string){
  let queryParam = encodeURI(string) ;
  let url = `${endpoint}${queryParam}%20language%3Aenglish%20site_type%3Anews`;
  return axios.get(url)
}

webhose.parsePost = function(post){
  let url = post.url;
  let title = post.title;
  let text = helpers.truncate(post.text, 250);
  let thread = post.thread || {};
  let site = thread.site;
  let published = moment(thread.published).format('DD/MM/YY');
  return `
    <div class="post">
      <h3>${title}</h3>
      <p>Site: <a href="${url}" target="_blank">${site}</a> | Published: ${published}</p>
      <p>${text}</p>
    </div>
  `
}

webhose.fetchRender = function(string){
  return webhose.query(string)
    .then(response => response.data.posts)
    .then(posts => {
      return posts.map(post => {
        return webhose.parsePost(post)
      }).join(' ');
    })
}