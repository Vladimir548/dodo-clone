'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useTwoFactorAuth } from '../hooks/useTwoFactorAuth'

import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from '@/components/ui/input-otp'
import { REGEXP_ONLY_DIGITS } from 'input-otp'
import {
	TwoFactorSchema,
	TypeTwoFactorSchema,
} from '../schemes/two-factor.schema'
import AuthWrapper from './AuthWrapper'

function TwoFactorForm() {
	const { mutate, isPending } = useTwoFactorAuth()

	const form = useForm<TypeTwoFactorSchema>({
		resolver: zodResolver(TwoFactorSchema),
		defaultValues: {
			code: '',
		},
	})

	const onSubmit = (data: TypeTwoFactorSchema) => {
		mutate(data.code)
	}

	return (
		<AuthWrapper
			heading='Код подтверждения'
			description='Чтобы войти на сайт введите код подтверждения'
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<FormField
						control={form.control}
						name='code'
						render={({ field }) => (
							<FormItem className='flex justify-center'>
								<FormControl>
									<InputOTP
										{...field}
										maxLength={6}
										pattern={REGEXP_ONLY_DIGITS}
									>
										<InputOTPGroup>
											<InputOTPSlot index={0} />
											<InputOTPSlot index={1} />
											<InputOTPSlot index={2} />
											<InputOTPSlot index={3} />
											<InputOTPSlot index={4} />
											<InputOTPSlot index={5} />
										</InputOTPGroup>
									</InputOTP>
								</FormControl>
							</FormItem>
						)}
					/>
					<div className='flex justify-center my-3'>
						<Button className='border-white' type='submit' disabled={isPending}>
							Подтвердить
						</Button>
					</div>
				</form>
			</Form>
		</AuthWrapper>
	)
}

export default TwoFactorForm
