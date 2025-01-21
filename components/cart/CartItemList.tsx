'use client'

import CartItemCard from '@/components/cart/CartItemCard'
import { Skeleton } from '@/components/ui/skeleton'
import { TypeProduct } from '@/interface/enums'
import { ICartItemResponse } from '@/interface/interface-cart-item'
import CartItemCardHalf from './CartItemCardHalf'

export default function CartItemList({
	items,
	isPending,
}: {
	items: ICartItemResponse
	isPending: boolean
}) {
	return (
		<ul className={'flex flex-col gap-y-2 '}>
			{!isPending ? (
				<>
					{items?.map((item, index) => (
						<li
							key={index}
							className='shadow-sm-card-dark rounded-md px-2 py-1 hover:shadow-sm-card-dark-inner cursor-pointer duration-300 ease-linear'
						>
							{item.product.type === TypeProduct.PIZZA_HALF && (
								<CartItemCardHalf key={item.id} data={item} />
							)}
							{item.product.type !== TypeProduct.PIZZA_HALF && (
								<CartItemCard key={item.id} data={item} />
							)}
						</li>
					))}
				</>
			) : (
				<Skeleton count={5} className={'w-full h-[110px]'} />
			)}
		</ul>
	)
}
