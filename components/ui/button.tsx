import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
	'inline-flex items-center justify-center whitespace-nowrap rounded-md  text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
	{
		variants: {
			variant: {
				default: 'bg-primary text-primary-foreground hover:bg-primary/90',
				destructive: 'bg-red-600 text-white hover:bg-red-600/90',
				outline:
					'border border-primary text-primary bg-transparent hover:bg-primary hover:text-white',
				secondary: 'bg-secondary text-primary hover:bg-secondary/50',
				ghost: 'hover:bg-secondary hover:text-secondary-foreground',
				link: 'text-primary underline-offset-4 hover:underline',
				create:
					'text-green-600 border border-green-600 hover:bg-green-600 hover:text-white',
				editing:
					'text-yellow-600 border border-yellow-600 hover:bg-yellow-600 hover:text-white',
				without: '',
			},
			radius: {
				md: 'rounded-md',
				sm: 'rounded-sm',
				lg: 'rounded-lg',
				xl: 'rounded-xl',
			},
			size: {
				default: 'h-10 px-4 py-2',
				sm: 'h-9 rounded-md px-3',
				lg: 'h-11 rounded-md px-8',
				icon: 'h-10 w-10',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	}
)

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'button'
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		)
	}
)
Button.displayName = 'Button'

export { Button, buttonVariants }
