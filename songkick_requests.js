var http = require('http');

http.get("http://api.songkick.com/api/3.0/search/artists.json?query=Drake&apikey=FwEOoqWHci4hrxuW", function(res) {
  console.log("Got response: " + res.statusCode);
}).on('error', function(e) {
  console.log("Got error: " + e.message);
});


http.get("http://api.songkick.com/api/3.0/artists/556955/calendar.json?apikey=FwEOoqWHci4hrxuW", function(res) {
  console.log("Got response: " + res.statusCode);
  console.log(res)
}).on('error', function(e) {
  console.log("Got error: " + e.message);
});