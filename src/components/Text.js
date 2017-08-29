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
      fieldDidUpdate,
      fieldApi,
      onInput,
      ...rest
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
          onInput={( e ) => {
            setValue(e.target.value);
            if ( fieldDidUpdate ) {
              fieldDidUpdate(e.target.value);
            }
            if ( onInput ) {
              onInput( e );
            }
          }
          }
          onBlur={() => setTouched()}
          {...rest} />
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

    //console.log("REST", rest);

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
