/* ------------- Imports -------------- */
import React, { Component } from 'react';

/* ------------- Form  Library Imports -------------- */
import BasicForm from './BasicForm';
import NestedFormExample from './NestedFormExample';
import FormWithArrays from './FormWithArrays';
import BigComplexForm from './BigComplexForm';
import Intro from './Intro';

class Examples extends Component {
  render() {
    return (
      <div className="mt-4">
        <h1>React Savage Form</h1>
        <hr /><br />
        <Intro /> 
        <hr /><br />
        <BasicForm />
        <hr /><br />
        <FormWithArrays />
        <hr /><br />
        <NestedFormExample />
        <hr /><br />
        <BigComplexForm /> 
      </div>
    );
  }
}

export default Examples;
