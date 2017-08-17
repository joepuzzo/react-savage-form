import React from 'react'

import FormInput from './FormInput'

export default function FormInputNestedForm ({
  field,
  children,
  ...rest
}) {
  return (
    <FormInput field={field}>
      {({ setValue, getValue, getTouched }) => {
        return React.cloneElement(children, {
          ...rest,
          /* Notify the parent of any nestedForm-level errors and values */
          onChange: ({ values }) => {
            setValue(values)
          },
        })
      }}
    </FormInput>
  )
}

