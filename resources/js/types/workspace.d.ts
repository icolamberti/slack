import { UserType } from '.'
import { ChannelType } from './channel'
import { MemberType } from './member'

export type WorkspaceType = {
  id: number
  name: string
  user_id: number
  user: UserType
  join_code: string
  created_at: string
  updated_at: string
  members: MemberType[]
  channels: ChannelType[]
}
