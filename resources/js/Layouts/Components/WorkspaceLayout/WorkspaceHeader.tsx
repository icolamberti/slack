import Hint from '@/Components/Hint'
import { Button } from '@/Components/Ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/Components/Ui/dropdown-menu'
import { WorkspaceShowContext } from '@/Pages/Workspaces/Show'
import { usePage } from '@inertiajs/react'
import { ChevronDown, ListFilter, SquarePen } from 'lucide-react'
import { useContext, useState } from 'react'
import PreferencesModal from './PreferencesModal'

export default function () {
  const { user } = usePage().props.auth
  const { workspace } = useContext(WorkspaceShowContext)

  console.log(user.id, workspace.members[0].user_id)

  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false)

  const isAdmin =
    workspace.members.find(member => member.user_id === user.id)?.role ===
    'admin'

  return (
    <>
      <div className='flex h-[49px] items-center justify-between gap-0.5 px-4'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={'transparent'}
              className='w-auto overflow-hidden p-1.5 text-lg font-semibold'
              size={'sm'}
            >
              <span className='truncate'>{workspace.name}</span>

              <ChevronDown className='ml-1 size-4 shrink-0' />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent side='bottom' align='start' className='w-64'>
            <DropdownMenuItem className='cursor-pointer capitalize'>
              <div className='relative mr-2 flex size-9 items-center justify-center overflow-hidden rounded-md bg-[#616061] text-xl font-semibold text-white'>
                {workspace.name.charAt(0).toUpperCase()}
              </div>

              <div className='flex flex-col items-start'>
                <p className='font-bold'>{workspace.name}</p>
                <p className='text-xs text-muted-foreground'>
                  Active workspace
                </p>
              </div>
            </DropdownMenuItem>

            {isAdmin && (
              <>
                <DropdownMenuSeparator />

                <DropdownMenuItem
                  className='cursor-pointer py-2'
                  onClick={() => {}}
                >
                  Invite people to {workspace.name}
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  className='cursor-pointer py-2'
                  onClick={() => setIsPreferencesOpen(true)}
                >
                  Preferences
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className='5 flex items-center gap-0'>
          <Hint label='Filter conversations' side='bottom'>
            <Button variant={'transparent'} size={'sm'}>
              <ListFilter className='size-4' />
            </Button>
          </Hint>

          <Hint label='New message' side='bottom'>
            <Button variant={'transparent'} size={'sm'}>
              <SquarePen className='size-4' />
            </Button>
          </Hint>
        </div>
      </div>

      <PreferencesModal
        isOpen={isPreferencesOpen}
        setIsOpen={setIsPreferencesOpen}
        initialvalue={workspace.name}
      />
    </>
  )
}
