import React from 'react';
import Tile from './Tile.js';

const Tiles = React.createClass({
  componentDidMount() {
    this.shuffleCards()
  },
  getInitialState() {
    return {
      cards: [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10],
      revealed: 0,
      revealedIds: [],
      finalIds: [],
      finalNums: [],
      currentlyShowingIds: [],
      currentlyShowingNums: [],
      allowClicks: true,
      winner: false
    }
  },
  shuffleCards() {
    var arr = this.state.cards;
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    this.setState({cards: arr});
  },
  clickTile(id, val) {
    if (!this.state.allowClicks) {
      return;
    }
    if (this.state.currentlyShowingIds.length === 0) {
      //flipping first card
      this.setState({
        currentlyShowingIds: this.state.currentlyShowingIds.concat([id]),
        currentlyShowingNums: this.state.currentlyShowingNums.concat([val])
      });
    } else {
      //flipping second card
      if (this.state.currentlyShowingIds.indexOf(id) !== -1) {
        //do nothing if clicked the same card twice
        return;  
      } else if (this.state.currentlyShowingNums.indexOf(val) !== -1) {
        //flipped over a matching card yay!
        this.setState({
          finalIds: this.state.finalIds.concat([id]).concat(this.state.currentlyShowingIds),
          finalNums: this.state.finalNums.concat([val]),
        }, () => {
          this.setState({
            currentlyShowingIds: [],
            currentlyShowingNums: []
          });
          if (this.state.finalIds.length === 20) {
            this.setState({winner: true})
          }
        });
      } else {
        //flipped over a non matching card
        this.setState({
          currentlyShowingIds: this.state.currentlyShowingIds.concat([id]),
          currentlyShowingNums: this.state.currentlyShowingNums.concat([val])
        }, () => {
          this.setState({allowClicks: false});
          setTimeout(() => {
            this.setState({
              currentlyShowingIds: [],
              currentlyShowingNums: [],
              allowClicks: true
            });
          }, 2000);
        });
      }

    }

  },
  render() {
    return <div>
      {this.state.cards.map((el, i)=>{return <Tile key={i} uniqueid={i} num={el} clickTile={this.clickTile} currentlyShowingIds={this.state.currentlyShowingIds} finalIds={this.state.finalIds}>{el}</Tile>})}
      <div className="winning-modal" style={{display: this.state.winner ? 'block' : 'none'}}>YOU WIN!</div>
    </div>
  }
});

export default Tiles;
