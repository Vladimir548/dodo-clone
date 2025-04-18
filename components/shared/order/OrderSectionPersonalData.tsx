'use client'

import { IUser } from '@/app/features/auth/types'
import { InputCustom } from '@/components/shared/InputCustom'
import { Title } from '@/components/shared/Title'
import {
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form'
import { IOrder } from '@/interface/interface-order'
import { useEffect } from 'react'
import { Control, FieldValues, Path, SetValueConfig } from 'react-hook-form'
import { PatternFormat } from 'react-number-format'

interface IProps<T extends FieldValues> {
	control: Control<T>
	fieldFirstName: Path<T>
	fieldPhone: Path<T>
	fieldEmail: Path<T>
	data: IUser
	setValue: (name: string, value: unknown, config?: SetValueConfig) => void
}

export default function OrderSectionPersonalData<T extends FieldValues>({
	fieldEmail,
	fieldPhone,
	fieldFirstName,
	data,
	setValue,
	control,
}: IProps<T>) {
	useEffect(() => {
		setValue(fieldEmail, data.email)
		setValue(fieldPhone, data.phone)
		setValue(fieldFirstName, data.fullName)
	}, [data, fieldEmail, fieldPhone, fieldFirstName])

	return (
		<div className={'border border-primary rounded-md p-3 '}>
			<div className={'border-b border-gray-500 py-2'}>
				<Title className={'font-bold'} text={'2. Персональная информация'} />
			</div>
			<div className='flex flex-col gap-y-2 pt-2'>
				<div className={'flex items-center gap-x-3'}>
					<FormField
						rules={{ required: 'Это поле обязательно к заполнению' }}
						control={control}
						name={fieldFirstName}
						render={({ field }) => {
							return (
								<FormItem>
									<FormControl>
										<InputCustom
											required={true}
											onChange={field.onChange}
											value={field.value}
											className={'w-[350px]'}
											label={'Имя'}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)
						}}
					/>
				</div>
				<div className={'flex items-center gap-x-3'}>
					<FormField
						rules={{ required: 'Это поле обязательно к заполнению' }}
						control={control}
						name={fieldPhone}
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<PatternFormat
										className={'w-[350px]'}
										onValueChange={values =>
											field.onChange(Number(values.floatValue))
										}
										customInput={InputCustom}
										defaultValue={data.phone}
										label={'Номер телефона'}
										allowEmptyFormatting
										mask='_'
										format='+# (###) ###-##-##'
										value={field.value}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						rules={{ required: 'Это поле обязательно к заполнению' }}
						control={control}
						name={fieldEmail}
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<InputCustom
										required={true}
										onChange={field.onChange}
										value={field.value}
										className={'w-[350px]'}
										label={'Email'}
										type={'email'}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
			</div>
		</div>
	)
}
