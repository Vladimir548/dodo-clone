'use client'

import ProductGroup from '@/components/shared/products-group-list/ProductGroup'

import LayoutIntersection from '@/app/(root)/LayoutIntersection'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetCategories } from '@/hooks/useGetCategories'
import { useCategoryStore } from '@/store/category'
import { Suspense, useEffect, useRef, useState } from 'react'
import Filter from '../filters/Filter'

export default function ProductsGroupList() {
	const containerRef = useRef<HTMLDivElement>(null)
	const { data, isPending } = useGetCategories()
	const { clickSlug, activeSlug } = useCategoryStore()
	const [isFirstRender, setIsFirstRender] = useState<boolean>(true)

	const blockActive = containerRef.current?.querySelector(`#${activeSlug}`)
	useEffect(() => {
		if (blockActive && isFirstRender) {
			blockActive.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			})
			setIsFirstRender(false)
		}
		if (blockActive && clickSlug) {
			blockActive.scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			})
		}
	}, [activeSlug, clickSlug, isFirstRender, blockActive])

	if (isPending)
		return (
			<div className={'grid grid-cols-3 gap-4 '}>
				<Skeleton count={9} className={'w-full dark:bg-primary h-[450px]'} />
			</div>
		)

	return (
		<div ref={containerRef} className={'w-full flex flex-col gap-y-20'}>
			{data?.map(val => (
				<>
					{val.products.length > 0 && (
						<LayoutIntersection slug={val.slug}>
							<div className='flex gap-x-[80px]'>
								<div>
									<Suspense fallback={<div>Loading...</div>}>
										<Filter typeCategory={val.type} categoryId={val.id} />
									</Suspense>
								</div>
								<div className='w-full'>
									<ProductGroup id={val.id} />
								</div>
							</div>
						</LayoutIntersection>
					)}
				</>
			))}
		</div>
	)
}
