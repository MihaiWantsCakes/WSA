import React from 'react';
import ReactDOM from 'react-dom';
import YouTube from 'react-youtube';






class WatchVideoPage extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className="flex-center">
        <div className="col-md-12">
          <SingleVideo/>
        </div>
      </div>
    );
  }
}


class SingleVideo extends React.Component{
  constructor(props) {
    super(props);
    this.onPlay = this.onPlay.bind(this);
    this.onPause = this.onPause.bind(this);
  }
  onPlay(event){
    event.target.playVideo();
  }
  onPause(event){
    event.target.pauseVideo();
  }
  onReady(event){
    event.target.pauseVideo();
  }

  render(){
    //the videoId should be coming from parent class
    return(
      <div>
        <YouTube
          videoId="pQC3ErD1YwE"
          opts={this.props.opts}
          onReady={this.onPause}
          onPause={this.onPause}
          onPlay={this.onPlay}
          />
      </div>
    );
  }
}

export default WatchVideoPage;
