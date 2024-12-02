import { UserType } from '.'
import { WorkspaceType } from './workspace'

export type MemberType = {
  id: number
  user_id: number
  user: UserType
  workspace_id: number
  workspace: WorkspaceType
  role: string
  created_at: string
  updated_at: string
}
