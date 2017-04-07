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
var user_input_log = [];
var data = [];
var last_message = 'last message';

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
  last_message = message;
  active_tab = tab;
  console.log("active tab set!" + tab);
  ReactDOM.render(<App last_message={last_message} active_tab={active_tab}/>, document.getElementById('app'));
};

var updateLog = function(message){
  last_message = message;
  console.log("log bar updated");
//  ReactDOM.render(<App last_message={last_message} active_tab={active_tab}/>, document.getElementById('app'));
};

 var sendMessage = function(text){
   socket.emit('message', text);
   console.log("sentence sent");
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
  executeAction('update log', msg);
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
  executeAction('go to', 'Watch');
});


ReactDOM.render(<App last_message={last_message}/>, document.getElementById('app'));
