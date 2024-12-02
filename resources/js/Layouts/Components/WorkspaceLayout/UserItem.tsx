import { Avatar, AvatarFallback, AvatarImage } from '@/Components/Ui/avatar'
import { Button } from '@/Components/Ui/button'
import { cn } from '@/Lib/utils'
import { WorkspaceShowContext } from '@/Pages/Workspaces/Show'
import { UserType } from '@/types'
import { Link } from '@inertiajs/react'
import { cva, VariantProps } from 'class-variance-authority'
import { useContext } from 'react'

const userItemVariants = cva(
  'flex w-full items-center gap-1.5 justify-start font-normal h-7 px-4 text-sm overflow-hidden',
  {
    variants: {
      variant: {
        default: 'text-[#f9edfc]',
        active: 'text-[#481349] bg-white/90 hover:bg-white/90',
      },
    },
    defaultVariants: { variant: 'default' },
  },
)

type Props = {
  user: UserType
  variant?: VariantProps<typeof userItemVariants>['variant']
}

export default function ({ user, variant }: Props) {
  const { workspace } = useContext(WorkspaceShowContext)

  const avatarFallback = user.name.charAt(0).toUpperCase()

  return (
    <Link href={route('workspaces.members.show', [workspace.id, user.id])}>
      <Button
        variant={'transparent'}
        className={cn(userItemVariants({ variant: variant }))}
        size={'sm'}
      >
        <Avatar className='mr-1 size-5 rounded-md'>
          <AvatarImage src={user.avatar} className='rounded-md1' />

          <AvatarFallback className='rounded-md bg-sky-500 text-white'>
            {avatarFallback}
          </AvatarFallback>
        </Avatar>

        <span className='truncate text-sm'>{user.name}</span>
      </Button>
    </Link>
  )
}
