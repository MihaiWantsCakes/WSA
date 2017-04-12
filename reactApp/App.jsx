import React from 'react';
import ReactDOM from 'react-dom';
import PageLogWindow from './components/PageLogWindow.jsx';
import Navigation from './components/Navigation.jsx';

class App extends React.Component {
    constructor(props){
      super(props);

      this.state = {
        response_from_server: this.props.response_from_server,
        request_from_user: this.props.request_from_user
      }

    };

    componentDidUpdate(prevProps, prevState){

      if(prevProps.request_from_user != this.props.request_from_user){
      //  ReactDOM.render(<PageLogWindow last_message={this.props.request_from_user}/>, document.getElementById('request_from_user'));
        this.setState({
          request_from_user: this.state.request_from_user
        });
        console.log("message from user App.jsx"+this.state.request_from_user);
      }
      if(prevProps.response_from_server != this.props.response_from_server){
      //  ReactDOM.render(<PageLogWindow last_message={this.props.response_from_server}/>, document.getElementById('response_from_server'));
        this.setState({
          response_from_server: this.state.response_from_server
        });
        console.log("message from server App.jsx"+this.state.response_from_server);
      }
    }

    render() {

        return (
          <div className="col-md-12">
            <div className="col-md-12">
              <h1>{this.state.response_from_server}</h1>
            </div>
            <div id="response_from_server" className="col-md-12">
              <PageLogWindow message={this.state.response_from_server} />
            </div>
            <div id="request_from_user" className="col-md-12">
              <PageLogWindow message={this.state.request_from_user}/>
              <hr/>
            </div>
            <div id="render_zone" className="col-md-12">
              <Navigation opts="" active_tab={this.props.active_tab}/>
            </div>
          </div>
        );
   }
}


export default App;
