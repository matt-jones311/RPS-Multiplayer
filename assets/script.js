var config = {
    apiKey: "AIzaSyCx-S97APVYFR-niJdFHkruh8d3bh-MXDM",
    authDomain: "fir-homework-8cc54.firebaseapp.com",
    databaseURL: "https://fir-homework-8cc54.firebaseio.com",
    projectId: "fir-homework-8cc54",
    storageBucket: "fir-homework-8cc54.appspot.com",
    messagingSenderId: "281584269116"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var chat = database.ref("chat");

  var players = database.ref("players");

  var turn = database.ref("turn");

  //this allows player to enter their name

  		//check if player one is defined

  		//if not, set player one to "name"

  				//update firebase

  		//if it is defined, set player 2 to "name"

  				//update firebase

  		//check if both players have been defined

  				//if they have, start game

  		// prevent third person from starting game

  		//add wins and losses


//player enters text and clicks send

	//get their name and text typed

	//send this info to firebase

//create a firebase listener for chat

	//on new data append player name and message










