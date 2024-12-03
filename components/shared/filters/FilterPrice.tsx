'use client'
import { QueryProduct } from '@/app/api/query-product'
import { RangeSlider } from '@/components/shared/filters/FilterRangeSlider'
import { Title } from '@/components/shared/Title'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import useCustomLocation from '@/hooks/useCustomLocation'
import { useFiltersStore } from '@/store/filters'
import { useQuery } from '@tanstack/react-query'
import queryString from 'query-string'
import { memo, useCallback, useEffect, useMemo } from 'react'
import { NumericFormat } from 'react-number-format'
import { useShallow } from 'zustand/react/shallow'

interface IProps {
	categoryId: number | null
}
export default memo(function FilterPrice({ categoryId }: IProps) {
	const { data, isPending } = useQuery({
		queryKey: ['all-product', categoryId],
		queryFn: () => QueryProduct.maxPrice(categoryId),
		enabled: !!categoryId,
	})
	const { setPrices, currentSlug } = useFiltersStore(
		useShallow(state => ({
			setPrices: state.setPrices,
			currentSlug: state.currentCategory,
		}))
	)
	const priceTo = useFiltersStore(
		useShallow(state => state?.prices?.[currentSlug]?.priceTo)
	)
	const priceFrom = useFiltersStore(
		useShallow(state => state?.prices?.[currentSlug]?.priceFrom)
	)
	const location = useCustomLocation()
	const parsed = queryString.parse(location?.search ?? '')

	useEffect(() => {
		setPrices('priceFrom', Number(parsed.priceFrom))
		setPrices('priceTo', Number(parsed.priceTo))
	}, [])

	const handleSliderChange = useCallback(
		(prices: number[]) => {
			setPrices('priceFrom', prices[0])
			setPrices('priceTo', prices[1])
		},
		[setPrices]
	)

	const isPriceFromAllowed = useCallback(
		(values: { value: string }) => {
			const { value } = values
			const numberValue = Number(value)
			if (numberValue > Number(data)) return false
			if (numberValue < 0) return false
			return true
		},
		[data]
	)
	const isPriceToAllowed = useCallback(
		(values: { value: string }) => {
			const { value } = values
			const numberValue = Number(value)
			if (numberValue > Number(data)) return false
			if (numberValue < 0) return false
			return true
		},
		[data]
	)
	const sliderValue = useMemo(
		() => [priceFrom ?? 0, priceTo ?? Number(data)],
		[priceFrom, priceTo, data]
	)

	if (isPending) {
		return (
			<div>
				<Skeleton count={1} className={'w-1/2 dark:bg-primary h-7'} />
				<div className={'pt-4 pb-4'}>
					<div className={'flex items-center gap-x-4 pb-5'}>
						<Skeleton count={1} className={'h-10 dark:bg-primary w-full'} />
						<Skeleton count={1} className={'h-10 dark:bg-primary w-full'} />
					</div>
					<Skeleton count={1} className={'w-full dark:bg-primary h-1'} />
				</div>
			</div>
		)
	}
	return (
		<div className={'py-4 border-b'}>
			<Title text={'Цена'} size={'sm'} className={'font-bold '} />
			<div className={'pt-4'}>
				<div className={'flex items-center gap-x-4 pb-5'}>
					<NumericFormat
						isAllowed={isPriceFromAllowed}
						onValueChange={values =>
							setPrices('priceFrom', Number(values.value))
						}
						customInput={Input}
						value={priceFrom ?? 0}
						min={0}
						suffix={' ₽'}
						prefix={'От '}
					/>

					<NumericFormat
						isAllowed={isPriceToAllowed}
						onValueChange={values => setPrices('priceTo', Number(values.value))}
						customInput={Input}
						value={priceTo ?? Number(data)}
						max={Number(data)}
						prefix={'До '}
						suffix={' ₽'}
					/>
				</div>
				<RangeSlider
					onValueCommit={handleSliderChange}
					value={sliderValue}
					min={0}
					max={Number(data) ?? 0}
					step={10}
				/>
			</div>
		</div>
	)
})
