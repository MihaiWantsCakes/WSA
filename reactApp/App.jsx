import React from 'react';
import ReactDOM from 'react-dom';
import Navigation from './components/Navigation.jsx';

class App extends React.Component {
    constructor(props){
      super(props);
    };



    render() {
        return (
            <div id="render_zone" className="container-fluid">
              <div id="user_sentence_log_wrapper" className="col-md-12 med-top-bot-margin">
                <p id="user_sentence_log">{this.props.log_message}</p>
              </div>
              <div className="col-md-12">
                <Navigation data={this.props.data}
                            active_tab={this.props.active_tab}
                            current_video={this.props.current_video}
                            playerPlaying={this.props.playerPlaying}
                            />
              </div>
            </div>
        );
      }
}

export default App;
