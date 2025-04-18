'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
function AuthTabs() {
	const searchParams = useSearchParams()
	const pathname = usePathname()
	const { back, replace } = useRouter()
	const [type, setType] = useState(searchParams.get('type'))
	const onChangeTypeValue = (value: string) => {
		setType(value)
		replace(`?type=${value}`, { scroll: false })
	}

	useEffect(() => {
		setType(searchParams.get('type'))
	}, [searchParams])

	return (
		<Dialog open={pathname.includes('auth')} onOpenChange={() => back()}>
			<DialogContent
				className={
					'max-w-[500px] flex justify-center items-center rounded-md bg-white dark:bg-dark-background'
				}
			>
				<VisuallyHidden>
					<DialogHeader>
						<DialogTitle></DialogTitle>
						<DialogDescription></DialogDescription>
					</DialogHeader>
				</VisuallyHidden>
				<Tabs
					onValueChange={onChangeTypeValue}
					value={String(type)}
					defaultValue='login'
					className='w-[400px]'
				>
					<TabsList className={'grid w-full grid-cols-2'}>
						<TabsTrigger value='login'>Вход</TabsTrigger>
						<TabsTrigger value='register'>Регистрация</TabsTrigger>
					</TabsList>
					<TabsContent value='login'>
						<LoginForm />
					</TabsContent>
					<TabsContent value='register'>
						<RegisterForm />
					</TabsContent>
				</Tabs>
			</DialogContent>
		</Dialog>
	)
}

export default AuthTabs
