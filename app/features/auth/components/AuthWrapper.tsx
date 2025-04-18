'use client'

import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import Link from 'next/link'
import { PropsWithChildren } from 'react'
import AuthSocial from './AuthSocial'

interface IAuthWrapper {
	heading: string
	description?: string
	backButtonLabel?: string
	backButtonHref?: string
	isShowSocial?: boolean
}

function AuthWrapper({
	heading,
	backButtonHref,
	backButtonLabel,
	children,
	description,
	isShowSocial = false,
}: PropsWithChildren<IAuthWrapper>) {
	return (
		<Card className='w-[400px] mx-auto dark:bg-transparent dark:text-white dark:dark:border-primary/30 mt-2 '>
			<CardHeader className='space-y-2'>
				<CardTitle>{heading}</CardTitle>
				{description && (
					<CardDescription className='dark:text-white/70'>
						{description}
					</CardDescription>
				)}
			</CardHeader>
			<CardContent>
				{isShowSocial && <AuthSocial />}
				{children}
			</CardContent>
			<CardFooter>
				{backButtonLabel && backButtonHref && (
					<Button variant='link' className='w-full font-normal'>
						<Link href={backButtonHref}>{backButtonLabel}</Link>
					</Button>
				)}
			</CardFooter>
		</Card>
	)
}

export default AuthWrapper
