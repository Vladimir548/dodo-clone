'use client'

import { QueryProduct } from '@/app/api/query-product'
import { useQuery } from '@tanstack/react-query'
import ChooseProductList from './ChooseProductList'
import ChooseSelected from './ChooseSelected'

function ChooseProductModal() {
	const { data } = useQuery({
		queryKey: ['sub-product'],
		queryFn: () => QueryProduct.getSubProduct(),
	})
	return (
		<div className='relative'>
			<ChooseProductList data={data} />
			<div
				className={
					'absolute left-0 bottom-0 w-full h-[200px] pt-2 border-t border-primary dark:bg-dark-background bg-white '
				}
			>
				<ChooseSelected />
			</div>
		</div>
	)
}

export default ChooseProductModal
