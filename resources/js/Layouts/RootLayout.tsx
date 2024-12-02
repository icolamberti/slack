import { Toaster } from '@/Components/Ui/sonner'
import { usePage } from '@inertiajs/react'
import { PropsWithChildren, useEffect } from 'react'
import { toast } from 'sonner'

export default function ({ children }: PropsWithChildren) {
  const { flash } = usePage().props

  useEffect(() => {
    if (!flash) return

    if (flash.success) {
      toast.success(flash.success)
    } else if (flash.error) {
      toast.error(flash.success)
    } else if (flash.status) {
      toast.info(flash.status)
    }
  }, [flash])

  return (
    <div className='h-svh'>
      {children}

      <Toaster />
    </div>
  )
}
