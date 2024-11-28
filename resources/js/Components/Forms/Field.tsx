export default function ({ children }: { children: React.ReactNode }) {
  return (
    <div className='relative flex w-full flex-col items-start gap-1'>
      {children}
    </div>
  )
}
