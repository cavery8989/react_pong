import React from 'react';

export default React.createClass({

  render: function () {
    let yPos = this.props.yPos;
    var Styles = {
      height: '120px',
      width: '20px',
      background: 'red',
      position:'relative',
      left: '0',
      top: yPos
    };
    return (
      <div style={Styles}>

      </div>
    )
  }
})
