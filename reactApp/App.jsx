import React from 'react';
import ReactDOM from 'react-dom';
import PageLogWindow from './components/PageLogWindow.jsx';
import Navigation from './components/Navigation.jsx';

class App extends React.Component {
    constructor(props){
      super(props);

    };



    componentDidUpdate(prevProps, prevState){


    }

    render() {

        return (
          <div className="col-md-12">
            <div className="col-md-12">
              <h1></h1>
            </div>
            <div id="response_from_server" className="col-md-12">

            </div>
            <div id="request_from_user" className="col-md-12">

              <hr/>
            </div>
            <div id="render_zone" className="col-md-12">
              <Navigation opts="" data={this.props.data} active_tab={this.props.active_tab}/>
            </div>
          </div>
        );
   }
}


export default App;
