var twit = require('twit');
var twitter = new twit({
	consumer_key: 'TwNjohtHnx2becRqgycPzX1hH',
	consumer_secret: 'FRVQCqeneACUxNt3546o1tWE2EyH17CkK8MyrflSOMWa4ze78Z',
	access_token: '2899043958-98uZSC8w6kQKmTgLdofuaoLkgcStbMKIFcM2vkE',
	access_token_secret: '6yE3qCxPLC85D9DFJr0lopIoy2SjNfV1mgoqK6Vfa5XK7'
});

twitter.get('statuses/user_timeline', { screen_name: 'Drake', count: 5 }, function(err, data) {
		if (err) { console.log(err); }
		var drake_data = data;
		console.log(drake_data)
    });