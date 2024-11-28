import { Checkbox } from '@/Components/Ui/checkbox'
import { cn } from '@/Lib/utils'
import { Label } from '../Ui/label'

type Props = {
  name: string
  label: string
  value: string
  checked: boolean
  onChange: (value: string) => void
  className?: string
}

export default function ({
  name,
  label,
  value,
  checked,
  onChange,
  className,
}: Props) {
  return (
    <div className='flex items-center gap-0.5'>
      <Checkbox
        id={name + value}
        value={value}
        checked={checked}
        onCheckedChange={() => onChange(value)}
      />
      <Label
        htmlFor={name + value}
        children={label}
        className={cn('cursor-pointer pl-2 font-normal', className)}
      />
    </div>
  )
}
