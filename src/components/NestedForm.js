/* ---------- Imports ---------- */

// Import React
import React, { Component } from 'react';

// Import PropTypes library
import PropTypes from 'prop-types';

// Inport the form input
import FormField from './FormField';

class NestedFormWrapper extends Component {

  render(){

    const {
      children,
      fieldApi
    } = this.props;

    const {
      getValue,
      setValue,
      getTouched,
      setError,
      setWarning,
      setSuccess,
      setTouched,
      submitted,
      submits,
      reset
    } = fieldApi;

    return React.cloneElement(children, {
            // We pass down the fact that the parent form was submitted to the nested form
            submitted,
            submits,
            reset,
            // On change is an internal method that is used to update the parent form
            update: ({values, errors, successes, warnings, touched}) => {

              const invalid = errors ? Object.keys(errors).some( (k) => {
      	        return errors[k];
    	        }) : false;

              const success = successes ? Object.keys(successes).some( (k) => {
      	        return successes[k];
    	        }) : false;

              const warning = warnings ? Object.keys(warnings).some( (k) => {
      	        return warnings[k];
    	        }) : false;

              setValue( values );
              setTouched( touched );
              invalid ? setError( errors ) : setError( null );
              warning ? setWarning( warnings ) : setWarning( null );
              success ? setSuccess( successes ) : setSuccess( null );
            }
		});
  }

}

class NestedForm extends Component {

  render() {

    const {
      field,
      children
    } = this.props;

    return (
			<FormField field={field} nestedForm>
        <NestedFormWrapper field={field} {...children.props}>
          {children}
        </NestedFormWrapper>
			</FormField>
    );
  }
}

export default NestedForm;
