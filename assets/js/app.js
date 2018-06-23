document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, options);
});

$(document).ready(function(){
	$('.sidenav').sidenav();

	$("#search").on("keypress", function(e) {
		//if user presses Enter while in searchbar
		if (event.keyCode == 13) {
			var searchQuery = $("#search").val().trim();
			console.log(searchQuery);

			var queryUrl = "https://api.seatgeek.com/2/events?q=" +searchQuery +"&per_page=50&client_id=MTIwMTg3Nzd8MTUyOTYyNjk2My44Ng&client_secret=d939930c1175b245b5d15ef398dd881ecf56bbcab0c67a476219bbc10051e64c"

			$.ajax({
				url: queryUrl,
				method: "GET"
			}).then(function(response) {
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
			});
		}
	});
});