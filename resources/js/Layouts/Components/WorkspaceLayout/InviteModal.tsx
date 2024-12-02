import { Button } from '@/Components/Ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/Components/Ui/dialog'
import { useConfirm } from '@/Hooks/useConfirm'
import { WorkspaceShowContext } from '@/Pages/Workspaces/Show'
import { useForm } from '@inertiajs/react'
import { CopyIcon, RefreshCcw } from 'lucide-react'
import { useContext } from 'react'
import { toast } from 'sonner'

type Props = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export default function ({ isOpen, setIsOpen }: Props) {
  const { workspace } = useContext(WorkspaceShowContext)
  const { data, setData, post, errors, processing, reset } = useForm({})
  const { post: newCodePost, processing: newCodeProcessing } = useForm()
  const [ConfirmDialog, confirm] = useConfirm(
    'Are you sure?',
    'This will deactivate the current invite code and generate a new one.',
  )

  const handleCopy = () => {
    const inviteLink = `${window.location.origin}/join/${workspace.id}` //TODO: change to route name

    navigator.clipboard
      .writeText(inviteLink)
      .then(() => toast.success('Invite link copied tp clipboard'))
  }

  const handleNewCode = async () => {
    const ok = await confirm()

    if (!ok) return
    newCodePost(route('workspaces.new-join-code', workspace.id))
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite people to {workspace.name}</DialogTitle>
            <DialogDescription>
              Use the code below to invite people to your workspace
            </DialogDescription>
          </DialogHeader>

          <div className='flex flex-col items-center justify-center gap-y-4 py-10'>
            <p className='text-4xl font-bold uppercase tracking-widest'>
              {workspace.join_code}
            </p>

            <Button variant={'ghost'} size={'sm'} onClick={handleCopy}>
              Copy link
              <CopyIcon className='size-4' />
            </Button>
          </div>

          <div className='flex w-full items-center justify-between'>
            <Button
              variant={'outline'}
              onClick={handleNewCode}
              isLoading={newCodeProcessing}
            >
              New code
              <RefreshCcw className='size-4' />
            </Button>

            <DialogClose asChild>
              <Button>Close</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>

      <ConfirmDialog />
    </>
  )
}
