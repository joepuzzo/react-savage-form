/* ---------- Imports ---------- */

// Import React
import React, { Component } from 'react';

// Import PropTypes library
import PropTypes from 'prop-types';

// Inport the form input
import FormInput from './FormInput';

class NestedForm extends Component {

  render() {

    const {
      field, 
      children
    } = this.props;

    return (
			<FormInput field={field} nestedForm>
				{({ setValue, getValue, setTouched, setError, setWarning, setSuccess, submitted }) => {	
					return React.cloneElement(children, {
            // We pass down the fact that the parent form was submitted to the nested form 
            submitted,
            // On change is an internal method that is used to update the parent form
            onChange: ({values, errors, successes, warnings, touched}) => {

              const invalid = Object.keys(errors).some( (k) => {
      	        return errors[k];
    	        });

              const success = Object.keys(successes).some( (k) => {
      	        return successes[k];
    	        });

              const warning = Object.keys(warnings).some( (k) => {
      	        return warnings[k];
    	        });

              setValue( values );
              setTouched( touched );
              invalid ? setError( errors ) : setError( null );
              warning ? setWarning( warnings ) : setWarning( null ); 
              success ? setSuccess( successes ) : setSuccess( null );
            }
					});
				}}
			</FormInput>
    );
  }
}

export default NestedForm;
