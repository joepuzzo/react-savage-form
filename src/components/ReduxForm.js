/* ---------- Imports ---------- */

// Import React
import React, { Component } from 'react';

// Import PropTypes library
import PropTypes from 'prop-types';

import { createStore } from 'redux';
import ReducerBuilder from './ReducerBuilder';

import * as actions from './actions';

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

    this.store = createStore(ReducerBuilder.build( { validateError, validateWarning, validateSuccess, preValidate } ));

    this.state = this.store.getState();

    this.getValue = this.getValue.bind(this);
    this.setValue = this.setValue.bind(this);
    this.getTouched = this.getTouched.bind(this);
    this.setTouched = this.setTouched.bind(this);
    this.setError = this.setError.bind(this);
    this.setWarning = this.setWarning.bind(this);
    this.setSuccess = this.setSuccess.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.reset = this.reset.bind(this);

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
  }

  componentWillReceiveProps(nextProps) {
    // If we are told we are submitted and we went from true to false ( not undefined to somthing else ) then submit
    if ( nextProps.submitted !== this.props.submitted && nextProps.submitted === true && this.props.submitted === false ) {
      // Set submitted to true
      this.store.dispatch(actions.submitted());
    }
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
      this.props.formDidUpdate( this.state );
    }
    if ( this.props.update ) {
      this.props.update( this.state );
    }
    if ( prevState.submits < this.state.submits ) {
      // Only submit if we have no errors
      const errors = this.state.errors;
      const invalid = Object.keys(errors).some( k => errors[k]);

      if ( this.props.onSubmit && !invalid ) {
        this.props.onSubmit( this.state.values );
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
    this.store.dispatch(actions.setValue(field, value));
    this.store.dispatch(actions.preValidate());
    this.store.dispatch(actions.validate());
  }

  setTouched( field, touch = true ) {
    this.store.dispatch(actions.setTouched(field, touch));
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
    return this.state.touched[field];
  }

  getValue( field ) {
    return this.state.values[field];
  }

  reset( field ) {
    this.store.dispatch(actions.reset(field));
  }

  submitForm( e ) {

    if ( e && e.preventDefault ) {
      e.preventDefault(e);
    }

    this.store.dispatch(actions.submits());
    this.store.dispatch(actions.submitted());
  }

  render() {

    const {
      children
    } = this.props;

    return React.cloneElement(children, { formApi: this.api } );

  }

}

class FormWrapper extends Component {

  // getChildContext() {
  //   return {
  //     formApi: this.props.formApi,
  //   };
  // }

  shouldComponentUpdate(nextProps) {

    // Check child props for changes so we know to re-render
    const props1 = { ...this.props.children.props };
    const props2 = { ...nextProps.children.props };

    // Remove children so we can do shallow compare
    props1.children = null;
    props2.children = null;

    const shouldUpdate = JSON.stringify(nextProps.formApi.values) !== JSON.stringify(this.props.formApi.values) ||
      JSON.stringify(nextProps.formApi.errors) !== JSON.stringify(this.props.formApi.errors) ||
      JSON.stringify(nextProps.formApi.warnings) !== JSON.stringify(this.props.formApi.warnings) ||
      JSON.stringify(nextProps.formApi.successes) !== JSON.stringify(this.props.formApi.successes) ||
      JSON.stringify(nextProps.formApi.touched) !== JSON.stringify(this.props.formApi.touched) ||
      nextProps.formApi.submits !== this.props.formApi.submits ||
      JSON.stringify( props1 ) !== JSON.stringify( props2 ) ||
      nextProps.formApi.submitted !== this.props.formApi.submitted;
    // console.log("SHOULD UPDATE", shouldUpdate);
    return shouldUpdate || false;
  }

  render() {

    const {
      children,
      formApi
    } = this.props;

    return React.cloneElement( children, { formApi } );

  }

}

Form.childContextTypes = {
  formApi: PropTypes.object
};

/* ---------- Exports ---------- */
export default Form;
