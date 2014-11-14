var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  response.send('Hello World!')
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})

app.get('/', function(req,res) {
	http.get("http://api.songkick.com/api/3.0/artists/556955/calendar.json?apikey=FwEOoqWHci4hrxuW",function(request,response){
  console.log("Got response: " + response.statusCode);
  console.log(request)
}).on('error', function(e) {
  console.log("Got error: " + e.message);
})
});
