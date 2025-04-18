'use client'

import { InputAddress } from '@/components/InputAddress'
import { Title } from '@/components/shared/Title'
import { TextareaCustom } from '@/components/TextareaCustom'
import {
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form'
import { IDeliveryAddress } from '@/interface/interface-delivery-address'
import { useEffect } from 'react'
import { Control, FieldValues, Path, SetValueConfig } from 'react-hook-form'

interface IProps<T extends FieldValues> {
	control: Control<T>
	fieldAddress: Path<T>
	fieldComment: Path<T>
	arrayAddress: IDeliveryAddress[]
	setValue: (name: string, value: unknown, config?: SetValueConfig) => void
}

export default function OrderSectionAddressDelivery<T extends FieldValues>({
	fieldAddress,
	fieldComment,
	arrayAddress,
	control,
	setValue,
}: IProps<T>) {
	const defaultAddress = arrayAddress.find(
		address => address.isDefault === true
	)

	useEffect(() => {
		setValue(fieldAddress, defaultAddress?.address)
	}, [arrayAddress])

	return (
		<div className={'border border-primary rounded-md p-3 '}>
			<div className={'border-b border-gray-500 py-2'}>
				<Title className={'font-bold'} text={'3. Адрес доставки'} />
			</div>
			<div className={'pt-2'}>
				<div className={'flex flex-col gap-y-2'}>
					<FormField
						rules={{ required: 'Это поле обязательно к заполнению' }}
						control={control}
						name={fieldAddress}
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<InputAddress
										defaultAddress={defaultAddress?.address}
										onChange={field.onChange}
										value={field.value}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name={fieldComment}
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<TextareaCustom
										onChange={field.onChange}
										value={field.value}
										placeholder={
											'Укажите тут дополнительную информацию для курьера'
										}
										className={'w-full'}
										label={'Комментарий к заказу'}
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
