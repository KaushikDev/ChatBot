
 var config = {
    apiKey: "AIzaSyC60GkqCP5HaPh151Eo4VIMadpYu6e7LV0",
    authDomain: "chatthemup.firebaseapp.com",
    databaseURL: "https://chatthemup.firebaseio.com",
    projectId: "chatthemup",
    storageBucket: "chatthemup.appspot.com",
    messagingSenderId: "815208598749"
  };
  firebase.initializeApp(config);


$("document").ready(function(){

const signinGoogle = document.getElementById("googleAuth");
const signout = document.getElementById("signout");
   
window.onload = function() {
initApp();
}
 //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 	if(signinGoogle){
		 googleAuth.addEventListener('click', e=>{
			firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(function(result) {	 
			// This gives you a Google Access Token. You can use it to access the Google API.
  			var tokenGoogle = result.credential.accessToken;
			  // The signed-in user info.
			  var userGoogle = result.user;
			  // ...Below line to be rmeooved if not working expectedly.
				// var user = firebase.auth().currentUser;
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
		 });
		
		}
 //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 		if(signout){
             signout.addEventListener('click', e=>{
		  
			 promise = firebase.auth().signOut().then(function(){
				if(confirm("Do you wish to leave?")){
				 window.location = "/ChatBot/index.html";
			 }	
					 });
		      promise.catch(e => 
	                console.log(e.message))
			});
		 }
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    function initApp(){
    firebase.auth().onAuthStateChanged(function(user){
	  if(user){
	  window.location = "/ChatBot/main.html";
                }
		else
		{
		console.log(user+" is not logged in");
		}
		
		});
    }	
			  
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++	    
});
