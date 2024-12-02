import CreateChannelModal from '@/Components/Channels/CreateChannelModal'
import { WorkspaceShowContext } from '@/Pages/Workspaces/Show'
import { usePage } from '@inertiajs/react'
import { HashIcon, MessageSquareText, SendHorizonal } from 'lucide-react'
import { useContext, useState } from 'react'
import SidebarItem from './SidebarItem'
import UserItem from './UserItem'
import WorkspaceHeader from './WorkspaceHeader'
import WorkspaceSection from './WorkspaceSection'

export default function () {
  const { user } = usePage().props.auth
  const { workspace } = useContext(WorkspaceShowContext)

  const [isChannelModalOpen, setIsChannelModalOpen] = useState(false)

  const isAdmin =
    workspace.members.find(member => member.user.id === user.id)?.role ===
    'admin'

  return (
    <>
      <div className='flex h-full flex-col bg-[#5e2c5f]'>
        <WorkspaceHeader />

        <div className='mt-3 flex flex-col px-2'>
          <SidebarItem label='Threads' icon={MessageSquareText} id='threads' />

          <SidebarItem
            label='Drafts & Sents'
            icon={SendHorizonal}
            id='drafts'
          />
        </div>

        <WorkspaceSection
          label='Channels'
          hint='New channel'
          onNew={isAdmin ? () => setIsChannelModalOpen(true) : undefined}
        >
          {workspace.channels.map(item => (
            <SidebarItem
              key={item.id}
              label={item.name}
              icon={HashIcon}
              id={item.id.toString()}
            />
          ))}
        </WorkspaceSection>

        <WorkspaceSection
          label='Direct messages'
          hint='New direct message'
          onNew={() => {}}
        >
          {workspace.members.map(item => (
            <UserItem key={item.user.id} user={item.user} />
          ))}
        </WorkspaceSection>
      </div>

      <CreateChannelModal
        isOpen={isChannelModalOpen}
        setIsOpen={setIsChannelModalOpen}
      />
    </>
  )
}
