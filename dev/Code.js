/* ------------- Imports -------------- */
import React, { Component } from 'react';
import Highlight from 'react-highlight';

class Code extends Component {

  render() {

    const {
      children,
      type
    } = this.props;

    return (
      <Highlight className={`language-${type}`} >
        {children}
      </Highlight>
    );
  }
}

export default Code;
