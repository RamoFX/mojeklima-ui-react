import { useState } from 'react'



export type validator<TValue> = (value: TValue) => string | undefined



export default function useValidator<TValue>(
  value: TValue,
  validator: validator<TValue>
) {
  const [ error, setError ] = useState<string>()

  function validate() {
    const validationResult = validator(value)
    setError(validationResult)
    return validationResult
  }

  function resetError() {
    setError(undefined)
  }

  return {
    validate,
    error,
    resetError
  }
}
