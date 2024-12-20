'use client'
import CarouselVariant from '@/components/CarouselVariant'
import { IProduct } from '@/interface/interface-product'
import { ProductService } from '@/services/product.service'
import { useEffect, useState } from 'react'

interface IChooseSize {
	data: IProduct
	setSelectSize: (variant: number) => void
	defaultSizeProps?: number
	selectedVariant: number
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
		if (defaultSizeProps) return setSelectedSize(defaultSizeProps)
		setSelectedSize(defaultSize)
	}, [data, selectedVariant, setSelectedSize, defaultSize, defaultSizeProps])

	return (
		<>
			<CarouselVariant
				selectedVariant={selectedSize}
				setSelectedVariant={setSelectedSize}
				data={data?.productVariant
					.find(variant => variant.productAttribute.id === selectedVariant)
					?.sizes?.map(variant => ({
						name: variant.proportion.value,
						value: variant.sizeId,
					}))}
			/>
		</>
	)
}

export default ChooseSize
