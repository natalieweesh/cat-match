import React from 'react';

const Tile = React.createClass({
  render() {
    return <div className="tile" data-num={this.props.uniqueid} data-value={this.props.num} onClick={this.props.clickTile.bind(null, this.props.uniqueid, this.props.num)} style={{'backgroundImage': this.props.currentlyShowingIds.indexOf(this.props.uniqueid) !== -1 || this.props.finalIds.indexOf(this.props.uniqueid) !== -1 ? 'url(img/cat-' + this.props.num + '.jpg)' : 'none'}}>
      {this.props.num}
    </div>
  }
});

export default Tile;
