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
      var tour_date = drakes_tour.resultsPage.results.event[0].start.datetime;
      var tour_name = drakes_tour.resultsPage.results.event[0].venue.displayName;
      var tour_location = drakes_tour.resultsPage.results.event[0].location.city;
      var screen_string = tour_date +'<br>' + tour_name + '<br>' + tour_location;
      res.send(screen_string)
    });
  }
  var req = http.request(options, callback).end()  
}

function find_artist_id(artist_name,api_key){
 
  var id_options = {
 host:'api.songkick.com',
 path: '/api/3.0/search/artists.json?query=' + artist_name + '&apikey=' + api_key
  }  

var data = '';

 var callback = function (res_songkick) {
    res_songkick.on('data', function (chunk) {
       data += chunk;
    });

    res_songkick.on('end', function(){
      data = JSON.parse(data);
      console.log(data.resultsPage.results.artist[0])
    })

  }

var req = http.request(id_options, callback).end()

}

var api_key = 'FwEOoqWHci4hrxuW';

console.log(find_artist_id('Drake',api_key))