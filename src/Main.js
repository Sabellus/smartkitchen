import React, { Component } from 'react';
import HeaderScreen from './Screens/HeaderSrceen';
import ContentScreen from './Screens/ContentScreen';

class App extends Component {
  render() {
    return (
      <div>
        <HeaderScreen/>
        <div className="container" >
          <ContentScreen/>
        </div>
      </div>
    );
  }
}

export default App;
