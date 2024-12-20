'use client'

import DialogCustom from '@/components/shared/DialogCustom'
import { Title } from '@/components/shared/Title'
import { URL_API } from '@/constants'
import { useChooseProduct } from '@/store/choose-product'
import { Trash } from 'lucide-react'
import Image from 'next/image'
import ChooseCardModal from './ChooseCardModal'

function ChooseSelected() {
	const { products, totalPrice, removeProduct } = useChooseProduct()

	return (
		<div className='flex  justify-between'>
			<div className=' overflow-x-auto w-[calc(100%_-_210px)] scrollbar pb-2'>
				<Title className='pb-2' text='Добавленное' size='sm' />
				<div className='flex gap-x-3 p-1   '>
					{products.map(product => (
						<DialogCustom
							key={product.productId + product?.sizeId + product?.variantId}
							trigger={
								<div
									className={
										'min-w-[150px] flex justify-start flex-col items-center p-2 rounded-md  relative group overflow-hidden cursor-pointer  shadow-card dark:shadow-sm-card-dark  hover:shadow-sm-card-dark  dark:hover:shadow-sm-card-dark-inner'
									}
								>
									<span
										onClick={() =>
											removeProduct(
												product.productId,
												product?.variantId,
												product?.sizeId
											)
										}
										className='absolute top-1 -right-10 duration-300 ease-linear cursor-pointer group-hover:right-1 fill-red-500 '
									>
										<Trash className='text-red-500 hover:fill-red-500' />
									</span>
									<span className='absolute bottom-1 right-3 '>
										{product.quantity > 1 && `X${product.quantity}`}
									</span>
									<Image
										alt={product.name}
										src={`${URL_API}/${product.img}`}
										width={80}
										height={80}
									/>
									<h3 className='text-center line-clamp-2'>{product.name}</h3>
									<div className='flex items-center gap-x-2'>
										<span className='text-[12px] dark:text-secondary-white text-secondary-black'>
											{product.size}
										</span>
										<span className='text-[12px] dark:text-secondary-white text-secondary-black'>
											{product.variant}
										</span>
									</div>
									<span>{product.price} ₽</span>
								</div>
							}
							classContent='w-[960px] h-[80%] rounded-md bg-white dark:bg-dark-background backdrop-blur-lg flex gap-x-3'
							content={
								<ChooseCardModal
									productId={product.productId}
									defaultSize={product.sizeId}
									defaultVariant={product.variantId}
									defaultCount={product.quantity}
									defaultIsReplace={product.isReplace}
								/>
							}
						/>
					))}
				</div>
			</div>
			<div className='border-l border-primary flex flex-col justify-center items-center p-2 gap-y-5 w-[200px]'>
				<h2>
					Cтоимость{' '}
					<span className='font-bold text-primary'>{totalPrice} ₽</span>
				</h2>
			</div>
		</div>
	)
}

export default ChooseSelected
