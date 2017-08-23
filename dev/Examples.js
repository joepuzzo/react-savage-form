/* ------------- Imports -------------- */
import React, { Component } from 'react';

/* ------------- Form  Library Imports -------------- */
import {
  Form,
  Text,
  NestedForm
} from '../src/index';


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

const NestedForm2 = () => {
  return (
    <div>
      <Text field="pizza" />
      <Text field="burrito" />
      <Text field="sandwich" />
    </div>
  );
}


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
}


const FormContent = ({formApi}) => {
  return (
    <form onSubmit={formApi.submitForm} >
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
          <NestedForm1 />
        </Form>
      </NestedForm>
      <button type="submit">click me!</button>
    </form>
  );
}

class Examples extends Component {

  constructor(props){
    super(props);
    this.state = {
      aprop: false, 
      clicked: 0
    };
    this.setProp = this.setProp.bind(this);
  }

  setProp(){
   this.setState( (prevState) => { return { aprop: this.state.clicked % 2 === 0 ? !prevState.aprop : prevState.aprop, clicked: prevState.clicked + 1 } } ); 
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
          <FormContent aprop={this.state.aprop}/>
        </Form>
        <button onClick={this.setProp}>SETPROP</button>
      </div>
    );

  }

}

export default Examples;
