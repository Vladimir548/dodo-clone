'use client'

import { QueryCartItem } from '@/app/api/query-cart-item'
import { Button } from '@/components/ui/button'
import useCurrentUser from '@/hooks/useCurrentUser'
import usePriceIngredients from '@/hooks/usePriceIngredients'
import {
	IAddItemCart,
	ICartSubProduct,
} from '@/interface/interface-add-item-cart'
import { IProduct } from '@/interface/interface-product'
import { ISubProductForPrice, ProductService } from '@/services/product.service'
import { useIngredientsStore } from '@/store/ingredients'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

interface IProductPrice {
	data: IProduct
	selectedSize: number | undefined | null
	selectedVariant?: number | undefined | null
	subProduct?: ICartSubProduct[]
	priceSubProduct?: ISubProductForPrice[]
}

export default function ProductButtonPrice({
	data,
	selectedSize,
	selectedVariant,
	subProduct,
	priceSubProduct,
}: IProductPrice) {
	const queryClient = useQueryClient()
	const { mutate } = useMutation({
		mutationKey: ['set-cart-item'],
		mutationFn: (dto: IAddItemCart) => QueryCartItem.create(dto),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['cart-id'],
			})
			toast.success(`${data.name} добавлен в корзину`)
		},
		onError: () => {
			toast.error('Ошибка при добавлении в корзину')
		},
	})
	const clearIngredients = useIngredientsStore(state => state.clearIngredients)
	useEffect(() => {
		clearIngredients()
	}, [selectedSize])

	const productVariantId = ProductService.getVariantId(data, selectedVariant)
	const sizeId = ProductService.getSizeId(data, selectedVariant, selectedSize)

	const { ingredients } = usePriceIngredients()
	const totalPrice = ProductService.calcSumPrice(
		data,
		sizeId,
		productVariantId,
		priceSubProduct
	)
	const cartId = useCurrentUser()?.cartId
	const userId = useCurrentUser()?.userId
	const addToCart = () => {
		const objItem: IAddItemCart = {
			ingredientIds: ingredients,
			productId: data.id,
			productVariantId,
			customSubProduct: subProduct,
			sizeId,
			quantity: 1,
			cartId,
			typeProduct: data.type,
		}
		mutate(objItem)
	}
	return (
		<>
			{userId ? (
				<div className={'w-full flex gap-x-2 items-center'}>
					<Button
						onClick={addToCart}
						className={'w-full flex gap-x-2 items-center text-lg h-12 '}
					>
						<span>
							<ShoppingCart />
						</span>
						<span>В корзину</span>
						<b>{totalPrice} ₽</b>
					</Button>
				</div>
			) : (
				<Link
					href={'/auth?type=login'}
					className={'w-full flex gap-x-2 items-center'}
				>
					<Button className={'w-full flex gap-x-2 items-center text-lg h-12 '}>
						<>
							<span>
								<ShoppingCart />
							</span>
							<span>В корзину</span>
							<b>{totalPrice} ₽</b>
						</>
					</Button>
				</Link>
			)}
		</>
	)
}
