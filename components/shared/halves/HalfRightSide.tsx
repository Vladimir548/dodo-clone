import { URL_API } from '@/constants'
import Image from 'next/image'
import { ISideHalf } from './HalvesModal'

function HalfRightSide({ half }: { half: ISideHalf }) {
	return (
		<div className='flex flex-col gap-y-3 w-[370px]'>
			<div className='flex items-center gap-x-2 shadow-[0px_1px_2px] shadow-[#0605323d] dark:shadow-[#8e8be448] p-3 rounded-md min-h-20'>
				<div className='relative'>
					<Image
						src={'/pizza-placeholder.svg'}
						width={70}
						height={70}
						alt={''}
					/>
					{half.leftHalf.img && (
						<Image
							className='absolute top-0 right-0 '
							src={`${URL_API}/${half.leftHalf.img}`}
							width={300}
							height={300}
							alt={''}
						/>
					)}
					{half.leftHalf.img && (
						<span className='absolute top-0 right-0 w-1/2 h-full rounded-r-xl bg-white/70  dark:bg-[#121212e0]'></span>
					)}
				</div>
				{!half.leftHalf.name && (
					<p className='text-[#5c6370] text-lg '>Выберите левую половинку</p>
				)}
				<div className='flex flex-col'>
					{half.leftHalf.name ? (
						<h3 className=' font-bold line-clamp-1'>{half.leftHalf.name}</h3>
					) : (
						''
					)}
					{half.leftHalf.ingredients ? (
						<p className='text-secondary-black dark:text-secondary-white text-sm'>
							{half.leftHalf.ingredients.map(val => val.name).join(', ')}
						</p>
					) : (
						''
					)}
				</div>
			</div>
			<div className='flex items-center gap-x-2 shadow-[0px_1px_2px] shadow-[#0605323d] dark:shadow-[#8e8be448] p-3 rounded-md min-h-20'>
				<div className='relative'>
					<Image
						src={'/pizza-placeholder.svg'}
						width={70}
						height={70}
						alt={''}
					/>
					{half.rightHalf.img && (
						<Image
							className='absolute top-0 right-0 '
							src={`${URL_API}/${half.rightHalf.img}`}
							width={300}
							height={300}
							alt={''}
						/>
					)}
					{half.rightHalf.img && (
						<span className='absolute top-0 left-0 w-1/2 h-full rounded-l-xl bg-white/70  dark:bg-[#121212e0]'></span>
					)}
				</div>
				{!half.rightHalf.name && (
					<p className='text-[#5c6370] text-lg'>Выберите правую половинку</p>
				)}
				<div className='flex flex-col'>
					{half.rightHalf.name ? (
						<h3 className=' font-bold line-clamp-1'>{half.rightHalf.name}</h3>
					) : (
						''
					)}
					{half.rightHalf.ingredients ? (
						<p className='text-secondary-black dark:text-secondary-white text-sm'>
							{half.rightHalf.ingredients.map(val => val.name).join(', ')}
						</p>
					) : (
						''
					)}
				</div>
			</div>
		</div>
	)
}

export default HalfRightSide
