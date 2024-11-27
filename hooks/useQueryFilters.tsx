import React from 'react'

import { useFiltersStore } from '@/store/filters'
import { useRouter } from 'next/navigation'
import qs from 'qs'

export const useQueryFilters = (slug: string) => {
	const isMounted = React.useRef(false)
	const router = useRouter()
	const { prices, ingredients, sizes } = useFiltersStore()
	console.log(prices)
	React.useEffect(() => {
		if (isMounted.current) {
			const params = {
				slug: slug,
				priceTo: prices?.[slug]?.priceTo,
				priceFrom: prices?.[slug]?.priceFrom,
				ingredients: ingredients?.[slug],
				sizes: sizes?.[slug],
			}
			console.log(slug)
			const query = qs.stringify(params, {
				arrayFormat: 'comma',
			})

			router.push(`?${decodeURIComponent(query)}`, {
				scroll: false,
			})
		}

		isMounted.current = true
	}, [slug, ingredients, prices, sizes])
}
