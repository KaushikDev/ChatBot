var config = {
    apiKey: "AIzaSyC60GkqCP5HaPh151Eo4VIMadpYu6e7LV0",
    authDomain: "chatthemup.firebaseapp.com",
    databaseURL: "https://chatthemup.firebaseio.com",
    projectId: "chatthemup",
    storageBucket: "chatthemup.appspot.com",
    messagingSenderId: "815208598749"
  };
  firebase.initializeApp(config);

//===============================================================================================
$("document").ready(function(){

const signinGoogle = document.getElementById("googleAuth");
const signOut = document.getElementById("signout");
const sendMsg = document.getElementById("send");
const messageBox = document.getElementById("chatBox");
const displayNAME = document.getElementById("dipslayName");
const storageRef = firebase.storage().ref();

 //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++	
	initApp();
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
 		if(signOut){
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
	    console.log("The user name onAuthStateChange and before main : " + user.displayName);
	  if(user){
	  window.location = "/ChatBot/main.html";
	  console.log("The user name onAuthStateChange and after main and before authCurrentUser : " + user.displayName);
	  $("document").ready(function(){
				
			//var currentUser  = firebase.auth().currentUser;
		        console.log("The user name onAuthStateChange and after main and after authCurrentUser : " + user.displayName);
			//var name  = currentUser.displayName;
			//var photoUrl = currentUser.photoURL ;
			var name  = user.displayName;
			var photoUrl = user.photoURL ;
			//console.log("Current user's name is : "+name);
			//console.log("Current user's photoUrl is : "+photoUrl);
	        
			displayNAME.innerHTML = "Hi "+name;
			
    //+++++++++++Retrieving Msgs++++++++++++++++++++++++++++++++
				var i=1;	
				var firebaseRetrieveRef = firebase.database().ref().child(name+uid+"/MessageBoard");
				firebaseRetrieveRef.on("child_added", snap =>{
				var retrievedMsg = snap.val();
				console.log("retrieved msgs is : "+retrievedMsg);
				$("#taskList").append("<li id='list"+i+"'><div style='width:100%'><img src='"+photoUrl+"'style='width:10px;height:10px;border-radius:5px;'/><label>"+name+"</label></div><div style='width:100%'><p>"+retrievedMsg+"</p></div></li>");
				i++;
					});
	//+++++++++++Storing Msgs++++++++++++++++++++++++++++++++
		$("#send").on("click", function(){
			 var newMessage=messageBox.value;
			  if(newMessage==""){
			  alert("Empty Message doesn't make any sense, does it?? ");
			  }
			  else{
			  var firebaseStoreRef = firebase.database().ref().child(name+uid+"/MessageBoard");
			 firebaseStoreRef.push().set(newMessage);
              messageBox.value="";
			  }
			});
	//+++++++++++Clearing/deleting all tasks++++++++++++++++++++++++
		$("#clear").on("click", function(){
			  var firebaseDeleteRef  = firebase.database().ref().child(name+uid+"/MessageBoard");
			  firebaseDeleteRef.remove();
			  $( ".scrolls" ).empty();
			  });
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++
	
	  });
                }
		else
		{
		console.log(user+" is not logged in");
		}
		
		});
    }	
			  
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 });
