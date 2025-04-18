'use client'

import { ICartItem } from '@/interface/interface-cart-item'
import { IProductsSub } from '@/interface/interface-product-variant'
import { useEffect, useState } from 'react'
function HalfName({ data }: { data: ICartItem }) {
	const [leftHalf, setLeftHalf] = useState<IProductsSub>()
	const [rightHalf, setRightHalf] = useState<IProductsSub>()
	useEffect(() => {
		setLeftHalf(data.cartSubProduct.find(product => product.index === 0))
		setRightHalf(data.cartSubProduct.find(product => product.index === 1))
	}, [data])
	return (
		<h3 className={'font-bold flex gap-x-1'}>
			{leftHalf?.product.name} + {rightHalf?.product.name}
		</h3>
	)
}

export default HalfName
