/* ---------- Imports ---------- */

// Import React
import React, { Component } from 'react';

// Import PropTypes library
import PropTypes from 'prop-types';

/* ---------- Form Component ----------*/

class Form extends Component {

	constructor(props){
		super(props);
		this.state = {
			values: {},
      touched: {},
			errors: {},
			warnings: {},
			successes: {},
      submitted: false,
      submits: 0
		}
		this.getValue = this.getValue.bind(this);
		this.setValue = this.setValue.bind(this);
		this.getTouched = this.getTouched.bind(this);
		this.setTouched = this.setTouched.bind(this);
    this.setError = this.setError.bind(this);
    this.setWarning = this.setWarning.bind(this);
    this.setSuccess = this.setSuccess.bind(this);
    this.submitForm = this.submitForm.bind(this);
	}

  componentDidUpdate(){
    if( this.props.formDidUpdate ){
      this.props.formDidUpdate( this.state );
    }
    if( this.props.update ){
      this.props.update( this.state );
    }
  }

  componentDidMount(){
    // We want to validate right away
    // Note, this will trigger compDidUpdate
    // and therefore, will trigger the update of nested forms
	  this.setState((prevState, props) => {
			// Validate
			const validations = this.validate( prevState.values );
			// Return the new state
      return {
				...validations
      };
    });
	}

  componentWillReceiveProps(nextProps){
    // If we are told we are submitted and we went from true to false ( not undefined to somthing else ) then submit
    if( nextProps.submitted !== this.state.submitted && nextProps.submitted === true && this.state.submitted === false ){
      this.setState({submitted: true});
    }
    // If submits was incrimented
    if( nextProps.submits != this.state.submits ){
      this.setState( ( prevState ) => { return {submits: prevState.submits + 1 }; } );
    }
  }

	getChildContext () {
    return {
      formApi: this.api,
    }
  }

	shouldComponentUpdate(nextProps, nextState){
		//console.log("PROPS", nextProps.children.props, this.props.children.props );
		//console.log("CHILDREN", this.props.children.props === nextProps.children.props );
    //
    //Check child props for changes so we know to re-render
    const props1 = { ...this.props.children.props };
    const props2 = { ...nextProps.children.props };

    // Remove children so we can do shallow compare
    props1.children = null;
    props2.children = null;

		//console.log(props1, props2);

		const shouldUpdate = JSON.stringify(nextState.values) !== JSON.stringify(this.state.values) ||
    JSON.stringify(nextState.errors) !== JSON.stringify(this.state.errors) ||
    JSON.stringify(nextState.warnings) !== JSON.stringify(this.state.warnings) ||
    JSON.stringify(nextState.successes) !== JSON.stringify(this.state.successes) ||
    JSON.stringify(nextState.touched) !== JSON.stringify(this.state.touched) ||
    nextState.submits !== this.state.submits ||
		JSON.stringify( props1 ) !== JSON.stringify( props2 ) ||
    nextState.submitted !== this.state.submitted;
    return shouldUpdate || false;
	}

  get api(){
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
      submits: this.state.submits
		};
	}

	validate( values, field ){
		// Call validators
		const {
			validateError,
			validateWarning,
			validateSuccess
		}	= this.props;
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
		}
	}

  submitForm( e ) {

		e && e.preventDefault && e.preventDefault(e);

    const onSubmit = () => {
      // Only submit if we have no errors
			const errors = this.state.errors;
      const invalid = Object.keys(errors).some( (k) => {
      	return errors[k];
    	});

      if( this.props.onSubmit && !invalid ){
        this.props.onSubmit( this.state.values );
      }

    }

    this.setState((prevState, props) => {
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

	setValue( field, value ){

    this.setState((prevState, props) => {
			// Pull off the old values
      let values = { ...prevState.values };
			// Update the value
		 	values[field] = value;
			// Pre validate
      if( this.props.preValidate ){
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

	getValue( field ){
    return this.state.values[field];
	}

	setTouched( field, touch = true ){

		this.setState((prevState, props) => {
			// Pull off the old touched
      let touched = { ...prevState.touched };
			// Update the touched value
		 	touched[field] = touch;
			// Return the new state
      return {
        touched
      };
    });

	}

  getTouched( field ){
    return this.state.touched[field];
	}

  setError( field, err ){

		this.setState((prevState, props) => {
			// Pull off the old touched
      let errors = { ...prevState.errors };
			// Update the errors value
		 	errors[field] = err;
			// Return the new state
      return {
        errors
      };
    });

	}

  setWarning( field, warn ){

		this.setState((prevState, props) => {
			// Pull off the old touched
      let warnings = { ...prevState.warnings };
			// Update the errors value
		 	warnings[field] = warn;
			// Return the new state
      return {
        warnings
      };
    });

	}

  setSuccess( field, succ ){

		this.setState((prevState, props) => {
			// Pull off the old touched
      let successes = { ...prevState.successes };
			// Update the errors value
		 	successes[field] = succ;
			// Return the new state
      return {
        successes
      };
    });

	}

  render() {

    const {
      children
    } = this.props;

  	// Give children access to properties
		//let resolvedChildren = typeof children === 'function' ? children(this.api) : children;

		// In case multiple children in array, add keys
		/*if ( Array.isArray( resolvedChildren ) ) {
			resolvedChildren = resolvedChildren.map((child, index) => {
				return React.cloneElement(child, { key: index })
			})
		}*/

    /*return (
      <div>
        {children}
      </div>
    );*/

    return React.cloneElement(children, { formApi: this.api } );

  }

}

Form.childContextTypes = {
  formApi: PropTypes.object
};

/* ---------- Exports ---------- */
export default Form;
