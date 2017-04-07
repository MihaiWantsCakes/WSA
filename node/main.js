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
        if (mySentence == ' next page' || mySentence == 'next page' ) {
          var msg = 'switching tabs...';
          socket.emit('switch next tab', msg);
        }
        if (mySentence == ' back' || mySentence == 'back' || mySentence == ' go back'  || mySentence == 'go back') {
          var msg = 'switching previous tab...';
          socket.emit('go back', msg);

        }
        if (mySentence == ' home' || mySentence == 'home' || mySentence == ' homepage'  || mySentence == 'homepage') {
          var msg = 'Switching to homepage...';
          socket.emit('go to homepage', msg);

        }
        if (mySentence == ' video page' || mySentence == 'video page' ) {
          var msg = 'Switching to watch video page...';
          socket.emit('go to video page', msg);

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
