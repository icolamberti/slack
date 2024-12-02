import { Button } from '@/Components/Ui/button'
import { cn } from '@/Lib/utils'
import { WorkspaceShowContext } from '@/Pages/Workspaces/Show'
import { Link } from '@inertiajs/react'
import { cva, VariantProps } from 'class-variance-authority'
import { LucideIcon } from 'lucide-react'
import { useContext } from 'react'
import { IconType } from 'react-icons/lib'

const sidebarItemVariants = cva(
  'flex w-full items-center gap-1.5 justify-start font-normal h-7 px-[18px] text-sm overflow-hidden',
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
  label: string
  icon: LucideIcon | IconType
  id: string
  variant?: VariantProps<typeof sidebarItemVariants>['variant']
}

export default function ({ label, icon: Icon, id, variant }: Props) {
  const { workspace } = useContext(WorkspaceShowContext)
  return (
    <Link href={route('workspaces.channels.show', [workspace.id, id])}>
      <Button
        variant={'transparent'}
        size={'sm'}
        className={cn(sidebarItemVariants({ variant: variant }))}
      >
        <Icon className='mr-1 size-3.5 shrink-0' />

        <span className='truncate text-sm'>{label}</span>
      </Button>
    </Link>
  )
}
