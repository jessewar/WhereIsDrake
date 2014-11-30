var express = require('express');
var app = express();
var http = require('http');
var twit = require('twit');
var stylus = require('stylus')
var nib = require('nib')

var app = express()

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib())
}

//Set the views directory
app.set('views', __dirname + '/views')
//Set the view engine as jase
app.set('view engine', 'jade')
//Set stylus as the middleware option
app.use(stylus.middleware(
  { src: __dirname + '/public'
  , compile: compile
  }
))
app.use(express.static(__dirname + '/public'))

app.get('/', function (req, res) {
  res.render('index',
  { title : 'Home' }
  )
})

var twitter = new twit({
  consumer_key: 'TwNjohtHnx2becRqgycPzX1hH',
  consumer_secret: 'FRVQCqeneACUxNt3546o1tWE2EyH17CkK8MyrflSOMWa4ze78Z',
  access_token: '2899043958-98uZSC8w6kQKmTgLdofuaoLkgcStbMKIFcM2vkE',
  access_token_secret: '6yE3qCxPLC85D9DFJr0lopIoy2SjNfV1mgoqK6Vfa5XK7'
});


app.set('port', (process.env.PORT || 5000));

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

// Start listening
app.listen(app.get('port'), function() {
console.log("Node app is running at localhost:" + app.get('port'));
});
