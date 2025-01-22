'use client'
import CarouselVariant from '@/components/CarouselVariant'
import { IProduct } from '@/interface/interface-product'
import { ProductService } from '@/services/product.service'
import { useEffect, useState } from 'react'

interface IChooseSize {
	data: IProduct
	setSelectSize: (variant: number) => void
	defaultSizeProps?: number | null | undefined
	selectedVariant: number | undefined
}
function ChooseSize({
	data,
	setSelectSize,
	defaultSizeProps,
	selectedVariant,
}: IChooseSize) {
	const [selectedSize, setSelectedSize] = useState<number>()

	const defaultSize = ProductService.setDefaultSize(data, selectedVariant)
	useEffect(() => {
		if (selectedSize) {
			setSelectSize(selectedSize)
		}
	}, [selectedSize, setSelectSize])

	useEffect(() => {
		if (defaultSizeProps) {
			setSelectedSize(defaultSizeProps)
		} else {
			setSelectedSize(defaultSize)
		}
	}, [data, selectedVariant, setSelectedSize, defaultSize, defaultSizeProps])

	return (
		<>
			<CarouselVariant
				selectedVariant={selectedSize}
				setSelectedVariant={setSelectedSize}
				data={data.productVariant
					.find(val =>
						val.productAttribute.variantTypesId
							? val.productAttribute.variantTypes.id === selectedVariant
							: val.productAttribute.productVariantId === selectedVariant
					)
					?.sizes?.sort((a, b) => a.proportionId - b.proportionId)
					.map(variant => ({
						name: variant.proportion.value,
						value: variant.proportion.id,
					}))}
			/>
		</>
	)
}

export default ChooseSize
