'use client'

import { QueryProduct } from '@/app/api/query-product'
import ProductCard from '@/components/shared/products-group-list/ProductCard'
import { Skeleton } from '@/components/ui/skeleton'
import { IFilterParams } from '@/interface/interface-filter-params'
import { useCategoryStore } from '@/store/category'
import { useFiltersStore } from '@/store/filters'
import { useQuery } from '@tanstack/react-query'

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
		<div className={'grid grid-cols-3 gap-4 '}>
			{data?.map(product => (
				<ProductCard key={product.id} product={product} />
			))}
		</div>
	)
}
