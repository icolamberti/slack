import WorkspaceLayout from '@/Layouts/WorkspaceLayout'
import { WorkspaceType } from '@/types/workspace'
import { createContext } from 'react'

type Props = {
  workspace: WorkspaceType
  workspaces: WorkspaceType[]
}

export const WorkspaceShowContext = createContext(
  {} as { workspace: WorkspaceType; workspaces: WorkspaceType[] },
)

export default function ({ workspace, workspaces }: Props) {
  console.log('workspace', workspace)
  console.log('workspaces', workspaces)

  return (
    <WorkspaceShowContext.Provider value={{ workspace, workspaces }}>
      <WorkspaceLayout>
        <div>
          <h1>{workspace.name}</h1>
        </div>
      </WorkspaceLayout>
    </WorkspaceShowContext.Provider>
  )
}
