'use client'

import { IProduct } from '@/interface/interface-product'
import { ProductService } from '@/services/product.service'
import { useState } from 'react'

function useGetSizeAndVariant({ data }: { data?: IProduct | undefined }) {
	const [selectedSize, setSelectedSize] = useState<number>()
	const [selectedVariant, setSelectedVariant] = useState<number>()
	const defaultVariant = ProductService.setDefaultVariantProduct(data)
	const defaultSize = ProductService.setDefaultSize(data, selectedVariant)

	// useEffect(() => {
	// 	if (defaultVariant) {
	// 		setSelectedVariant(defaultVariant)
	// 	}
	// }, [data, defaultVariant])

	// useEffect(() => {
	// 	setSelectedSize(selectedSize)
	// }, [selectedVariant, selectedSize])

	// useEffect(() => {
	// 	setSelectedSize(defaultSize)
	// }, [data, defaultSize])
	return { selectedSize, setSelectedSize, selectedVariant, setSelectedVariant }
}

export default useGetSizeAndVariant
