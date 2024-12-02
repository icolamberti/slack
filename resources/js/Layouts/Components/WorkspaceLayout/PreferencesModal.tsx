import { Button } from '@/Components/Ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/Components/Ui/dialog'
import { Input } from '@/Components/Ui/input'
import { useConfirm } from '@/Hooks/useConfirm'
import { WorkspaceShowContext } from '@/Pages/Workspaces/Show'
import { WorkspaceType } from '@/types/workspace'
import { useForm } from '@inertiajs/react'
import { TrashIcon } from 'lucide-react'
import { useContext, useState } from 'react'

type Props = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  initialvalue: string
}

type FormType = {
  name: string
}

type TPageProps = {
  workspace: WorkspaceType
}

export default function ({ isOpen, setIsOpen }: Props) {
  const { workspace } = useContext(WorkspaceShowContext)

  const { data, setData, processing, errors, patch } = useForm<FormType>({
    name: workspace.name,
  })
  const { delete: destroy, processing: destroyProcessing } = useForm()

  const [ConfirmDialog, confirm] = useConfirm(
    'Are you sure you want to delete this workspace?',
    'This action cannot be undone.',
  )

  const [isEditOpen, setIsEditOpen] = useState(false)

  const onEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    patch(route('workspaces.update', workspace.id), {
      onSuccess: () => {
        setIsEditOpen(false)
      },
    })
  }

  const onDeleteSubmit = async () => {
    const ok = await confirm()

    if (!ok) {
      return
    }

    destroy(route('workspaces.destroy', workspace.id), {
      onSuccess: () => {
        setIsOpen(false)
      },
    })
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className='overflow-hidden bg-gray-50 p-0'>
          <DialogHeader className='border-b bg-white p-4'>
            <DialogTitle>{workspace.name}</DialogTitle>
          </DialogHeader>

          <div className='flex flex-col gap-y-2 px-4 pb-4'>
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
              <DialogTrigger asChild>
                <div className='cursor-pointer rounded-lg border bg-white px-5 py-4 hover:bg-gray-50'>
                  <div className='flex items-center justify-between'>
                    <p className='text-sm font-semibold'>Workspace name</p>

                    <p className='text-sm font-semibold text-[#1264a3] hover:underline'>
                      Edit
                    </p>
                  </div>

                  <p className='text-sm'>{workspace.name}</p>
                </div>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Rename this workspace</DialogTitle>
                </DialogHeader>

                <form className='space-y-4' onSubmit={onEditSubmit}>
                  <Input
                    value={data.name}
                    onChange={e => setData('name', e.target.value)}
                    required
                    autoFocus
                    minLength={3}
                    maxLength={80}
                    placeholder="Workspace name e.g. 'Work', 'Personal', 'Home'"
                  />
                  {/* TODO: Input Error */}

                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant={'outline'}>Cancel</Button>
                    </DialogClose>

                    <Button isLoading={processing}>Save</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            <Button
              onClick={() => onDeleteSubmit()}
              isLoading={destroyProcessing}
              className='h-auto justify-start rounded-lg border bg-white stroke-rose-600 px-5 py-4 text-rose-600 hover:bg-gray-50'
            >
              <TrashIcon className='size-4' />

              <p className='font-semibold'>Delete workspace</p>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <ConfirmDialog />
    </>
  )
}
