'use client'

import Filter from '@/components/shared/filters/Filter'
import ProductsGroupList from '@/components/shared/products-group-list/ProductsGroupList'
import { useQueryFilters } from '@/hooks/useQueryFilters'

function HomePage() {
	useQueryFilters()
	return (
		<div className='flex gap-x-14 relative '>
			<div className='sticky left-0 top-[100px] max-w-[290px] w-full overflow-x-hidden overflow-y-auto h-[calc(100vh-100px)] scrollbar '>
				<Filter />
			</div>
			<div className='w-full'>
				<ProductsGroupList />
			</div>
		</div>
	)
}

export default HomePage
