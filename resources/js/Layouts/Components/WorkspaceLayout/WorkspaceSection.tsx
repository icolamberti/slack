import Hint from '@/Components/Hint'
import { Button } from '@/Components/Ui/button'
import { cn } from '@/Lib/utils'
import { PlusIcon } from 'lucide-react'
import { FaCaretDown } from 'react-icons/fa6'
import { useToggle } from 'react-use'

type Props = {
  label: string
  hint: string
  onNew?: () => void
  children: React.ReactNode
}

export default function ({ label, hint, onNew, children }: Props) {
  const [on, toggle] = useToggle(true)

  return (
    <div className='mt-3 flex flex-col px-2'>
      <div className='group flex items-center px-3.5'>
        <Button
          variant={'transparent'}
          className='size-6 shrink-0 p-0.5 text-sm text-[#f9edfc]'
          onClick={toggle}
        >
          <FaCaretDown
            className={cn('size-4 transition-transform', on && '-rotate-90')}
          />
        </Button>

        <Button
          variant={'transparent'}
          size={'sm'}
          className='group h-7 items-center justify-start overflow-hidden px-1.5 text-sm text-[#f9edfc]'
        >
          <span className='truncate'>{label}</span>
        </Button>

        {onNew && (
          <Hint label={hint} side='top' align='center'>
            <Button
              onClick={onNew}
              variant={'transparent'}
              size={'iconSm'}
              className='ml-auto size-6 shrink-0 p-0.5 text-sm text-[#f9edfc] opacity-0 transition-opacity group-hover:opacity-100'
            >
              <PlusIcon className='size-5' />
            </Button>
          </Hint>
        )}
      </div>

      {on && children}
    </div>
  )
}
