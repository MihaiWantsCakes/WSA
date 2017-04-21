import React from 'react';
import ReactDOM from 'react-dom';

class VideoList extends React.Component {

  constructor(props){
    super(props);
    var parsedResponseBody = '';

    this.state = {
      cards: ''
    };
  }



  componentWillUpdate(nextProps, nextState){
    if(this.props.cards != nextProps.cards){
      this.setState({
        cards: nextProps.cards
      });
      console.log("Video list updated with cards!" + nextProps.cards);
    }
  }

  render(){
      return(
        <div className="col-md-12">
          <h4 className="text-center med-top-bot-margin">Now, say <strong>please, play video number 'number from 1 to 5'</strong></h4>
          <div>
            {this.state.cards}
          </div>
        </div>
      );
  }
}

export default VideoList;
