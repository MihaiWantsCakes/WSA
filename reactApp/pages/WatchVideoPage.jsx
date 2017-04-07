import React from 'react';
import ReactDOM from 'react-dom';




class WatchVideoPage extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div style={{width:'100%', display:'flex'}}>
        <div style={{width:'30%'}}>
          <h3>Playlist</h3>
          <VideoList/>
        </div>
        <div style={{width:'50%'}}>
          <h3>Watch Video</h3>
          <SingleVideo/>
        </div>
      </div>
    );
  }
}


class VideoList extends React.Component {
  render(){
    return(
      <div>
        <ul>
          <li>Video #1</li>
          <li>Video #2</li>
          <li>Video #3</li>
          <li>Video #4</li>
          <li>Video #5</li>
        </ul>
      </div>
    );
  }
}

class SingleVideo extends React.Component{
  render(){
    return(
      <div>
        <img src="https://blog.majestic.com/wp-content/uploads/2010/10/Video-Icon-crop.png"></img>
      </div>
    );
  }
}

export default WatchVideoPage;
