'use client'

import OrderCard from '@/app/features/profile/components/OrderCard'
import useOrderData from '@/app/features/profile/hooks/useOrderData'
import { Title } from '@/components/shared/Title'

function Orders() {
	const { data, isPending } = useOrderData()
	return (
		<div className=''>
			<div className='flex items-center justify-center pb-3'>
				<Title text='Заказы' size='lg' />
			</div>
			{data?.length ? (
				<div className='grid grid-cols-3 gap-3'>
					{data.map(item => (
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

export default Orders
