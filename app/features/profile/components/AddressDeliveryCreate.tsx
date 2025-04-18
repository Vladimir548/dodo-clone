'use client'

import { InputAddress } from '@/components/InputAddress'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import useCreateDeliveryAddress from '../hooks/useCreateDeliveryAddress'
import {
	DeliveryAddressCreateSchema,
	TypeDeliveryAddressCreateSchema,
} from '../schemas/delivery-addres-create.schema'

function AddressDeliveryCreate({isDefaultProps} :{isDefaultProps?:boolean}) {
	const form = useForm<TypeDeliveryAddressCreateSchema>({
		resolver: zodResolver(DeliveryAddressCreateSchema),
		defaultValues: {
			address: '',
			isDefault: isDefaultProps ?? false,
		},
	})

	const { mutate, isPending } = useCreateDeliveryAddress()

	const onSubmit = (data: TypeDeliveryAddressCreateSchema) => {
		mutate(data)
	}
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='grid gap-y-4 '
			>
				<>
					<FormField
						control={form.control}
						name='address'
						render={({ field }) =>(
							<FormItem>
								<FormControl>
									<InputAddress value={field.value} onChange={field.onChange}  />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='isDefault'
						render={({ field }) => (
							<FormItem className='flex gap-x-2 items-center space-y-0'>
								<FormControl>
									<Checkbox disabled={isDefaultProps === true} checked={field.value} onCheckedChange={field.onChange} />
								</FormControl>
								<FormLabel className='mt-0 space-y-0'>Сделать по умолчанию</FormLabel>
								<FormMessage />
							</FormItem>
						)}
					/>
				</>
				<Button type='submit' disabled={isPending}>
					Создать
				</Button>
			</form>
		</Form>
	)
}

export default AddressDeliveryCreate
