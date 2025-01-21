'use client'

import { Title } from '@/components/shared/Title'
import { Button } from '@/components/ui/button'
import { URL_API } from '@/constants'
import { TypeProduct } from '@/interface/enums'
import { IProductsSub } from '@/interface/interface-product-variant'
import { IChangeSubProduct, useChangeKit } from '@/store/change-kit'

import useOutsideClick from '@/hooks/useOutsideClick'
import { RussianRuble } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import SubProductChangeVariant from './SubProductChangeVariant'

function SubProductList({ variant }: { variant: IProductsSub[] | undefined }) {
	const {
		changeFindIndexProduct,
		changeDefaultProduct,
		subProducts,
		findIndexChangedProduct,
		selectedProduct,
	} = useChangeKit()
	const { ref } = useOutsideClick()
	const handleChangeProduct = (
		e: React.MouseEvent<HTMLDivElement>,
		product: IChangeSubProduct,
		index: number
	) => {
		e.stopPropagation()
		e.preventDefault()
		if (selectedProduct?.index !== index) {
			changeFindIndexProduct(product, index)
			changeDefaultProduct(product)
		}
	}

	if (!variant) return
	return (
		<div className='flex flex-col gap-y-2'>
			{subProducts?.map((product, index) => (
				<div
					ref={ref}
					onClick={(e: React.MouseEvent<HTMLDivElement>) =>
						handleChangeProduct(e, product, index)
					}
					key={product.index}
					className={`relative flex flex-col gap-y-1  p-2 cursor-pointer rounded-md  shadow-sm-card dark:shadow-sm-card-dark mx-1 hover:border-primary ease-linear duration-300  hover:shadow-none ${
						findIndexChangedProduct === index &&
						'border-2 duration-200 ease-in-out border-primary shadow-none'
					} `}
				>
					<div className='flex gap-x-2'>
						<div className=''>
							<Image
								alt={product?.name ?? 'image'}
								src={`${URL_API}/${product?.image}`}
								width={80}
								height={80}
							/>
						</div>
						<div className=''>
							<Title text={product?.name} size='sm' />
							<div className='flex items-center gap-x-3 text-secondary '>
								<span>{product?.proportionValue}</span>
								{product?.variantTypesId &&
									product.type === TypeProduct.PIZZA && (
										<span>{product?.variantTypesValue} тесто</span>
									)}
								<span>
									{product.weight &&
										Number(product.weight) > 0 &&
										product.weight + ' г'}
								</span>
							</div>
							<div className='text-sm text-secondary '>
								{product.ingredients && <>{product.ingredients}</>}
							</div>
							<div className='flex items-center gap-x-1'>
								<span
									className={`flex items-center ${
										product.quantity === 1
											? 'text-primary '
											: 'text-black dark:text-white'
									}  `}
								>
									{product?.price} <RussianRuble size={14} />
								</span>

								{product.quantity > 1 && (
									<>
										<span className='text-black dark:text-white '>
											X{product.quantity}
										</span>
										<span className='flex items-center text-black dark:text-white '>
											={'  '}
											<b className='flex items-center text-primary pl-0.5 '>
												{Number(product?.price) * Number(product.quantity)}
												<b>
													<RussianRuble size={14} />
												</b>
											</b>
										</span>
									</>
								)}
								{product.differencePrice ? (
									<span className='flex items-center'>
										{product.differencePrice > 0 &&
											`+${product.differencePrice * product.quantity}`}
										{product.differencePrice < 0 &&
											product.differencePrice * product.quantity}
										<RussianRuble size={14} />
									</span>
								) : null}
							</div>
						</div>
					</div>

					{product.isReplace && (
						<>
							{findIndexChangedProduct !== index && (
								<Button
									variant={'default'}
									className='shadow-md items-center gap-x-2 font-bold'
								>
									Заменить
								</Button>
							)}
						</>
					)}
					{findIndexChangedProduct === index && (
						<SubProductChangeVariant variant={variant} />
					)}
				</div>
			))}
		</div>
	)
}

export default SubProductList
