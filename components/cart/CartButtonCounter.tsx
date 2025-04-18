'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

import { QueryCartItem } from '@/app/api/query-cart-item'
import { Button } from '@/components/ui/button'
import { Minus, Plus } from 'lucide-react'

export default function CartButtonCounter({
	quantity,
	id,
	cartId,
}: {
	quantity: number
	id: number
	cartId: number
}) {
	const [countItem, setCountItem] = useState(quantity)
	const queryClient = useQueryClient()
	const { mutate } = useMutation({
		mutationKey: ['change-quantity-item', id, cartId],
		mutationFn: () => QueryCartItem.changeQuantity(id, cartId, countItem),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['cart-id'],
			})
		},
	})

	const handlePlusQuantity = () => {
		setCountItem(countItem + 1)
		mutate()
	}
	const handleMinusQuantity = () => {
		setCountItem(countItem - 1)
		mutate()
	}

	return (
		<div className={'flex items-center gap-x-1  select-none '}>
			<Button
				type='button'
				disabled={countItem === 1}
				className={
					' py-0.5 px-2 h-8  group-hover:hover:text-primary  group-hover:text-white group-hover:border-white'
				}
				variant={'outline'}
				onClick={handleMinusQuantity}
			>
				<Minus strokeWidth={3} size={16} />
			</Button>
			<b className={'w-[30px] flex justify-center items-center select-none'}>
				{' '}
				{countItem}
			</b>
			<Button
				type='button'
				disabled={countItem === 10}
				className={
					' py-0.5 px-2 h-8 group-hover:hover:text-primary  group-hover:text-white group-hover:border-white'
				}
				variant={'outline'}
				onClick={handlePlusQuantity}
			>
				<Plus strokeWidth={3} size={16} />
			</Button>
		</div>
	)
}
