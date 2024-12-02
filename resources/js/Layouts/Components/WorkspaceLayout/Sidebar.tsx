import UserButton from '@/Components/UserButton'
import { usePage } from '@inertiajs/react'
import { Bell, Home, MessagesSquare, MoreHorizontal } from 'lucide-react'
import SidebarButton from './SidebarButton'
import WorkspaceSwitcher from './WorkspaceSwitcher'

export default function () {
  const { url } = usePage()

  return (
    <aside className='flex h-full w-[70px] flex-col items-center gap-y-4 bg-[#481349] pb-1 pt-[9px]'>
      <WorkspaceSwitcher />

      <SidebarButton
        icon={Home}
        label='Home'
        isActive={url.startsWith('/workspaces') ? true : false}
      />
      <SidebarButton
        icon={MessagesSquare}
        label='DMs'
        isActive={url.startsWith('/messages') ? true : false}
      />
      <SidebarButton
        icon={Bell}
        label='Activity'
        isActive={url.startsWith('/activity') ? true : false}
      />
      <SidebarButton
        icon={MoreHorizontal}
        label='More'
        isActive={url.startsWith('/more') ? true : false}
      />

      <div className='mt-auto flex flex-col items-center justify-center gap-y-1'>
        <UserButton />
      </div>
    </aside>
  )
}
