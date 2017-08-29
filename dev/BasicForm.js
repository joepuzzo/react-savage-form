/* ------------- Imports -------------- */
import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server'

/* ------------- Form  Library Imports -------------- */
import {
  Form,
  Text,
  Radio,
  RadioGroup,
  TextArea
} from '../src/index';

/* ---------------- Other Imports ------------------ */

import Data from './Data';
import Code from './Code';

/* -------------------- Styles ----------------------*/

const fieldMargin = { marginBottom: '.5rem' };


/* ------------------ Form Stuff --------------------*/

const Radios = ({ group }) => {
  return (
    <div>
      <label htmlFor="male" className="mr-1">Male</label>
      <Radio group={group} value="male" id="male" className="mr-2" />
      <label htmlFor="female" className="mr-1">Female</label>
      <Radio group={group} value="female" id="female" />
    </div>
  );
};

const FormContent = ({ formApi }) => {

  return (
    <div>
      <form onSubmit={formApi.submitForm} id="form1">
        <label htmlFor="firstName">First name</label>
        <Text field="firstName" id="firstName" />
        <label htmlFor="lastName">First name</label>
        <Text field="lastName" id="lastName" />
        <RadioGroup field="gender">
          <Radios />
        </RadioGroup>
        <TextArea field="bio"/>
        <button type="submit" className="mb-2 btn btn-primary">Submit</button>
      </form>
      <hr />
      <Data formApi={formApi} />
    </div>
  );

};

const BasicFormCode = () => {

  const code = `
  const FormContent = ({ formApi }) => {

    return (
      <div>
        <form onSubmit={formApi.submitForm} id="form1">
          <label htmlFor="firstName">First name</label>
          <Text field="firstName" id="firstName" />
          <label htmlFor="lastName">First name</label>
          <Text field="lastName" id="lastName" />
          <RadioGroup field="gender">
            <Radios />
          </RadioGroup>
          <TextArea field="bio"/>
          <button type="submit" className="mb-2 btn btn-primary">Submit</button>
        </form>
        <hr />
        <Data formApi={formApi} />
      </div>
    );

  };
`;

  return (
    <div>
      <h5>Code:</h5>
      <Code type="html">
        {code}
      </Code>
    </div>
  );
};

class BasicForm extends Component {

  render() {

    return (
      <div>
        <h3>Basic Form</h3>
        <Form
          onSubmit={((values) => { console.log(values) })}>
          <FormContent />
        </Form>
        <BasicFormCode/>
      </div>
    );
  }
}

export default BasicForm;
