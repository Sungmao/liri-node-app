
var request = require('request');
var spotify = require('spotify');

var input1 = process.argv[2];
var input2 = process.argv[3];


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

   	 	songJson = data.tracks

   	 	for (i = 0; i<songJson.items.length; i++) {
    	
    	console.log(songJson.items[i].artists[0].name);
    	console.log(songJson.items[i].name);
    	console.log(songJson.items[i].preview_url);
    	console.log(songJson.items[i].album.name);
    	console.log("--------------------------------")
    	
    	}

	});
}


thisSong(input2);


// This will show the following information about the song in your terminal/bash window

// Artist(s)
// The song's name
// A preview link of the song from Spotify
// The album that the song is from
// if no song is provided then your program will default to

// "The Sign" by Ace of Base








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

}




