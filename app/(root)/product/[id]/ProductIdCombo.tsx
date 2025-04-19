'use client'

import ChooseVariant from '@/components/shared/choose/ChooseVariant'
import Container from '@/components/shared/Container'
import ProductButtonPrice from '@/components/shared/product/ProductButtonPrice'
import { Title } from '@/components/shared/Title'
import { URL_API } from '@/constants'
import useGetSizeAndVariant from '@/hooks/useGetSizeAndVariant'
import { IProduct } from '@/interface/interface-product'
import { ProductService } from '@/services/product.service'
import { useChangeKit } from '@/store/change-kit'
import Image from 'next/image'
import { useEffect } from 'react'
import ProductListByType from './ProductListByType'
import SubProductList from './SubProductList'

interface IProductId {
	modalClass?: boolean
	data: IProduct
}

function ProductIdCombo({ data, modalClass }: IProductId) {
	const { selectedSize, selectedVariant, setSelectedVariant } =
		useGetSizeAndVariant()
	const addProductList = useChangeKit(state => state.addProductList)
	const removeSelectedProduct = useChangeKit(
		state => state.removeSelectedAndChangedProduct
	)
	useEffect(() => {
		addProductList(
			data.productVariant.find(
				variant => variant.productAttribute.productVariantId === selectedVariant
			)?.subProduct
		)
		removeSelectedProduct()
	}, [data, selectedVariant])

	const getImage = ProductService.getImage(data, selectedVariant)

	const { isChange } = useChangeKit()

	const arraySubProduct = useChangeKit(state => state.arraySubProduct)
	const priceCustomProduct = useChangeKit(state => state.priceNewProduct)

	return (
		<Container
			className={`text-white h-full w-full grid grid-cols-2  justify-between gap-x-4 pt-8 ${
				modalClass && 'pt-0'
			} `}
		>
			<div>
				{isChange ? (
					<div className='h-[400px]'>
						<ProductListByType />
					</div>
				) : (
					<div className={' relative  flex justify-center items-center '}>
						<Image
							alt={data?.name ?? 'image'}
							src={`${URL_API}/${getImage}`}
							width={400}
							height={400}
						/>
					</div>
				)}
			</div>
			<div className={'flex flex-col gap-y-3  '}>
				<div className='pr-1 h-full overflow-y-auto scrollbar max-h-[450px]'>
					<Title
						size={'lg'}
						className={'font-bold text-black dark:text-white'}
						text={data?.name ?? ''}
					/>

					<div className=' w-full flex flex-col gap-y-3'>
						<ChooseVariant setSelectVariant={setSelectedVariant} data={data} />
					</div>

					<div className='pt-3'>
						<SubProductList
							variant={
								data.productVariant.find(
									val =>
										val.productAttribute.productVariantId === selectedVariant
								)?.subProduct
							}
						/>
					</div>
				</div>
				<div className='flex justify-center items-end '>
					<ProductButtonPrice
						data={data}
						selectedSize={selectedSize}
						selectedVariant={selectedVariant}
						subProduct={arraySubProduct}
						priceSubProduct={priceCustomProduct}
					/>
				</div>
			</div>
		</Container>
	)
}

export default ProductIdCombo
