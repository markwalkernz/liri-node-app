// coding boot camp week 10 homework

// initialise npms
var request = require("request");
var twitter = require("twitter");
var spotify = require("node-spotify-api");

// get user input from command line arguments
var inputLength = process.argv.length;
var userCommand = process.argv[2];
var userString = process.argv[3];

// if user input is more than one word, combine user input into a single string
if (inputLength > 3) {

	for (var i = 4; i < inputLength; i++) {
		userString = userString + "+" + process.argv[i];
	};

}; // end if

// my-tweets ======================================================================================

// get twitter keys from keys.js
var twitterKeys = require("./keys.js");

// authentication
var client = new twitter({
  consumer_key: twitterKeys.consumer_key,
  consumer_secret: twitterKeys.consumer_secret,
  access_token_key: twitterKeys.access_token_key,
  access_token_secret: twitterKeys.access_token_secret
});


if(userCommand == "my-tweets") {

	// get tweets using node api
	var params = {screen_name: 'brainfoodwebdev'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {


	  if (!error) {

	  	// display tweets on screen
	  	numTweets = tweets.length;

	  	console.log("===== MY TWEETS =====")
		console.log("Number of tweets: " + numTweets);
	  	
	  	for (var i = 0; i < numTweets; i++) {
	    	console.log(tweets[i].created_at + ": " + tweets[i].text);
	    };

	    console.log("=== END OF TWEETS ===");

	  } // end if

	  else {

	  	// error message
	  	console.log(error);

	  }; // end else

	}); // end of twitter function

}; // end of my-tweets


// spotify-this-song ==============================================================================
if(userCommand == "spotify-this-song") {

	console.log("selected spotify-this-song");
	console.log("userInput " + userString);

	if(userInput == undefined) {
		console.log("please use the following format: node liri.js spotify-this-song <song name>");
	};

}; // end of spotify-this-song


// movie-this =====================================================================================
if(userCommand == "movie-this") {

	console.log("selected movie-this");
	console.log("userInput " + userInput);

	if(userInput == undefined) {
		console.log("please use the following format: node liri.js movie-this <movie name>");
	};

}; // end of movie-this


// do-what-it-says ===============================================================================
if(userCommand == "do-what-it-says") {

	console.log("selected do-what-it-says");
	console.log("userInput " + userInput);

}; // end of do-what-it-says