'use client'

import { QueryCartItem } from '@/app/api/query-cart-item'
import { Button } from '@/components/ui/button'
import useCurrentUser from '@/hooks/useCurrentUser'
import usePriceIngredients from '@/hooks/usePriceIngredients'
import { TypeDough } from '@/interface/enums'
import { IAddItemCart } from '@/interface/interface-add-item-cart'
import { IProduct } from '@/interface/interface-product'
import { ProductPriceService } from '@/services/product-price.service'
import { useIngredientsStore } from '@/store/ingredients'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

interface IProductPrice {
	price: number | undefined
	data: IProduct
	selectedDough?: TypeDough
	selectedSize: number | undefined
	selectedVariant?: number | undefined
}

export default function ProductButtonPrice({
	price,
	data,
	selectedSize,
	selectedDough,
	selectedVariant,
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
	}, [])

	const productVariantId = ProductPriceService.selectedVariant(
		data,
		selectedDough,
		selectedVariant
	)

	const sizeId = ProductPriceService.selectedSize(
		data,
		selectedDough,
		selectedSize,
		selectedVariant
	)

	const { sumPrice, ingredients } = usePriceIngredients()
	const totalPrice = ProductPriceService.calcTotalSum(price, sumPrice)
	const cartId = useCurrentUser()?.cartId
	const userId = useCurrentUser()?.userId

	const addToCart = () => {
		const objItem: IAddItemCart = {
			ingredientIds: ingredients,
			productId: data.id,
			cartId,
			productVariantId,
			sizeId,
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
