/* ------------- Imports -------------- */
import React, { Component } from 'react';

/* ------------- Form  Library Imports -------------- */
import BasicForm from './BasicForm';
import BigComplexForm from './BigComplexForm';
import Intro from './Intro';

class Examples extends Component {
  render() {
    return (
      <div>
        <h1>React Savage Form</h1>
        <hr />
        <Intro />
        <hr />
        <BasicForm />
        <hr />
        <BigComplexForm />
      </div>
    );
  }
}

export default Examples;
