

var model = {
  watchlistItems: [],
  browseItems: []
}


var api = {
  root: "https://api.themoviedb.org/3",
  token: "45227252b2cc5a4a4ac7fca0eedd28fc" // TODO 0 put your api key here
}


/**
 * Makes an AJAX request to themoviedb.org, asking for some movies
 * if successful, updates the model.browseItems appropriately, and then invokes
 * the callback function that was passed in
 */
function discoverMovies(callback) {
	$.ajax({
		url: api.root + "/discover/movie",
		data: {
			api_key: api.token,
		},
		success: function(response) {
			console.log("We got a response from The Movie DB!");
			console.log(response.results);
			
			// TODO 2
			// update the model, setting its .browseItems property equal to the movies we recieved in the response
			for (var i = 0; i < response.results.length; i++) {
				model.browseItems[i] = response.results[i].title;
			}
			console.log(model.browseItems);
			// invoke the callback function that was passed in. 
			
			callback();
		}
	});
  
}


/**
 * re-renders the page with new content, based on the current state of the model
 */
function render() {
  // TODO 7
  // clear everything from both lists
  $('#section-browse ul').empty();
  $('#section-watchlist ul').empty();
  // TODO 6
  // for each movie on the user's watchlist, insert a list item into the <ul> in the watchlist section
  model.watchlistItems.forEach(function(movie) {
	  
	  $('#section-watchlist ul').append('<li>' + movie + '</li>');
  });
  // for each movie on the current browse list, 
  model.browseItems.forEach(function(movie) {
		// TODO 3
		// insert a list item into the <ul> in the browse section
		var listItem = $('<li></li').html('<p>' + movie + '</p>'); 
		$('#section-browse ul').append(listItem);
		// TODO 4
		// the list item should include a button that says "Add to Watchlist"
		var myButton = $('<button></button)').text("Add to Watchlist");
		$(listItem).append(myButton); 
		// TODO 5
		// when the button is clicked, this movie should be added to the model's watchlist and render() should be called again
		$(myButton).click(function() {
			var movieName = $(listItem.children('p')).text();
			model.watchlistItems.push(movieName);
			render();
		});
		
  });
  
}


// When the HTML document is ready, we call the discoverMovies function,
// and pass the render function as its callback
$(document).ready(function() {
  discoverMovies(render);
});

