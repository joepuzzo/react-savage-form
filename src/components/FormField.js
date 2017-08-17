/* ---------- Imports ---------- */

// Import React
import React, { Component } from 'react';

// Import PropTypes library
import PropTypes from 'prop-types';

/* ---------- Form Component ----------*/

class FormField extends Component {

  render() {

	  const { 
      formApi 
    } = this.context;

    const {
      children, 
      field 
    } = this.props;

    // Build field api from form api 
    const fieldApi = {
      setValue: ( value ) => { formApi.setValue( field, value ) },
      setTouched: ( touched ) => { formApi.setTouched( field, touched ) },
      setError: ( error ) => { formApi.setError( field, error ) },
      setWarning: ( warning ) => { formApi.setWarning( field, warning ) },
      setSuccess: ( success ) => { formApi.setSuccess( field, success ) },
      getValue: ( ) => { formApi.getValue( field ) }, 
      getTouched: ( ) => { formApi.getTouched( field ) }
    }

  	// Give children access to properties
		let resolvedChildren = typeof children === 'function' ? children( fieldApi ) : children;

		// In case multiple children in array, add keys
		if ( Array.isArray( resolvedChildren ) ) {
			resolvedChildren = resolvedChildren.map((child, index) => {
				return React.cloneElement(child, { key: index })
			})
		}

    return (
		  <div>
        {resolvedChildren}
      </div>	
    );

  }

}

FormField.contextTypes = {
  formApi: PropTypes.object
};

export default FormField;
