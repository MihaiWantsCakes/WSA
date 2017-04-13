import React, {Component} from 'react';
import {ReactDOM, render} from 'react-dom';
import FavoriteVideoPage from '../pages/FavoriteVideoPage.jsx';
import WatchVideoPage from '../pages/WatchVideoPage.jsx';
import Homepage from '../pages/Homepage.jsx';



class Navigation extends React.Component{
  constructor(props){
    super(props);
    this.isHomepage = this.isHomepage.bind(this);
    this.isWatch = this.isWatch.bind(this);
    this.isSearch = this.isSearch.bind(this);
    this.createVideoCards = this.createVideoCards.bind(this);

  }

  isHomepage(){
    if(this.props.active_tab == 'Homepage'){
      return 'active';
    }
    return '';
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


  createVideoCards(){
    console.log(this.props.data);
    var cardList = [];
     //
    try{
      var parsedResponseBody = JSON.parse(this.props.data);
      console.log("number of items: " + parsedResponseBody.items.length);
      for(var i = 0; i < parsedResponseBody.items.length; i++){
        // videoID, video_title, video_description, video_thumbnail
        // var singleresult = [parsedResponseBody.items[i].id.videoId, parsedResponseBody.items[i].snippet.title, parsedResponseBody.items[i].snippet.description,  parsedResponseBody.items[i].snippet.thumbnails.default.url ];
        // //  console.log("parsed responseBody: " + singleresult);
        //
        // cardList.push(singleresult);
        console.log("one video ID :"+parsedResponseBody.items[i].id.videoId);
        cardList.push(
          <div className="col-md-4">
            <img className="video_card_image" key={'video_card_image_'+i } src={parsedResponseBody.items[i].snippet.thumbnails.medium.url} />
            <h4 key={'video_card_title_'+i }>{parsedResponseBody.items[i].snippet.title} </h4>
            <p key={'video_card_description_'+i }>{ parsedResponseBody.items[i].snippet.description}</p>
          </div>
        );
      }
      return cardList;
    }
    catch(ex){

    }

  }


  render(){
    var content_class = 'tab-pane fade in ';
    return(
      <div className="">
          <ul className="nav nav-tabs">
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
            <h1>YES IT IS!</h1>
            {this.createVideoCards()}
          </div>
          <div id="watch" className={content_class + this.isWatch()}>
            <div className="">
              <WatchVideoPage/>
            </div>
          </div>
          <div id="favorites" className="tab-pane ">

          </div>
          <div id="settings" className="tab-pane ">
            <h3>Settings</h3>
            <p>Some content in menu 3.</p>
          </div>
        </div>
      </div>

    );
  }

}
export default Navigation;
