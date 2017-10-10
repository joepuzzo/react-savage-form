/* ---------- Imports ---------- */

// Import React
import React, { Component } from 'react';

// Import PropTypes library
import PropTypes from 'prop-types';

import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger'

import ReducerBuilder from '../redux/ReducerBuilder';
import * as actions from '../redux/actions';

/* ----- Recursive Check to see if form is valid  -----*/

// TODO maybe a better way to do this
const isFormValid = (errors) => {
  if ( Array.isArray( errors ) ) {
    return errors.some( k => isFormValid( k ) );
  }
  else if ( errors !== null && typeof errors === 'object') {
    return Object.keys(errors).some( k => isFormValid( errors[k] ) );
  }
  return errors;
};

/* ---------- Form Component ----------*/

class Form extends Component {

  constructor(props) {

    super(props);

    const {
      validateError,
      validateWarning,
      validateSuccess,
      preValidate
    } = props;

    this.store = createStore(
      ReducerBuilder.build( { validateError, validateWarning, validateSuccess, preValidate } ),
      applyMiddleware(
        thunkMiddleware, // lets us dispatch() functions
        //createLogger() // neat middleware that logs actions
      )
    );

    this.state = this.store.getState();

    this.getValue = this.getValue.bind(this);
    this.setValue = this.setValue.bind(this);
    this.getTouched = this.getTouched.bind(this);
    this.setTouched = this.setTouched.bind(this);
    this.setError = this.setError.bind(this);
    this.format = this.format.bind(this);
    this.setWarning = this.setWarning.bind(this);
    this.setSuccess = this.setSuccess.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.reset = this.reset.bind(this);
    this.getError = this.getError.bind(this);
    this.getWarning = this.getWarning.bind(this);
    this.getSuccess = this.getSuccess.bind(this);
    this.doneValidatingField = this.doneValidatingField.bind(this);
    this.validatingField = this.validatingField.bind(this);
    this.registerAsyncValidation = this.registerAsyncValidation.bind(this);
    this.callAsynchronousValidators = this.callAsynchronousValidators.bind(this);

    this.asyncValidators = [];

    this.store.subscribe(() =>
      this.setState( this.store.getState() )
    );

  }

  getChildContext() {
    return {
      formApi: this.api,
    };
  }

  componentDidMount() {
    // PreValidate
    this.store.dispatch(actions.preValidate());
    // Validate
    this.store.dispatch(actions.validate());
    // Register async validators if you are a nested form ( only nested forms have registerAsync prop )
    if ( this.props.registerAsyncValidation ) {
      this.props.registerAsyncValidation( this.callAsynchronousValidators );
    }
  }

