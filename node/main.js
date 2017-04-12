var bodyParser = require('body-parser');
var fs = require('fs');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var socket = io;
//=============================================Start HTTPS server on port 8000
server.listen(8000);
var bodyParser = require('body-parser');
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

//=============================================POST method listener
app.post('/', function(req, res){

  console.log("got it!");
  console.log("parsed value from function: "+extractValues(req)["v1"]);

});


//=============================================socket connection handler
io.on('connection', function(socket){ //////on connection success
  console.log('web interface connected!');

  socket.on('message', function(mySentence){
    console.log("Sentence received:" + mySentence);


        //############################################################################################################ Pavel call me so I can explain what I did here :D #################################################################

        var executeLogic = function(onWhat){
            console.log("have a nice day" + onWhat);

            //check if the data contains word "favorites"
            if((onWhat.indexOf('favorites') > -1 && onWhat.indexOf('show') > -1) ||
               (onWhat.indexOf('show') && onWhat.indexOf('favorite') > -1 &&   onWhat.indexOf('videos') > -1)){

                //open tab with favorites
                var msg = "Viewing favorite videos";
                socket.emit("Viewing favorite videos", msg);
                console.log("emitting data: " + msg );
            }
            //check if data array contains "show, trending" in a sentence
            else if((onWhat.indexOf('trending') > -1 && onWhat.indexOf('show') > -1) ||
               (onWhat.indexOf('show') && onWhat.indexOf('trending') > -1 &&   onWhat.indexOf('videos') > -1)){

                //open tab with trending videos
                var msg = "Viewing favorite videos";
                socket.emit("Viewing favorite videos", msg);
                console.log("emitting data: " + msg );
            }
            else if((onWhat.indexOf('play') > -1 && onWhat.indexOf('video') > -1 && onWhat.indexOf('number') > -1)){
              //take next word from word "number"
              if(onWhat[onWhat.indexOf('number') + 1] != ''){
                //if the next word after word "number" is not empty - read it
                //msg will contain an integer or a number value as a word;
                //TODO --- integrate middleware for number output unification (either int either word)
                var msg = onWhat[onWhat.indexOf('number') + 1];
                //emmit command and video number to client
                socket.emit("Select video", msg);
                console.log("Selecting video " + onWhat[onWhat.indexOf('number') + 1] + " from the list");
              }
            }
            else if((onWhat.indexOf('search') > -1 && onWhat.indexOf('for') > -1)){
              //take all words after word "for"
            }
            else if((onWhat.indexOf('play') > -1 && onWhat.indexOf('video') > -1) ||
                     onWhat.indexOf('play') > -1)){
              //start playing video currently set in a player window
                var msg = "Playing currently selected video";
                socket.emit("play current", msg);
                console.log("emitting data: " + msg);
            }
            else if((onWhat.indexOf('stop') > -1 && onWhat.indexOf('video') > -1) ||
                     onWhat.indexOf('stop') > -1)){
              //stop playing video currently set in a player window
              var msg = "Stopping currently selected video";
              socket.emit("stop current", msg);
              console.log("emitting data: " + msg);
            }
            else if((onWhat.indexOf('next') > -1 && onWhat.indexOf('video') > -1) ||
                     onWhat.indexOf('next') > -1)){
              //play next video in a player window (low priority)
            }
            else if((onWhat.indexOf('previous') > -1 && onWhat.indexOf('video') > -1) ||
                     onWhat.indexOf('previous') > -1)){
              //play previous video in a player window (low priority)
            }
          };


        //function split will split a string into words and insert them into an array
        var transformedSentence = mySentence.split(" ");
        console.log("transformed sentence:" + transformedSentence);
        //catch a trigger word "please"
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




        var word = '';
        var sentence = mySentence;

        var utterance1 = "search";                      //search for keyword
        var utterance2 = "create";                      //create account
        var utterance3 = "switch";                      //switch between accounts
        var utterance4 = "favorite";                    //view favorite videos
        var utterance5 = "trending";                    //view trending videos
        var utterance6 = "history";                     //view history
        var utterance7 = "later";                       //view videos added to "watch later"
        var utterance8 = "add";                         //add current video to favorites
        var utterance9 = "play";                        //play video #x from list

        for (var i = 0; i < sentence.length; i++) {
            if (sentence.charAt(i) != ' ') {
                word += sentence.charAt(i);
                if (i == sentence.length - 1) {
                    if (word == utterance1) {
                        var substring = sentence.substring(sentence.indexOf("search") + 7);
                        if (substring.search("for") == -1) {
                            var keyword = substring;
                        }
                        else {
                            var keyword = substring.substring(substring.indexOf("for") + 4);
                        }

                        var msg = "Searching by keyword";
                        socket.emit("Searching by keyword", msg);
                        console.log("emitting data: " + msg );
                    }
                    else if (word == utterance2) {
                        var msg = "Creating account";
                        socket.emit("Creating account", msg);
                        console.log("emitting data: " + msg );
                    }
                    else if (word == utterance3) {
                        var msg = "Switching to account";
                        socket.emit("Switching to account", msg);
                        console.log("emitting data: " + msg );
                    }
                    else if (word == utterance4) {
                        var msg = "Viewing favorite videos";
                        socket.emit("Viewing favorite videos", msg);
                        console.log("emitting data: " + msg );
                    }
                    else if (word == utterance5) {
                        var msg = "Viewing trending videos";
                        socket.emit("Viewing trending videos", msg);
                        console.log("emitting data: " + msg );
                    }
                    else if (word == utterance6) {
                        var msg = "Viewing previously watched videos";
                        socket.emit("Viewing previously watched videos", msg);
                        console.log("emitting data: " + msg );
                    }
                    else if (word == utterance7) {
                        var msg = "Adding video to 'Watch later' list";
                        socket.emit("Adding video to 'Watch later' list", msg);
                        console.log("emitting data: " + msg );
                    }
                    else if (word == utterance8) {
                        var msg = "Adding video to favorites";
                        socket.emit("Adding video to favorites", msg);
                        console.log("emitting data: " + msg );
                    }
                    else if (word == utterance9) {
                        if ((sentence.search("one") != -1) || (sentence.search("two") != -1) || (sentence.search("three") != -1) || (sentence.search("four") != -1) || (sentence.search("five") != -1) || (sentence.search("six") != -1) || (sentence.search("1") != -1) || (sentence.search("2") != -1) || (sentence.search("3") != -1) || (sentence.search("4") != -1) || (sentence.search("5") != -1) || (sentence.search("6") != -1)) {
                            if ((sentence.search("1") != -1) || (sentence.search("one") != -1)) {
                                var number = 1;
                            }
                            else if ((sentence.search("2") != -1) || (sentence.search("two") != -1)) {
                                var number = 2;
                            }
                            else if ((sentence.search("3") != -1) || (sentence.search("three") != -1)) {
                                var number = 3;
                            }
                            else if ((sentence.search("4") != -1) || (sentence.search("four") != -1)) {
                                var number = 4;
                            }
                            else if ((sentence.search("5") != -1) || (sentence.search("five") != -1)) {
                                var number = 5;
                            }
                            else if ((sentence.search("6") != -1) || (sentence.search("six") != -1)) {
                                var number = 6;
                            }

                            var msg = "Selecting video from list";
                            socket.emit("Selecting video from list", msg);
                        }

                        else if (sentence.search("next") != -1) {
                            var msg = "Playing next video from playlist";
                            socket.emit("Playing next video from playlist", msg);
                        }
                        else if (sentence.search("previous") != -1) {
                            var msg = "Playing previous video from playlist";
                            socket.emit("Playing previous video from playlist", msg);
                        }
                        else {
                            var msg = "Playing/resuming video";
                            socket.emit("Playing/resuming video", msg);
                        }
                    }
                }
            }
            else if (word == utterance1) {
                var substring = sentence.substring(sentence.indexOf("search") + 7);
                if (substring.search("for") == -1) {
                    var keyword = substring;
                }
                else {
                    var keyword = substring.substring(substring.indexOf("for") + 4);
                }

                var msg = "Searching by keyword";
                socket.emit("Searching by keyword", msg);
                break;
            }
            else if (word == utterance2) {
                var msg = "Creating account";
                socket.emit("Creating account", msg);
                break;
            }
            else if (word == utterance3) {
                var msg = "Switching to account";
                socket.emit("Switching to account", msg);
                break;
            }
            else if (word == utterance4) {
                var msg = "Viewing favorite videos";
                socket.emit("Viewing favorite videos", msg);
                break;
            }
            else if (word == utterance5) {
                var msg = "Viewing trending videos";
                socket.emit("Viewing trending videos", msg);
                break;
            }
            else if (word == utterance6) {
                var msg = "Viewing previously watched videos";
                socket.emit("Viewing previously watched videos", msg);
                break;
            }
            else if (word == utterance7) {
                var msg = "Adding video to 'Watch later' list";
                socket.emit("Adding video to 'Watch later' list", msg);
                break;
            }
            else if (word == utterance8) {
                var msg = "Adding video to favorites";
                socket.emit("Adding video to favorites", msg);
                break;
            }
            else if (word == utterance9) {
                if ((sentence.search("one") != -1) || (sentence.search("two") != -1) || (sentence.search("three") != -1) || (sentence.search("four") != -1) || (sentence.search("five") != -1) || (sentence.search("six") != -1) || (sentence.search("1") != -1) || (sentence.search("2") != -1) || (sentence.search("3") != -1) || (sentence.search("4") != -1) || (sentence.search("5") != -1) || (sentence.search("6") != -1)) {
                            if ((sentence.search("1") != -1) || (sentence.search("one") != -1)) {
                                var number = 1;
                            }
                            else if ((sentence.search("2") != -1) || (sentence.search("two") != -1)) {
                                var number = 2;
                            }
                            else if ((sentence.search("3") != -1) || (sentence.search("three") != -1)) {
                                var number = 3;
                            }
                            else if ((sentence.search("4") != -1) || (sentence.search("four") != -1)) {
                                var number = 4;
                            }
                            else if ((sentence.search("5") != -1) || (sentence.search("five") != -1)) {
                                var number = 5;
                            }
                            else if ((sentence.search("6") != -1) || (sentence.search("six") != -1)) {
                                var number = 6;
                            }

                            var msg = "Selecting video from list";
                            socket.emit("Selecting video from list", msg);
                        }
                        else if (sentence.search("next") != -1) {
                            var msg = "Playing next video from playlist";
                            socket.emit("Playing next video from playlist", msg);
                        }
                        else if (sentence.search("previous") != -1) {
                            var msg = "Playing previous video from playlist";
                            socket.emit("Playing previous video from playlist", msg);
                        }
                        else {
                            var msg = "Playing/resuming video";
                            socket.emit("Playing/resuming video", msg);
                        }
                break;
            }
            else {
            word = '';
            }
        }

      });

  socket.on('disconnect', function(){ /////on disconnect
    console.log('web interface disconnected');
  });
});




//=============================================create POST request to youtube
function postToYoutube(url){
  request.post(
      url, function (error, response, body) {
          if (!error && response.statusCode == 200) {
              console.log(body)
          }
      }
  );
}

//=============================================search by keyphrase or keyword
function searchOnYoutube(keyphrase){
  var apikey = "AIzaSyDN3GpOWwYKIblddoDC-h_nkcTzz8aA3tc";
  var baseURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=";
  var searchquery = keyphrase + "&key=";
  var preparedrequest = baseURL + searchquery + apikey;
  postToYoutube(preparedrequest);
}
