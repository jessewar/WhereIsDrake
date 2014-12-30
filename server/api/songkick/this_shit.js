var Promise = require("bluebird");
var request = Promise.promisify(require("request"));

function SongkickController(artists_of_interest,api_key){
    this.artists_of_interest = artists_of_interest;
    this.api_key = api_key;
    this.output_data = [];
}

SongkickController.prototype.find_artist_info = function(artist_name,api_key){
  request({
    uri: "http://api.songkick.com/api/3.0/search/artists.json?query=" + artist_name + '&apikey=' + api_key,
    method: "GET"
  }).spread(function(response,data,error){
    data = JSON.parse(data);
    var artist_data = data.resultsPage.results.artist[0];
    sC.get_artist_concert_locations(artist_data,api_key)
  }).catch(SyntaxError, function (e) {
    console.error("file contains invalid json");
  }).error(function (e) {
    console.error("unable to read file, because: ", e.message);
  });

};

SongkickController.prototype.get_artist_concert_locations = function(artist_data,api_key){

  request({
    uri: "http://api.songkick.com/api/3.0/artists/" + artist_data.id + '/calendar.json?apikey=' + api_key,
    method: "GET"
  }).spread(function(response,data,error){
    data = JSON.parse(data);
    var result = data.resultsPage.results;
    if (typeof(result.event) != "undefined") {
      //console.log()
      this.output_data = result.event[0];
      console.log(this.output_data)
    }
  }).catch(TypeError).error()
};

SongkickController.prototype.find_all_artists_info = function() {

for (var artist in this.artists_of_interest){
     var artist_name =artists_of_interest[artist];
     var artist_data = this.find_artist_info(artist_name,api_key);
   }
};

var artists_of_interest = ['Drake', 'NickiMinaj', 'LilWayne', 'Tyga'];
var api_key = 'FwEOoqWHci4hrxuW';
var sC = new SongkickController(artists_of_interest,api_key);
sC.find_all_artists_info();


xmlhttp = new XMLHttpRequest();
var url = "/api/location";
xmlhttp.open("POST", url, true);
xmlhttp.setRequestHeader("Content-type", "application/json");
xmlhttp.onreadystatechange = function () { //Call a function when the state changes.
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        alert(xmlhttp.responseText);
    }
}
var parameters = {
    "lat": "myname",
    "lng": "mypass"
};
// Neither was accepted when I set with parameters="username=myname"+"&password=mypass" as the server may not accept that
xmlhttp.send(JSON.stringify(parameters));