  async componentWillReceiveProps(nextProps) {
    // If submits was incrimented
    if ( nextProps.submits > this.props.submits ) {
      // PreValidate
      this.store.dispatch(actions.preValidate());
      // Validate
      this.store.dispatch(actions.validate());
      // Inciment submit
      this.store.dispatch(actions.submits());
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if ( this.props.formDidUpdate ) {
      this.props.formDidUpdate( this.currentState );
    }
    if ( this.props.update ) {
      if ( JSON.stringify( prevState ) !== JSON.stringify( this.state )) {
        this.props.update( this.state );
      }
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
      errors: this.errors,
      warnings: this.warnings,
      successes: this.successes,
      touched: this.state.touched,
      asyncValidations: this.state.asyncValidations,
      validating: this.state.validating,
      validationFailures: this.state.validationFailures,
      validationFailed: this.state.validationFailed,
      submitForm: this.submitForm,
      setValue: this.setValue,
      getValue: this.getValue,
      setTouched: this.setTouched,
      getTouched: this.getTouched,
      getWarning: this.getWarning,
      getError: this.getError,
      getSuccess: this.getSuccess,
      setError: this.setError,
      setWarning: this.setWarning,
      setSuccess: this.setSuccess,
      format: this.format,
      submitted: this.state.submitted,
      submits: this.state.submits,
      reset: this.reset,
      validatingField: this.validatingField,
      doneValidatingField: this.doneValidatingField,
      registerAsyncValidation: this.registerAsyncValidation
    };
  }

  get errors() {
    return Object.assign(this.state.errors, this.state.asyncErrors);
  }

  get warnings() {
    return Object.assign(this.state.warnings, this.state.asyncWarnings);
  }

  get successes() {
    return Object.assign(this.state.successes, this.state.asyncSuccesses);
  }

  get currentState() {
    return Object.assign( JSON.parse( JSON.stringify( this.state ) ), {
      errors: this.errors,
      warnings: this.warnings,
      successes: this.successes
    });
  }

  setValue( field, value ) {
    this.store.dispatch(actions.setValue(field, value));
    this.store.dispatch(actions.removeAsyncError(field));
    this.store.dispatch(actions.removeAsyncWarning(field));
    this.store.dispatch(actions.removeAsyncSuccess(field));
    this.store.dispatch(actions.preValidate());
    this.store.dispatch(actions.validate());
  }

  setTouched( field, touch = true, validate = true ) {
    this.store.dispatch(actions.setTouched(field, touch));
    // We have a flag to perform async validate when touched
    if ( validate ) {
      this.store.dispatch(actions.asyncValidate(field, this.props.asyncValidators ));
    }
  }

  setError( field, error ) {
    this.store.dispatch(actions.setError(field, error));
  }

  setWarning( field, warning ) {
    this.store.dispatch(actions.setWarning(field, warning));
  }

  setSuccess( field, success ) {
    this.store.dispatch(actions.setSuccess(field, success));
  }

  getTouched( field ) {
    if ( Array.isArray(field) ) {
      return this.state.touched[field[0]] ? this.state.touched[field[0]][field[1]] : undefined;
    }
    return this.state.touched[field];
  }

  getValue( field ) {
    if ( Array.isArray(field) ) {
      return this.state.values[field[0]] ? this.state.values[field[0]][field[1]] : undefined;
    }
    return this.state.values[field];
  }

  getError( field ) {
    const errors = this.errors;
    if ( Array.isArray(field) ) {
      return errors[field[0]] ? errors[field[0]][field[1]] : undefined;
    }
    return errors[field];
  }

  getWarning( field ) {
    const warnings = this.warnings;
    if ( Array.isArray(field) ) {
      return warnings[field[0]] ? warnings[field[0]][field[1]] : undefined;
    }
    return warnings[field];
  }

  getSuccess( field ) {
    const successes = this.successes;
    if ( Array.isArray(field) ) {
      return successes[field[0]] ? successes[field[0]][field[1]] : undefined;
    }
    return successes[field];
  }

  registerAsyncValidation( func ) {
    this.asyncValidators.push( func );
  }

  format( field, format ) {
    this.store.dispatch(actions.format(field, format));
    this.store.dispatch(actions.preValidate());
    this.store.dispatch(actions.validate());
  }

  reset( field ) {
    this.store.dispatch(actions.reset(field));
  }

  // This is an internal method used by nested forms to tell the parent that its validating
  validatingField( field ) {
    this.store.dispatch(actions.validatingField(field));
  }

  // This is an internal method used by nested forms to tell the parent that its done validating
  doneValidatingField( field ) {
    this.store.dispatch(actions.doneValidatingField(field));
  }

  submitForm( e ) {
    //e.persist()
    // PreValidate
    this.store.dispatch(actions.preValidate());
    // Validate
    this.store.dispatch(actions.validate());
    // update submits
    this.store.dispatch(actions.submits());
    // We prevent default, by default, unless override is passed
    if ( e && e.preventDefault && !this.props.dontPreventDefault ) {
      e.preventDefault(e);
    }
    // We need to prevent default if override is passed and form is invalid
    if ( this.props.dontPreventDefault ) {
      const invalid = isFormValid( this.errors );
      if ( invalid && e && e.preventDefault ) {
        e.preventDefault(e);
      }
    }
    this.finishSubmission();
  }

  async finishSubmission() {
    // Call asynchronous validators
    await this.callAsynchronousValidators();
    // Only submit if we have no errors
    const errors = this.errors;
    const invalid = isFormValid( errors );
    // Only update submitted if we are not invalid and there are no active asynchronous validations
    if ( !invalid && this.state.asyncValidations === 0 ) {
      // Update submitted
      this.store.dispatch(actions.submitted());
      if ( this.props.onSubmit ) {
        this.props.onSubmit( this.state.values );
      }
    }
  }

  async callAsynchronousValidators() {
    // Build up list of async functions that need to be called
    let validators = this.props.asyncValidators ? Object.keys(this.props.asyncValidators).map( ( field ) => {
      return this.store.dispatch(actions.asyncValidate(field, this.props.asyncValidators ));
    }) : [];
    const childValidators = this.asyncValidators ? this.asyncValidators.map( ( validator ) => {
      // This looks strange but you call an async function to generate a promise
      return validator();
    }) : [];
    // Add all other subscribed validators to the validators list
    validators = validators.concat(childValidators);
    // Call all async validators
    await Promise.all( validators );
  }

  render() {

    const {
      children
    } = this.props;

    if ( typeof children === 'function' ) {
      return children(this.api);
    }

    return React.cloneElement(children, { formApi: this.api } );

  }

}

Form.childContextTypes = {
  formApi: PropTypes.object
};

/* ---------- Exports ---------- */
export default Form;
