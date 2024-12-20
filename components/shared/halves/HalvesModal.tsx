import { URL_API } from '@/constants'
import { IIngredient } from '@/interface/interface-ingredient'
import Image from 'next/image'
import { useState } from 'react'
import HalfListPizza from './HalfListPizza'
import HalfRightSide from './HalfRightSide'
import HalvesControl from './HalvesControl'

interface IDataHalf {
	img: string
	name: string
	ingredients: IIngredient[]
}

export interface ISideHalf {
	leftHalf: IDataHalf
	rightHalf: IDataHalf
}

function HalvesModal() {
	const [half, setHalf] = useState<ISideHalf>({
		leftHalf: {
			img: '',
			name: '',
			ingredients: [],
		},
		rightHalf: {
			img: '',
			name: '',
			ingredients: [],
		},
	})
	const [size, setSize] = useState<number>(1)
	const [typeDough, setTypeDough] = useState<number>(1)

	return (
		<div className='flex gap-x-3'>
			<div className='h-full  border-r border-r-primary w-[700px]'>
				<HalfListPizza
					half={half}
					setHalf={setHalf}
					size={size}
					dough={typeDough}
				/>
			</div>
			<div className='flex flex-col justify-center items-center'>
				<div className='relative w-[300px] h-[290px] overflow-hidden mb-3 '>
					<Image
						src={'/pizza-placeholder.svg'}
						width={300}
						height={300}
						alt={''}
					/>
					{half.leftHalf.img && (
						<Image
							className='absolute -left-0 top-0  left-half'
							src={`${URL_API}/${half.leftHalf.img}`}
							width={300}
							height={300}
							alt={''}
						/>
					)}
					{half.leftHalf.img && half.rightHalf.img && (
						<span className='absolute left-1/2 top-0 -translate-x-1/2 w-0.5 h-full bg-white'></span>
					)}
					{half.rightHalf.img && (
						<Image
							className='absolute left-0 top-0  right-half'
							src={`${URL_API}/${half.rightHalf.img}`}
							width={300}
							height={300}
							alt={''}
						/>
					)}
				</div>
				<div>
					<HalfRightSide half={half} />
					<div className='max-w-[370px] pt-2'>
						<HalvesControl
							category={1}
							selectedDough={typeDough}
							setSelectedDough={setTypeDough}
							selectedSize={size}
							setSelectedSize={setSize}
						/>
					</div>
					{/* <ProductButtonPrice
					data={data}
					selectedSize={selectSize}
					selectedDough={typeDough}
					price={ProductService.calcSumPrice(data, selectSize, typeDough)}
				/> */}
				</div>
			</div>
		</div>
	)
}

export default HalvesModal
