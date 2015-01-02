/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

// var Thing = require('../api/thing/thing.model');


// Thing.find({}).remove(function() {
//   Thing.create({
//     name : 'Development Tools',
//     info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
//   }, {
//     name : 'Server and Client integration',
//     info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
//   }, {
//     name : 'Smart Build System',
//     info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
//   },  {
//     name : 'Modular Structure',
//     info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
//   },  {
//     name : 'Optimized Build',
//     info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
//   },{
//     name : 'Deployment Ready',
//     info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
//   });
// });

var Location = require('../api/location/location.model')
var Promise = require("bluebird");
var request = Promise.promisify(require("request"));

function seed_location(data){
  Location.find({}).remove(function() {
      Location.create({
        lat:data.venue.lat,
        lng:data.venue.lng,
        info:data.displayName
      });
  });
}

function sk_request(artist_id,api_key){

  request({
    uri: "http://api.songkick.com/api/3.0/artists/" + artist_id + '/calendar.json?apikey=' + api_key,
    method: "GET"
  }).spread(function(response,data,error){
    data = JSON.parse(data);
    var result = data.resultsPage.results;
    if (typeof(result.event) != "undefined") {
      var closest_event = result.event[0];
      seed_location(closest_event);
    }
  }).catch(TypeError).error()
};

var artist_id = 556955;
var api_key = 'FwEOoqWHci4hrxuW';

sk_request(artist_id,api_key)
