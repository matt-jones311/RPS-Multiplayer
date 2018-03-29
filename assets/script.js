//==========VARIABLES TO DECLARE==============================

<script src="https://www.gstatic.com/firebasejs/4.12.0/firebase.js"></script>

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDZiHxOy2T6UrcfHdl4xxZO3LIJzCAdZrY",
    authDomain: "rpsmultiplayer-4d50e.firebaseapp.com",
    databaseURL: "https://rpsmultiplayer-4d50e.firebaseio.com",
    projectId: "rpsmultiplayer-4d50e",
    storageBucket: "",
    messagingSenderId: "149303334845"
  };
  firebase.initializeApp(config);

firebase.initializeApp(config);

var playerNum = null;

var database = firebase.database();

// chat             => Chat ref in firebase
var chat = database.ref("chat");
// players          => Players ref in firebase
var players = database.ref("players");
// numPlayers       => Number of players in game
var numPlayers = 0;
// turn             => Turn ref in firebase
var turn = database.ref("turn");
// currentTurn      => Number that defines whose turn it is (1 for player 1, 2 for player 2)
var currentTurn = null;
// username         => Current player's username ; should default to "Guest" maybe
var username = "guest";
// currentPlayer    => In the current user's browser, what player num are they?
var currentPlayer = null;
// playerOne        => Object that hold's player one's stats
var playerOne = null;
// playerTwo        => Object that hold's play two's stats
var playerTwo = null;

var playerOneExists = null;

var playerTwoExists = null;

var playerRef = null;

//==========USERNAME FORM====================================

// Start button click
$("#start").on("click", function(e) {
    e.preventDefault()
    if ($("#usernameBox").val() !== "") {
        username = $("#usernameBox").val()
        $("#usernameBox").val("")
        join()
    }
});

// Tracks changes in key which contains player objects
players.on("value", function(snapshot) {

    // length of the 'players' array
    numPlayers = snapshot.numChildren();

    // Check to see if players exist
    playerOneExists = snapshot.child("1").exists();
    playerTwoExists = snapshot.child("2").exists();

    // Player data objects
    playerOne = snapshot.child("1").val();
    playerTwo = snapshot.child("2").val();

    // If theres a player 1, fill in name and win loss data
    if (playerOneExists) {
        console.log('Player 1 name: ' + playerOne.name);
        console.log('Player 1 wins: ' + playerOne.wins);
        console.log('Player 1 losses: ' + playerOne.losses);
    } else {
        console.log('Waiting for Player 1');
    }

    // If theres a player 2, fill in name and win/loss data
    if (playerTwoExists) {
        console.log('Player 2 name: ' + playerTwo.name);
        console.log('Player 2 wins: ' + playerTwo.wins);
        console.log('Player 2 losses: ' + playerTwo.losses);
    } else {
        console.log('Waiting for Player 2');
    }
});

players.on('child_added', function(snapshot) {
    if (numPlayers === 1) {
        turn.set(1);
    }
});

$(document).on("click",
    ".choice",
    function(e) {
        var clickChoice = $(this).text()
        playerRef.child("choice").set(clickChoice)

      
        console.log(`${playerNum} chose ${clickChoice}`)

        turn.transaction(function(current) {
            return current + 1;
        });

    });






function join() {

    // For adding disconnects to the chat with a unique id (the date/time the user entered the game)
    // Needed because Firebase's '.push()' creates its unique keys client side,
    // so you can't ".push()" in a ".onDisconnect"
    var chatDataDisc = database.ref("/chat/" + Date.now());

    // Checks for current players, if theres a player one connected, then the user becomes player 2.
    // If there is no player one, then the user becomes player 1
    if (numPlayers < 2) {

        if (playerOneExists) {
            playerNum = 2;
        } else {
            playerNum = 1;
        }

        // Creates key based on assigned player number
        playerRef = database.ref("/players/" + playerNum);

        // Creates player object. 'choice' is unnecessary here, but I left it in to be as complete as possible
        playerRef.set({
            name: username,
            wins: 0,
            losses: 0,
            choice: null
        });

        // On disconnect remove this user's player object
        playerRef.onDisconnect().remove();

        // If a user disconnects, set the current turn to 'null' so the game does not continue
        turn.onDisconnect().remove();

        // Send disconnect message to chat with Firebase server generated timestamp and id of '0' to denote system message
        chatDataDisc.onDisconnect().set({
            name: username,
            time: firebase.database.ServerValue.TIMESTAMP,
            message: "has disconnected.",
            idNum: 0
        });

        // Remove name input box and show current player number.
        console.log('Hi ' + username + 'You are player ' + playerNum);
    } else {

        // If current players is "2", will not allow the player to join
        alert("Sorry, Game Full! Try Again Later!");
    }
}


// e.preventDefault() to prevent page refresh
// if username text box isn't empty
// username = text box value
// Try to join in game (joinGame)
// Empty text box


//================CHAT FORM==================================h


// Send button click
$("#sendChat").on("click", function(e) {
    e.preventDefault()

    if ($("#chatBox").val() !== "") {
        chat.push({
            name: username,
            message: $("#chatBox").val(),
            time: firebase.database.ServerValue.TIMESTAMP,
            idNum: playerNum



        })
        $("#chatBox").val("")

    }
});
chat.orderByChild("time").on("child_added", function(snapshot) {
    // Append message
    $(".chatDiv").append("<p class=player" + snapshot.val().idnum + "><span>" + snapshot.val().name + "</span>: " + snapshot.val().message + "</p>");

    // Keeps div scrolled to bottom on each update.
    $(".chatDiv").scrollTop($(".chatDiv")[0].scrollHeight);
});





// e.preventDefault() to prevent page refresh
// if message text box isn't empty
// push username, message, time (firebase.database.ServerValue.TIMESTAMP), and player ID (number) to firebase as an object
// empty the text box


//========================GAME LOGIC=============================


// gameLogic function ; takes two arguments: playerOneChoice, playerTwoChoice
// Define three functions in here: playerOneWin, playerTwoWin, tie
// Inside playerOneWin and playerTwoWin
// Announce winner
// Add one to player's wins (players.child(playerNum).child('wins').set(playerData.wins + 1))
// Add one to other player's losses (players.child(otherPlayerNum).child('losses').set(otherPlayerData.losses + 1))
// Inside tie
// Announce tie

// Use that complicated ass if / else if / ... stuff to decide who wins
// if playerOne wins, playerOneWin()
// if playerTwo wins, playerTwoWin()
// if tie, tie()



//======================================================



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