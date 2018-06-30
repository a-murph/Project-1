/* ======================
    AUTHENTICATE USER 
=========================*/
document.addEventListener("DOMContentLoaded", event => {
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
        var provider = new firebase.auth.FacebookAuthProvider();

        const firstName         = document.getElementById("first_name"),
            lastName          = document.getElementById("last_name"),
            addressIn         = document.getElementById("Address"),
            passwordIn        = document.getElementById("password"),
            password2         = document.getElementById("confirmPassword"),
            emailin           = document.getElementById("email"),
            email2            = document.getElementById("confirmEmail");
            

        // const rootRef = firebase.database().ref(),
        //       userRef = rootRef.child("users");

        const db = firebase.database(),
            ref = db.ref("users");
            
            

        //Events
        document.getElementById(`signupSubmit`).addEventListener("click", e => {
            authenticateNewUser(e);
        });
        document.getElementById(`signin`).addEventListener("click", e => {
            indexLogin(e);
        });
        document.getElementById(`googlelogin`).addEventListener("click", () => {
            googleLogin();
        }) 
        document.getElementById(`fbLogin`).addEventListener("click", () => {
            fbLogin();
        })
        function authenticateNewUser(e) {
            const first       = firstName.value.trim(),
            last        = lastName.value.trim(),
            address     = addressIn.value.trim(),
            password    = passwordIn.value,
            conPassword = password2.value,
            email       = emailin.value,
            conEmail    = email2.value;
                    
            const auth = firebase.auth();

            let check = false;
            if(first != "" && password != "" && email != ""){
                //PASSWORD check
                if(password !== conPassword) {
                    document.getElementById("warning").style.display = `block`;
                    document.getElementById("warning").innerHTML = `Passwords don't match.`;
                    check = false;
                } else {
                    check = true;
                }
            
                //EMAIL check
                let isEmail = false;
                let regex = /\w+@\w+\.(net|com|edu|mil|gov|org)/;
                isEmail = regex.test(email);
                if (email !== conEmail) {
                    document.getElementById("warning").style.display = `block`;
                    document.getElementById("warning").innerHTML = `Your emails don't match`;
                    check = false;
                } else {
                    check = true;
                }
            }

            if(check) {
                //create user in db
                let data = {
                    first: first,
                    last: last,
                    email: email,
                    address: address
                }    

                ref.push(data);    

                const promise = auth.createUserWithEmailAndPassword(email,password);
                promise.catch(e => console.log(e.message));
            
                            //      

            }
        }

        function indexLogin(e) {
            const email    = document.getElementById(`exampleInputEmail1`).value,
                password = document.getElementById(`exampleInputPassword1`).value;
            
            const auth = firebase.auth();

            const promise = auth.signInWithEmailAndPassword(email,password);
            promise.catch(e => console.log(e.message));
            console.log(`under user`)
        }
        
        
        // function googleLogin() {
        //     const provider = new firebase.auth.GoogleAuthProvider();
        //     firebase.auth().signInWithPopup(provider)
        
        //     .then(result => {
        //         const user = result.user;
        //         //document.write(`Hello ${user.displayName}`);
        //         console.log(user)
        //     }).catch(console.log);
        // }
        function fbLogin() {
            firebase.auth().signInWithPopup(provider).then(function(result) {
                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                var token = result.credential.accessToken;
                // The signed-in user info.
                var user = result.user;
                // ...
              }).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
              });
        }
        firebase.auth().onAuthStateChanged(firebaseUser => {
            if(firebaseUser) {
                console.log("logged in");
                //window.location.href = `/`;
            } else {
                console.log("didn't create user")
            }
        })
            //btnLogout.addEventListener("click", e => {
        //firebase.auth().signOut();
    })();
})

