'use client'

import { QueryProduct } from '@/app/api/query-product'
import ProductCard from '@/components/shared/products-group-list/ProductCard'
import { Skeleton } from '@/components/ui/skeleton'
import { IFilterParams } from '@/interface/interface-filter-params'
import { useCategoryStore } from '@/store/category'
import { useFiltersStore } from '@/store/filters'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import PizzaHalves from '../halves/PizzaHalves'

export default function ProductGroup({ id }: { id: number }) {
	const activeSlug = useCategoryStore(state => state.activeCategory)

	const { sizes, dough, priceFrom, priceTo, ingredients } = useFiltersStore(
		state => ({
			sizes: state?.sizes?.[activeSlug ?? ''],
			dough: state?.dough,
			priceTo: state.prices?.[activeSlug ?? '']?.priceTo,
			priceFrom: state.prices?.[activeSlug ?? '']?.priceFrom,
			ingredients: state.ingredients?.[activeSlug ?? ''],
		})
	)

	const filter: IFilterParams = {
		sizes,
		dough: dough.map(val => val.value),
		priceFrom,
		priceTo,
		ingredients,
	}
	const { data, isPending } = useQuery({
		queryKey: ['get-by-category', id, filter],
		queryFn: () => QueryProduct.byCategory(id, filter),
	})

	if (isPending)
		return (
			<div className={'grid grid-cols-3 gap-4 '}>
				<Skeleton count={9} className={'w-full dark:bg-primary h-[450px]'} />
			</div>
		)
	return (
		<div className={'w-full'}>
			<PizzaHalves />
			{data && data?.length > 0 ? (
				<div className={'grid grid-cols-3 gap-4 '}>
					{data?.map(product => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>
			) : (
				<div className='flex justify-center items-center flex-col w-full'>
					<Image
						width={300}
						height={300}
						src={'dodo-empty.svg'}
						alt='empty-dodo'
					/>
					<h3 className='text-2xl font-bold '>Пусто</h3>
					<p className='text-xl font-medium max-w-[550px] text-center secondary-black dark:text-secondary-white '>
						Для этой категории не найдено ни одного товара. Попробуйте изменить
						параметры фильтрации.
					</p>
				</div>
			)}
		</div>
	)
}
