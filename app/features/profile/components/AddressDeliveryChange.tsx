'use client'

import { RadioGroup } from '@/components/ui/radio-group'
import { IDeliveryAddress } from '@/interface/interface-delivery-address'
import useChangeDefaultAddress from '../hooks/useChangeDefaultAddress'
import FormAddress from './FormAddress'
function AddressDeliveryChange({
	addressArray,
}: {
	addressArray: IDeliveryAddress[]
}) {
	const { mutate: changeDefault } = useChangeDefaultAddress()

	const changeDefaultAddress = (id: string) => {
		changeDefault(Number(id))
	}
	const addressDefault = addressArray?.find(
		address => address.isDefault === true
	)

	return (
		<div className=''>
			<RadioGroup
				onValueChange={data => changeDefaultAddress(data)}
				defaultValue={String(addressDefault?.id)}
			>
				{addressArray.map(address => (
					<FormAddress address={address} key={address.id} />
				))}
			</RadioGroup>
		</div>
	)
}

export default AddressDeliveryChange
