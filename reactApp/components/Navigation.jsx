import React, {Component} from 'react';
import {ReactDOM, render} from 'react-dom';
import FavoriteVideoPage from '../pages/FavoriteVideoPage.jsx';
import WatchVideoPage from '../pages/WatchVideoPage.jsx';
import Homepage from '../pages/Homepage.jsx';
import VideoList from '../components/VideoList.jsx'



class Navigation extends React.Component{
  constructor(props){
    super(props);
    this.isHomepage = this.isHomepage.bind(this);
    this.isWatch = this.isWatch.bind(this);
    this.isSearch = this.isSearch.bind(this);
    this.createVideoCards = this.createVideoCards.bind(this);
    var parsedResponseBody;
    // this.createVideoCards(this.props.data);
    this.state = {
      data: '',
      active_tab: '',
      current_video: '',
      current_video_id: '',
      formattedResult: '',
      videoCards: '',
      playerPlaying: ''
    }
  }


    createVideoCards(jsonObj){
      var cardList = [];
      var formattedResult = [];
      if(jsonObj != undefined){
        try{
          this.parsedResponseBody = JSON.parse(jsonObj);
          console.log("number of items: " + this.parsedResponseBody.items.length);
          for(var i = 0; i < this.parsedResponseBody.items.length; i++){
            console.log("one video ID :"+ this.parsedResponseBody.items[i].id.videoId);
            //generate web page video card elements
            formattedResult.push({
              videoId: this.parsedResponseBody.items[i].id.videoId,
              videoTitle: this.parsedResponseBody.items[i].snippet.title,
              videoDescription: this.parsedResponseBody.items[i].snippet.description,
              videoThumbnailUrl: this.parsedResponseBody.items[i].snippet.thumbnails.medium.url
            });
            cardList.push(
              <div key={'single_video_card_'+i} className="col-md-3 single-video-card">
                <img className="video_card_image" key={'video_card_image_'+i } src={this.parsedResponseBody.items[i].snippet.thumbnails.medium.url} />
                <h4 key={'video_card_title_'+i }>{this.parsedResponseBody.items[i].snippet.title} </h4>
                <p key={'video_card_description_'+i }>{ this.parsedResponseBody.items[i].snippet.description}</p>
              </div>
            );
          }
          this.setState({
            videoCards: cardList,
            formattedResult: formattedResult
          });
          console.log("Video cards created and list changed!");
        }
        catch(ex){
          console.log("something went wrong: " + ex);
        }
      }
    }

  componentWillUpdate(nextProps, nextState){
    if(this.props.playerPlaying != nextProps.playerPlaying){
      this.setState({
        playerPlaying: nextProps.playerPlaying
      });
      console.log("navigation state has changed. playerPlaying ");
    }
    /////////////////////////////////////on data change
    if (this.props.data != nextProps.data) {
        this.createVideoCards(nextProps.data);
      this.setState({
        data: nextProps.data
      });
      console.log("navigation state has changed. data ");
    }
    /////////////////////////////////////on active tab value change
   if (this.props.active_tab != nextProps.active_tab) {
      this.createVideoCards(nextProps.data);
      this.setState({
        active_tab: nextProps.active_tab
      });
      console.log("navigation state has changed. active_tab ");
    }
    /////////////////////////////////////on current_video value changed
    if (this.props.current_video != nextProps.current_video && this.props.data != undefined) {
        var temp = JSON.parse(this.props.data.items[nextProps.current_video].id.videoId);
        this.setState({
          current_video_id: temp
        });
      console.log("navigation state has changed. current_video:  " + temp);
      }
  }


  isHomepage(){
    if(this.props.active_tab == 'Homepage'){
      return 'active';
    }

  }

  isWatch(){
    if(this.props.active_tab == 'Watch'){

      return 'active';
    }
    return '';
  }

  isFavorites(){
    if(this.props.active_tab == 'Favorites'){
      return 'active';
    }
    return '';
  }


  isSettings(){
    if(this.props.active_tab == 'Settings'){
      return 'active';
    }
    return '';
  }

  isSearch(){
    if(this.props.active_tab == 'Search for'){
      return 'active';
    }
    return '';
  }





  render(){
    var content_class = 'tab-pane fade in ';

    return(
      <div className="">
          <ul className="nav nav-tabs nav-justified">
            <li className={this.isHomepage()}><a data-toggle="tab" href="#home">Home</a></li>
            <li className={this.isSearch()}><a data-toggle="tab" href="#settings">Search</a></li>
            <li className={this.isWatch()}><a data-toggle="tab" href="#watch">Watch video</a></li>
            <li className={this.isFavorites()}><a data-toggle="tab" href="#favorites">Favorites</a></li>
            <li className={this.isSettings()}><a data-toggle="tab" href="#settings">Settings</a></li>
          </ul>
        <div className="tab-content">
          <div id="home" className={content_class + this.isHomepage()}>
            <Homepage/>
          </div>
          <div id="search" className={content_class + this.isSearch()}>
            <div className="col-md-12 med-top-bot-margin">
              <VideoList cards={this.state.videoCards}/>
            </div>
          </div>
          <div id="watch" className={content_class + this.isWatch()}>
            <div className="col-md-12 med-top-bot-margin">
             <WatchVideoPage videoList={this.state.formattedResult} current_video={this.state.current_video_id} playerPlaying={this.props.playerPlaying}/>
            </div>
          </div>
          <div id="favorites" className={content_class + this.isFavorites()}>
            <FavoriteVideoPage/>
          </div>
          <div id="settings" className="tab-pane ">
            <h3>Settings</h3>

          </div>
        </div>
      </div>

    );
  }

}
export default Navigation;
