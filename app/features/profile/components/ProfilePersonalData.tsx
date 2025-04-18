'use client'

import { InputPhone } from '@/components/InputPhone'
import { InputCustom } from '@/components/shared/InputCustom'
import { Title } from '@/components/shared/Title'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'

import { zodResolver } from '@hookform/resolvers/zod'
import { MouseEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
	ProfileSchema,
	TypeProfileSchema,
} from '../../auth/schemes/profile.schema'
import useUpdateProfile from '../hooks/useUpdateProfile'
import { IUser } from '../../auth/types'

function ProfilePersonalData({ user }: { user: IUser | null | undefined }) {
	const [isPhone, setIsPhone] = useState(true)

	const { mutate, isPending, isSuccess } = useUpdateProfile()
	const form = useForm<TypeProfileSchema>({
		resolver: zodResolver(ProfileSchema),
		defaultValues: {
			email: user?.email,
			fullName: user?.fullName,
			phone: Number(user?.phone),
		},
	})
	const onSubmit = (data: TypeProfileSchema) => {
		mutate(data)
		if (isSuccess) {
			setIsPhone(true)
		}
	}

	useEffect(() => {
		form.reset({
			email: user?.email,
			fullName: user?.fullName,
			phone: Number(user?.phone),
		})
	}, [user])

	return (
		<Form {...form}>
			<form
				className='flex flex-col gap-y-3 px-3 pb-3'
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<div className='pt-3'>
					<Title text='Личные данные' size='md' />
					<div className='max-w-[300px] pt-5 flex flex-col gap-y-3'>
						<FormField
							control={form.control}
							name='fullName'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Имя</FormLabel>
									<FormControl>
										<InputCustom disabled={true} type='text' {...field} />
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
										<InputCustom disabled={true} type='text' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className='flex items-end gap-x-3'>
						<FormField
							control={form.control}
							name='phone'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<InputPhone
											onValueInputChange={field.onChange}
											disabled={isPhone}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{!isPhone ? (
							<Button type='submit'>Сохранить</Button>
						) : (
							<Button
								type='button'
								onClick={(e: MouseEvent<HTMLButtonElement>) => {
									e.preventDefault()
									setIsPhone(false)
								}}
							>
								{!user?.phone ? 'Добавить' : 'Изменить'}
							</Button>
						)}
					</div>
				</div>
			</form>
		</Form>
	)
}

export default ProfilePersonalData
