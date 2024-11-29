import React, { useEffect } from 'react'

import { useFiltersStore } from '@/store/filters'
import { useRouter } from 'next/navigation'
import qs from 'qs'

export const useQueryFilters = (slug: string) => {
	const isMounted = React.useRef(false)
	const router = useRouter()
	const { prices, ingredients, sizes } = useFiltersStore()
	console.log(sizes?.[slug])
	useEffect(() => {
		if (isMounted.current) {
			console.log(sizes?.[slug])
			const params = {
				slug: slug,
				priceTo: prices?.[slug]?.priceTo,
				priceFrom: prices?.[slug]?.priceFrom,
				ingredients: ingredients?.[slug],
				sizes: sizes?.[slug],
			}

			const query = qs.stringify(params, {
				arrayFormat: 'comma',
			})

			router.push(`?${decodeURIComponent(query)}`, {
				scroll: false,
			})
		}

		isMounted.current = true
	}, [slug, ingredients, prices, sizes, router])
}
