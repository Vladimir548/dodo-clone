'use client'

import { Title } from '@/components/shared/Title'
import { useLocalTimeZone } from '@/hooks/useLocalTimeZone'
import { IOrder } from '@/interface/interface-order'

interface IOrderCard {
	order: IOrder
}

function OrderCard({ order }: IOrderCard) {
	const { currentDate, currentTime } = useLocalTimeZone(order.createdAt)

	return (
		<div className='border-primary/60 border rounded-sm p-3'>
			<div className='flex items-center justify-between gap-x-2 border-b-primary/60'>
				<div className='flex items-center'>
					<Title text='Заказ №' size='xs' />
					<span>{order.id}</span>
				</div>
				<div className=''>
					<span>
						{currentDate} - {currentTime}
					</span>
				</div>
			</div>
			<div className=''>
				{order.items?.map((item, index) => (
					<div
						key={index}
						className='flex justify-between items-center border-b border-b-primary/60 last:border-b-0'
					>
						<div className='flex flex-col'>
							<Title
								text={`${item.product} ${
									item.productVariantName ? item.productVariantName : ''
								}`}
							/>
							<p className='flex items-center gap-x-1 text-secondary/70 flex-wrap'>
								<span>{item?.productVariant}</span>
								<span>{item?.size}</span>
								{item.weight && item.weight > 0 && (
									<span>{item?.weight} г</span>
								)}
								<span>{item?.ingredients}</span>
							</p>
						</div>
						{item.quantity > 1 && <div className=''>X{item.quantity}</div>}
					</div>
				))}
			</div>
			<div className='w-full flex flex-col  gap-x-3'>
				<p className=' gap-x-2'>
					<span>Адрес доставки:</span>
					<span className='pl-1'>{order.address}</span>
				</p>
				<div className='w-full flex justify-end pt-3 text-primary'>
					{order.totalAmount} ₽
				</div>
			</div>
		</div>
	)
}

export default OrderCard
