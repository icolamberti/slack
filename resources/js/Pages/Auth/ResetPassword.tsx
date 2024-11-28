import InputPassword from '@/Components/Forms/InputPassword'
import { Button } from '@/Components/Ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/Ui/card'
import GuestLayout from '@/Layouts/GuestLayout'
import { Link, useForm } from '@inertiajs/react'
import { FormEventHandler } from 'react'

type FormType = {
  token: string
  email: string
  password: string
  password_confirmation: string
}

export default function ({ token, email }: { token: string; email: string }) {
  const { data, setData, post, errors, processing, reset } = useForm<FormType>({
    token: token,
    email: email,
    password: '',
    password_confirmation: '',
  })

  const onSubmit: FormEventHandler = event => {
    event.preventDefault()

    post(route('password.store'), {
      onFinish: () => reset('password', 'password_confirmation'),
    })
  }

  return (
    <GuestLayout>
      <Card className='h-full w-full p-8'>
        <CardHeader className='px-0 pt-0'>
          <CardTitle>Reset your password</CardTitle>
        </CardHeader>

        <CardContent className='flex flex-col gap-5 px-0 pb-0'>
          <form className='flex flex-col gap-2' onSubmit={onSubmit}>
            <InputPassword
              name='password'
              label='New password'
              value={data.password}
              onChange={event => setData('password', event.target.value)}
              errorMessage={errors.password}
              isFocused
              required
            />

            <InputPassword
              name='password_confirmation'
              label='Confirm the new password'
              value={data.password_confirmation}
              onChange={event =>
                setData('password_confirmation', event.target.value)
              }
              errorMessage={errors.password_confirmation}
              required
            />

            <Button
              type='submit'
              className='mt-5 w-full'
              size={'lg'}
              isLoading={processing}
            >
              Reset
            </Button>
          </form>

          <p className='mt-3 text-center text-xs text-muted-foreground'>
            Remembered the password?{' '}
            <Link href={route('login')}>
              <Button variant={'link'} size={'link'} className='text-xs'>
                Login here
              </Button>
            </Link>
          </p>
        </CardContent>
      </Card>
    </GuestLayout>
  )
}
