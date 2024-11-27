'use client'

import ProductGroup from '@/components/shared/products-group-list/ProductGroup'

import LayoutIntersection from '@/app/(root)/LayoutIntersection'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetCategories } from '@/hooks/useGetCategories'
import { useCategoryStore } from '@/store/category'
import { useEffect, useRef, useState } from 'react'

export default function ProductsGroupList() {
	const containerRef = useRef<HTMLDivElement>(null)
	const { data, isPending } = useGetCategories()
	const { clickCategory, activeCategory } = useCategoryStore()
	const [isFirstRender, setIsFirstRender] = useState<boolean>(true)

	const blockActive = containerRef.current?.querySelector(`#${activeCategory}`)
	useEffect(() => {
		if (blockActive && isFirstRender) {
			blockActive.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			})
			setIsFirstRender(false)
		}
		if (blockActive && clickCategory) {
			blockActive.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			})
		}
	}, [activeCategory, clickCategory, isFirstRender, blockActive])
	if (isPending)
		return (
			<div className={'grid grid-cols-3 gap-4 '}>
				<Skeleton count={9} className={'w-full dark:bg-primary h-[450px]'} />
			</div>
		)
	return (
		<div ref={containerRef} className={'w-full flex flex-col gap-y-20'}>
			{data?.map(val => (
				<div key={val.id}>
					{val.products.length > 0 && (
						<LayoutIntersection
							slug={val.slug}
							categoryId={val.id}
							type={val.type}
						>
							<div className='w-full'>
								<ProductGroup id={val.id} />
							</div>
						</LayoutIntersection>
					)}
				</div>
			))}
		</div>
	)
}
