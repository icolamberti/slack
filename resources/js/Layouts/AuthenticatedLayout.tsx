import { PropsWithChildren } from 'react'
import RootLayout from './RootLayout'

export default function ({ children }: PropsWithChildren) {
  return (
    <RootLayout>
      <div className='flex h-full items-center justify-center bg-[#5c3b58]'>
        <div className='md:h-auto md:w-[420px]'>{children}</div>
      </div>
    </RootLayout>
  )
}
