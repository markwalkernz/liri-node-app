// coding boot camp week 10 homework

// initialise npms
var request = require("request");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");

// get user input from command line arguments
var userCommand = process.argv[2];
var userString = process.argv[3];

// my-tweets ======================================================================================

if(userCommand == "my-tweets") {

	// get twitter keys from keys.js
	var twitterKeys = require("./keys.js");

	// authentication
	var client = new Twitter({
	  consumer_key: twitterKeys.consumer_key,
	  consumer_secret: twitterKeys.consumer_secret,
	  access_token_key: twitterKeys.access_token_key,
	  access_token_secret: twitterKeys.access_token_secret
	});

	// get tweets using node api
	var params = {screen_name: 'brainfoodwebdev', count: 20};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {

	  if (error) {
	  	// error message
	  	console.log(error);
	  }

	  else {

	  	// display tweets on screen
	  	var numTweets = tweets.length;

	  	console.log("===== MY TWEETS =====")
		console.log("Number of tweets found: " + numTweets);
	  	
	  	for (var i = 0; i < numTweets; i++) {
	    	console.log(tweets[i].created_at + ": " + tweets[i].text);
	    };

	    console.log("=== END OF TWEETS ===");

	  }; // end else

	}); // end of twitter function

}; // end of my-tweets

// spotify-this-song ==============================================================================
if(userCommand == "spotify-this-song") {

	// if there is no user input, use the string below as the default 
	if(userString == undefined) {
		userString = "The Sign Ace of Base";
	};

	// get info using spotify api
	var spotify = new Spotify({
	  id: "5545ee88844f456fbc1db4d62a787391",
	  secret: "29afacaf094843088aa993c4827df703"
	});
	 
	spotify.search({ type: 'track', query: userString }, function(error, data) {
  		if (error) {
  			// error message
    		return console.log(error);
  		}

  		else {
 			
 			// display results on screen
			var numTracks = data.tracks.items.length;

			console.log("===== SPOTIFY =====");
			console.log("Search Term: " + userString);
			console.log("Number of tracks found: " + numTracks);
			
			// loop through tracks
			for (var i = 0; i < numTracks; i++) {
				console.log("---------------")
				console.log("Song Name: " + data.tracks.items[i].name);

				// loop through artists
				var numArtists = data.tracks.items[i].artists.length;
				var artistNames = data.tracks.items[i].artists[0].name;
				for (var j = 1; j < numArtists; j++) {
					var artistNames = artistNames + ", " + data.tracks.items[i].artists[j];
				};
				console.log("Artist(s): " + artistNames);

				console.log("Album: " + data.tracks.items[i].album.name);
				console.log("Link: " + data.tracks.items[i].preview_url);
			};

			console.log("===== END OF SEARCH =====");

		}; // end else

	}); // end of spotify function
		
}; // end of spotify-this-song


// movie-this =====================================================================================
if(userCommand == "movie-this") {

	// if there is no user input, use the string below as the default 
	if(userString == undefined) {
		userString = "Mr Nobody";
	};

	// create api query string 
	var queryArray = userString.split(" ");
	var queryLength = queryArray.length;
	var queryString = "http://www.omdbapi.com/?apikey=40e9cece&t=" + queryArray[0];

	// add + symbols to user input if it is more than one word
	for (var i = 1; i < queryLength; i++) {
		queryString = queryString + "+" + queryArray[i];
	};

	console.log(queryString);

	request(queryString, function(error,response,body) {

		console.log("===== MOVIES =====");
		console.log("Search Term: " + userString);
		console.log(body.Title);

	});

       // * Title of the movie.
       // * Year the movie came out.
       // * IMDB Rating of the movie.
       // * Rotten Tomatoes Rating of the movie.
       // * Country where the movie was produced.
       // * Language of the movie.
       // * Plot of the movie.
       // * Actors in the movie.

}; // end of movie-this


// do-what-it-says ===============================================================================
if(userCommand == "do-what-it-says") {

	console.log("selected do-what-it-says");
	console.log("userInput " + userInput);

}; // end of do-what-it-says