/* ---------- Imports ---------- */

// Import React
import React, { Component } from 'react';

// Import PropTypes library
import PropTypes from 'prop-types';

// Inport the form input
import FormField from './FormField';

class RadioGroupWrapper extends Component {

  // Set the initial value
  componentWillMount() {
    if (this.props.value) {
      this.props.fieldApi.setValue(this.props.value);
    }
  }

  render() {

    // console.log('RENDER');

    const {
      fieldApi,
      children
    } = this.props;

    // Expose field api as group
    return React.cloneElement(children, { group: fieldApi } );

  }
}

class RadioGroup extends Component {

  render() {
    const {
      field,
      ...rest
    } = this.props;

    return (
      <FormField field={field}>
        <RadioGroupWrapper {...rest} />
      </FormField>
    );
  }

}

RadioGroup.propTypes = {
  field: PropTypes.string.isRequired
};

export default RadioGroup;
