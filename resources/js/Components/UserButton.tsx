import { Link, usePage } from '@inertiajs/react'
import { LogOut } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './Ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './Ui/dropdown-menu'

export default function () {
  const { user } = usePage().props.auth

  const avatarFallback = user.name.charAt(0).toUpperCase()

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className='relative outline-none'>
        <Avatar className='size-10 rounded-md transition hover:opacity-75'>
          <AvatarImage
            src={user.avatar}
            alt={user.name}
            className='rounded-md'
          />

          <AvatarFallback className='rounded-md bg-sky-500 text-xs text-white'>
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='center' side='right' className='w-60'>
        <Link
          href={route('logout')}
          method='post'
          as='button'
          className='w-full'
        >
          <DropdownMenuItem className='h-10 cursor-pointer'>
            <LogOut className='mr-2 size-4' />
            Logout
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
