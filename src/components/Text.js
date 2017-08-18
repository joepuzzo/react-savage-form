/* ---------- Imports ---------- */

// Import React
import React, { Component } from 'react';

// Import PropTypes library
import PropTypes from 'prop-types';

// Inport the form input
import FormInput from './FormInput';

class Text extends Component {

  render() {

    const {
			onChange, 
      field
    } = this.props;

    return (
			<FormInput field={field}>
				{({ setValue, getValue, setTouched }) => {	
					return ( 	
					 <input
						value={getValue('')}
						onChange={( e ) => {
								setValue(e.target.value);
								if ( onChange ) {
									onChange(e);
								}
							}
						}
						onBlur={() => setTouched()} /> 
					);
				}}
			</FormInput>
    );
  }
}

export default Text;
