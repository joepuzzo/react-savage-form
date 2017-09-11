export const SET_VALUE = 'SET_VALUE';
export function setValue( field, value ) {
  return { type: SET_VALUE, field, value };
}

export const FORMAT = 'FORMAT';
export function format( field, fmt ) {
  return { type: FORMAT, field, format: fmt };
}

export const SET_ERROR = 'SET_ERROR';
export function setError( field, error ) {
  return { type: SET_ERROR, field, error };
}

export const SET_WARNING = 'SET_WARNING';
export function setWarning( field, warning ) {
  return { type: SET_WARNING, field, warning };
}

export const SET_SUCCESS = 'SET_SUCCESS';
export function setSuccess( field, success ) {
  return { type: SET_SUCCESS, field, success };
}

export const SET_TOUCHED = 'SET_TOUCHED';
export function setTouched( field, touched ) {
  return { type: SET_TOUCHED, field, touched };
}

export const RESET = 'RESET';
export function reset( field ) {
  return { type: RESET, field };
}

export const PRE_VALIDATE = 'PRE_VALIDATE';
export function preValidate() {
  return { type: PRE_VALIDATE };
}

export const VALIDATE = 'VALIDATE';
export function validate() {
  return { type: VALIDATE };
}

export const SUBMIT = 'SUBMIT';
export function submit() {
  return { type: SUBMIT };
}

export const SUBMITTED = 'SUBMITTED';
export function submitted() {
  return { type: SUBMITTED };
}

export const SUBMITS = 'SUBMITS';
export function submits() {
  return { type: SUBMITS };
}
