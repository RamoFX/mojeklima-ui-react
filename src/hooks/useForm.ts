import { useState, ChangeEvent, useEffect } from 'react'



type validator<Type, FieldsNamesType extends string> = (value: Type, fields: FieldsTypeCommon<FieldsNamesType>) => string | void



export interface field<Type, FieldsNamesType extends string> {
  value: Type,
  validator?: validator<Type, FieldsNamesType>
}



export interface stringField<FieldsNamesType extends string> extends field<string, FieldsNamesType> {
}



export interface booleanField<FieldsNamesType extends string> extends field<boolean, FieldsNamesType> {
}



export interface numberField<FieldsNamesType extends string> extends field<number, FieldsNamesType> {
}



type someField<FieldsNamesType extends string> = stringField<FieldsNamesType> | numberField<FieldsNamesType> | booleanField<FieldsNamesType>

type errors<FieldsNamesType extends string> = Partial<Record<FieldsNamesType, string>>

export type FieldsTypeCommon<FieldsNamesType extends string> = Record<FieldsNamesType, someField<FieldsNamesType>>



export default function useForm<FieldsNamesType extends string, FieldsType extends FieldsTypeCommon<FieldsNamesType>>(
  initialFields: FieldsType,
  submit: () => void,
  initialReactive: boolean = false
) {
  const [ fields, setFields ] = useState(initialFields)
  const [ errors, setErrors ] = useState<errors<FieldsNamesType>>({})

  useEffect(() => {
    if (!initialReactive)
      return

    setFields(initialFields)
  }, [ initialFields ])

  function handleInputChange(args: ChangeEvent<HTMLInputElement>) {
    const { name, type, checked, value } = args.target

    if (!(
      name in fields
    ))
      return

    setFields(fields => (
      {
        ...fields,
        [name]: {
          ...fields[name as FieldsNamesType],
          value: type === 'checkbox' ? checked : type === 'number' ? Number(value) : String(value)
        }
      }
    ))
  }

  function validate() {
    let localErrors = {}

    for (let name in fields) {
      const field = fields[name]

      if (!(
        'validator' in field
      ))
        continue

      const error = (
        field.validator as validator<string | number | boolean, FieldsNamesType>
      )(field.value, fields)

      if (!error)
        continue

      localErrors = {
        ...localErrors,
        [name]: error
      }
    }

    return localErrors
  }

  function handleSubmit() {
    const localErrors = validate()
    setErrors(localErrors)

    if (Object.keys(localErrors).length > 0)
      return

    submit()
  }

  function resetErrors() {
    setErrors({})
  }

  return {
    fields,
    errors,
    handleInputChange,
    handleSubmit,
    resetErrors
  }
}
