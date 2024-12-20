'use client'

import ChooseVariant from '@/components/shared/choose/ChooseVariant'
import Container from '@/components/shared/Container'
import ProductButtonPrice from '@/components/shared/product/ProductButtonPrice'
import { Title } from '@/components/shared/Title'
import { URL_API } from '@/constants'
import useGetSizeAndVariant from '@/hooks/useGetSizeAndVariant'
import { IProduct } from '@/interface/interface-product'
import { ProductService } from '@/services/product.service'
import Image from 'next/image'
import SubProductList from './SubProductList'

interface IProductId {
	modalClass?: boolean
	data: IProduct
}

function ProductIdCombo({ data, modalClass }: IProductId) {
	const { selectedSize, selectedVariant, setSelectedVariant } =
		useGetSizeAndVariant({ data })

	return (
		<Container
			className={`text-white h-full w-full grid grid-cols-2  justify-between gap-x-4 pt-8 ${
				modalClass && 'pt-0'
			} `}
		>
			<div className={' relative  flex justify-center items-center '}>
				<Image
					alt={data?.name ?? 'image'}
					src={`${URL_API}/${
						data?.productVariant.find(
							variant => variant.productAttribute.id === selectedVariant
						)?.image
					}`}
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

				<div className=' w-full flex flex-col gap-y-3'>
					<ChooseVariant setSelectVariant={setSelectedVariant} data={data} />
				</div>

				<div className=''>
					<SubProductList
						variant={
							data.productVariant.find(
								val => val.productAttribute.productVariantId === selectedVariant
							)?.subProduct
						}
					/>
				</div>

				<div className='flex justify-center items-end h-full'>
					<ProductButtonPrice
						data={data}
						selectedSize={selectedSize}
						price={ProductService.calcSumPrice(
							data,
							selectedSize,
							selectedVariant
						)}
						selectedVariant={selectedVariant}
					/>
				</div>
			</div>
		</Container>
	)
}

export default ProductIdCombo
