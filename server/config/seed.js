/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Location = require('../api/location/location.model')
var Promise = require("bluebird");
var request = Promise.promisify(require("request"));

function seed_location(data){
  Location.findOne({ 'start_date': data.start.date }, function (err, location) {
    if (err || location == null) {Location.create({
        lat:data.venue.lat,
        lng:data.venue.lng,
        info:data.displayName,
        city: data.location.city,
        start_date: data.start.date
      });
      }
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
