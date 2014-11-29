var express = require('express');
var app = express();
var http = require('http');
var twit = require('twit');

var twitter = new twit({
  consumer_key: 'TwNjohtHnx2becRqgycPzX1hH',
  consumer_secret: 'FRVQCqeneACUxNt3546o1tWE2EyH17CkK8MyrflSOMWa4ze78Z',
  access_token: '2899043958-98uZSC8w6kQKmTgLdofuaoLkgcStbMKIFcM2vkE',
  access_token_secret: '6yE3qCxPLC85D9DFJr0lopIoy2SjNfV1mgoqK6Vfa5XK7'
});


app.set('port', (process.env.PORT || 5000));
//app.use(express.static(__dirname + '/public'));

app.get('/twitter', function(request, response) {
  response.send('Hello World!');
	twitter.get('statuses/user_timeline', { screen_name: 'Drake', count: 10 }, function(err, data) {
    if (err) { console.log(err); }
    console.log(data);
    console.log(process.env.PORT);
  });


});

  var options = {
        host: 'api.songkick.com',
        path: '/api/3.0/artists/556955/calendar.json?apikey=FwEOoqWHci4hrxuW'
          };

app.get('/concert', function(req2,response) {
    response.send('Concert Location') 
   callback = function(response) {
        response.on('data', function (chunk) {
              drakes_tour+= chunk;
        });

        response.on('end', function () {
          var drakes_tour ='';
        	drakes_tour = JSON.parse(drakes_tour)
        	//console.log(JSON.parse(drakes_tour))
             console.log(drakes_tour.resultsPage.results.event[0].start.datetime);
             console.log(drakes_tour.resultsPage.results.event[0].venue.displayName);
             console.log(drakes_tour.resultsPage.results.event[0].location);

             });
          }

  var req = http.request(options, callback);

    req.write('Concert Location');
    req.end();

   });




app.listen(app.get('port'), function() {
console.log("Node app is running at localhost:" + app.get('port'));
});

