'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

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
import { useNewPasswordAuth } from '../hooks/useNewPassword'
import { NewPasswordSchema, type TypeNewPasswordSchema } from '../schemes'
import AuthWrapper from './AuthWrapper'

export function NewPasswordForm() {
	const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null)

	const form = useForm<TypeNewPasswordSchema>({
		resolver: zodResolver(NewPasswordSchema),
		defaultValues: {
			password: '',
		},
	})

	const { mutate, isPending } = useNewPasswordAuth()

	const onSubmit = (data: TypeNewPasswordSchema) => {
		if (recaptchaValue) {
			mutate({ body: data, recaptcha: recaptchaValue })
		} else {
			toast.error('Пожалуйста, завершите reCAPTCHA')
		}
	}

	return (
		<AuthWrapper
			heading='Новый пароль'
			description='Придумайте новый пароль для вашего аккаунта'
			backButtonLabel='Войти в аккаунт'
			backButtonHref='/auth/login'
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='grid gap-2 space-y-2'
				>
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Пароль</FormLabel>
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
					<FormField
						control={form.control}
						name='passwordRepeat'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Повторите пароль</FormLabel>
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
					<div className='flex justify-center'>
						<ReCAPTCHA
							sitekey={process.env.GOOGLE_RECAPTCHA_SITE_KEY as string}
							onChange={setRecaptchaValue}
						/>
					</div>
					<Button type='submit' disabled={isPending}>
						Продолжить
					</Button>
				</form>
			</Form>
		</AuthWrapper>
	)
}
