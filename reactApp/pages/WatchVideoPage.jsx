import React from 'react';
import ReactDOM from 'react-dom';
import YouTubeVideo from 'stateful-react-youtube';
import {
  SocketProvider,
  socketConnect,
} from 'socket.io-react';
import io from 'socket.io-client';



class WatchVideoPage extends React.Component{
  constructor(props) {
    super(props);
    this.handleOnReady = this.handleOnReady.bind(this);
    this.onPlayingChange = this.onPlayingChange.bind(this);
    this.setPosition = this.setPosition.bind(this);
    this.toggleState = this.toggleState.bind(this);
    this.handleVolumeChange = this.handleVolumeChange.bind(this);
    this.addToFavorites = this.addToFavorites.bind(this);
    this.state = {
     current_video: '',
     videoList: '',
     position: 0,
     playing: false,
     duration: 0,
     volume: 30,
   }
  }


  addToFavorites(){

  }

  componentWillUpdate(nextProps, nextState){
    if(this.props.current_video != nextProps.current_video){
      this.setState({
        current_video: nextProps.current_video
      });
      console.log("updating video component. current_video (state) is " + this.state.current_video );

    }
    if(this.props.playerPlaying != nextProps.playerPlaying){
      console.log("updating video component. playerPlaying" + nextProps.playerPlaying);
      this.setState({
        playing: nextProps.playerPlaying
      });
    }
  }

  onPlayingChange(playing) {
    this.setState({playing});
  }

  handleOnReady({ duration }) {
    this.setState({duration});
  }

  setPosition(position) {
    this.setState({position});
  }

  toggleState() {
    this.setState({playing: !this.state.playing});
  }

  handleVolumeChange(volume) {
    this.setState({volume: Math.round(volume)});
  }


  componentDidMount(){

  }



//"pQC3ErD1YwE"
  render(){
    return(
      <div className="col-md-12">
        <h4 className="text-center med-top-bot-margin">Use <strong>please, play currently selected video</strong> or  <strong>please, stop currently selected video</strong> to control video playback.</h4>
          <h4 className="text-center med-top-bot-margin">Say <strong>please, add to favorites</strong> to add video to favorites</h4>
        <div className="flex-center">
          <div>
            <YouTubeVideo
              position={this.state.position}
              videoId={this.state.current_video}
              playing={this.state.playing}
              volume={this.state.volume}
              width="760"
              height="515"
              playerVars={{
                controls: 1,
                modestbranding: 1,
                showinfo: 0,
                disablekb: 1,
                enablejsapi: 1,
                fs: 0,
                autohide: 2,
              }}
              shouldPrestart={true}
              onPlayingChange={this.onPlayingChange}
              onReady={this.handleOnReady}
              onProgress={this.setPosition}
              onVolumeChange={this.handleVolumeChange}
              />
          </div>
        </div>
      </div>
    );
  }
}


export default WatchVideoPage;
