'use client'

import CartItemCard from '@/components/cart/CartItemCard'
import { Skeleton } from '@/components/ui/skeleton'
import { ICartItemResponse } from '@/interface/interface-cart-item'

export default function CartItemList({
	items,
	isPending,
}: {
	items: ICartItemResponse
	isPending: boolean
}) {
	console.log('items', items)
	return (
		<ul className={'flex flex-col gap-y-2 '}>
			{!isPending ? (
				<>
					{items?.map(item => (
						<CartItemCard key={item.id} data={item} />
					))}
				</>
			) : (
				<Skeleton count={5} className={'w-full h-[110px]'} />
			)}
		</ul>
	)
}
