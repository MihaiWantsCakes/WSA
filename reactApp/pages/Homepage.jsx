import React from 'react';
import ReactDOM from 'react-dom';




class Homepage extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className="col-md-12">
        <h3 className="text-center med-top-bot-margin">Welcome to homepage of Speech-to-youtube!!</h3>
        <h4 className="text-center med-top-bot-margin">Try searching by saying <strong>please, search for 'keyphrase'</strong></h4>
      </div>
    );
  }
}


export default Homepage;
