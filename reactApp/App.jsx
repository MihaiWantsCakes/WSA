import React from 'react';
import ReactDOM from 'react-dom';

import PageLogWindow from './components/PageLogWindow.jsx';

import Navigation from './components/Navigation.jsx';

class App extends React.Component {
    constructor(props){
      super(props);
      this.state = {
         data: [],
         action: ''
      }
    };

    componentDidUpdate(prevProps, prevState){

      if(prevProps.last_message != this.props.last_message){
        ReactDOM.render(<PageLogWindow last_message={this.props.last_message}/>, document.getElementById('request_from_user'));
      }
    }

    render() {
        return (
          <div>
            <div id="request_from_user">
              <PageLogWindow last_message={this.props.last_message} />
            </div>
            <hr/>
            <div id="render_zone">
              <Navigation active_tab={this.props.active_tab}/>
            </div>
          </div>
        );
   }
}


export default App;
