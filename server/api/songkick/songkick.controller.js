'use strict'

var http = require('http');

exports.index = function(req, res) {
  var options = {
    host: 'api.songkick.com',
    path: '/api/3.0/artists/556955/calendar.json?apikey=FwEOoqWHci4hrxuW'
  };
  var callback = function(res_songkick) {
  	var drakes_tour_str = '';
    res_songkick.on('data', function (chunk) {
      drakes_tour_str += chunk;
    });
    res_songkick.on('end', function() {
      var drakes_tour = JSON.parse(drakes_tour_str);
      var closest_event = drakes_tour.resultsPage.results.event[0];
      var tour_date = drakes_tour.resultsPage.results.event[0].start.datetime;
      var tour_name = drakes_tour.resultsPage.results.event[0].venue.displayName;
      var tour_location = drakes_tour.resultsPage.results.event[0].location.city;
      var screen_string = tour_date +'<br>' + tour_name + '<br>' + tour_location;
      res.send(closest_event)
    });
  }
  var req = http.request(options, callback).end()  
}




// var request = require("request");
//  songkick_module()

// function songkick_module() {

// var api_key = 'FwEOoqWHci4hrxuW';
// var artists_of_interest = ['Drake', 'NickiMinaj', 'LilWayne', 'Tyga'];
// var artist_data = [];

// find_all_artist_ids(artists_of_interest,api_key)

// }

// function find_all_artist_ids(artists_of_interest,api_key){
//   var artist_data = [];
//   for (var artist in artists_of_interest){
//      var artist_name =artists_of_interest[artist];
//      artist_data.push(find_artist_info(artist_name,api_key))
//   }
  
// };

// function find_artist_info(artist_name,api_key){

// request({
//   uri: "http://api.songkick.com/api/3.0/search/artists.json?query=" + artist_name + '&apikey=' + api_key,
//   method: "GET"
// }, function(error, response, data) {
  
//   data = JSON.parse(data)
//   data = data.resultsPage.results.artist[0]

//   console.log(data)
//   return(data);
// });
 
//}

