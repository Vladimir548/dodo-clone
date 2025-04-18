import { ICartSubProduct } from '@/interface/interface-add-item-cart'
import { IIngredient } from '@/interface/interface-ingredient'
import { IProduct } from '@/interface/interface-product'
import { ISubProductForPrice, ProductService } from '@/services/product.service'
import { create } from 'zustand'

interface IHalf {
	id: number
	name: string
	img: string
	ingredients?: IIngredient[]
	variantId?: number | null
	sizeId?: number | null
	price: number
}

interface IHalvesStore {
	leftHalf: IHalf | null
	rightHalf: IHalf | null
	arraySubProduct: ICartSubProduct[]
	addHalf: (value: IProduct) => void
	selectedVariant: number | null
	selectedSize: number | null
	setSelectedVariant: (value: number) => void
	setSelectedSize: (value: number) => void
	arrayPriceProduct: ISubProductForPrice[]
	defaultProduct: IProduct[]
	removeProduct: (id: number, additional: number) => void
}

export const useHalvesStore = create<IHalvesStore>()((set, get) => ({
	leftHalf: null,
	rightHalf: null,
	selectedVariant: null,
	selectedSize: null,
	arrayPriceProduct: [],
	defaultProduct: [],
	addHalf: (value: IProduct) =>
		// @ts-ignore
		set(state => {
			// @ts-ignore
			const half: IHalf = {
				id: value.id,
				name: value.name,
				img: value.image,
				ingredients: ProductService.getIngredients(
					value,
					state.selectedVariant,
					state.selectedSize
				),
				variantId: ProductService.getVariantId(value, state.selectedVariant),
				sizeId: ProductService.getProportionId(
					value,
					state.selectedVariant,
					state.selectedSize
				),
			}
			const halfPrice = Math.ceil(
				Number(
					ProductService.getPrice(
						value,
						state.selectedVariant,
						state.selectedSize
					)
				) / 2
			)

			if (!state.leftHalf?.id && state.rightHalf?.id !== value.id) {
				return {
					...state,
					leftHalf: half,
					arraySubProduct: [
						...state.arraySubProduct,
						{
							subProductId: half.id,
							variantId: half.variantId,
							sizeId: half.sizeId,
							index: 0,
						},
					],
					arrayPriceProduct: [
						...state.arrayPriceProduct,
						{
							index: 0,
							price: halfPrice,
							id: half.id,
						},
					],
					defaultProduct: [...state.defaultProduct, value],
				}
			}
			if (state?.leftHalf?.id === value.id) {
				return {
					...state,
					leftHalf: null,
					arraySubProduct: state.arraySubProduct.filter(
						val => val.subProductId !== value.id
					),
					arrayPriceProduct: state.arrayPriceProduct.filter(
						val => val.id !== value.id
					),
					defaultProduct: state.defaultProduct.filter(
						val => val.id !== value.id
					),
				}
			}
			if (!state.rightHalf?.id && state.leftHalf?.id !== value.id) {
				return {
					...state,
					rightHalf: half,
					arraySubProduct: [
						...state.arraySubProduct,
						{
							subProductId: half.id,
							variantId: half.variantId,
							sizeId: half.sizeId,
							index: 1,
						},
					],
					arrayPriceProduct: [
						...state.arrayPriceProduct,
						{
							index: 1,
							price: halfPrice,
							id: value.id,
						},
					],
					defaultProduct: [...state.defaultProduct, value],
				}
			}
			if (state?.rightHalf?.id === value.id) {
				return {
					...state,
					rightHalf: null,
					arraySubProduct: state.arraySubProduct.filter(
						val => val.subProductId !== value.id
					),
					arrayPriceProduct: state.arrayPriceProduct.filter(
						val => val.id !== value.id
					),
					defaultProduct: state.defaultProduct.filter(
						val => val.id !== value.id
					),
				}
			}
			if (state.leftHalf?.id && state.rightHalf?.id) {
				return {
					...state,
					leftHalf: half,
					rightHalf: null,
					arraySubProduct: [
						{
							subProductId: half.id,
							variantId: half.variantId,
							sizeId: half.sizeId,
							index: 0,
						},
					],
					arrayPriceProduct: [
						{
							index: 0,
							price: halfPrice,
							id: value.id,
						},
					],
					defaultProduct: [value],
				}
			}
			if (state.arraySubProduct.some(val => val.subProductId === value.id)) {
				state.arraySubProduct = state.arraySubProduct.filter(
					val => val.subProductId !== value.id
				)
				state.arrayPriceProduct = state.arrayPriceProduct.filter(
					val => val.id !== value.id
				)
			}

			return state
		}),

	removeProduct: (id: number, additional?: number | string) =>
		set(state => {
			if (!additional) {
				return {
					arraySubProduct: state.arraySubProduct.filter(
						val => val.subProductId !== id
					),
					arrayPriceProduct: state.arrayPriceProduct.filter(
						val => val.id !== id
					),
					defaultProduct: state.defaultProduct.filter(val => val.id !== id),
					leftHalf: state.leftHalf?.id === id ? null : state.leftHalf,
					rightHalf: state.rightHalf?.id === id ? null : state.rightHalf,
				}
			}
			return {}
		}),
	setSelectedVariant: (value: number) =>
		set(state => {
			state.defaultProduct.map((product, index) => {
				return (state.arrayPriceProduct[index].price = Math.ceil(
					Number(ProductService.getPrice(product, value, state.selectedSize)) /
						2
				))
			})
			state.arrayPriceProduct.map(product => {
				return get().removeProduct(product.id, product.price)
			})
			return {
				selectedVariant: value,
			}
		}),
	setSelectedSize: (value: number) =>
		set(state => {
			state.defaultProduct.map((product, index) => {
				return (state.arrayPriceProduct[index].price = Math.ceil(
					Number(
						ProductService.getPrice(product, state.selectedVariant, value)
					) / 2
				))
			})
			state.arrayPriceProduct.map(product => {
				return get().removeProduct(product.id, product.price)
			})
			return { selectedSize: value }
		}),

	arraySubProduct: [],
}))
