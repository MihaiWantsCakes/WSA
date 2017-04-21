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
var log_message = '';
var current_video = '';
var favoriteList = '';
var message = '';
var playerPlaying = false;


//SOCKET.IO

var socket = io('http://localhost:8000');
socket.on('connection', function(){
  this.socket.emit('message');
  console.log("connection established!");
});


//FUNCTIONS
var executeAction = function(){
  ReactDOM.render(<App data={message}
                       active_tab={active_tab}
                       current_video={current_video}
                       playerPlaying={playerPlaying}
                       log_message={log_message}
                       favoriteList={favoriteList}
                       />, document.getElementById('app'));
};

var updateLog = function(text){
  console.log("log bar updated");
  log_message = text;
  executeAction();
};

 var sendMessage = function(text){
   socket.emit('message', text, current_video);
   console.log("sentence sent: " + text );
 };

  // var addToFavorites = function(videoId) {
  //
  // };

//SPEECH API

var startListening = function() {
  try {
    const onAnythingSaid = text => console.log(`Interim text: ${text}`);
    const onFinalised = text => sendMessage(text) & updateLog(text) ;
    const onFinishedListening = text => startListening();
    const listener = new SpeechToText(onAnythingSaid, onFinalised, onFinishedListening);
    listener.startListening();
  } catch (error) {
    console.log(error);
  }
}

startListening();
// TODO: on finalised result - restart listener

//GET FAVORITE LIST

socket.on('favorite list', function(msg) {
  favoriteList = msg;
  executeAction();
})

//PLAYER FUNCTIONS

socket.on('play current', function(msg){
  playerPlaying = true;
  executeAction();
});

socket.on('stop current', function(msg){
  playerPlaying = false;
  executeAction();
});


//SEARCH YOUTUBE RELATED

socket.on('search for', function(msg){
  active_tab = 'Search for';
  message = msg;
  executeAction();
});

socket.on('Select video', function(msg){
  console.log("Selecting video number " + msg);
  active_tab = 'Watch';
  current_video = msg;
  executeAction();
});

executeAction();
