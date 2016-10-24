import React from 'react';

export default React.createClass({

  render: function () {
    let yPos = this.props.yPos;
    let xPos = this.props.xPos;
    var Styles = {
      height: '120px',
      width: '20px',
      background: 'red',
      position:'absolute',
      left: xPos,
      top: yPos,

    };
    return (
      <div style={Styles}>

      </div>
    )
  }
})
