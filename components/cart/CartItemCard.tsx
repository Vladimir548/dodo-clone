'use client'

import { URL_API } from '@/constants'
import { productTypesWithSubProducts } from '@/data/productTypesWithSubProducts'
import { ICartItem } from '@/interface/interface-cart-item'
import { PriceCalcService } from '@/services/price-calc-service'
import Image from 'next/image'
import CartButtonCounter from './CartButtonCounter'
import CartButtonDelete from './CartButtonDelete'
import CartProductCombo from './CartProductCombo'

export default function CartItemCard({ data }: { data: ICartItem }) {
	const getPriceItem = PriceCalcService(data)
	return (
		<>
			<div className={'relative flex items-start gap-x-2'} key={data.id}>
				<div>
					<Image
						width={60}
						height={60}
						src={`${URL_API}/${data.productVariant?.image}`}
						alt={data.product.name}
					/>
				</div>
				<div>
					<h3 className={'font-bold flex gap-x-1'}>
						{data.product.name}
						{data.productVariant.productAttribute?.name &&
							productTypesWithSubProducts.includes(data.product.type) && (
								<q>{data.productVariant.productAttribute.name}</q>
							)}
					</h3>
					<div
						className={
							'flex items-center gap-x-1 dark:text-gray-200 text-black/60 text-sm'
						}
					>
						{!productTypesWithSubProducts.includes(data.product.type) && (
							<>
								<span>{data?.size?.proportion?.value}</span>
								<span>
									{data.productVariant.productAttribute?.name &&
										!productTypesWithSubProducts.includes(data.product.type) &&
										data.productVariant.productAttribute.name}
								</span>
								<span>
									{data.productVariant.productAttribute?.variantTypes?.value &&
										data.productVariant.productAttribute.variantTypes.value}
								</span>
								{Number(data?.size?.weight) > 0 && (
									<span>{data.size.weight} г</span>
								)}
							</>
						)}
						{productTypesWithSubProducts.includes(data.product.type) && (
							<span>
								<CartProductCombo products={data} />
							</span>
						)}
					</div>
					{data.ingredients.length > 0 && (
						<div
							className={
								'dark:text-gray-200 text-black/60 text-xs flex gap-x-1'
							}
						>
							+{' '}
							{data?.ingredients.map(ingredient => ingredient.name).join(', ')}
						</div>
					)}
				</div>
				<div className={'absolute top-0 right-0  bg-transparent'}>
					<CartButtonDelete id={data.id} />
				</div>
			</div>
			<div className={'flex items-center justify-between pt-2'}>
				<CartButtonCounter
					quantity={data.quantity}
					cartId={data.cartId}
					id={data.id}
				/>
				<span className={'flex items-center gap-x-2'}>
					Цена: <b className={'text-primary'}>{getPriceItem} ₽</b>
				</span>
			</div>
			<span className={'w-full h-[1px] bg-primary/40 rounded-lg'} />
		</>
	)
}
