$(document).ready(function(){
	$('.sidenav').sidenav();

	$("#search").on("keypress", function(e) {
		//if user presses Enter while in searchbar
		if (event.keyCode == 13) {
			event.preventDefault();

			var searchQuery = $("#search").val().trim();
			var numShows = $("#number-shows").val();
			var numMerch = $("#number-merch").val();
			console.log(searchQuery);

			var queryUrlSeatgeek = "https://api.seatgeek.com/2/events?q=" +searchQuery +"&per_page=" +numShows +"&client_id=MTIwMTg3Nzd8MTUyOTYyNjk2My44Ng&client_secret=d939930c1175b245b5d15ef398dd881ecf56bbcab0c67a476219bbc10051e64c";

			var queryUrlEbay = "http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.12.0&SECURITY-APPNAME=DanielKi-HearandN-PRD-42ccbdebc-c00a3aa6&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords=" +searchQuery +"&paginationInput.entriesPerPage=" +numMerch;

			//SeatGeek API call
			$.ajax({
				url: queryUrlSeatgeek,
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
					//TODO: Make Datetime more readable
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

			$.ajax({
				url: queryUrlEbay,
				method: "GET",
			}).then(function(httpResponse) {
				response = JSON.parse(httpResponse);
				var items = response.findItemsByKeywordsResponse[0].searchResult[0].item;
				console.log(response);
				console.log(items);

				//console logging
				for (var i = 0; i < items.length; i++) {
					console.log(items[i].galleryURL[0]);
					console.log(items[i].title[0]);
					console.log(items[i].primaryCategory[0].categoryName[0]);
					console.log(items[i].condition[0].conditionDisplayName[0]);
					console.log(items[i].listingInfo[0].listingType[0]);
					console.log(items[i].sellingStatus[0].currentPrice[0].__value__ + items[0].sellingStatus[0].currentPrice[0]["@currencyId"]);
					console.log(items[i].listingInfo[0].endTime[0]);
					console.log(items[i].location[0]);
					console.log(items[i].shippingInfo[0].shipToLocations[0]);
					console.log(items[i].viewItemURL[0]);
				}

				//displaying results on page
				for (var i = 0; i < items.length; i++) {
					//create new div to hold item info
					var itemInfoDiv = $("<div>");

					//create img to hold item image
					var itemImage = $("<img>");
					itemImage.attr("src", items[i].galleryURL[0]);

					//create item title and link to Ebay page
					var itemTitleLink = $("<a>");
					itemTitleLink.text(items[i].title[0]);
					itemTitleLink.attr("href", items[i].viewItemURL[0]);

					//create category name
					var itemCategory = $("<p>");
					itemCategory.text(items[i].primaryCategory[0].categoryName[0]);

					//create condition
					var itemCondition = $("<p>");
					itemCondition.text(items[i].condition[0].conditionDisplayName[0]);

					//create listing type
					var itemListType = $("<p>");
					itemListType.text(items[i].listingInfo[0].listingType[0]);

					//create price
					var itemPrice = $("<p>");
				}
			});
		}
	});
});