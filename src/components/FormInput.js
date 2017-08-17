/* ---------- Imports ---------- */

// Import React
import React, { Component } from 'react';

// Import PropTypes library
import PropTypes from 'prop-types';

// Inport the form field
import FormField from './FormField';

class FormInput extends Component {

  render() {

    const {
      children, 
      field 
    } = this.props;

    return (
		  <FormField field={field}>
        {( fieldApi ) =>{
          
					// Give children access to properties
          let resolvedChildren = typeof children === 'function' ? children( fieldApi ) : children;

          // In case multiple children in array, add keys
          if ( Array.isArray( resolvedChildren ) ) {
            resolvedChildren = resolvedChildren.map((child, index) => {
              return React.cloneElement(child, { key: index })
            })
          }

					// Finally we return resolved children
					return(
						<div>
							{resolvedChildren}
						</div>
					);

        }}
      </FormField>	
    );

  }

}

export default FormInput;
