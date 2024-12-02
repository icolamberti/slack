import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/Components/Ui/resizable'
import { PropsWithChildren } from 'react'
import Sidebar from './Components/WorkspaceLayout/Sidebar'
import Toolbar from './Components/WorkspaceLayout/Toolbar'
import WorkspaceSidebar from './Components/WorkspaceLayout/WorkspaceSidebar'
import RootLayout from './RootLayout'

export default function ({ children }: PropsWithChildren) {
  return (
    <RootLayout>
      <div className='h-full'>
        <Toolbar />

        <div className='flex h-[calc(100svh-40px)]'>
          <Sidebar />

          <ResizablePanelGroup
            direction='horizontal'
            autoSaveId='ca_workspace_layout'
          >
            <ResizablePanel defaultSize={20} minSize={11}>
              <WorkspaceSidebar />
            </ResizablePanel>

            <ResizableHandle withHandle />

            <ResizablePanel minSize={20}>{children}</ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </RootLayout>
  )
}
