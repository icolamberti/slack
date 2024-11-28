import { Toaster } from '@/Components/Ui/sonner'
import { usePage } from '@inertiajs/react'
import { PropsWithChildren, useEffect } from 'react'
import { toast } from 'sonner'

export default function Guest({ children }: PropsWithChildren) {
  const { flash } = usePage().props

  console.log('flash', flash)

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
    <div className='flex h-svh items-center justify-center bg-[#5c3b58]'>
      <div className='md:h-auto md:w-[420px]'>{children}</div>

      <Toaster />
    </div>
  )
}
