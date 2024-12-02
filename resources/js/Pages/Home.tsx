import UserButton from '@/Components/UserButton'
import CreateWorkspaceModal from '@/Components/Workspaces/CreateWorkspaceModal'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { WorkspaceType } from '@/types/workspace'
import { useEffect, useMemo, useState } from 'react'

type Props = {
  workspaces: WorkspaceType[]
}

export default function ({ workspaces }: Props) {
  const workspaceId = useMemo(() => workspaces[0]?.id, [workspaces])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (workspaceId) {
      console.log('Redirect to workspace')
    } else if (!isOpen) {
      setIsOpen(true)
      console.log('Open creation modal')
    }
  }, [workspaceId, isOpen, setIsOpen])

  return (
    <AuthenticatedLayout>
      <CreateWorkspaceModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <UserButton />
    </AuthenticatedLayout>
  )
}
