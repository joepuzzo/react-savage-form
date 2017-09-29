/*
 * D E P R I C A T E D  D E P R I C A T E D   D E P R I C A T E D   D E P R I C A T E D
 *
 * Note!! This file is depricated and no longer used as part of this form
 * library. I keep it around as a reminder of how complex things get without
 * redux. Feel free to compare and contrast Form and ReduxForm to see how
 * much simpler they are.
 *
 * D E P R I C A T E D   D E P R I C A T E D   D E P R I C A T E D   D E P R I C A T E D
 */

/* ---------- Imports ---------- */

// Import React
import React, { Component } from 'react';

// Import PropTypes library
import PropTypes from 'prop-types';

/* ---------- Form Component ----------*/

class Form extends Component {

  constructor(props) {
    super(props);
    this.state = {
      values: {},
      touched: {},
      errors: {},
      warnings: {},
      successes: {},
      submitted: false,
      submits: 0
    };
    this.getValue = this.getValue.bind(this);
    this.setValue = this.setValue.bind(this);
    this.getTouched = this.getTouched.bind(this);
    this.setTouched = this.setTouched.bind(this);
    this.setError = this.setError.bind(this);
    this.getError = this.getError.bind(this);
    this.setWarning = this.setWarning.bind(this);
    this.setSuccess = this.setSuccess.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.reset = this.reset.bind(this);
  }

  getChildContext() {
    return {
      formApi: this.api,
    };
  }

  componentWillReceiveProps(nextProps) {
    // If we are told we are submitted and we went from true to false ( not undefined to somthing else ) then submit
    if ( nextProps.submitted !== this.state.submitted && nextProps.submitted === true && this.state.submitted === false ) {
      this.setState({ submitted: true });
    }
    // If submits was incrimented
    if ( nextProps.submits > this.state.submits ) {
      //this.setState( prevState => ({ submits: prevState.submits + 1 }) );
      this.setState((prevState) => {
        // Pull off the old values
        let values = { ...prevState.values };
        // Pre validate
        if ( this.props.preValidate ) {
          values = this.props.preValidate( values );
        }
        // Validate
        const validations = this.validate( values );
        // Return the new state
        return {
          values,
          ...validations,
          submits: prevState.submits + 1
        };
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {

    // Check child props for changes so we know to re-render
    const props1 = { ...this.props.children.props };
    const props2 = { ...nextProps.children.props };

    // Remove children so we can do shallow compare
    props1.children = null;
    props2.children = null;

    const shouldUpdate = JSON.stringify(nextState.values) !== JSON.stringify(this.state.values) ||
      JSON.stringify(nextState.errors) !== JSON.stringify(this.state.errors) ||
      JSON.stringify(nextState.warnings) !== JSON.stringify(this.state.warnings) ||
      JSON.stringify(nextState.successes) !== JSON.stringify(this.state.successes) ||
      JSON.stringify(nextState.touched) !== JSON.stringify(this.state.touched) ||
      nextState.submits !== this.state.submits ||
      JSON.stringify( props1 ) !== JSON.stringify( props2 ) ||
      nextState.submitted !== this.state.submitted;
    //console.log("SHOULD UPDATE", shouldUpdate);
    return shouldUpdate || false;
  }

  componentDidUpdate(prevProps, prevState) {
    if ( this.props.formDidUpdate ) {
      this.props.formDidUpdate( this.state );
    }
    if ( this.props.update ) {
      this.props.update( this.state );
    }
  }

  componentWillUnmount() {
    // Reset the form if it has reset
    if ( this.props.reset ) {
      // Basically calling parent forms reset function
      this.props.reset();
    }
  }

  get api() {
    return {
      values: this.state.values,
      errors: this.state.errors,
      warnings: this.state.warnings,
      touched: this.state.touched,
      successes: this.state.successes,
      submitForm: this.submitForm,
      setValue: this.setValue,
      getValue: this.getValue,
      setTouched: this.setTouched,
      getTouched: this.getTouched,
      setError: this.setError,
      setWarning: this.setWarning,
      setSuccess: this.setSuccess,
      submitted: this.state.submitted,
      submits: this.state.submits,
      reset: this.reset
    };
  }

  setValue( field, value ) {

    this.setState((prevState) => {
      // Pull off the old values
      let values = { ...prevState.values };
      // Update the value
      values[field] = value;
      // Pre validate
      if ( this.props.preValidate ) {
        values = this.props.preValidate( values );
      }
      // Validate
      const validations = this.validate( values, field );
      // Return the new state
      return {
        values,
        ...validations
      };
    });

  }

  getValue( field ) {
    return this.state.values[field];
  }


  setTouched( field, touch = true ) {

    this.setState((prevState) => {
      // Pull off the touched
      const touched = { ...prevState.touched };
      // Update the touched value
      touched[field] = touch;
      // Return the new state
      return {
        touched
      };
    });

  }

  getTouched( field ) {
    return this.state.touched[field];
  }

  setError( field, err ) {
    this.setState((prevState) => {
      // Pull off the errors
      const errors = { ...prevState.errors };
      // Update the errors value
      errors[field] = err;
      // Return the new state
      return {
        errors
      };
    });
  }

  getError( field ) {
      return this.state.errors[field];
  }

    setWarning( field, warn ) {

    this.setState((prevState) => {
      // Pull off the warnings
      const warnings = { ...prevState.warnings };
      // Update the errors value
      warnings[field] = warn;
      // Return the new state
      return {
        warnings
      };
    });

  }

  setSuccess( field, succ ) {

    this.setState((prevState) => {
      // Pull off the successes
      const successes = { ...prevState.successes };
      // Update the errors value
      successes[field] = succ;
      // Return the new state
      return {
        successes
      };
    });

  }

  validate( values ) {
    // Call validators
    const {
      validateError,
      validateWarning,
      validateSuccess
    } = this.props;
    let errors = validateError ? validateError( values ) : {};
    let warnings = validateWarning ? validateWarning( values ) : {};
    let successes = validateSuccess ? validateSuccess( values ) : {};
    errors = { ...this.state.errors, ...errors };
    warnings = { ...this.state.warnings, ...warnings };
    successes = { ...this.state.successes, ...successes };
    return {
      errors,
      warnings,
      successes
    };
  }

  submitForm( e ) {

    e && e.preventDefault && e.preventDefault(e);

    const onSubmit = () => {
      // Only submit if we have no errors
      const errors = this.state.errors;
      const invalid = Object.keys(errors).some( k => errors[k]);

      if ( this.props.onSubmit && !invalid ) {
        this.props.onSubmit( this.state.values );
      }

    };

    this.setState((prevState) => {
      // Validate
      const validations = this.validate( prevState.values );
      // Return the new state
      return {
        ...validations,
        submitted: true,
        submits: prevState.submits + 1
      };
    }, onSubmit );

  }

  reset( field ) {
    this.setState( (prevState) => {
      // TODO refactor to better solution maybe
      // technically this is ok to de because we know that
      // values, errors, successes, etc should just be objects with strings
      const newState = JSON.parse( JSON.stringify( prevState ) );
      newState.values[field] = null;
      newState.touched[field] = null;
      newState.errors[field] = null;
      newState.warnings[field] = null;
      newState.successes[field] = null;
      return newState;
    });
  }

  render() {

    const {
      children
    } = this.props;

    return React.cloneElement(children, { formApi: this.api } );

  }

}

Form.childContextTypes = {
  formApi: PropTypes.object
};

/* ---------- Exports ---------- */
export default Form;
