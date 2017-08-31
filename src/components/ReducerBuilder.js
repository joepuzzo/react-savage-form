import {
  SET_VALUE,
  SET_ERROR,
  SET_WARNING,
  SET_SUCCESS,
  SET_TOUCHED,
  PRE_VALIDATE,
  VALIDATE,
  SUBMIT,
  SUBMITS,
  SUBMITTED,
  RESET
} from './actions';

const INITIAL_STATE = {
  values: {},
  touched: {},
  errors: {},
  warnings: {},
  successes: {},
  submitted: false,
  submits: 0
};

const setValue = ( state, action ) => {

  const {
    field,
    value
  } = action;

  const newValues = { ...state.values };
  newValues[field] = value;

  return {
    ...state,
    values: newValues
  };

};

const setTouched = ( state, action ) => {

  const {
    field,
    touched
  } = action;

  const newTouched = { ...state.touched };
  newTouched[field] = touched;

  return {
    ...state,
    touched: newTouched
  };

};

const setWarning = ( state, action ) => {

  const {
    field,
    warning
  } = action;

  const newWarnings = { ...state.warnings };
  newWarnings[field] = warning;

  return {
    ...state,
    warnings: newWarnings
  };

};

const setError = ( state, action ) => {

  const {
    field,
    error
  } = action;

  const newErrors = { ...state.errors };
  newErrors[field] = error;

  return {
    ...state,
    errors: newErrors
  };

};

const setSuccess = ( state, action ) => {

  const {
    field,
    success
  } = action;

  const newSuccesses = { ...state.successes };
  newSuccesses[field] = success;

  return {
    ...state,
    successes: newSuccesses
  };

};

const validate = ( state, action, validateError, validateWarning, validateSuccess ) => {

  let errors = validateError ? validateError( state.values ) : {};
  let warnings = validateWarning ? validateWarning( state.values ) : {};
  let successes = validateSuccess ? validateSuccess( state.values ) : {};
  errors = { ...state.errors, ...errors };
  warnings = { ...state.warnings, ...warnings };
  successes = { ...state.successes, ...successes };
  return {
    ...state,
    errors,
    warnings,
    successes
  };
};

const preValidate = ( state, action, preValidator ) => {

  const values = preValidator ? preValidator( state.values ) : state.values;

  return {
    ...state,
    values
  };
};

const submits = ( state ) => {
  return {
    ...state,
    submits: state.submits + 1,
  };
};

const submitted = ( state ) => {
  return {
    ...state,
    submitted: true,
  };
};

const reset = ( state, action ) => {

  const {
    field
  } = action;

  const newState = JSON.parse( JSON.stringify( state ) );
  newState.values[field] = null;
  newState.touched[field] = null;
  newState.errors[field] = null;
  newState.warnings[field] = null;
  newState.successes[field] = null;

  return {
    ...state,
    ...newState
  };
};

class ReducerBuilder {

  static build( properties = {} ) {

    const {
      validateError,
      validateWarning,
      validateSuccess
    } = properties;

    const reducer = (state = INITIAL_STATE, action) => {
      switch ( action.type ) {
        case SET_VALUE:
          return setValue( state, action );
        case SET_ERROR:
          return setError( state, action );
        case SET_WARNING:
          return setWarning( state, action );
        case SET_SUCCESS:
          return setSuccess( state, action );
        case SET_TOUCHED:
          return setTouched( state, action );
        case PRE_VALIDATE:
          return preValidate( state, action, properties.preValidate );
        case VALIDATE:
          return validate( state, action, validateError, validateWarning, validateSuccess );
        case SUBMITTED:
          return submitted( state, action );
        case SUBMITS:
          return submits( state, action );
        case RESET:
          return reset( state, action );
        default:
          return state;
      }
    };

    return reducer;

  }

}

export default ReducerBuilder;
