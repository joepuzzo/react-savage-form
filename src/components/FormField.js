/* ---------- Imports ---------- */

// Import React
import React, { Component } from 'react';

// Import PropTypes library
import PropTypes from 'prop-types';

/* ---------- Form Component ----------*/

class FormField extends Component {

  // We want to set touched to true when the form was submitted ( not for nested forms! )
  componentWillReceiveProps(nextProps, nextContext) {
    if ( nextContext.formApi.submitted !== this.context.formApi.submitted && !this.props.nestedForm ) {
      this.context.formApi.setTouched( this.props.field );
    }
    if ( nextContext.formApi.submits !== this.context.formApi.submits && !this.props.nestedForm ) {
      this.context.formApi.setTouched( this.props.field );
    }
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {

    // Grab needed values
    const field = this.props.field;
    const currentApi = this.context.formApi;
    const nextApi = nextContext.formApi;

    // Check child props for changes so we know to re-render
    const props1 = { ...this.props.children.props };
    const props2 = { ...nextProps.children.props };

    // Remove children so we can do shallow compare
    props1.children = null;
    props2.children = null;

    const shouldUpdate = nextApi.values[field] !== currentApi.values[field] ||
           nextApi.touched[field] !== currentApi.touched[field] ||
           nextApi.errors[field] !== currentApi.errors[field] ||
           nextApi.warnings[field] !== currentApi.warnings[field] ||
           nextApi.successes[field] !== currentApi.successes[field] ||
           JSON.stringify( props1 ) !== JSON.stringify( props2 ) ||
           nextContext.formApi.submits !== this.context.formApi.submits;

    return shouldUpdate || false;
  }


  render() {

    // console.log("RENDER FIELD", this.props.field);

    const {
      formApi
    } = this.context;

    const {
      children,
      field
    } = this.props;

    // Build field api from form api
    const fieldApi = {
      setValue: ( value ) => {
        formApi.setValue( field, value );
      },
      setTouched: ( touched ) => {
        formApi.setTouched( field, touched );
      },
      setError: ( error ) => {
        formApi.setError( field, error );
      },
      setWarning: ( warning ) => {
        formApi.setWarning( field, warning );
      },
      setSuccess: ( success ) => {
        formApi.setSuccess( field, success );
      },
      getValue: ( ) => formApi.getValue( field ),
      getTouched: ( ) => formApi.getTouched( field ),
      reset: ( ) => formApi.reset( field ),
      submitted: formApi.submitted,
      submits: formApi.submits
    };

    return ( <div>{React.cloneElement(children, { fieldApi } )}</div> );

  }

}

FormField.contextTypes = {
  formApi: PropTypes.object
};

export default FormField;
