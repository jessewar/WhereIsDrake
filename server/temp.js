'use strict';

var PORT_LISTENER = 3001;
console.log('I am listening to this port: http://localhost:%s', PORT_LISTENER);

var express = require('express'),
http = require('http'),
path = require('path'),
twit = require('twit');

var appConfig = require('./config/appConfig.json');

var app = express();

// all environments
app.set('port', process.env.PORT || PORT_LISTENER);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');


var twitter = new twit({
  consumer_key: 'TwNjohtHnx2becRqgycPzX1hH',
  consumer_secret: 'FRVQCqeneACUxNt3546o1tWE2EyH17CkK8MyrflSOMWa4ze78Z',
  access_token: '2899043958-98uZSC8w6kQKmTgLdofuaoLkgcStbMKIFcM2vkE',
  access_token_secret: '6yE3qCxPLC85D9DFJr0lopIoy2SjNfV1mgoqK6Vfa5XK7'
});


//Start of twitter api request using the twit package
app.get('/twitter', function(request, response) {
  twitter_request(response);
});

function twitter_request(response){
  var latest_tweet = '';
  var twitter_data = ''  
  twitter.get('statuses/user_timeline', { screen_name: 'Drake', count: 1 }, function(err, data) {
    if (err) { console.log(err); }
    twitter_data = data[0]
    latest_tweet += twitter_data.user.name + '<br>';
    latest_tweet += 'Text: ' + twitter_data.text + '<br>';
    latest_tweet += 'Retweet Count: ' + twitter_data.retweet_count + '<br>';
    latest_tweet += 'Favorite Count: ' + twitter_data.favorite_count + '<br>';
    response.send(latest_tweet)
  })
}

//Start of songkick api requests. Enpoint set at /concert to print out drake's next concert location to the screen
app.get('/concert', function(req2,response2) {
  songkick_request(response2);
});

function songkick_request(response2){
  var tour_date = '';
  var tour_name = '';
  var tour_location = '';
  var drakes_tour ='';
  var options = {
    host: 'api.songkick.com',
    path: '/api/3.0/artists/556955/calendar.json?apikey=FwEOoqWHci4hrxuW'
  };
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
      screen_string = tour_date +'<br>' + tour_name + '<br>' + tour_location;
      response2.send(screen_string)
    });
  }
  var req = http.request(options, callback).end()  
}

//routes
require('./routes/index')(app);

app.use(express.static(path.join(__dirname, appConfig.directories.publicDir)));

app.use(function (req, res, next) {
  console.log('req.body: ' + JSON.stringify(req.body));
  next();
});

// Start listening
app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});