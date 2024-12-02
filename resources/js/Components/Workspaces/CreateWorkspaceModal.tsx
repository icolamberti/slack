import { useForm } from '@inertiajs/react'
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
  const { data, setData, errors, processing, post } = useForm<FormType>({
    name: '',
  })

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log('submit')
    e.preventDefault()

    post(route('workspaces.store'), {
      onSuccess: () => {
        handleClose()
      },
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a workspace</DialogTitle>
        </DialogHeader>

        <form className='space-y-4' onSubmit={handleSubmit}>
          <Input
            value={data.name}
            onChange={e => setData('name', e.target.value)}
            required
            autoFocus
            minLength={3}
            maxLength={255}
            placeholder="workspace name e.g. 'Work', 'Personal', 'Home\'"
          />

          <div className='flex justify-end'>
            <Button isLoading={processing}>Create</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
