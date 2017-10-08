import {
  SET_VALUE,
  SET_ERROR,
  SET_WARNING,
  SET_SUCCESS,
  SET_TOUCHED,
  PRE_VALIDATE,
  VALIDATE,
  FORMAT,
  SUBMITS,
  SUBMITTED,
  RESET,
  VALIDATING_FIELD,
  DONE_VALIDATING_FIELD,
  VALIDATION_FAILURE,
  VALIDATION_SUCCESS
} from './actions';

const INITIAL_STATE = {
  values: {},
  touched: {},
  errors: {},
  warnings: {},
  successes: {},
  validating: {},
  validationFailed: {},
  validationFailures: 0,
  asyncValidations: 0,
  submitted: false,
  submits: 0
};

const setValue = ( state, action ) => {

  const {
    field,
    value
  } = action;

  const newValues = JSON.parse(JSON.stringify(state.values));

  if ( Array.isArray(field) ) {
    newValues[field[0]] = newValues[field[0]] || [];
    newValues[field[0]][field[1]] = value;
  }
  else {
    newValues[field] = value;
  }

  return {
    ...state,
    values: newValues
  };

};

const format = ( state, action ) => {

  const {
    field
  } = action;

  const newValues = { ...state.values };

  if ( Array.isArray(field) ) {
    newValues[field[0]] = newValues[field[0]] || [];
    newValues[field[0]][field[1]] = action.format( newValues[field[0]][field[1]] );
  }
  else {
    newValues[field] = action.format( newValues[field] );
  }

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

  const newTouched = JSON.parse(JSON.stringify(state.touched));

  if ( Array.isArray(field) ) {
    newTouched[field[0]] = newTouched[field[0]] || [];
    newTouched[field[0]][field[1]] = touched;
  }
  else {
    newTouched[field] = touched;
  }

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

  const newWarnings = JSON.parse(JSON.stringify(state.warnings));

  if ( Array.isArray(field) ) {
    newWarnings[field[0]] = newWarnings[field[0]] || [];
    newWarnings[field[0]][field[1]] = warning;
  }
  else {
    newWarnings[field] = warning;
  }

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

  const newErrors = JSON.parse(JSON.stringify(state.errors));

  if ( Array.isArray(field) ) {
    newErrors[field[0]] = newErrors[field[0]] || [];
    newErrors[field[0]][field[1]] = error;
  }
  else {
    newErrors[field] = error;
  }

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

  const newSuccesses = JSON.parse(JSON.stringify(state.successes));

  if ( Array.isArray(field) ) {
    newSuccesses[field[0]] = newSuccesses[field[0]] || [];
    newSuccesses[field[0]][field[1]] = success;
  }
  else {
    newSuccesses[field] = success;
  }

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

const validatingField = ( state, action ) => {

  const {
    field
  } = action;

  const validating = JSON.parse(JSON.stringify(state.validating));

  if ( Array.isArray(field) ) {
    validating[field[0]] = validating[field[0]] || [];
    validating[field[0]][field[1]] = true;
  }
  else {
    validating[field] = true;
  }

  return {
    ...state,
    asyncValidations: state.asyncValidations + 1,
    validating
  };

};

const doneValidatingField = ( state, action ) => {

  const {
    field
  } = action;

  const validating = JSON.parse(JSON.stringify(state.validating));

  if ( Array.isArray(field) ) {
    validating[field[0]] = validating[field[0]] || [];
    validating[field[0]][field[1]] = false;
  }
  else {
    validating[field] = false;
  }

  return {
    ...state,
    asyncValidations: state.asyncValidations - 1,
    validating
  };

};

const validationFailure = ( state, action ) => {

  const {
    field
  } = action;

  const validationFailed = JSON.parse(JSON.stringify(state.validationFailed));

  if ( Array.isArray(field) ) {
    validationFailed[field[0]] = validationFailed[field[0]] || [];
    validationFailed[field[0]][field[1]] = true;
  }
  else {
    validationFailed[field] = true;
  }

  return {
    ...state,
    validationFailures: state.validationFailures + 1,
    validationFailed
  };

};

const validationSuccess = ( state, action ) => {

  const {
    field
  } = action;

  const validationFailed = JSON.parse(JSON.stringify(state.validationFailed));

  if ( Array.isArray(field) ) {
    validationFailed[field[0]] = validationFailed[field[0]] || [];
    validationFailed[field[0]][field[1]] = false;
  }
  else {
    validationFailed[field] = false;
  }

  return {
    ...state,
    validationFailures: state.validationFailures - 1,
    validationFailed
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
        case FORMAT:
          return format( state, action );
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
        case VALIDATION_FAILURE:
          return validationFailure( state, action );
        case VALIDATION_SUCCESS:
          return validationSuccess( state, action );
        case DONE_VALIDATING_FIELD:
          return doneValidatingField( state, action );
        case VALIDATING_FIELD:
          return validatingField( state, action );
        default:
          return state;
      }
    };

    return reducer;

  }

}

export default ReducerBuilder;
