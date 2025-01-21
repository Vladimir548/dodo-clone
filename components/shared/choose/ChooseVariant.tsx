'use client'

import CarouselVariant from '@/components/CarouselVariant'
import { productTypesWithSubProducts } from '@/data/productTypesWithSubProducts'
import { IProduct } from '@/interface/interface-product'
import { ProductService } from '@/services/product.service'
import { useEffect, useState } from 'react'
interface IChooseVariant {
	data: IProduct | undefined
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
	}, [selectedVariant, setSelectVariant])
	useEffect(() => {
		if (defaultVariantProps) {
			setSelectedVariant(defaultVariantProps)
		} else {
			if (defaultVariant) {
				setSelectedVariant(defaultVariant)
			}
		}
	}, [data, defaultVariant, defaultVariantProps])

	return (
		<>
			<CarouselVariant
				selectedVariant={selectedVariant}
				setSelectedVariant={setSelectedVariant}
				data={data?.productVariant
					.sort(
						(a, b) =>
							a?.productAttribute?.variantTypesId -
							b?.productAttribute?.variantTypesId
					)
					.map(variant => ({
						name: variant.productAttribute.variantTypes?.value
							? variant.productAttribute.variantTypes.value
							: variant.productAttribute.name,
						value: variant.productAttribute.variantTypesId
							? variant.productAttribute.variantTypesId
							: variant.productAttribute.productVariantId,
						disabled:
							variant.sizes.length === 0 &&
							!productTypesWithSubProducts.includes(data?.type),
					}))}
			/>
		</>
	)
}

export default ChooseVariant
