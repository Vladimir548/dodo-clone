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
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'sonner'

interface IProductPrice {
	data?: IProduct
	selectedSize: number | undefined | null
	selectedVariant?: number | undefined | null
	subProduct?: ICartSubProduct[]
	priceSubProduct?: ISubProductForPrice[]
	isDisabled?: boolean
}

export default function ProductButtonPrice({
	data,
	selectedSize,
	selectedVariant,
	subProduct,
	priceSubProduct,
	isDisabled = false,
}: IProductPrice) {
	const queryClient = useQueryClient()
	const { mutate } = useMutation({
		mutationKey: ['set-cart-item'],
		mutationFn: (dto: IAddItemCart) => QueryCartItem.create(dto),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['cart-id'],
			})
			toast.success(`${data?.name} добавлен в корзину`)
		},
		onError: () => {
			toast.error('Ошибка при добавлении в корзину')
		},
	})
	const clearIngredients = useIngredientsStore(state => state.clearIngredients)
	useEffect(() => {
		clearIngredients()
	}, [selectedSize])

	const { push } = useRouter()

	const productVariantId = ProductService.getVariantId(data, selectedVariant)
	const sizeId = ProductService.getSizeId(data, selectedVariant, selectedSize)

	const { ingredients, sumPrice } = usePriceIngredients()
	const totalPrice = ProductService.calcSumPrice(
		data,
		sizeId,
		productVariantId,
		priceSubProduct
	)
	const cartId = useCurrentUser()?.cartId
	const userId = useCurrentUser()?.userId

	const addToCart = () => {
		if (userId) {
			const objItem: IAddItemCart = {
				ingredientIds: ingredients,
				productId: data?.id,
				productVariantId,
				customSubProduct: subProduct,
				sizeId,
				quantity: 1,
				cartId,
				typeProduct: data?.type,
			}
			mutate(objItem)
		} else {
			push('/auth?type=login', {
				scroll: false,
			})
		}
	}
	return (
		<>
			<div className={'w-full flex gap-x-2 items-center'}>
				<Button
					disabled={isDisabled}
					onClick={addToCart}
					className={'w-full flex gap-x-2 items-center text-lg h-12 '}
				>
					<span>
						<ShoppingCart />
					</span>
					<span>В корзину</span>
					{totalPrice && <b>{totalPrice + Number(sumPrice ?? 0)} ₽</b>}
				</Button>
			</div>
		</>
	)
}
