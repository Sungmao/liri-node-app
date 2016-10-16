var Twitter = require('twitter');
var request = require('request');
var spotify = require('spotify');
var fs = require('fs');

var nodeArgs = process.argv;
var input1 = process.argv[2];
var input2 = "";

for (var i=3; i<nodeArgs.length; i++){
	if (i>3 && i<nodeArgs.length){
		input2 = input2 + "+" + nodeArgs[i];
	} else {
		input2 = input2 + nodeArgs[i];
	}
};


function myTweets() {
	
	var keyFile = require("./keys.js");
	var twitterKeys = keyFile.twitterKeys;

	var client = new Twitter(twitterKeys);
 
	var params = {screen_name: 'allenwu320'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {

		console.log("my last tweets!!!!")
		console.log("--------------------------")

  		if (!error && tweets.length<19) {
  		  	for (i=0; i<tweets.length; i++) {

  		  		console.log(tweets[i].text);
  		  		console.log("--------------------------")

  		  	} 
  		} else if (!error && tweets.length>19) {
  		  		for (i=0; i<20; i++) {

  		  			console.log(tweets[i].text);
  		  			console.log("--------------------------")

  		  		}
  		  }		  		
  	
	})

};


function thisSong(input2) {

	var songName = input2;
	var songQuery = { 
		type: 'track',
		query: songName + '&limit=10'
		}

	spotify.search(songQuery, function(err, data) {
    	if ( err ) {
       	 console.log('Error occurred: ' + err);
       	 return;
   	 	}

   	 	songJson = data.tracks.items;

   	 	for (i = 0; i<songJson.length; i++) {
    	
    	console.log(songJson[i].artists[0].name);
    	console.log(songJson[i].name);
    	console.log(songJson[i].preview_url);
    	console.log(songJson[i].album.name);
    	console.log("--------------------------------")
    	
    	}

	})
};


function movieThis(input2) {

	var movieName = input2;
	var queryUrl = 'http://www.omdbapi.com/?t=' + movieName +'&y=&plot=short&r=json&tomatoes=true';

	request(queryUrl, function(error, response, body) {

		movieJson = JSON.parse(body);

		if (!error && response.statusCode == 200){
			console.log("Title: " + movieJson.Title);
			console.log("Year: " + movieJson.Year);
			console.log("IMDB Rating: " + movieJson.imdbRating);
			console.log("Country: " + movieJson.Country);
			console.log("Language: " + movieJson.Language);
			console.log("Plot: " + movieJson.Plot);
			console.log("Actors: " + movieJson.Actors);
			console.log("Rotten Tomatoes Rating: " + movieJson.tomatoRating);
			console.log("Rotten Tomatoes URL: " + movieJson.tomatoURL);

		}
	})

};

function doWhatSays() {

	fs.readFile("random.txt", "utf8", function(err, data){

		var randomText = data.split(',');

		console.log(randomText[1]);

		input1 = randomText[0];

		var randomText2 = randomText[1].split(" ");

		input2 = "";

		for (i=0; i<randomText2.length; i++) {
			
			if (i>0 && i<randomText2.length){
				input2 = input2 + "+" + randomText2[i];
			} else {
				input2 = input2 + randomText2[i];
			}

		}

		liri(input1, input2);
	})

}; 


function liri(input1, input2) {

	if (input1 === 'spotify-this-song') {

		thisSong(input2);

	} else if (input1 === 'movie-this') {

		movieThis(input2)
	
	} else if (input1 === 'my-tweets') {

		myTweets();

	} else if (input1 === 'do-what-it-says') {

		doWhatSays();

	} else {

		console.log("What would you like to do?")
		console.log("spotify-this-song")
		console.log("movie-this")
		console.log("my-tweets")
		console.log("do-what-it-says")

	}

};


liri(input1, input2);


