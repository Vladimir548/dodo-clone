'use client'

import { URL_API } from '@/constants'
import { ICartItem } from '@/interface/interface-cart-item'
import { IProductsSub } from '@/interface/interface-product-variant'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

interface HalfImageProps extends React.HTMLAttributes<HTMLDivElement> {
	data: ICartItem
}

function useHalf(data: ICartItem) {
	const [leftHalf, setLeftHalf] = useState<IProductsSub>()
	const [rightHalf, setRightHalf] = useState<IProductsSub>()
	useEffect(() => {
		setLeftHalf(data.cartSubProduct.find(product => product.index === 0))
		setRightHalf(data.cartSubProduct.find(product => product.index === 1))
	}, [data])

	return {
		leftHalf,
		rightHalf,
	}
}

const HalfImage = React.forwardRef<HTMLDivElement, HalfImageProps>(
	({ data }, ref) => {
		const { leftHalf, rightHalf } = useHalf(data)

		return (
			<div ref={ref} className=''>
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
			</div>
		)
	}
)
HalfImage.displayName = 'HalfImage'

const HalfName = React.forwardRef<HTMLDivElement, HalfImageProps>(
	({ data }, ref) => {
		const { leftHalf, rightHalf } = useHalf(data)

		return (
			<h3 ref={ref} className={'font-bold flex gap-x-1'}>
				{leftHalf?.product.name} + {rightHalf?.product.name}
			</h3>
		)
	}
)
HalfName.displayName = 'HalfName'

const HalfProperties = React.forwardRef<HTMLDivElement, HalfImageProps>(
	({ data }, ref) => {
		const { leftHalf } = useHalf(data)

		return (
			<p
				ref={ref}
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
		)
	}
)
HalfProperties.displayName = 'HalfProperties'

export { HalfImage, HalfName, HalfProperties }
