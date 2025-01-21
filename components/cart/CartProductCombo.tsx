'use client'

import { ICartItem } from '@/interface/interface-cart-item'
import { useEffect, useMemo, useState } from 'react'

interface ICustomItem {
	name: string
	proportion: string
	variant: string
	weight: number
}

function CartProductCombo({ products }: { products: ICartItem }) {
	const [customItem, setCustomItem] = useState<ICustomItem[]>([])
	const data = useMemo(() => {
		return products.productVariant.subProduct.map((product, index) => ({
			...product,
			index,
		}))
	}, [products.productVariant.subProduct])
	useEffect(() => {
		const updatedCustomItem: ICustomItem[] = data.map(product => {
			if (products.cartSubProduct.some(item => item.index === product.index)) {
				const findProduct = products.cartSubProduct.find(
					item => item.index === product.index
				)
				return {
					name: findProduct?.product.name,
					variant: findProduct?.variant?.productAttribute?.variantTypes?.value,
					proportion: findProduct?.size?.proportion?.value,
					weight: findProduct?.size.weight,
				}
			} else {
				return {
					name: product?.product.name,
					variant: product?.variant?.productAttribute?.variantTypes?.value,
					proportion: product?.size.proportion.value,
					weight: product?.size.weight,
				}
			}
		})
		setCustomItem([...updatedCustomItem.flat()])
	}, [products])

	return (
		<ul className='flex flex-col gap-y-2'>
			{customItem?.map((product, index) => (
				<li key={index}>
					<h3 className='text-black dark:text-white'> {product.name}</h3>
					<div className='flex items-center gap-x-1 text-xs'>
						<span>{product.proportion}</span>
						<span>{product.variant}</span>
						{Number(product.weight) > 0 && <span>{product.weight} г</span>}
					</div>
				</li>
			))}
		</ul>
	)
}

export default CartProductCombo
