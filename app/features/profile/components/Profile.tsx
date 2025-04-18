'use client'

import Container from '@/components/shared/Container'

import useUserData from '../hooks/useUserData'
import ProfileAddressDelivery from './ProfileAddressDelivery'
import ProfileOrder from './ProfileOrder'
import ProfilePersonalData from './ProfilePersonalData'
import Logout from './Logout'

function Profile() {
	const { data } = useUserData()
	return (
		<Container className='relative'>
			<div className='absolute top-2 right-0'>
				<Logout />
			</div>
			<div className='flex flex-col gap-y-3'>
				<ProfilePersonalData user={data} />
				<ProfileAddressDelivery />
				<ProfileOrder />
			</div>
		</Container>
	)
}

export default Profile
