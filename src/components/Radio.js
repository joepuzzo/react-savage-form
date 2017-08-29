/* ---------- Imports ---------- */

// Import React
import React, { Component } from 'react';

// Import PropTypes library
import PropTypes from 'prop-types';

class Radio extends Component {

  // console.log('RENDER');

  render() {

    const {
      onChange,
      onClick,
      group,
      value
    } = this.props;

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

Radio.propTypes = {
  value: PropTypes.string.isRequired,
  group: PropTypes.object.isRequired
};

export default Radio;
