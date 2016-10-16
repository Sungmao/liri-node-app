
var request = require('request');

var input1 = process.argv[2];
var input2 = process.argv[3];

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

movieThis(input2);


