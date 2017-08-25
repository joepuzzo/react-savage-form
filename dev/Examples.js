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

const TestNestedForm = ({index}) => { 
  return (
    <NestedForm field={index}>
      <Form validateError={nestedNestedErrorValidator}>
        <TestForm/>
      </Form>
    </NestedForm>
  );
}

const TestForm = () => { 
  return (
    <div>
      <Text field="one" />
      <Text field="two" />
    </div>
  );
}



const NestedForms = () => { 
  return (
    <div>
    { 
      [1,2,3].map( ( elem, index, arr ) => {
        return <TestNestedForm index={index} key={index}/>
      })
    }
    </div>
  )
}

const HiddenForm = () => {
  return (
    <div>
      <Text field="oh" />
      <Text field="no" />
    </div>
  );
}



const FormContent = ({formApi, hidden}) => {
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
   	  <NestedForms />
      { !hidden ? 
          <NestedForm field="hidden">
            <Form validateError={hiddenFormErrorValidator}>
              <HiddenForm />
            </Form>
          </NestedForm> : 
        null }
      <button type="submit">click me!</button>
    </form>
  );
}

class Examples extends Component {

  constructor(props){
    super(props);
    this.state = {
      aprop: false, 
      hidden: true,
      clicked: 0
    };
    this.setProp = this.setProp.bind(this);
    this.hideForm = this.hideForm.bind(this);
  }

  setProp(){
   this.setState( (prevState) => { return { aprop: this.state.clicked % 2 === 0 ? !prevState.aprop : prevState.aprop, clicked: prevState.clicked + 1 } } ); 
  }

  hideForm(){
    this.setState( (prevState) => { return { hidden: !prevState.hidden } } );
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
          <FormContent aprop={this.state.aprop} hidden={this.state.hidden}/>
        </Form>
        <button onClick={this.setProp}>SETPROP</button>
        <button onClick={this.hideForm}>Hide Form</button>
      </div>
    );

  }

}

export default Examples;
