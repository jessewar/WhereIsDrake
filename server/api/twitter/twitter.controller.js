'use strict'

var twit = require('twit');
var twitter = new twit({
	consumer_key: 'TwNjohtHnx2becRqgycPzX1hH',
	consumer_secret: 'FRVQCqeneACUxNt3546o1tWE2EyH17CkK8MyrflSOMWa4ze78Z',
	access_token: '2899043958-98uZSC8w6kQKmTgLdofuaoLkgcStbMKIFcM2vkE',
	access_token_secret: '6yE3qCxPLC85D9DFJr0lopIoy2SjNfV1mgoqK6Vfa5XK7'
});

exports.index = function(req, res) {
	twitter.get('statuses/user_timeline', { screen_name: 'Drake', count: 1 }, function(err, data) {
		if (err) { console.log(err); }
		var drake_data = data[0];
		res.send(drake_data);
    });
}

// var twitter_usernames = ['Drake', 'YoungMoneySite'];

// function get_tweets_from_username(username){
// twitter.get('statuses/user_timeline', { screen_name: username, count:10, function(err,data){
//  		if (err) console.log(err); }
//  		var user_tweets = data[0];
//  	}
//  })
// }