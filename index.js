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

app.get('/concert', function(req,res) {
var str ='';
  var options = {
        host: 'api.songkick.com',
        path: '/api/3.0/artists/556955/calendar.json?apikey=FwEOoqWHci4hrxuW'
  };

   callback = function(response) {

        response.on('data', function (chunk) {
              str += chunk;
        });

        response.on('end', function () {
              console.log(str);
        });

        //return str;
  }

  var req = http.request(options, callback).end();

  //console.log(req.data);
  console.log(str);
});


app.get('/eventful', function(req,res) {
var str ='';
  var options = {
        host: 'api.eventful.com',
       // path: 'oauth/authorize?oauth_token=Vb2cx56jgZJtNH5h'
       path: '/rest/events/?q=drake'
  };

   callback = function(response) {

        response.on('data', function (chunk) {
              str += chunk;
        });

        response.on('end', function () {
              console.log(str);
        });

        //return str;
  }

  var req = http.request(options, callback).end();
  //console.log(req.data);
  console.log(str);
});

app.listen(app.get('port'), function() {
console.log("Node app is running at localhost:" + app.get('.port'));
});

