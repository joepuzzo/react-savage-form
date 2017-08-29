/* ------------- Imports -------------- */
import React, { Component } from 'react';
import Highlight from 'react-highlight';

class Data extends Component {

  render() {

    const {
      values
    } = this.props.formApi;

    return (
      <div>
        <h5>Values:</h5>
        <Highlight className="language-js" >
          {JSON.stringify(values, null, 2)}
        </Highlight>
      </div>
    );
  }
}

export default Data;
