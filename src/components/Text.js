/* ---------- Imports ---------- */

// Import React
import React, { Component } from 'react';

// Import PropTypes library
import PropTypes from 'prop-types';

// Inport the form input
import FormField from './FormField';

class TextWrapper extends Component {

  render() {

    // console.log('RENDER');

    const {
      onChange,
      fieldApi
    } = this.props;

    const {
      getValue,
      setValue,
      setTouched
    } = fieldApi;

    return (
      <div>
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
      </div>
    );
  }
}

class Text extends Component {

  render() {
    const {
      field,
      ...rest
    } = this.props;

    return (
      <FormField field={field}>
        <TextWrapper {...rest} />
      </FormField>
    );
  }

}

Text.propTypes = {
  field: PropTypes.string.isRequired
};

export default Text;
