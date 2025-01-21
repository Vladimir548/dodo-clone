'use client'

import { QueryProduct } from '@/app/api/query-product'
import { Button } from '@/components/ui/button'
import { URL_API } from '@/constants'
import { IProduct } from '@/interface/interface-product'
import { IProductVariant } from '@/interface/interface-product-variant'
import { ProductService } from '@/services/product.service'
import { useChangeKit } from '@/store/change-kit'
import { useQuery } from '@tanstack/react-query'
import { RussianRuble } from 'lucide-react'
import Image from 'next/image'

function ProductListByType() {
	const defaultInfo = useChangeKit(state => state.defaultProduct)
	const changeProduct = useChangeKit(state => state.changeProduct)
	const selectedProduct = useChangeKit(state => state.selectedProduct)

	const { data } = useQuery({
		queryKey: ['type', defaultInfo],
		queryFn: () =>
			QueryProduct.getListBySizeAndVariant({
				type: defaultInfo?.type,
				variant: defaultInfo?.variantTypesId ?? defaultInfo?.variantId,
				size: defaultInfo?.proportionId,
			}),
	})

	const handleChangeProduct = (
		products: IProduct,
		difference: number,
		variantProduct?: number
	) => {
		changeProduct(products, difference, variantProduct)
	}
	const calcDifference = (product: IProduct, variant: IProductVariant) => {
		const variantId = variant.productAttribute?.variantTypesId ?? variant.id
		const priceProduct = ProductService.getPrice(
			product,
			variantId,
			defaultInfo?.proportionId
		)
		return Number(priceProduct) - Number(defaultInfo?.price)
	}

	return (
		<ul className='flex gap-2 flex-wrap'>
			{data?.map(product =>
				product.productVariant
					.filter(
						variant =>
							!variant.productAttribute.variantTypesId ||
							variant.productAttribute.variantTypesId ===
								defaultInfo?.variantTypesId
					)
					.map(variant => {
						return (
							<li key={variant.id} className='w-[160px]'>
								<Button
									onClick={() =>
										handleChangeProduct(
											product,
											calcDifference(product, variant),
											variant.id
										)
									}
									variant={'outline'}
									className={`h-full w-full flex justify-center items-center p-1 ${
										variant.productId === selectedProduct?.productId &&
										'bg-primary text-white'
									} `}
								>
									<div className='flex cursor-pointer justify-center flex-col items-center  rounded-md p-0.5 w-full '>
										<Image
											src={`${URL_API}/${variant.image}`}
											width={110}
											height={110}
											alt={variant.productAttribute.name ?? 'image'}
										/>
										<h3 className='text-center line-clamp-2 whitespace-normal'>
											{product.name} {variant.productAttribute.name}{' '}
										</h3>
										{calcDifference(product, variant) ? (
											<span className='flex items-center  justify-center'>
												{calcDifference(product, variant) > 0 &&
													`+${calcDifference(product, variant)}`}
												{calcDifference(product, variant) < 0 &&
													calcDifference(product, variant)}
												<b>
													<RussianRuble size={14} />
												</b>
											</span>
										) : null}
									</div>
								</Button>
							</li>
						)
					})
			)}
		</ul>
	)
}

export default ProductListByType
