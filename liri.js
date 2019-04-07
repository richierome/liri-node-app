require("dotenv").config();

let axios = require('axios');

//REQUIRES REQUEST
let request = require("request");

//REQUIRE MOMENT
const moment = require('moment');

//REQUIRE FILE SYSTEMS
const fs = require("fs");

// LINKS KEY PAGE
const keys = require("./keys.js");

//INITIALIZE SPOTIFY
const Spotify = require("node-spotify-api");

const spotify = new Spotify(keys.spotify);

//OMBD AND BANDS IN TOWN API'S
let ombd = (keys.ombd);
//console.log(ombd);
//let bandsintown = (keys.bandsintown);

//TAKE USER COMMAND AND INPUT
let userInput = process.argv[2];
let userQuery = process.argv.slice(3).join("");

//APP LOGIC
function userCommand(userInput, userQuery){
  //make a decision baded on the command
  switch (userInput) {
    case "concert-this":
    concertThis(userQuery); 
   console.log(userInput);
      break;
    case "spotify-this":
      spotifyThisSong(userQuery);
      console.log(userInput);
      break;
    case "movie-this":
      movieThis(userQuery);
     console.log(userInput);
      break;
    case "do-this":
      doThis();
      break;
    default:
    console.log("I don't understand");
      break;
  }
}
userCommand(userInput, userQuery);

 function concertThis(userQuery){
     console.log("concert-this-function");
     axios.
    get("https://rest.bandsintown.com/artists/"+ userQuery +"/events?app_id=codingbootcamp").then(
        function(response){
            console.log(response.data);
        }
    )

}
 

function spotifyThisSong(userQuery){    
    console.log("this a userQuery" + userQuery);
    spotify.search({ type: 'track', query: userQuery ,limit :1}, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       console.log('---------------------------------');
      console.log(data.tracks.items[0].album.artists[0].name); 
      });
   
//I had the spotify-this working and for some reason the code broke i cant figure it out//

 

 }

    function movieThis(userQuery){
      console.log(`\n - - - - -\n\nSEARCHIG FOR..."${userQuery}"`);
      axios.get("http://www.omdbapi.com/?t=" +userQuery+ "&y=&plot=short&apikey=trilogy").then(
  function(response) {
    // Then we print out the imdbRating
    console.log( response.data);

        }
    );
}


function doThis(){
  fs.readFile("random.txt", "utf8", function (error, data) {
    if(error) {return console.log(error);}
    //CATCHES DATA AND USE THE .SPLIT() METHOD TO SEPERATE OBJECTS WITHIN OUR NEW ARRAY
    let dataArr = data.split(",");
console.log(dataArr);
    //TAKES OBJECTS FROM RANDOM.TXT TO PASS AS PARAMETERS
    userInput = dataArr[0];
    userQuery = dataArr[1];
    //CALL OUR FUNCTION WITH OUR NEW PARAMETERS
    userCommand(userInput, userQuery);
  });

};