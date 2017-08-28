/* ---------- Imports ---------- */

// Import React
import React, { Component } from 'react';

// Import PropTypes library
import PropTypes from 'prop-types';

// Inport the form input
import FormField from './FormField';

class RadioWrapper extends Component {

  render() {

    //console.log('RENDER');

    const {
			onChange, 
      onClick,
      group, 
      value
    } = this.props;

     const {
      getValue,
      setValue, 
      getTouched, 
      setTouched
    } = group;

    return (
			<input
				checked={group.getValue() === value}
				onBlur={() => group.setTouched()}
				onChange={(e) => {
					if (onChange) {
						onChange(e);
					}
				}}
				onClick={(e) => {
					group.setValue(value);
					if (onClick) {
						onClick(e);
					}
				}}
				type="radio" />
    );
  }
}

class Radio extends Component {

  render() {
    const {
      field,
      ...rest
    } = this.props;

    return ( 
      <FormField field={field}>
        <RadioWrapper {...rest}/>
      </FormField>
    );
  }

}

export default Radio;
