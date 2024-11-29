import React, { useEffect } from 'react'

import { useCategoryStore } from '@/store/category'
import { useFiltersStore } from '@/store/filters'
import { useRouter } from 'next/navigation'
import queryString from 'query-string'

export const useQueryFilters = () => {
	const isMounted = React.useRef(false)
	const router = useRouter()
	const { prices, ingredients, sizes } = useFiltersStore()
	const activeCategory = useCategoryStore(state => state.activeCategory) ?? ''

	useEffect(() => {
		if (isMounted.current) {
			const params = {
				slug: activeCategory,
				priceTo: prices?.[activeCategory]?.priceTo,
				priceFrom: prices?.[activeCategory]?.priceFrom,
				ingredients: ingredients?.[activeCategory],
				sizes: sizes?.[activeCategory],
			}

			const query = queryString.stringify(params, {
				arrayFormat: 'comma',
				skipEmptyString: true,
				skipNull: true,
			})

			router.push(`?${decodeURIComponent(query)}`, {
				scroll: false,
			})
		}

		isMounted.current = true
	}, [activeCategory, ingredients, prices, sizes, router])
}
