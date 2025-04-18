'use client'

import { QueryDeliveryAddress } from '@/app/api/query-delivery-address'
import DialogCustom from '@/components/shared/DialogCustom'
import { Title } from '@/components/shared/Title'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useQuery } from '@tanstack/react-query'
import AddressDeliveryChange from './AddressDeliveryChange'
import AddressDeliveryCreate from './AddressDeliveryCreate'

function ProfileAddressDelivery() {
	const { data } = useQuery({
		queryKey: ['user delivery address'],
		queryFn: () => QueryDeliveryAddress.all(),
	})
	const addressDefault = data?.find(address => address.isDefault === true)

	if (!data) return null
	return (
		<div className=''>
			<div className='flex gap-x-3'>
				<Title text='Адрес доставки (по умолчанию)' size='md' />
				<DialogCustom
					classContent='max-w-[800px] max-h-[95%]  rounded-md bg-white dark:bg-dark-background'
					trigger={<Button variant={'without'}>Изменить</Button>}
					content={<AddressDeliveryChange addressArray={data} />}
				/>
			</div>
			<div className='max-w-[450px] pt-2 flex gap-x-3'>
				<Input
					value={addressDefault?.address ?? 'Адрес доставки не заполнен'}
				/>
				<DialogCustom
					classContent='max-w-[500px] max-h-[95%]  rounded-md bg-white dark:bg-dark-background'
					trigger={<Button>Добавить</Button>}
					content={<AddressDeliveryCreate isDefaultProps={!data?.length} />}
				/>
			</div>
		</div>
	)
}

export default ProfileAddressDelivery
