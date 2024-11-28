import { cn } from '@/Lib/utils'
import { useEffect, useRef } from 'react'
import { Input } from '../Ui/input'
import { Label } from '../Ui/label'
import Error from './Error'
import Field from './Field'

type InputType = {
  name: string
  label: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  errorMessage?: string
  isFocused?: boolean
  className?: string
  disabled?: boolean
  readOnly?: boolean
}

export default function ({
  name,
  label,
  value,
  onChange,
  required,
  errorMessage,
  isFocused,
  className,
  disabled,
  readOnly,
}: InputType) {
  const localRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isFocused) {
      localRef.current?.focus()
    }
  }, [])

  return (
    <Field>
      <Label htmlFor={name} children={label} required={required} />
      <Input
        type='text'
        className={cn(className, { 'border-red-500': errorMessage })}
        id={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        readOnly={readOnly}
        ref={localRef}
        required={required}
      />
      <Error message={errorMessage} />
    </Field>
  )
}
