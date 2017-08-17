/* ---------- Imports ---------- */

// Import React
import React, { Component } from 'react';

// Import PropTypes library
import PropTypes from 'prop-types';

// Inport the form input
import FormInput from './FormInput';
import Form from './Form';


class NestedForm extends Component {

  render() {

    const {
			//setValue, 
			//setTouched,
      //setError, 
      //setWarning, 
      //setSuccess, 
			//getValue,
      field, 
      children
    } = this.props;

    return (
			<FormInput field={field}>
				{({ setValue, getValue, setTouched, setError, setWarning, setSuccess }) => {	

          const onChange = ({values, errors, successes, warnings, touched}) => {
              console.log( "NESTED:", values );
              setValue( values );
              //setTouched( touched );
              //setError( errors );
              //setWarning( warnings );
              //setSuccess( successes );
          }

          return ( 
              <Form onChange={onChange}>
								{(api)=>{
									// Give children access to properties
         					let resolvedChildren = typeof children === 'function' ? children(api) : children;

          				// In case multiple children in array, add keys
          				if ( Array.isArray( resolvedChildren ) ) {
            				resolvedChildren = resolvedChildren.map((child, index) => {
              				return React.cloneElement(child, { key: index })
            				})
          				}

									return (
										<div>{resolvedChildren}</div>
									)
								
								}}
              </Form>
          );

				}}
			</FormInput>
    );
  }
}

export default NestedForm;
