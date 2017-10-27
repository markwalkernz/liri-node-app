// coding boot camp week 10 homework

// initialise packages
var fs = require("fs");
var request = require("request");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");

// get user input from command line arguments
var userCommand = process.argv[2];
var userString = process.argv[3];

// determine which process to run
function whichProcess() {
	switch (userCommand) {
		case "my-tweets":
			myTweets();
		break;

		case "spotify-this-song":
			spotifyThisSong();
		break;

		case "movie-this":
			movieThis();
		break;

		case "do-what-it-says":
			doWhatItSays();
		break;

		default:
			userHelp();

	}; // end of switch

}; // end of whichProcess function


// my-tweets ======================================================================================

function myTweets() {

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

}; // end of myTweets


// spotify-this-song ==============================================================================
function spotifyThisSong() {

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
    		console.log(error);
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
		
}; // end of spotifyThisSong


// movie-this =====================================================================================
function movieThis() {

	// if there is no user input, use the string below as the default 
	if(userString == undefined) {
		userString = "Mr Nobody";
	};

	// create api query string from first word of user input
	var queryArray = userString.split(" ");
	var queryLength = queryArray.length;
	var queryString = "http://www.omdbapi.com/?apikey=40e9cece&t=" + queryArray[0];

	// add + symbols to user input if it is more than one word
	for (var i = 1; i < queryLength; i++) {
		queryString = queryString + "+" + queryArray[i];
	};

	request(queryString, function(error,response,body) {

  		if (error) {
  			// error message
    		console.log(error);
  		}

  		else {

			// convert the body string into an object
			var objBody = JSON.parse(body);

			// display results on screen
			console.log("===== MOVIES =====");
			console.log("Search Term: " + userString);
			console.log("------------------")
			console.log("Title: " + objBody.Title);
			console.log("Year: " + objBody.Year);

				// loop through ratings array to find specific entries
				for (i in objBody.Ratings) {

					if (objBody.Ratings[i].Source == "Internet Movie Database") {
						console.log("Rating by IMDB: " + objBody.Ratings[i].Value);
					};

					if (objBody.Ratings[i].Source == "Rotten Tomatoes") {
						console.log("Rating by Rotten Tomatoes: " + objBody.Ratings[i].Value);
					};
				}

			console.log("Country: " + objBody.Country);
			console.log("Language: " + objBody.Language);
			console.log("Plot: " + objBody.Plot);
			console.log("Actors: " + objBody.Actors);

		}; // end else

	}); // end of omdb request function

}; // end of movie-this


// do-what-it-says ===============================================================================
function doWhatItSays() {

	// read in data
	fs.readFile("random.txt", "utf8", function(error, data) {

		if (error) {
			return console.log(error);
		}

		else {

			// check if there is data in the user text file
			if (data == "") {

				console.log("There is no data in random.txt");
			}	

			else {

				console.log("random.txt contained the following: " + data);

				// get user input from data then update userCommand and userString values
				var dataArray = data.split(",");

				userCommand = dataArray[0];
				userString = dataArray[1];

				// call the whichProcess function, which will act based on userCommand and userString
				whichProcess();

			}; // end else

		}; // end else

	}); // end of readFile function

}; // end of do-what-it-says


// display info to help the user ===================================================================
function userHelp () {

			console.log("Sorry, I don't understand that command.");
			console.log("Please use one of the following:")
			console.log("1. node liri.js my-tweets");
			console.log('2. node liri.js spotify-this-song "<search term>"');
			console.log('3. node liri.js movie-this "<search term>"');
			console.log("4. node liri.js do-what-it-says");

}; // end of userHelp function


// call the whichProcess function to begin =======================================================
whichProcess();