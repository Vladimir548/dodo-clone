'use client'

import { ICartItem } from '@/interface/interface-cart-item'
import { PriceCalcService } from '@/services/price-calc-service'
import CartButtonCounter from './CartButtonCounter'
import CartButtonDelete from './CartButtonDelete'
import {
	HalfImage,
	HalfName,
	HalfProperties,
} from '../shared/halves/components/Half'

function CartItemCardHalf({ data }: { data: ICartItem }) {
	const getPriceItem = PriceCalcService(data)

	return (
		<div className='relative'>
			<div className={'absolute top-1 right-1  bg-transparent'}>
				<CartButtonDelete id={data.id} />
			</div>
			<div className='flex items-start gap-x-2'>
				<HalfImage data={data} />
				<div className='flex flex-col'>
					<h3 className={'font-bold flex gap-x-1'}>
						<HalfName data={data} />
					</h3>
					<HalfProperties data={data} />
				</div>
			</div>
			<div className={'flex items-center justify-between pt-2'}>
				<CartButtonCounter
					quantity={data.quantity}
					cartId={data.cartId}
					id={data.id}
				/>
				<span className={'flex items-center gap-x-2'}>
					Цена: <b className={'text-primary'}>{getPriceItem} ₽</b>
				</span>
			</div>
		</div>
	)
}

export default CartItemCardHalf
