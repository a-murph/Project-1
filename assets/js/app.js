$(document).ready(function(){

	$('.sidenav').sidenav();

	$("#search").on("keypress", function(e) {
		//if user presses Enter while in searchbar
		if (event.keyCode == 13) {
			event.preventDefault();

			var searchQuery = $("#search").val().trim();
			var numShows = $("#number-shows").val();
			console.log(searchQuery);

			var queryUrl = "https://api.seatgeek.com/2/events?q=" +searchQuery +"&per_page=" +numShows +"&client_id=MTIwMTg3Nzd8MTUyOTYyNjk2My44Ng&client_secret=d939930c1175b245b5d15ef398dd881ecf56bbcab0c67a476219bbc10051e64c"

			$.ajax({
				url: queryUrl,
				method: "GET"
			}).then(function(response) {
				$("#show-results").empty();

				//console logging
				console.log(response);
				for (var i = 0; i < response.events.length; i++) {
					var event = response.events[i];
					console.log("Event #" +(i+1) +":");
					console.log(event.title);
					console.log(event.venue.name);
					console.log(event.venue.display_location);
					console.log(event.datetime_local);
					console.log("Performers:");
					for (var j = 0; j < event.performers.length; j++) {
						console.log(event.performers[j].name);
					}
					console.log(event.url);
				}

				//displaying results on page
				for (var i = 0; i < response.events.length; i++) {
					var event = response.events[i];

					//create new div to hold show info
					var showInfoDiv = $("<div>");

					//create anchor to hold show title and link to SeatGeek page
					var showTitleLink = $("<a>");
					showTitleLink.text(event.title);
					showTitleLink.attr("href", event.url);

					//create paragraph to hold venue information
					var showVenueInfo = $("<p>");
					showVenueInfo.text(event.venue.name +", " +event.venue.display_location);
					
					//create paragraph to hold date and time of show
					var showTime = $("<p>");
					showTime.text(event.datetime_local);

					//create new div to hold list of artists at show
					var showArtists = $("<div>");
					showArtists.text("Performers:");
					for (var j = 0; j < event.performers.length; j++) {
						//create new paragraph to hold artist name
						var newArtist = $("<p>");
						newArtist.text(event.performers[j].name);
						showArtists.append(newArtist);
					}

					//add all elements to page
					showInfoDiv.append(showTitleLink);
					showInfoDiv.append(showVenueInfo);
					showInfoDiv.append(showTime);
					showInfoDiv.append(showArtists);
					$("#show-results").append(showInfoDiv);
				}
			});
		}
	});
	
});


