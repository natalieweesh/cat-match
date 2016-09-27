import React, { Component } from 'react';
import './App.css';
import Tiles from './Tiles.js';

class App extends Component {
  render() {
    return (
      <div className="Memory-Game">
        <Tiles></Tiles>
      </div>
    );
  }
}

export default App;
