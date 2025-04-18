import { URL_API } from '@/constants'
import { useHalvesStore } from '@/store/halves'
import Image from 'next/image'
import { useEffect } from 'react'
import ProductButtonPrice from '../product/ProductButtonPrice'
import HalfListPizza from './HalfListPizza'
import HalfRightSide from './HalfRightSide'
import HalvesControl from './HalvesControl'

function HalvesModal() {
	const leftHalf = useHalvesStore(state => state.leftHalf)
	const rightHalf = useHalvesStore(state => state.rightHalf)
	const selectedSize = useHalvesStore(state => state.selectedSize)
	const selectedVariant = useHalvesStore(state => state.selectedVariant)
	const arraySubProduct = useHalvesStore(state => state.arraySubProduct)
	const arrayPriceProduct = useHalvesStore(state => state.arrayPriceProduct)

	useEffect(() => {}, [selectedSize, selectedVariant])
	return (
		<div className='flex gap-x-3'>
			<div className='h-full  border-r border-r-primary w-[700px]'>
				<HalfListPizza />
			</div>
			<div className='flex flex-col justify-center items-center'>
				<div className='relative w-[300px] h-[290px] overflow-hidden mb-3 '>
					<Image
						src={'/pizza-placeholder.svg'}
						width={300}
						height={300}
						alt={''}
					/>
					{leftHalf?.img && (
						<Image
							className='absolute -left-0 top-0  left-half'
							src={`${URL_API}/${leftHalf.img}`}
							width={300}
							height={300}
							alt={''}
						/>
					)}
					{leftHalf?.id && rightHalf?.id && (
						<span className='absolute left-1/2 top-0 -translate-x-1/2 w-0.5 h-full bg-white'></span>
					)}
					{rightHalf?.img && (
						<Image
							className='absolute left-0 top-0  right-half'
							src={`${URL_API}/${rightHalf?.img}`}
							width={300}
							height={300}
							alt={''}
						/>
					)}
				</div>
				<div className='flex flex-col gap-y-2'>
					<HalfRightSide />
					<div className='max-w-[370px] pt-2'>
						<HalvesControl category={1} />
					</div>
					<ProductButtonPrice
						selectedSize={selectedSize}
						selectedVariant={selectedVariant}
						subProduct={arraySubProduct}
						priceSubProduct={arrayPriceProduct}
						isDisabled={(leftHalf && rightHalf) === null}
					/>
				</div>
			</div>
		</div>
	)
}

export default HalvesModal
