'use client'

import { URL_API } from '@/constants'
import { ICartItem } from '@/interface/interface-cart-item'
import { IProductsSub } from '@/interface/interface-product-variant'
import { PriceCalcService } from '@/services/price-calc-service'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import CartButtonCounter from './CartButtonCounter'
import CartButtonDelete from './CartButtonDelete'

function CartItemCardHalf({ data }: { data: ICartItem }) {
	const getPriceItem = PriceCalcService(data)
	const [leftHalf, setLeftHalf] = useState<IProductsSub>()
	const [rightHalf, setRightHalf] = useState<IProductsSub>()
	useEffect(() => {
		setLeftHalf(data.cartSubProduct.find(product => product.index === 0))
		setRightHalf(data.cartSubProduct.find(product => product.index === 1))
	}, [data])

	return (
		<div className='relative  '>
			<div className={'absolute top-1 right-1  bg-transparent'}>
				<CartButtonDelete id={data.id} />
			</div>
			<div className='flex items-start gap-x-2'>
				<div className={'relative min-w-[60px] h-[60px]'}>
					<Image
						className='absolute left-0 top-0 object-cover object-left w-[30px] h-[60px]'
						alt={leftHalf?.product.name ?? ''}
						src={`${URL_API}/${leftHalf?.variant.image}`}
						width={60}
						height={60}
					/>
					<Image
						className='absolute right-0 top-0 object-cover object-right w-[30px] h-[60px] z-10'
						alt={rightHalf?.product.name ?? ''}
						src={`${URL_API}/${rightHalf?.variant.image}`}
						width={60}
						height={60}
					/>
				</div>
				<div className='flex flex-col'>
					<h3 className={'font-bold flex gap-x-1'}>
						{leftHalf?.product.name} + {rightHalf?.product.name}
					</h3>
					<p
						className={
							'flex items-center gap-x-1 dark:text-gray-200 text-black/60 text-sm'
						}
					>
						<span>{leftHalf?.size.proportion.value}</span>
						<span>
							{leftHalf?.variant.productAttribute.variantTypesId &&
								leftHalf?.variant.productAttribute.variantTypes.value}
						</span>
						{Number(leftHalf?.size.weight) > 0 && (
							<span>{leftHalf?.size.weight} г</span>
						)}
					</p>
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
