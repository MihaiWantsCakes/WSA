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
var request_from_user = 'request';
var response_from_server = 'response';

//FUNCTIONS
var executeAction = function(action, target, message){
    if(action == 'go to'){
      setActiveTab(target, message);
    }
    else if(action == 'update log'){
      updateLog(message);
    }
}

var setActiveTab = function(tab, message){
  request_from_user = message;
  active_tab = tab;
  console.log("active tab set!" + tab);
  ReactDOM.render(<App request_from_user={request_from_user} response_from_server={response_from_server} active_tab={active_tab}/>, document.getElementById('app'));
};

var updateLog = function(message){
  request_from_user = message;
  console.log("log bar updated");
  ReactDOM.render(<App request_from_user={request_from_user} response_from_server={response_from_server} active_tab={active_tab}/>, document.getElementById('app'));
};

 var sendMessage = function(text){
   request_from_user = text;
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
  executeAction('go to', 'Homepage', request_from_user);
  executeAction('update log', request_from_user);
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
  executeAction('go to', 'Watch');
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



ReactDOM.render(<App request_from_user={request_from_user} response_from_server={response_from_server} active_tab={active_tab}/>, document.getElementById('app'));
