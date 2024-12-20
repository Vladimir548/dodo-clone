'use client'

import { QueryProportion } from '@/app/api/query-proportion'
import CarouselVariant from '@/components/CarouselVariant'
import { DATADOUGHTYPE } from '@/data/dough-type'
import { useQuery } from '@tanstack/react-query'

interface IHalvesControl {
	category: number
	selectedDough: number | undefined
	setSelectedDough: (value: number) => void
	selectedSize: number | undefined
	setSelectedSize: (value: number) => void
}

function HalvesControl({
	category,
	selectedDough,
	setSelectedDough,
	selectedSize,
	setSelectedSize,
}: IHalvesControl) {
	const { data } = useQuery({
		queryKey: ['proportion'],
		queryFn: () => QueryProportion.byCategory(category),
	})
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
				data={DATADOUGHTYPE?.map(val => ({
					name: val.name,
					value: val.id,
				}))}
				selectedVariant={selectedDough}
				setSelectedVariant={setSelectedDough}
			/>
		</div>
	)
}

export default HalvesControl
