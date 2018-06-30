/* ======================
    AUTHENTICATE USER 
=========================*/

(function(){
    
    const config = {
        apiKey: "AIzaSyCEscL9E-9Hpe6QzKdzgQRYJXVaZia6_24",
        authDomain: "hear-n-now.firebaseapp.com",
        databaseURL: "https://hear-n-now.firebaseio.com",
        projectId: "hear-n-now",
        storageBucket: "hear-n-now.appspot.com",
        messagingSenderId: "323599902659"
    };
    firebase.initializeApp(config);

    const firstName         = document.getElementById("first_name"),
          lastName          = document.getElementById("last_name"),
          addressIn         = document.getElementById("Address"),
          passwordIn        = document.getElementById("password"),
          password2         = document.getElementById("confirmPassword"),
          emailin           = document.getElementById("email"),
          email2            = document.getElementById("confirmEmail"),
          warning           = document.getElementById("warning");

    // const rootRef = firebase.database().ref(),
    //       userRef = rootRef.child("users");

    const db = firebase.database(),
         ref = db.ref("users"),
        auth = firebase.auth();
          

    //Events
    document.getElementById(`signupSubmit`).addEventListener("click", e => {
       formCheck(e);
    });

    //Authenticate NEW USER
    function formCheck(e) {
       const first       = firstName.value.trim(),
             last        = lastName.value.trim(),
             address     = addressIn.value.trim(),
             password    = passwordIn.value,
             conPassword = password2.value,
             email       = emailin.value,
             conEmail    = email2.value;
             

        let check = false;
        //PASSWORD check
        if(password !== conPassword) {
            warning.style.display = `block`;
            warning.innerHTML = `Passwords don't match.`;
            check = false;
        } else {
            check = true;
        }
    
        //EMAIL check
        let isEmail = false;
        let regex = /\w+@\w+\.(net|com|edu|mil|gov|org)/;
        isEmail = regex.test(email);
        if (email !== conEmail) {
            warning.style.display = `block`;
            warning.innerHTML = `Your emails don't match`;
        } else {
            check = true;
        }

        if(check) {
            //create user in db
            const promise = auth.createUserWithEmailAndPassword(email,password);
            promise.catch(e => console.log(e.message));
            let data = {
                first: first,
                last: last,
                email: email,
                address: address
            }    
 
            ref.push(data);         
        }
    }
     //realtime listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser) {
            console.log(firebaseUser);
        } else {
            console.log("not logged in");
        }
    })

        //btnLogout.addEventListener("click", e => {
    //firebase.auth().signOut();
    

   
})();

   


