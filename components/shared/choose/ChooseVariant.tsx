'use client'

import CarouselVariant from '@/components/CarouselVariant'
import { IProduct } from '@/interface/interface-product'
import { ProductService } from '@/services/product.service'
import { useEffect, useState } from 'react'
interface IChooseVariant {
	data?: IProduct
	defaultVariantProps?: number
	setSelectVariant?: (variant: number) => void
}
function ChooseVariant({
	data,
	defaultVariantProps,
	setSelectVariant,
}: IChooseVariant) {
	const [selectedVariant, setSelectedVariant] = useState<number>()

	const defaultVariant = ProductService.setDefaultVariantProduct(data)

	useEffect(() => {
		if (setSelectVariant && selectedVariant) {
			setSelectVariant(selectedVariant)
		}
	}, [selectedVariant])

	useEffect(() => {
		if (defaultVariantProps) return setSelectedVariant(defaultVariantProps)

		setSelectedVariant(defaultVariant)
	}, [data])

	return (
		<>
			<CarouselVariant
				selectedVariant={selectedVariant}
				setSelectedVariant={setSelectedVariant}
				data={data?.productVariant.map(variant => ({
					name: variant.productAttribute.name,
					value: variant.productAttribute.id,
					disabled: variant.sizes.length === 0,
				}))}
			/>
		</>
	)
}

export default ChooseVariant
