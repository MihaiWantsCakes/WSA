import React from 'react';
import ReactDOM from 'react-dom';

class VideoList extends React.Component {

  constructor(props){
    super(props);
  }


  render(){
      return(
        <div className="col-md-12">
          <h4 className="text-center med-top-bot-margin">Now, say <strong>please, play video number 'number from 1 to 5'</strong></h4>
          <div>
            {this.props.cards}
          </div>
        </div>
      );
  }
}

export default VideoList;
