import { Button } from '@/Components/Ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/Components/Ui/dropdown-menu'
import CreateWorkspaceModal from '@/Components/Workspaces/CreateWorkspaceModal'
import { WorkspaceShowContext } from '@/Pages/Workspaces/Show'
import { Link } from '@inertiajs/react'
import { Plus } from 'lucide-react'
import { Fragment, useContext, useState } from 'react'

export default function () {
  const { workspaces, workspace } = useContext(WorkspaceShowContext)
  const [isOpen, setIsOpen] = useState(false)

  const filteredWorkspaces = workspaces.filter(
    workspaceFilter => workspaceFilter.id !== workspace.id,
  )

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className='size-9 overflow-hidden bg-[#ababad] text-xl font-semibold text-slate-800 hover:bg-[#ababad]/80'>
            {workspace.name.charAt(0).toUpperCase()}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent side='bottom' align='start' className='w-64'>
          <Link href={route('workspaces.show', workspace.id)}>
            <DropdownMenuItem className='cursor-pointer flex-col items-start justify-start capitalize'>
              {workspace.name}
              <span className='text-xs text-muted-foreground'>
                Active workspace
              </span>
            </DropdownMenuItem>
          </Link>

          {filteredWorkspaces?.map(workspace => (
            <Fragment key={workspace.id}>
              <DropdownMenuSeparator />

              <Link href={route('workspaces.show', workspace.id)}>
                <DropdownMenuItem className='cursor-pointer capitalize'>
                  <div className='relative mr-2 flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-md bg-[#616061] text-xl font-semibold text-white'>
                    {workspace.name.charAt(0).toUpperCase()}
                  </div>

                  <p className='truncate'>{workspace.name}</p>
                </DropdownMenuItem>
              </Link>
            </Fragment>
          ))}

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => setIsOpen(true)}
            className='cursor-pointer'
          >
            <div className='relative mr-2 flex size-9 items-center justify-center overflow-hidden rounded-md bg-[#f2f2f2] text-xl font-semibold text-slate-800'>
              <Plus />
            </div>
            Create a new workspace
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <CreateWorkspaceModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  )
}
