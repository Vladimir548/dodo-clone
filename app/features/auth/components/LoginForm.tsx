'use client'

import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useLoginAuth } from '../hooks/useLoginAuth'
import { LoginSchema, TypeLoginSchema } from '../schemes'
import AuthWrapper from './AuthWrapper'

function LoginForm() {
	const { theme } = useTheme()
	const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null)
	const form = useForm<TypeLoginSchema>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: '',
			password: '',
			code: '',
		},
	})

	const { mutate, isPending } = useLoginAuth()
	const onSubmit = (data: TypeLoginSchema) => {
		if (recaptchaValue) {
			mutate({ body: data, recaptcha: recaptchaValue })
		} else {
			toast('Пожалуйста, пройдите Recaptcha')
		}
	}

	return (
		<AuthWrapper
			heading='Войти'
			description='Чтобы войти на сайт введите ваш email и пароль'
			backButtonLabel='Еще нет аккаунта? Регистрация'
			backButtonHref='/auth/register'
			isShowSocial
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='grid gap-2 space-y-2'
				>
					<>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Почта</FormLabel>
									<FormControl>
										<Input
											placeholder='ivan@example.com'
											disabled={isPending}
											type='email'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<div className='flex items-center justify-between'>
										<FormLabel>Пароль</FormLabel>
										<Link
											href='/auth/reset-password'
											className='ml-auto inline-block text-sm underline'
										>
											Забыли пароль?
										</Link>
									</div>
									<FormControl>
										<Input
											placeholder='******'
											disabled={isPending}
											type='password'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</>

					<div className='flex justify-center min-h-[80px]'>
						<ReCAPTCHA
							theme={theme === 'light' ? 'light' : 'dark'}
							sitekey={process.env.GOOGLE_RECAPTCHA_SITE_KEY as string}
							onChange={setRecaptchaValue}
						/>
					</div>
					<Button type='submit' disabled={isPending}>
						Войти в аккаунт
					</Button>
				</form>
			</Form>
		</AuthWrapper>
	)
}

export default LoginForm
