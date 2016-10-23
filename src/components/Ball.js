import React from 'react';

const Ball = React.createClass({

  render: function () {
    let xPos = this.props.xPos;
    let yPos = this.props.yPos;
    const Styles = {
      width: '75px',
      height: '75px',
      borderRadius: '100%',
      position: 'relative',
      top: yPos,
      left: xPos,
      background: 'red'
    };
    return (
      <div style={Styles} id="ball">

      </div>
    )
  }
});


export default Ball;