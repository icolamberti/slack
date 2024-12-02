import { WorkspaceShowContext } from '@/Pages/Workspaces/Show'
import { useForm } from '@inertiajs/react'
import { useContext } from 'react'
import { Button } from '../Ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../Ui/dialog'
import { Input } from '../Ui/input'

type Props = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

type FormType = {
  name: string
}

export default function ({ isOpen, setIsOpen }: Props) {
  const { workspace } = useContext(WorkspaceShowContext)
  const { data, setData, errors, processing, post, reset } = useForm<FormType>({
    name: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s+/g, '-').toLowerCase()

    setData('name', value)
  }

  const handleClose = () => {
    setIsOpen(false)
    reset()
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    post(route('workspaces.channels.store', workspace.id), {
      onSuccess: () => {
        handleClose()
      },
    })
  }

  // TODO: Implement input errors

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a channel</DialogTitle>
        </DialogHeader>

        <form className='space-y-4' onSubmit={handleSubmit}>
          <Input
            value={data.name}
            onChange={e => handleChange(e)}
            required
            autoFocus
            minLength={3}
            maxLength={80}
            placeholder='e.g. plan-budget'
          />

          <div className='flex justify-end'>
            <Button isLoading={processing}>Create</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
