'use client'

import ImageProduct from '@/components/ImageProduct'
import Container from '@/components/shared/Container'
import ProductButtonPrice from '@/components/shared/product/ProductButtonPrice'
import ProductIngredients from '@/components/shared/product/ProductIngredients'
import { Title } from '@/components/shared/Title'
import { Button } from '@/components/ui/button'
import { DATADOUGHTYPE } from '@/data/dough-type'
import { TypeDough } from '@/interface/enums'
import { useEffect, useState } from 'react'

import useGetSizeByCategory from '@/hooks/useGetSizeByCategory'
import { IProduct } from '@/interface/interface-product'
import { ProductService } from '@/services/product.service'

interface IProductId {
	modalClass?: boolean
	data: IProduct
	isPending?: boolean
}

export default function ProductIdPizza({
	modalClass,
	data,
	isPending,
}: IProductId) {
	const { data: sizesByCategory } = useGetSizeByCategory(data?.categoryId)
	const availableDough = ProductService.doughForPizza(data)
	const [typeDough, setTypeDough] = useState<TypeDough>(
		availableDough ?? TypeDough.TRADITIONAL
	)
	const [selectSize, setSelectSize] = useState<number>()
	const checkSize = ProductService.sizeForPizza(data, typeDough)
	const hasSize = ProductService.hasCurrentSize(data, typeDough, selectSize)
	const arrSizeImg = [400, 450, 500]
	useEffect(() => {
		if (!hasSize) {
			setSelectSize(checkSize)
		}
	}, [selectSize, typeDough, checkSize, hasSize])

	if (!data) return null
	return (
		<Container
			className={`text-white w-full grid grid-cols-2  justify-between gap-x-4 pt-8 ${
				modalClass && 'pt-0'
			} `}
		>
			<div className={' relative  flex justify-center items-center  '}>
				<ImageProduct
					isLoading={isPending}
					alt={data?.name}
					src={
						data?.productVariant?.find(val => val.doughName === typeDough)
							?.image
					}
					sizes={sizesByCategory?.map((val, index) => ({
						[val.id]: arrSizeImg[index],
					}))}
					size={selectSize}
				/>
			</div>
			<div className={'flex flex-col gap-y-3  '}>
				<Title
					size={'lg'}
					className={'font-bold text-black dark:text-white'}
					text={data?.name ?? ''}
				/>
				<div className={'flex gap-x-2 text-black/70 dark:text-white/70 '}>
					<span>
						{sizesByCategory?.find(val => val.id === selectSize)?.value}
					</span>
					<span>
						{DATADOUGHTYPE.find(
							val => val.value === typeDough
						)?.name.toLowerCase()}{' '}
						тесто
					</span>
					<span>
						{data?.productVariant
							.filter(val => val.doughName === typeDough)
							?.map(
								val => val.sizes?.find(val => val.sizeId === selectSize)?.weight
							)}{' '}
						г
					</span>
				</div>
				<div
					className={` ${
						modalClass && ' pr-3 h-[400px]  scrollbar overflow-auto'
					}  flex flex-col gap-y-2`}
				>
					<p className={'text-black/70 dark:text-gray-200'}>
						{data?.ingredients?.map(val => val.name).join(', ')}
					</p>
					<div
						className={
							'flex justify-between p-1 gap-x-1 w-full border-2 border-primary font-bold rounded-lg '
						}
					>
						{sizesByCategory?.map(val => {
							return (
								<Button
									disabled={ProductService.isSizeTypeDough(
										data,
										typeDough,
										val.id
									)}
									variant={'outline'}
									onClick={() => setSelectSize(val.id)}
									className={`w-full  border-2 ${
										selectSize === val.id && 'bg-primary text-white'
									} border-primary  rounded-lg hover:border-primary font-bold`}
									key={val.id}
								>
									{val.value}
								</Button>
							)
						})}
					</div>
					<div
						className={'flex  border-2 border-primary  p-1 gap-x-1 rounded-lg'}
					>
						{DATADOUGHTYPE.map(val => (
							<Button
								disabled={
									!data?.productVariant.find(
										find => find.doughName === val.value
									)
								}
								onClick={() => setTypeDough(val?.value)}
								className={`w-full  border-2 ${
									typeDough === val.value && 'bg-primary text-white'
								} border-primary  rounded-lg hover:border-primary font-bold`}
								variant={'outline'}
								key={val.value}
							>
								{val.name}
							</Button>
						))}
					</div>
					<div>
						<ProductIngredients
							data={
								data.productVariant
									.find(variant => variant.doughName === typeDough)
									?.sizes.find(size => size.sizeId === selectSize)?.ingredients
							}
						/>
					</div>
				</div>
				<ProductButtonPrice
					data={data}
					selectedSize={selectSize}
					selectedDough={typeDough}
					price={ProductService.calcSumPrice(data, selectSize, typeDough)}
				/>
			</div>
		</Container>
	)
}
