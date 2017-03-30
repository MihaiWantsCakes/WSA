import React from 'react';
import ReactDOM from 'react-dom';
import {
  SocketProvider,
  socketConnect,
} from 'socket.io-react';
import io from 'socket.io-client';
import SpeechToText from 'speech-to-text';

// const onAnythingSaid = text => console.log(`Interim text: ${text}`);
// const onFinalised = text => console.log(`Finalised text: ${text}`);

// SOCKET DATA HANDLING

// const socket = io.connect(process.env.SOCKET_URL);
// socket.on('message', msg => console.log(msg));
//
// socket.on('connect', msg => console.log(msg));






class App extends React.Component {
    constructor(){
      super();
      this.state = {
         data: [],
         sentence: '',
         action: ''
      }
      this.setStateHandler = this.setStateHandler.bind(this);
      this.sendMessage = this.sendMessage.bind(this);
      this.showAction = this.showAction.bind(this);



      try {
        const onAnythingSaid = text => console.log(`Interim text: ${text}`);
        const onFinalised = text => this.setStateHandler(text);//console.log(`Finalised text: ${text}`);
        //const onFinishedListening = text => console.log('callback received');
    	  const listener = new SpeechToText(onAnythingSaid, onFinalised);
    	  listener.startListening();
        // TODO: on finalised result - restart listener
    	} catch (error) {
    	  console.log(error);
    	}


      var socket = io('http://localhost:8000');
      this.socket = socket;
      this.socket.on('connection', function(){
         this.socket.emit('message');
        console.log("connection established!");
      });

      this.socket.on('switch next tab', function(msg){
        console.log("the message: "+msg);

        var serverAction = document.getElementById('action-from-server');
        serverAction.innerHTML = msg;
      });


      this.socket.on('go back', function(msg){
        console.log("the message: "+msg);

        var serverAction = document.getElementById('action-from-server');
        serverAction.innerHTML = msg;
      });
    };

      sendMessage(){
        var mySentence = this.state.sentence;
        this.socket.emit('message', mySentence);
        console.log("sentence sent");
      }

      setStateHandler(text) {
       var myArray = this.state.data;
       var mySentence = text;
       myArray.push(mySentence);
       this.setState({
         data: myArray,
         sentence: mySentence
       });
       this.sendMessage();
    };

      showAction(){
        console.log("show action invoked....");
      }


   render() {
      return (
            <div>
              <h3>
                - You said: {this.state.sentence}
              </h3>
              <h3>
                - I do: <div id="action-from-server"></div>
              </h3>
            </div>
      );
   }
}

export default App;
