'use client'

import { useState } from 'react'

function useGetSizeAndVariant() {
	const [selectedSize, setSelectedSize] = useState<number>()
	const [selectedVariant, setSelectedVariant] = useState<number>()

	return { selectedSize, setSelectedSize, selectedVariant, setSelectedVariant }
}

export default useGetSizeAndVariant
