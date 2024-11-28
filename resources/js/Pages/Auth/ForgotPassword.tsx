import InputText from '@/Components/Forms/InputText'
import { Button } from '@/Components/Ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/Components/Ui/card'
import GuestLayout from '@/Layouts/GuestLayout'
import { Link, useForm } from '@inertiajs/react'
import { FormEventHandler } from 'react'

type FormType = {
  email: string
  password: string
  remember: boolean
}

export default function () {
  const { data, setData, post, errors, processing } = useForm<FormType>({
    email: '',
    password: '',
    remember: false,
  })

  const onSubmit: FormEventHandler = event => {
    event.preventDefault()

    post('')
  }

  return (
    <GuestLayout>
      <Card className='h-full w-full p-8'>
        <CardHeader className='px-0 pt-0'>
          <CardTitle>Forgot password</CardTitle>

          <CardDescription>
            No worries! Enter your email address below, and we'll send you a
            link to reset your password.
          </CardDescription>
        </CardHeader>

        <CardContent className='flex flex-col gap-5 px-0 pb-0'>
          <form className='flex flex-col gap-2' onSubmit={onSubmit}>
            <InputText
              name='email'
              label='Email'
              value={data.email}
              onChange={event => setData('email', event.target.value)}
              errorMessage={errors.email}
              isFocused
              required
            />

            <Button
              type='submit'
              className='mt-5 w-full'
              size={'lg'}
              isLoading={processing}
            >
              Submit
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
