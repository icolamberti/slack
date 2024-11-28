import { Button } from '@/Components/Ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/Ui/card'
import GuestLayout from '@/Layouts/GuestLayout'
import { Link, useForm } from '@inertiajs/react'
import { FormEventHandler } from 'react'

export default function () {
  const { post, processing } = useForm()

  const submit: FormEventHandler = e => {
    e.preventDefault()

    post(route('verification.send'))
  }

  return (
    <GuestLayout>
      <Card className='h-full w-full p-8'>
        <CardHeader className='px-0 pt-0'>
          <CardTitle>Thanks for signup!</CardTitle>
        </CardHeader>

        <CardContent className='flex flex-col gap-5 px-0 pb-0'>
          <p className='text-sm text-muted-foreground'>
            Before getting started, could you verify your email address by
            clicking on the link we just emailed to you? If you didn't receive
            the email, we will gladly send you another.
          </p>

          <form onSubmit={submit}>
            <Button
              type='submit'
              className='mt-5 w-full'
              size={'lg'}
              isLoading={processing}
            >
              Resend verification email
            </Button>
          </form>

          <p className='mt-3 text-center text-xs text-muted-foreground'>
            <Link href={route('logout')} method='post'>
              <Button variant={'link'} size={'link'} className='text-xs'>
                Logout
              </Button>
            </Link>
          </p>
        </CardContent>
      </Card>
    </GuestLayout>
  )
}
