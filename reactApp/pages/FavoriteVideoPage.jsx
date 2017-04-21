import React from 'react';
import ReactDOM from 'react-dom';


class FavoriteVideoPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      favoriteList: this.props.favoriteList
    }
  }

  componentWillUpdate(nextProps, nextState){
    if(this.props.favoriteList != nextProps.favoriteList){
      this.setState({
        favoriteList: nextProps.favoriteList
      });
    }
  }

  render(){
    return(
      <div>
        {this.state.favoriteList}
      </div>
    );
  }
}
export default FavoriteVideoPage;
