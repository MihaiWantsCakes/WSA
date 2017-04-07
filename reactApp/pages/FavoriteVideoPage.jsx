import React from 'react';
import ReactDOM from 'react-dom';


class FavoriteVideoPage extends React.Component{
  render(){
    return(
      <div style={{width:'100%', display:'flex'}}>
        <ul>
          <li>Favorite video number 1</li>
          <li>Favorite video number 2</li>
          <li>Favorite video number 3</li>
          <li>Favorite video number 4</li>
          <li>Favorite video number 5</li>
          <li>Favorite video number 6</li>
        </ul>
      </div>
    );
  }
}
export default FavoriteVideoPage;
