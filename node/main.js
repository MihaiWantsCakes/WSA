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
        // if (mySentence == ' next page' || mySentence == 'next page' ) {
        //   var msg = 'switching tabs...';
        //   socket.emit('switch next tab', msg);
        // }
        // if (mySentence == ' back' || mySentence == 'back' || mySentence == ' go back'  || mySentence == 'go back') {
        //   var msg = 'switching previous tab...';
        //   socket.emit('go back', msg);

        // }
        // if (mySentence == ' home' || mySentence == 'home' || mySentence == ' homepage'  || mySentence == 'homepage') {
        //   var msg = 'Switching to homepage...';
        //   socket.emit('go to homepage', msg);

        // }
        // if (mySentence == ' video page' || mySentence == 'video page' ) {
        //   var msg = 'Switching to watch video page...';
        //   socket.emit('go to video page', msg);

        // }

        //############################################################################################################ Pavel call me so I can explain what I did here :D #################################################################

        var word = '';

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
                        var msg = "Searching by keyword";
                        socket.emit("Searching by keyword", msg);
                    }
                    else if (word == utterance2) {
                        var msg = "Creating account";
                        socket.emit("Creating account", msg);
                    }
                    else if (word == utterance3) {
                        var msg = "Switching to account";
                        socket.emit("Switching to account", msg);
                    }
                    else if (word == utterance4) {
                        var msg = "Viewing favorite videos";
                        socket.emit("Viewing favorite videos", msg);
                    }
                    else if (word == utterance5) {
                        var msg = "Viewing trending videos";
                        socket.emit("Viewing trending videos", msg);
                    }
                    else if (word == utterance6) {
                        var msg = "Viewing previously watched videos";
                        socket.emit("Viewing previously watched videos", msg);
                    }
                    else if (word == utterance7) {
                        var msg = "Adding video to 'Watch later' list";
                        socket.emit("Adding video to 'Watch later' list", msg);
                    }
                    else if (word == utterance8) {
                        var msg = "Adding video to favorites";
                        socket.emit("Adding video to favorites", msg);
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




//=============================================extract keywords from data received from Alexa
function extractValues(req){
   var json = JSON.stringify(req.body);
   console.log("json parsed: " + req.json);
   var parsedvalues = new Array();
    parsedvalues["v1"] = JSON.parse(json).request.intent.slots.keywordOne.value;
    parsedvalues["v2"] = JSON.parse(json).request.intent.slots.keywordTwo.value;
    parsedvalues["v3"] = JSON.parse(json).request.intent.slots.keywordThree.value;
    parsedvalues["v4"] = JSON.parse(json).request.intent.slots.keywordFour.value;
    parsedvalues["v5"] = JSON.parse(json).request.intent.slots.keywordFive.value;

    return parsedvalues;

};

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
