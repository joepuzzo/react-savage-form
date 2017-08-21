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
    if( values[field] !== field ){
     return  'Not ' + field ;
    }
    return null;
  }

  return {
    foo: validateField('foo'),
    bar: validateField('bar'),
    baz: validateField('baz'),
    raz: validateField('raz'),
    taz: validateField('taz'),
    fuck: validateField('fuck'),

    a : validateField('a'),
    b : validateField('b'),
    c : validateField('c'),
    d : validateField('d'),
    e : validateField('e'),
    f : validateField('f'),
    g : validateField('g'),
    h : validateField('h')
  }

}

const nestedErrorValidator = (values) => {

  const validateField = ( field ) => {
    if( values[field] !== field ){
     return  'Not ' + field ;
    }
    return null;
  }

  return {
    red: validateField('red'),
    green: validateField('green'),
    blue: validateField('blue')
  }

}

class Examples extends Component {

  render() {

    return (
      <div>
				<Form formDidUpdate={(state)=>{
          console.log("-------------------------------------")
          console.log("VALUES:",state.values)
          console.log("ERRORS:",state.errors)
          console.log("TOUCHE:",state.touched)
        }} onSubmit={((values)=>{console.log("SUBMIT:", values)})} validateError={errorValidator}>
          {(api) => {

            return (
					    <form onSubmit={api.submitForm} >
                <Text field="foo"/>
                <Text field="bar"/>
                <Text field="baz"/>
                <Text field="raz"/>
                <Text field="taz"/>
                <Text field="fuck"/>

                <Text field="a"/>
                <Text field="b"/>
                <Text field="c"/>
                <Text field="d"/>
                <Text field="e"/>
                <Text field="f"/>
                <Text field="g"/>
                <Text field="h"/>

                <NestedForm field="color">
                  <Form validateError={nestedErrorValidator}>
                   <Text field="red"/>
                   <Text field="green"/>
                   <Text field="blue"/>
                  </Form>
                </NestedForm>
                <button type="submit">click me!</button>
              </form>
            );

          }}
				</Form>
     </div>
    );

  }

}

export default Examples;
