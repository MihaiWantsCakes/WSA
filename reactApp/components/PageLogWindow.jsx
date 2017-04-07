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


    render() {
        return (
          <div>
            <h3>
              Server action
            </h3>
            <h4>
              {this.props.last_message}
            </h4>
          </div>
          );
       }
    }


export default PageLogWindow;
