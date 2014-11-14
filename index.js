var express = require('express');
var app = express();
var twit = require('twit');

var twitter = new twit({
  consumer_key: 'TwNjohtHnx2becRqgycPzX1hH',
  consumer_secret: 'FRVQCqeneACUxNt3546o1tWE2EyH17CkK8MyrflSOMWa4ze78Z',
  access_token: '2899043958-98uZSC8w6kQKmTgLdofuaoLkgcStbMKIFcM2vkE',
  access_token_secret: '6yE3qCxPLC85D9DFJr0lopIoy2SjNfV1mgoqK6Vfa5XK7'
});


app.set('port', (process.env.PORT || 5000));
//app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.send('Hello World!');
  twitter.get('search/tweets', { q: 'drake', count: 10 }, function(err, data) {
    console.log(data);
    console.log(err);
    // response.send("Jesse");
    // response.send(data);
  });
  response.send("here");
});


app.get('/', function(req,res) {
	http.get("http://api.songkick.com/api/3.0/artists/556955/calendar.json?apikey=FwEOoqWHci4hrxuW",function(request,response){
  console.log("Got response: " + response.statusCode);
  console.log(request)
}).on('error', function(e) {
  console.log("Got error: " + e.message);
})
});


app.listen(app.get('port'), function() {
console.log("Node app is running at localhost:" + app.get('port'));
});
