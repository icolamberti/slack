import { Button } from '@/Components/Ui/button'
import { WorkspaceShowContext } from '@/Pages/Workspaces/Show'
import { Info, Search } from 'lucide-react'
import { useContext } from 'react'

export default function () {
  const { workspace } = useContext(WorkspaceShowContext)

  return (
    <nav className='flex h-10 items-center justify-between bg-[#481349] p-1.5'>
      <div className='flex-1' />
      <div className='min-w-[280px] max-w-[642px] shrink grow-[2]'>
        <Button
          size={'sm'}
          className='h-7 w-full justify-start bg-accent/25 px-2 hover:bg-accent/25'
        >
          <Search className='mr-2 size-4 text-white' />

          <span className='text-xs text-white'>Search {workspace.name}</span>
        </Button>
      </div>

      <div className='ml-auto flex flex-1 items-center justify-end'>
        <Button variant={'transparent'} size={'iconSm'}>
          <Info className='size-5 text-white' />
        </Button>
      </div>
    </nav>
  )
}
