import { cn } from '@/Lib/utils'

type Props = {
  message: string | undefined
  className?: string
}

export default function ({ message, className = '' }: Props) {
  return (
    <div
      className={cn(
        'text-3xs pl-3 text-left font-medium text-red-500',
        className,
      )}
    >
      {message}
    </div>
  )
}
