import React from 'react';
import ReactDOM from 'react-dom';
import {
  SocketProvider,
  socketConnect,
} from 'socket.io-react';
import io from 'socket.io-client';

class PageLogWindow extends React.Component {
    constructor(props){
      super(props);

      };


      componentDidMount()
      {

      console.log('zajebali');
      };
    componentDidUpdate(prevProps, prevState){
        if(prevProps.last_message != this.props.state){
          var message = document.getElementById('output');
          output.innerText = this.props.last_message;
        }
      }


    render() {
        return (
          <div>
            <h4 className="text-center" id="output">{this.props.last_message}</h4>
          </div>
          );
       }
    }


export default PageLogWindow;
