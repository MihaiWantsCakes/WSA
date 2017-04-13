import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import {
  SocketProvider,
  socketConnect,
} from 'socket.io-react';
import io from 'socket.io-client';
import SpeechToText from 'speech-to-text';
import Navigation from './components/Navigation.jsx';
import PageLogWindow from './components/PageLogWindow.jsx';


//GLOBALS
var active_tab = 'Homepage';
var message = '';
var searchResultList = [];

//FUNCTIONS
var executeAction = function(action, target, message){
    if(action == 'go to'){
      setActiveTab(target, message);
    }
    else if(action == 'stop current'){

    }
    else if(action == 'select video'){
      //DO THE VIDEO SELECTION here
      //allow selection of video only after search
      if(this.active_tab == 'Search for'){

      }
    }
    else if(action == 'update log'){
      updateLog(message);
    }
}

var parseResponseBody = function(responseBody){

   //
  try{
    var parsedResponseBody = JSON.parse(responseBody);
    console.log("number of items: " + parsedResponseBody.items.length);
    for(var i = 0; i < parsedResponseBody.items.length; i++){
      var singleresult = [parsedResponseBody.items[i].id.videoId, parsedResponseBody.items[i].snippet.title, parsedResponseBody.items[i].snippet.description,  parsedResponseBody.items[i].snippet.thumbnails.default.url ];
      console.log("pushing one video: "+parsedResponseBody.items[i].id.videoId);
      searchResultList.push(singleresult);
    }
    return searchResultList;
  }
  catch(ex){

  }

}



var setActiveTab = function(tab, message){
  active_tab = tab;
  console.log("active tab set!" + tab);
  ReactDOM.render(<App data={message} active_tab={active_tab}/>, document.getElementById('app'));
};

var updateLog = function(message){
  console.log("log bar updated");
//  ReactDOM.render(<App request_from_user={request_from_user} response_from_server={response_from_server} active_tab={active_tab}/>, document.getElementById('app'));
};

 var sendMessage = function(text){

   socket.emit('message', text);
   console.log("sentence sent: " + text );
 };

//SPEACH API
try {
  const onAnythingSaid = text => console.log(`Interim text: ${text}`);
  const onFinalised = text => sendMessage(text);//console.log(`Finalised text: ${text}`);
  const listener = new SpeechToText(onAnythingSaid, onFinalised);
  listener.startListening();
  // TODO: on finalised result - restart listener
} catch (error) {
  console.log(error);
}


//SOCKET.IO

var socket = io('http://localhost:8000');
socket.on('connection', function(){
  this.socket.emit('message');
  console.log("connection established!");
});

//PAGE ROUTING

socket.on('switch next tab', function(msg){
  console.log("the message: "+msg);
});

socket.on('go back', function(msg){
  console.log("the message: "+msg);
});

socket.on('go to video page', function(msg){
  console.log("the message: "+msg);
  executeAction('update log', msg);
  executeAction('go to', 'Watch', msg);
});

socket.on('go to homepage', function(msg){
  console.log("the message: "+msg);
  executeAction('go to', 'Homepage', msg);

});

socket.on('go to settings page', function(msg){
  console.log("the message: "+msg);
    executeAction('go to', 'Settings');
  });


socket.on('go to favorite list page', function(msg){
  console.log("the message: "+msg);
    executeAction('go to', 'Favorites');
});

socket.on('show help window', function(msg){
  console.log("the message: "+msg);
  executeAction('go to', 'Help');
});


//PLAYER FUNCTIONS

socket.on('play current', function(msg){
  console.log("the message: "+msg);
  executeAction('play', 'Watch');
});

socket.on('stop current', function(msg){
  console.log("the message: "+msg);
  executeAction('stop', 'Watch');
});


//SEARCH YOUTUBE RELATED

socket.on('select video', function(msg){
  console.log("Selecting video number " + msg);
  executeAction('select video', '', msg);

});

socket.on('search for', function(msg){
  console.log("RECEIVED results: \n" + msg);
  executeAction('go to', 'Search for', msg);
//  executeAction('update log', request_from_user);
});

ReactDOM.render(<App data={message}  active_tab={active_tab}/>, document.getElementById('app'));
