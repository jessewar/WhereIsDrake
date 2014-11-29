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

//Start of twitter api request using the twit package
var latest_tweet = '';
var twitter_data = '';
app.get('/twitter', function(request, response) {
	twitter.get('statuses/user_timeline', { screen_name: 'Drake', count: 1 }, function(err, data) {
    if (err) { console.log(err); }
    twitter_data = data[0]
    console.log(twitter_data.id)
    latest_tweet += twitter_data.user.name + '<br>';
    latest_tweet += 'Text: ' + twitter_data.text + '<br>';
    latest_tweet += 'Retweet Count: ' + twitter_data.retweet_count + '<br>';
    latest_tweet += 'Favorite Count: ' + twitter_data.favorite_count + '<br>';
  });

response.send(latest_tweet)
});

//Start of songkick api requests. Enpoint set at /concert to print out drake's next concert location to the screen
  var options = {
        host: 'api.songkick.com',
        path: '/api/3.0/artists/556955/calendar.json?apikey=FwEOoqWHci4hrxuW'
          };
  var drakes_tour ='';
var tour_date = '';
var tour_name = '';
var tour_location = '';

app.get('/concert', function(req2,response2) {
     
   callback = function(response) {
        response.on('data', function (chunk) {
              drakes_tour+= chunk;
        });

        response.on('end', function () {
        	drakes_tour = JSON.parse(drakes_tour)
        	//console.log(JSON.parse(drakes_tour))
             tour_date = drakes_tour.resultsPage.results.event[0].start.datetime;
             tour_name = drakes_tour.resultsPage.results.event[0].venue.displayName;
             tour_location = drakes_tour.resultsPage.results.event[0].location.city;
             });
          }

    var req = http.request(options, callback).end();

    screen_string = tour_date +'<br>' + tour_name + '<br>' + tour_location;
    response2.send(screen_string)

   });

app.listen(app.get('port'), function() {
console.log("Node app is running at localhost:" + app.get('port'));
});

