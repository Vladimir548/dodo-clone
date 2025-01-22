'use client'

import { QueryProportion } from '@/app/api/query-proportion'
import { QueryVariant } from '@/app/api/query-variant'
import CarouselVariant from '@/components/CarouselVariant'
import useGetSizeAndVariant from '@/hooks/useGetSizeAndVariant'
import { TypeProduct } from '@/interface/enums'
import { useHalvesStore } from '@/store/halves'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

interface IHalvesControl {
	category: number
}

function HalvesControl({ category }: IHalvesControl) {
	const { data } = useQuery({
		queryKey: ['proportion'],
		queryFn: () => QueryProportion.byCategory(category),
	})
	const { data: variant } = useQuery({
		queryKey: ['get-variant-product'],
		queryFn: () => QueryVariant.byType(TypeProduct.PIZZA),
	})

	const setVariant = useHalvesStore(state => state.setSelectedVariant)
	const setSize = useHalvesStore(state => state.setSelectedSize)
	const { selectedSize, selectedVariant, setSelectedSize, setSelectedVariant } =
		useGetSizeAndVariant()

	useEffect(() => {
		if (data) {
			setSelectedSize(data[0]?.id)
			setSize(data[0].id)
		}
		if (variant && variant[0].id) {
			setSelectedVariant(variant[0].id)
			setVariant(variant[0].id)
		}
	}, [data, variant])
	useEffect(() => {
		if (selectedVariant) {
			setVariant(selectedVariant)
		}
	}, [selectedVariant])
	useEffect(() => {
		if (selectedSize) {
			setSize(selectedSize)
		}
	}, [selectedSize])

	return (
		<div className='flex flex-col gap-y-2'>
			<CarouselVariant
				data={data?.map(val => ({
					name: val.value,
					value: val.id,
				}))}
				selectedVariant={selectedSize}
				setSelectedVariant={setSelectedSize}
			/>
			<CarouselVariant
				data={variant?.map(val => ({
					name: val.value,
					value: val.id,
				}))}
				selectedVariant={selectedVariant}
				setSelectedVariant={setSelectedVariant}
			/>
		</div>
	)
}

export default HalvesControl
