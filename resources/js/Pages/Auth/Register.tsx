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
  name: string
  email: string
  password: string
  password_confirmation: string
}

export default function () {
  const { data, setData, post, errors, processing } = useForm<FormType>({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  const onSubmit: FormEventHandler = event => {
    event.preventDefault()

    post('')
  }

  return (
    <GuestLayout>
      <Card className='h-full w-full p-8'>
        <CardHeader className='px-0 pt-0'>
          <CardTitle>Create your account</CardTitle>
        </CardHeader>

        <CardContent className='flex flex-col gap-5 px-0 pb-0'>
          <form className='flex flex-col gap-2' onSubmit={onSubmit}>
            <InputText
              name='name'
              label='Name'
              value={data.name}
              onChange={event => setData('name', event.target.value)}
              errorMessage={errors.name}
              isFocused
              required
            />

            <InputText
              name='email'
              label='Email'
              value={data.email}
              onChange={event => setData('email', event.target.value)}
              errorMessage={errors.email}
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

            <InputPassword
              name='password_confirmation'
              label='Confirm the password'
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
              Register
            </Button>
          </form>

          <div className='flex items-center gap-3 text-xs text-gray-400'>
            <Separator className='flex-1' />
            or continue with
            <Separator className='flex-1' />
          </div>

          <div className='grid grid-cols-2 gap-2.5'>
            <a href={route('auth.google')}>
              <Button
                onClick={() => {}}
                variant={'outline'}
                size={'lg'}
                className='w-full'
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
              >
                <FaFacebook className='text-blue-600' />
                Facebook
              </Button>
            </a>
          </div>

          <p className='mt-3 text-center text-xs text-muted-foreground'>
            Already have an account?{' '}
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
