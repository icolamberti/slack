import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/Lib/utils'
import Loader from '../Loader'

const buttonVariants = cva(
  'relative inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors outline-none focus:outline-none ring-0 focus:ring-0 disabled:pointer-events-none disabled:opacity-50 group',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground hover:bg-primary/90 stroke-primary-foreground',
        destructive:
          'bg-destructive text-destructive-foreground stroke-destructive-foreground hover:bg-destructive/90',
        success:
          'bg-success text-success-foreground stroke-success-foreground hover:bg-success/90',
        outline:
          'border border-input text-accent-foreground stroke-accent-foreground bg-background hover:border-primary',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-sky-700 underline-offset-4 hover:underline',
        transparent: 'bg-transparent hover:bg-accent/10 text-accent',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
        iconSm: 'h-8 w-8',
        link: 'p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
  children: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      children,
      isLoading = false,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isLoading}
        {...props}
      >
        <div
          className={cn(
            'flex items-center justify-center gap-2 group-disabled:opacity-50',
            isLoading ? 'text-transparent' : '',
          )}
        >
          {children}
        </div>

        {isLoading && (
          <span className='absolute left-1/2 top-1/2 h-full -translate-x-1/2 -translate-y-1/2 transform py-1'>
            <Loader className='h-full' />
          </span>
        )}
      </Comp>
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
