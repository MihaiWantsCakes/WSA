var bodyParser = require('body-parser');
var fs = require('fs');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var request = require('request');
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
var mongoose = require('mongoose');
var socket = io;
//=============================================Start HTTPS server on port 8000
server.listen(8000);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
console.log('listening...');

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
//connect to database server on localhost
var favoriteVideoModel = mongoose.model('favoriteVideo',
{
  videoId: String,
  videoTitle: String,
  videoDescription: String,
  videoThumbnailUrl: String
});
mongoose.connect('mongodb://localhost/favoriteVideos');

var addToFavorites = function(video) {
  try{
    mongoose.favoriteVideos.save(video);
    console.log("Video has been successfully saved!");
  }catch(ex){
    console.log("ERRRRRRR: "+ex);
  }
}

var getFavoritesList = function() {
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    return db.favoriteVideos.find();
    db.close();
  });
}

//=============================================socket connection handler
io.on('connection', function(socket){ //////on connection success
  console.log('web interface connected!');

  socket.on('message', function(mySentence, videoId){
    console.log("Sentence received:" + mySentence);

        console.log("current video is " + videoId);
        //############################################################################################################ Pavel call me so I can explain what I did here :D #################################################################

        var executeLogic = function(onWhat){
             if(onWhat.indexOf('search') > -1 && onWhat.indexOf('for') > -1){
              //take all words besides "for" and "search"
              var plainkeywords = onWhat;
              plainkeywords.splice(plainkeywords.indexOf('search'), 1);
              plainkeywords.splice(plainkeywords.indexOf('for'), 1);

              console.log("plain keywords: " + plainkeywords);
              //Use plainkeywords to make a request to youtube
              searchOnYoutube(plainkeywords);
                console.log("Search was invoked! ");
            }
            //check if the data contains word "favorites"
            else if(onWhat.indexOf('show') && onWhat.indexOf('favorite') > -1 &&  onWhat.indexOf('videos') > -1){

                //open tab with favorites
                var msg = "Viewing favorite videos";
                socket.emit("Viewing favorite videos", msg);
                console.log("emitting data: " + msg );
            }
            //take next word from word "video"
            // if(onWhat[onWhat.indexOf('video') + 1] != ''){
            //   //if the next word after word "video" is not empty - read it
            //   //msg will contain an integer or a number value as a word;
            //   //below is an output unifier
            else if(onWhat.indexOf('play') > -1 && onWhat.indexOf('video') > -1 && onWhat.indexOf('number') > -1){
                var msg = onWhat[onWhat.indexOf('number') + 1];
                //emmit command and video number to client
                switch( onWhat[onWhat.indexOf('number') + 1] ){
                  case "0":
                  console.log("Selecting video number 0 from the list");
                  socket.emit("Select video", 0);
                  break;
                  case "zero":
                  console.log("Selecting video number 0 from the list");
                  socket.emit("Select video", 0);
                  break;

                  case "1":
                  console.log("Selecting video number 1 from the list");
                  socket.emit("Select video", 1);
                  break;
                  case "one":
                  console.log("Selecting video number 1 from the list");
                  socket.emit("Select video", 1);
                  break;

                  case  "2":
                  console.log("Selecting video number 2 from the list");
                  socket.emit("Select video", 2);
                  break;
                  case  "two":
                  console.log("Selecting video number 2 from the list");
                  socket.emit("Select video", 2);
                  break;

                  case "3":
                  console.log("Selecting video number 3 from the list");
                  socket.emit("Select video", 3);
                  break;
                  case "three":
                  console.log("Selecting video number 3 from the list");
                  socket.emit("Select video", 3);
                  break;

                  case "4":
                  console.log("Selecting video number 4 from the list");
                  socket.emit("Select video", 4);
                  break;
                  case "four":
                  console.log("Selecting video number 4 from the list");
                  socket.emit("Select video", 4);
                  break;

                  // case "5":
                  // console.log("Selecting video number 5 from the list");
                  // socket.emit("Select video", 5);
                  // break;
                  //
                  // case "five":
                  // console.log("Selecting video number 5 from the list");
                  // socket.emit("Select video", 5);
                  // break;

                  default:
                  console.log("ERROR: VIDEO " + onWhat[onWhat.indexOf('video') + 1] + " not recognized");
                  break;


              }
            }
            else if((onWhat.indexOf('play') > -1 && onWhat.indexOf('video') > -1)){
              //start playing video currently set in a player window
                var msg = "Playing currently selected video";
                socket.emit("play current", msg);
                console.log("emitting data: " + msg);
            }
            else if((onWhat.indexOf('stop') > -1 && onWhat.indexOf('video') > -1) ||
                     onWhat.indexOf('stop') > -1){
                //stop playing video currently set in a player window
                var msg = "Stopping currently selected video";
                socket.emit("stop current", msg);
                console.log("emitting data: " + msg);
            }
            else if(onWhat.indexOf('add') > -1 && onWhat.indexOf('to') > -1 && onWhat.indexOf('favorites') > -1){
                //Add video to favorites
                var msg = "adding video to favorites";
                console.log("received favorite video from client! adding to db... " + msg );
                socket.emit('get current video');
            }
            else if((onWhat.indexOf('next') > -1 && onWhat.indexOf('video') > -1) ||
                     onWhat.indexOf('next') > -1){
              //play next video in a player window (low priority)
            }
            else if((onWhat.indexOf('previous') > -1 && onWhat.indexOf('video') > -1) ||
                     onWhat.indexOf('previous') > -1){
              //play previous video in a player window (low priority)
            }
          };


        //function split will split a string into words and insert them into an array
        var transformedSentence = mySentence.split(" ");
        console.log("transformed sentence:" + transformedSentence);
        //catch wake word "please"
        //an if statement below will deal with a white space in a beginning of some sentences
        if(transformedSentence[0] != ''){
           if( transformedSentence[0] == 'please'){
            var data = transformedSentence.slice(1, transformedSentence.length);
            executeLogic(data);

           }
        }
        else{
           if( transformedSentence[1] == 'please'){
            var data = transformedSentence.slice(2, transformedSentence.length);
            executeLogic(data);

           }
        }
      });


  socket.on('sending current video', function(msg){
    addToFavorites(msg);
    console.log("video added to favorite list!");
  });


  socket.on('disconnect', function(){ /////on disconnect
    console.log('web interface disconnected');
  });
});







//=============================================search by keyphrase or keyword
function searchOnYoutube(keyphrase){
  var joined = keyphrase.join('&');
  var apikey = "AIzaSyDN3GpOWwYKIblddoDC-h_nkcTzz8aA3tc";
  var baseURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=";
  var searchquery = joined + "&key=";
  var preparedrequest = baseURL + searchquery + apikey;
  console.log("YOUTUBE URL: " + preparedrequest);
  return postToYoutube(preparedrequest);
}


//=============================================create POST request to youtube
function postToYoutube(url){
  var headers = {
      'User-Agent':       'Super Agent/0.0.1',
      'Content-Type':     'application/x-www-form-urlencoded'
  }
  var options = {
    url: url,
    method: 'GET',
    headers: headers,
    qs: {'key1': 'xxx', 'key2': 'yyy'}
  }
  request( options, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            console.log("2. parsing response body...");
                  socket.emit("search for", body);
          }
          else if(error){
            console.log(error);
            console.log("something went wrong :(");
            return "";
          }
      });
}
