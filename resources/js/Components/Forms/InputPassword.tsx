import { cn } from '@/Lib/utils'
import { useEffect, useRef, useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa6'
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
}: InputType) {
  const localRef = useRef<HTMLInputElement>(null)
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    if (isFocused) {
      localRef.current?.focus()
    }
  }, [])

  return (
    <Field>
      <Label htmlFor={name} children={label} required={required} />
      <div className='relative w-full'>
        <Input
          type={showPassword ? 'text' : 'password'}
          className={cn('pr-10', className, {
            'border-red-500': errorMessage,
          })}
          id={name}
          value={value}
          onChange={onChange}
          required={required}
          ref={localRef}
        />

        <span
          onClick={() => setShowPassword(value => !value)}
          className='text-foreground/50 absolute right-3 top-1/2 -translate-y-1/2 transform cursor-pointer'
        >
          {showPassword ? <FaEye /> : <FaEyeSlash />}
        </span>
      </div>
      <Error message={errorMessage} />
    </Field>
  )
}
