'use client'

import ImageProduct from '@/components/ImageProduct'
import ChooseSize from '@/components/shared/choose/ChooseSize'
import ChooseVariant from '@/components/shared/choose/ChooseVariant'
import Container from '@/components/shared/Container'
import ProductButtonPrice from '@/components/shared/product/ProductButtonPrice'
import ProductIngredients from '@/components/shared/product/ProductIngredients'
import { Title } from '@/components/shared/Title'
import useGetSizeAndVariant from '@/hooks/useGetSizeAndVariant'
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
	const { selectedSize, setSelectedSize, selectedVariant, setSelectedVariant } =
		useGetSizeAndVariant({ data })

	const getVariant = ProductService.getVariant(data, selectedVariant)

	const getProportion = ProductService.getProportion(
		data,
		selectedVariant,
		selectedSize
	)

	const getImage = ProductService.getImage(data, selectedVariant)
	const getWeight = ProductService.getWeight(
		data,
		selectedVariant,
		selectedSize
	)
	const getIngredients = ProductService.getIngredients(
		data,
		selectedVariant,
		selectedSize
	)

	const arrSizeImg = [400, 450, 500]

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
					src={getImage}
					sizes={sizesByCategory?.map((val, index) => ({
						[val.id]: arrSizeImg[index],
					}))}
					size={selectedSize}
				/>
			</div>
			<div className={'flex flex-col gap-y-3  '}>
				<Title
					size={'lg'}
					className={'font-bold text-black dark:text-white'}
					text={data?.name ?? ''}
				/>
				<div className={'flex gap-x-2 text-black/70 dark:text-white/70 '}>
					<span>{getProportion}</span>
					<span>{getVariant?.toLowerCase()} тесто</span>
					<span>{getWeight} г</span>
				</div>
				<div
					className={` ${
						modalClass && ' pr-3 h-[400px]  scrollbar overflow-auto'
					}  flex flex-col gap-y-2`}
				>
					<p className={'text-black/70 dark:text-gray-200'}>
						{data?.ingredients?.map(val => val.name).join(', ')}
					</p>

					<div className=' w-full flex flex-col gap-y-3'>
						<ChooseSize
							selectedVariant={selectedVariant}
							setSelectSize={setSelectedSize}
							data={data}
						/>
						<ChooseVariant setSelectVariant={setSelectedVariant} data={data} />
					</div>

					<div>
						<ProductIngredients data={getIngredients} />
					</div>
				</div>
				<ProductButtonPrice
					data={data}
					selectedSize={selectedSize}
					selectedVariant={selectedVariant}
					price={ProductService.calcSumPrice(
						data,
						selectedSize,
						selectedVariant
					)}
				/>
			</div>
		</Container>
	)
}
