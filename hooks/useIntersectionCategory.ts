import { useCategoryStore } from '@/store/category'
import { useEffect, useRef } from 'react'
import { useIntersection } from 'react-use'

export const useIntersectionCategory = (categorySlug: string) => {
	const { setActiveSlug, clickSlug, setClickSlug } = useCategoryStore()
	const intersectionRef = useRef<HTMLDivElement>(null)
	const intersection = useIntersection(intersectionRef, {
		root: null,
		rootMargin: '0px',
		threshold: 0.4,
	})
	useEffect(() => {
		if (
			intersection?.isIntersecting && clickSlug === null
				? true
				: clickSlug === categorySlug
		) {
			setActiveSlug(categorySlug)
			if (clickSlug !== null) return setClickSlug(null)
		}
	}, [intersection?.isIntersecting, categorySlug])

	return { intersectionRef }
}
