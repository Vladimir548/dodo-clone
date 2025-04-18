'use client'

import ChooseSize from '@/components/shared/choose/ChooseSize'
import ChooseVariant from '@/components/shared/choose/ChooseVariant'
import Container from '@/components/shared/Container'
import ProductButtonPrice from '@/components/shared/product/ProductButtonPrice'
import ProductIngredients from '@/components/shared/product/ProductIngredients'
import { Title } from '@/components/shared/Title'
import { URL_API } from '@/constants'
import useGetSizeAndVariant from '@/hooks/useGetSizeAndVariant'
import { IProduct } from '@/interface/interface-product'
import { ProductService } from '@/services/product.service'
import Image from 'next/image'

interface IProductId {
	modalClass?: boolean
	data: IProduct
}

export default function ProductIdAll({ modalClass, data }: IProductId) {
	const { selectedSize, setSelectedSize, selectedVariant, setSelectedVariant } =
		useGetSizeAndVariant()

	const proportion = ProductService.getProportion(
		data,
		selectedVariant,
		selectedSize
	)
	const weight = ProductService.getWeight(data, selectedVariant, selectedSize)
	const getIngredients = ProductService.getIngredients(
		data,
		selectedVariant,
		selectedSize
	)
	const getPrice = ProductService.getPrice(data, selectedVariant, selectedSize)
	const getImage = ProductService.getImage(data, selectedVariant)
	return (
		<Container
			className={`text-white h-full w-full grid grid-cols-2  justify-between gap-x-4 pt-8 ${
				modalClass && 'pt-0'
			} `}
		>
			<div className={' relative  flex justify-center items-center '}>
				<Image
					alt={data?.name ?? 'image'}
					src={`${URL_API}/${getImage}`}
					width={400}
					height={400}
				/>
			</div>
			<div className={'flex flex-col gap-y-3'}>
				<Title
					size={'lg'}
					className={'font-bold text-black dark:text-white'}
					text={data?.name ?? ''}
				/>
				<div
					className={'flex gap-x-2 text-black/70 dark:text-white/70 min-h-6 '}
				>
					<span>{proportion}</span>
					{Number(weight) > 0 && (
						<span>
							{weight} {' г'}
						</span>
					)}
				</div>
				<div className=' w-full flex flex-col gap-y-3'>
					<ChooseVariant setSelectVariant={setSelectedVariant} data={data} />
					<ChooseSize
						selectedVariant={selectedVariant}
						setSelectSize={setSelectedSize}
						data={data}
					/>
				</div>

				<div>
					<ProductIngredients data={getIngredients} />
				</div>
				<div className='flex justify-center items-end h-full'>
					<ProductButtonPrice
						data={data}
						selectedSize={selectedSize}
						selectedVariant={selectedVariant}
					/>
				</div>
			</div>
		</Container>
	)
}
