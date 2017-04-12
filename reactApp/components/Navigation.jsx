import React, {Component} from 'react';
import {ReactDOM, render} from 'react-dom';
import FavoriteVideoPage from '../pages/FavoriteVideoPage.jsx';
import WatchVideoPage from '../pages/WatchVideoPage.jsx';
import Homepage from '../pages/Homepage.jsx';
import Slider from 'react-slick';


class Navigation extends React.Component{
  constructor(props){
    super(props);
    this.isHomepage = this.isHomepage.bind(this);
    this.isWatch = this.isWatch.bind(this);
    this.getSlider = this.getSlider.bind(this);

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



  getSlider(){
    var settings = {
      slidesToShow: 3,
      infinite: true,
      speed: 500,
      slidesToScroll: 1
    };
    if(this.props.active_tab == 'Watch'){
      return(
        <Slider settings={settings}>
          <div>One</div>
          <div>Two</div>
          <div>Three</div>
          <div>Four</div>
          <div>Five</div>
          <div>Six</div>
        </Slider>
      );
    }
  }



  render(){
    var content_class = 'tab-pane fade in ';
    return(
      <div className="">
          <ul className="nav nav-tabs">
            <li className={this.isHomepage()}><a data-toggle="tab" href="#home">Home</a></li>
            <li className={this.isWatch()}><a data-toggle="tab" href="#watch">Watch video</a></li>
            <li className={this.isFavorites()}><a data-toggle="tab" href="#favorites">Favorites</a></li>
            <li className={this.isSettings()}><a data-toggle="tab" href="#settings">Settings</a></li>
          </ul>
        <div className="tab-content">
          <div id="home" className={content_class + this.isHomepage()}>
            <Homepage/>
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
        <div>
          {this.getSlider()}
        </div>
      </div>

    );
  }

}
export default Navigation;
