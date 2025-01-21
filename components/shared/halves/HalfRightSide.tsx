import { URL_API } from '@/constants'
import { useHalvesStore } from '@/store/halves'
import Image from 'next/image'

function HalfRightSide() {
	const leftHalf = useHalvesStore(state => state.leftHalf)
	const rightHalf = useHalvesStore(state => state.rightHalf)
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
					{leftHalf?.img && (
						<Image
							className='absolute top-0 right-0 '
							src={`${URL_API}/${leftHalf.img}`}
							width={300}
							height={300}
							alt={''}
						/>
					)}
					{leftHalf?.id && (
						<span className='absolute top-0 right-0 w-1/2 h-full rounded-r-xl bg-white/70  dark:bg-[#121212e0]'></span>
					)}
				</div>
				{!leftHalf?.id && (
					<p className='text-[#5c6370] text-lg '>Выберите левую половинку</p>
				)}
				<div className='flex flex-col'>
					{leftHalf?.name ? (
						<h3 className=' font-bold line-clamp-1'>{leftHalf.name}</h3>
					) : (
						''
					)}
					{leftHalf?.ingredients ? (
						<p className='text-secondary-black dark:text-secondary-white text-sm'>
							{leftHalf.ingredients}
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
					{rightHalf?.img && (
						<Image
							className='absolute top-0 right-0 '
							src={`${URL_API}/${rightHalf.img}`}
							width={300}
							height={300}
							alt={''}
						/>
					)}
					{rightHalf?.id && (
						<span className='absolute top-0 left-0 w-1/2 h-full rounded-l-xl bg-white/70  dark:bg-[#121212e0]'></span>
					)}
				</div>
				{!rightHalf?.name && (
					<p className='text-[#5c6370] text-lg'>Выберите правую половинку</p>
				)}
				<div className='flex flex-col'>
					{rightHalf?.name ? (
						<h3 className=' font-bold line-clamp-1'>{rightHalf.name}</h3>
					) : (
						''
					)}
					{rightHalf?.ingredients ? (
						<p className='text-secondary-black dark:text-secondary-white text-sm'>
							{rightHalf.ingredients}
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
