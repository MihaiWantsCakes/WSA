import React, {Component} from 'react';
import {ReactDOM, render} from 'react-dom';
import FavoriteVideoPage from '../pages/FavoriteVideoPage.jsx';
import WatchVideoPage from '../pages/WatchVideoPage.jsx';

class Navigation extends React.Component{
  constructor(props){
    super(props);
    this.isHomepage = this.isHomepage.bind(this);
    this.isWatch = this.isWatch.bind(this);
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


  render(){
    var content_class = 'tab-pane fade in ';
    return(
      <div className="">
        <ul className="nav nav-tabs nav-justified">
          <li className={this.isHomepage()}><a data-toggle="tab" href="#home">Home</a></li>
          <li className={this.isWatch()}><a data-toggle="tab" href="#watch">Watch video</a></li>
          <li className={this.isFavorites()}><a data-toggle="tab" href="#favorites">Favorites</a></li>
          <li className={this.isSettings()}><a data-toggle="tab" href="#settings">Settings</a></li>
        </ul>

        <div className="tab-content">
          <div id="home" className={content_class + this.isHomepage()}>
            <h3>Home</h3>
            <p>Some content.</p>
          </div>
          <div id="watch" className={content_class + this.isWatch()}>
            <h3>Watch</h3>
            <div>
              <WatchVideoPage/>
            </div>
          </div>
          <div id="favorites" className="tab-pane fade in ">
            <h3>Favorites</h3>
            <p>Some content in menu 2.</p>
          </div>
          <div id="settings" className="tab-pane fade in ">
            <h3>Settings</h3>
            <p>Some content in menu 3.</p>
          </div>
        </div>

      </div>

    );
  }

}
export default Navigation;
