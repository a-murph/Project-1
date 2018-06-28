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

/* ======================
    AUTHENTICATE USER 
=========================*/
function authentication(){
    const config = {
        apiKey: "AIzaSyCEscL9E-9Hpe6QzKdzgQRYJXVaZia6_24",
        authDomain: "hear-n-now.firebaseapp.com",
        databaseURL: "https://hear-n-now.firebaseio.com",
        projectId: "hear-n-now",
        storageBucket: "hear-n-now.appspot.com",
        messagingSenderId: "323599902659"
    };
    firebase.initializeApp(config);

    const firstName      = document.getElementById("first_name"),
          lastName       = document.getElementById("last_name"),
          addressBlock   = document.getElementById("Address"),
          passwordInput  = document.getElementById("password"),
          emailInput     = document.getElementById("email"),
          signupSubmit   = document.getElementById("signupSubmit");

    signupSubmit.addEventListener("click", e => {
    const password      = passwordInput.value,
          email         = email.value,
          auth          = firebase.auth();
    
    //sign in
        const promise = auth.signInWithEmailAndPassword(email,password);
        promise.catch(e => console.log(e.message));
    });

    //signup event
    signupSubmit.addEventListener("click", e => {
    const first         = first.value,
          last          = txtPassword.value,
          address       = addressBlock.value,
          password      = passwordInput.value,
          email         = email.value,
          auth          = firebase.auth();
    
    let isEmail = false;
    //let test = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/;
    let regex = /\w+@\w+\.(net|com|edu|mil|gov|org)/;
    
    isEmail = regex.test(email);
    
    //sign in
    const promise = auth.createUserWithEmailAndPassword(email,password);
        promise.catch(e => console.log(e.message));
        promise.catch(e => console.log(e.message));
    });

	//btnLogout.addEventListener("click", e => {
	firebase.auth().signOut();

    //realtime listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser) {
            console.log(firebaseUser);
        } else {
            console.log("not logged in");
        }
    })

};