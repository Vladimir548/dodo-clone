'use client'

import { InputAddress } from '@/components/InputAddress'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form'
import { RadioGroupItem } from '@/components/ui/radio-group'
import { IDeliveryAddress } from '@/interface/interface-delivery-address'
import { zodResolver } from '@hookform/resolvers/zod'
import { Trash } from 'lucide-react'
import { useForm } from 'react-hook-form'
import useDeleteAddress from '../hooks/useDeleteAddress'
import useUpdateDeliveryAddress from '../hooks/useUpdateDeliveryAddress'
import {
	DeliveryAddressCreateSchema,
	TypeDeliveryAddressCreateSchema,
} from '../schemas/delivery-addres-create.schema'

function FormAddress({ address }: { address: IDeliveryAddress }) {
	const form = useForm<TypeDeliveryAddressCreateSchema>({
		resolver: zodResolver(DeliveryAddressCreateSchema),
		defaultValues: {
			address: address.address,
		},
	})

	const { mutate: mutateDelete } = useDeleteAddress()
	const { mutate } = useUpdateDeliveryAddress()
	const watchAddress = form.watch('address')

	const changeAddress = (id: number, dto: TypeDeliveryAddressCreateSchema) => {
		mutate({ id, dto })
	}
	const deleteAddress = (id: number) => {
		mutateDelete(Number(id))
	}

	return (
		<Form {...form} key={address.id}>
			<form className='grid gap-y-4 '>
				<div className='flex items-end gap-x-3'>
					<RadioGroupItem value={String(address.id)} id={String(address.id)} />
					<FormField
						control={form.control}
						defaultValue={address.address}
						key={address.id}
						name='address'
						render={({ field }) => {
							return (
								<FormItem>
									<div className='flex items-center gap-x-3'>
										<FormControl className='flex flex-col'>
											<InputAddress
												containerClassName='w-[450px]'
												value={field.value}
												onChange={field.onChange}
												defaultAddress={address.address}
											/>
										</FormControl>
										<Button
											type='button'
											onClick={() =>
												changeAddress(address.id, {
													address: field.value,
													isDefault: address.isDefault,
												})
											}
											disabled={watchAddress === address.address}
											variant={'create'}
										>
											Обновить
										</Button>
										<Button
											type='button'
											onClick={() => deleteAddress(address.id)}
											variant={'destructive'}
										>
											<Trash />
										</Button>
									</div>
									<FormMessage />
								</FormItem>
							)
						}}
					/>
				</div>
			</form>
		</Form>
	)
}

export default FormAddress
