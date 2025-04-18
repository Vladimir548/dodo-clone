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
import { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useRegisterAuth } from '../hooks/useRegisterAuth'
import { RegisterSchema, TypeRegisterSchema } from '../schemes'
import AuthWrapper from './AuthWrapper'

function RegisterForm() {
	const { theme } = useTheme()
	const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null)
	const form = useForm<TypeRegisterSchema>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			passwordRepeat: '',
		},
	})
	const { mutate, isPending } = useRegisterAuth()
	const onSubmit = (data: TypeRegisterSchema) => {
		if (recaptchaValue) {
			mutate({ body: data, recaptcha: recaptchaValue })
			console.log('recaptchaValue', recaptchaValue)
		} else {
			toast('Пожалуйста, пройдите Recaptcha')
		}
	}

	return (
		<AuthWrapper
			heading='Регистрация'
			description='Чтобы войти на сайт введите ваш email и пароль'
			backButtonLabel='Уже есть аккаунт? Войти'
			backButtonHref='/auth/login'
			isShowSocial
		>
			<Form {...form}>
				<form
					className='grid gap-2 space-y-2'
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Имя</FormLabel>
								<FormControl>
									<Input {...field} placeholder='Иван' disabled={isPending} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Почта</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder='email@mail.com'
										disabled={isPending}
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
								<FormLabel>Пароль</FormLabel>
								<FormControl>
									<Input
										type='password'
										{...field}
										placeholder='********'
										disabled={isPending}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='passwordRepeat'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Повторите пароль</FormLabel>
								<FormControl>
									<Input
										type='password'
										{...field}
										placeholder='********'
										disabled={isPending}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className='flex justify-center min-h-[80px]'>
						<ReCAPTCHA
							theme={theme === 'light' ? 'light' : 'dark'}
							sitekey={process.env.GOOGLE_RECAPTCHA_SITE_KEY as string}
							onChange={setRecaptchaValue}
						/>
					</div>
					<Button disabled={isPending} type='submit'>
						Создать аккаунт
					</Button>
				</form>
			</Form>
		</AuthWrapper>
	)
}

export default RegisterForm
