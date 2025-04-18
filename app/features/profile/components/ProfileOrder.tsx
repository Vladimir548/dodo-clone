'use client'

import { Title } from '@/components/shared/Title'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import useOrderData from '../hooks/useOrderData'
import OrderCard from './OrderCard'

function ProfileOrder() {
	const { data, isPending } = useOrderData()
	return (
		<div className=''>
			<div className='flex items-center gap-x-3'>
				<Title text='Заказы' size='md' />
				<Link href={'profile/orders'}>
					<Button variant={'link'}>Посмотреть все</Button>
				</Link>
			</div>
			{data?.length ? (
				<div className='grid grid-cols-3 gap-x-3'>
					{data.slice(0, 3).map(item => (
						<OrderCard key={item.id} order={item} />
					))}
				</div>
			) : (
				<div className='w-full items-center justify-center'>
					Вы еще ничего не заказали
				</div>
			)}
		</div>
	)
}

export default ProfileOrder
