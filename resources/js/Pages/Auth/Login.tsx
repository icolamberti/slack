import InputCheckbox from '@/Components/Forms/InputCheckbox'
import InputPassword from '@/Components/Forms/InputPassword'
import InputText from '@/Components/Forms/InputText'
import { Button } from '@/Components/Ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/Ui/card'
import { Separator } from '@/Components/Ui/separator'
import GuestLayout from '@/Layouts/GuestLayout'
import { Link, useForm } from '@inertiajs/react'
import { FormEventHandler } from 'react'
import { FaFacebook } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'

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
          <CardTitle>Sign in</CardTitle>
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

            <InputPassword
              name='password'
              label='Password'
              value={data.password}
              onChange={event => setData('password', event.target.value)}
              errorMessage={errors.password}
              required
            />

            <div className='flex items-center justify-between text-xs'>
              <InputCheckbox
                name='remember'
                value='remember'
                label='Remember me'
                onChange={() => setData('remember', !data.remember)}
                checked={data.remember}
                className='pl-1'
              />

              <Link href={route('password.request')}>
                <Button
                  variant={'link'}
                  size={'link'}
                  className='text-xs'
                  type='button'
                >
                  Forgot your password?
                </Button>
              </Link>
            </div>

            <Button
              type='submit'
              className='mt-5 w-full'
              size={'lg'}
              isLoading={processing}
            >
              Login
            </Button>
          </form>

          <div className='flex items-center gap-3 text-xs text-gray-400'>
            <Separator className='flex-1' />
            or login with
            <Separator className='flex-1' />
          </div>

          <div className='grid grid-cols-2 gap-2.5'>
            <a href={route('auth.google')}>
              <Button
                onClick={() => {}}
                variant={'outline'}
                size={'lg'}
                className='w-full'
                type='button'
              >
                <FcGoogle />
                Google
              </Button>
            </a>

            <a href={route('auth.facebook')}>
              <Button
                onClick={() => {}}
                variant={'outline'}
                size={'lg'}
                className='w-full'
                type='button'
              >
                <FaFacebook className='text-blue-600' />
                Facebook
              </Button>
            </a>
          </div>

          <p className='mt-3 text-center text-xs text-muted-foreground'>
            Don't have an account?{' '}
            <Link href={route('register')}>
              <Button
                variant={'link'}
                size={'link'}
                className='text-xs'
                type='button'
              >
                Register here
              </Button>
            </Link>
          </p>
        </CardContent>
      </Card>
    </GuestLayout>
  )
}
