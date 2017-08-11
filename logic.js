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
const displayNAME = document.getElementById("displayName");
const loginDiv = document.getElementById("login");
const mainDiv = document.getElementById("main");
const imageUSER = document.getElementById("imageUser");
const smiley = document.getElementById("smiley");
const attach = document.getElementById("attach");
const audio = document.getElementById("audio");
const cam = document.getElementById("cam");
const storageRef = firebase.storage().ref();
	
var currentUser;
var name;
var photoUrl;

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
			  // ...Below line to be remeoved if not working expectedly.
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
		   
		  if(confirm("Do you wish to leave?")){
			 promise = firebase.auth().signOut().then(function(){
			 //loginDiv.classList.remove('hidden');
			 //mainDiv.classList.add('hidden');
			 });
			 promise.catch(e => 
	         console.log(e.message))
			 }	
			
			});
		 }
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	 	if(smiley){
          signout.addEventListener('click', e=>{
		   
					
			});
		 }
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++	
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++	
    function smileyPicker(){
    
    }	
    function initApp(){
    firebase.auth().onAuthStateChanged(function(user){
	
	    if(user){
			loginDiv.classList.add('hidden');
			mainDiv.classList.remove('hidden');
		
	currentUser  = firebase.auth().currentUser;
		  	name  = currentUser.displayName;
			photoUrl = currentUser.photoURL ;
		    	uid = currentUser.uid;
		  	console.log("Current user's name is : "+name);
			console.log("Current user's photoUrl is : "+photoUrl);
	      	//displayNAME.innerHTML = "Hi, "+name;
		imageUSER.src = photoUrl;
			
    //+++++++++++Retrieving Msgs++++++++++++++++++++++++++++++++
				var i=1;	
				var firebaseRetrieveRef = firebase.database().ref().child("Messageboard");
				firebaseRetrieveRef.on("child_added", snap =>{
				var retrievedMsg = snap.val();
				console.log("retrieved msgs is : "+retrievedMsg);
				$("#messageList").append("<li id='list"+i+"'><div style='width:100%;' ><img src='"+retrievedMsg.Picture+"'style='width:30px;height:30px;border-radius:15px;'/><label>"+retrievedMsg.Sender+"</label></div><div style='width:100%;background-color:#ECF0F1;margin-bottom:5px;'><p>"+retrievedMsg.Message+"</p></div></li>");
				i++;
					});
	//+++++++++++Storing Msgs++++++++++++++++++++++++++++++++
		$("#send").on("click", function(){
			 var newMessage=messageBox.value;
			  if(newMessage==""){
			  alert("Empty Message doesn't make any sense, does it?? ");
			  }
			  else{
			  var firebaseStoreRef = firebase.database().ref().child("Messageboard/");
			 //firebaseStoreRef.push().set(newMessage);
			   firebaseStoreRef.push({Sender:name, Message:newMessage, Picture:photoUrl});	  
			   messageBox.value="";
			  }
			});
	//+++++++++++Clearing/deleting all tasks++++++++++++++++++++++++
		$("#clear").on("click", function(){
			  var firebaseDeleteRef  = firebase.database().ref().child("MessageBoard/");
			  firebaseDeleteRef.remove();
			  $( ".scrolls" ).empty();
			  });
		  
                }
		else
			{
			console.log(user+" is not logged in");
			loginDiv.classList.remove('hidden');
			mainDiv.classList.add('hidden');
			}
		});
    }	
			  
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 });
