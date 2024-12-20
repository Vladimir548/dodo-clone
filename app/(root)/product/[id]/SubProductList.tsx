'use client'

import { Title } from '@/components/shared/Title'
import { URL_API } from '@/constants'
import { IProductsSub } from '@/interface/interface-product-variant'
import Image from 'next/image'

function SubProductList({ variant }: { variant: IProductsSub[] }) {
	if (!variant) return
	console.log(variant)
	return (
		<div className=''>
			{variant.map(product => (
				<div key={product?.productId} className='flex gap-x-2'>
					<div className=''>
						<Image
							alt={product?.product?.name ?? 'image'}
							src={`${URL_API}/${product?.variant?.image}`}
							width={100}
							height={100}
						/>
					</div>
					<div className=''>
						<Title text={product?.product?.name} size='md' />
						<div className='flex items-center gap-x-3'>
							<span>{product?.size?.proportion?.value}</span>
							<span>{product?.variant?.productAttribute?.name}</span>
						</div>
						<span>{product?.size?.price}</span>
					</div>
				</div>
			))}
		</div>
	)
}

export default SubProductList
