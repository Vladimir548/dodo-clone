import { TypeProduct } from '@/interface/enums'
import { useCategoryStore } from '@/store/category'
import { useFiltersStore } from '@/store/filters'
import { useEffect, useRef } from 'react'
import { useIntersection } from 'react-use'

export const useIntersectionCategory = (
	categorySlug: string,
	categoryId: number,
	type: TypeProduct
) => {
	const {
		setActiveCategory,
		clickCategory,
		setClickCategory,
		setActiveCategoryId,
		setActiveType,
	} = useCategoryStore()

	const setCurrentSlug = useFiltersStore(state => state.setCurrentCategory)
	const currentSlug = useFiltersStore(state => state.currentCategory)
	const intersectionRef = useRef<HTMLDivElement>(null)
	const intersection = useIntersection(intersectionRef, {
		root: null,
		threshold: 0.4,
	})

	const isMounted = useRef(false)
	useEffect(() => {
		if (!isMounted.current) {
			setActiveCategory(currentSlug)
		}
		if (intersection?.isIntersecting) {
			setActiveCategory(categorySlug)
			setActiveCategoryId(categoryId)
			setActiveType(type)
			setCurrentSlug(categorySlug)
			// if (clickCategory !== null) return setClickCategory(null)
		}
		isMounted.current = true
	}, [intersection?.isIntersecting, categorySlug, categoryId, type])

	return { intersectionRef }
}
