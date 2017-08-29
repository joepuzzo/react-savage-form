/* ------------- Imports -------------- */
import React, { Component } from 'react';

/* ------------- Form  Library Imports -------------- */
import {
  Form,
  Text,
  Radio,
  RadioGroup,
  NestedForm
} from '../src/index';

/* ------------------ Validators ----------------- */

const errorValidator = (values) => {

  const validateField = ( field ) => {
    if ( values[field] !== field ) {
      return `Not ${field}`;
    }
    return null;
  };

  return {
    foo: validateField('foo'),
    bar: validateField('bar'),
    baz: validateField('baz'),
    raz: validateField('raz'),
    taz: validateField('taz'),
    fuck: validateField('fuck'),
    a: validateField('a'),
    b: validateField('b'),
    c: validateField('c'),
    d: validateField('d'),
    e: validateField('e'),
    f: validateField('f'),
    g: validateField('g'),
    h: validateField('h')
  };

};

const nestedErrorValidator = (values) => {

  const validateField = ( field ) => {
    if ( values[field] !== field ) {
      return `Not ${field}`;
    }
    return null;
  };

  return {
    red: validateField('red'),
    green: validateField('green'),
    blue: validateField('blue')
  };

};

const nestedNestedErrorValidator = (values) => {

  const validateField = ( field ) => {
    if ( values[field] !== field ) {
      return `Not ${field}`;
    }
    return null;
  };

  return {
    pizza: validateField('pizza'),
    burrito: validateField('burrito'),
    sandwich: validateField('sandwich')
  };

};

const hiddenFormErrorValidator = (values) => {

  const validateField = ( field ) => {
    if ( values[field] !== field ) {
      return `Not ${field}`;
    }
    return null;
  };

  return {
    oh: validateField('oh'),
    no: validateField('no'),
  };

};

/* --------------------- Forms --------------------*/

const NestedForm2 = () => {
  return (
    <div>
      <Text field="pizza" />
      <Text field="burrito" />
      <Text field="sandwich" />
    </div>
  );
};


const NestedForm1 = () => {
  return (
    <div>
      <Text field="red" />
      <Text field="green" />
      <Text field="blue" />
      <NestedForm field="food">
        <Form validateError={nestedNestedErrorValidator}>
          <NestedForm2 />
        </Form>
      </NestedForm>
    </div>
  );
};

const TestNestedForm = ({ index }) => {
  return (
    <NestedForm field={index}>
      <Form validateError={nestedNestedErrorValidator}>
        <TestForm />
      </Form>
    </NestedForm>
  );
};

const TestForm = () => {
  return (
    <div>
      <Text field="one" />
      <Text field="two" />
    </div>
  );
};

const NestedForms = () => {
  return (
    <div>
      {
        [1, 2, 3].map( ( elem, index ) => {
          return <TestNestedForm index={`${index}`} key={`nested${elem}`} />;
        })
      }
    </div>
  );
};

const HiddenForm = () => {
  return (
    <div>
      <Text field="oh" />
      <Text field="no" />
    </div>
  );
};

const Group = ({ group }) => {
  return (
    <div>
      <label for="fa">Hide form:</label>
      <br />
      <small>Yes</small>
      <Radio group={group} value="yes" />
      <small>No</small>
      <Radio group={group} value="no" />
    </div>
  );
};

const FormContent = ({ formApi, aprop }) => {

  const hidden = formApi.values.hideform === 'yes';

  return (
    <form onSubmit={formApi.submitForm} id="form1">
      <Text field="foo" />
      <Text field="bar" />
      <Text field="baz" />
      <Text field="raz" />
      <Text field="taz" />
      <Text field="fuck" />
      <Text field="a" />
      <Text field="b" />
      <Text field="c" />
      <Text field="d" />
      <Text field="e" />
      <Text field="f" />
      <Text field="g" />
      <Text field="h" />
      <NestedForm field="color">
        <Form validateError={nestedErrorValidator}>
          <NestedForm1 aprop={aprop} />
        </Form>
      </NestedForm>
      <NestedForms />
      <RadioGroup field="hideform" value="yes">
        <Group />
      </RadioGroup>
      { !hidden ?
        <NestedForm field="hidden">
          <Form validateError={hiddenFormErrorValidator}>
            <HiddenForm />
          </Form>
        </NestedForm> :
        null
      }
      <button type="submit" form="form1">click me!</button>
    </form>
  );

};

class Examples extends Component {

  constructor(props) {
    super(props);
    this.state = {
      aprop: false,
      hidden: true,
      clicked: 0
    };
    this.setProp = this.setProp.bind(this);
  }

  setProp(e) {
    e.preventDefault();
    this.setState( (prevState) => {
      return { aprop: this.state.clicked % 2 === 0 ? !prevState.aprop : prevState.aprop, clicked: prevState.clicked + 1 };
    });
    return false;
  }

  render() {

    return (
      <div>
        <Form
          formDidUpdate={(state) => {
            console.log('-------------------------------------');
            console.log('VALUES:', state.values);
            console.log('ERRORS:', state.errors);
            console.log('TOUCHE:', state.touched);
            console.log('SUBMIT:', state.submits);
          }}
          onSubmit={((values) => { console.log('SUBMIT:', values); })}
          validateError={errorValidator}>
          <FormContent aprop={this.state.aprop} />
        </Form>
        <br />
        <button type="button" onClick={this.setProp}>SETPROP</button>
      </div>
    );

  }

}

export default Examples;
