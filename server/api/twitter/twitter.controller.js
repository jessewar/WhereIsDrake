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
		var twitter_data = data[0];
		console.log(twitter_data);	
		// latest_tweet += twitter_data.user.name + '<br>';
		// latest_tweet += 'Text: ' + twitter_data.text + '<br>';
		// latest_tweet += 'Retweet Count: ' + twitter_data.retweet_count + '<br>';
		// latest_tweet += 'Favorite Count: ' + twitter_data.favorite_count + '<br>';
		res.send(twitter_data);
    });
}