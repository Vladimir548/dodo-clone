import { ICartSubProduct } from '@/interface/interface-add-item-cart'
import { ISubProductForPrice } from '@/services/product.service'
import { create } from 'zustand'

interface IHalf {
	id: number
	name: string
	img: string
	ingredients: string
	variantId: number
	sizeId: number
	price: number
}

interface IHalvesStore {
	leftHalf: IHalf | null
	rightHalf: IHalf | null
	arraySubProduct: ICartSubProduct[]
	addHalf: (value: IHalf) => void
	selectedVariant: number | null
	selectedSize: number | null
	setSelectedVariant: (value: number) => void
	setSelectedSize: (value: number) => void
	arrayPriceProduct: ISubProductForPrice[]
}

export const useHalvesStore = create<IHalvesStore>()(set => ({
	leftHalf: null,
	rightHalf: null,
	selectedVariant: null,
	selectedSize: null,
	arrayPriceProduct: [],
	addHalf: (value: IHalf) =>
		set(state => {
			const half: IHalf = {
				id: value.id,
				name: value.name,
				img: value.img,
				ingredients: value.ingredients,
				variantId: value.variantId,
				sizeId: value.sizeId,
			}
			const halfPrice = Math.round(value.price / 2)
			console.log('value.price', value.price)

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
							id: value.id,
						},
					],
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
	setSelectedVariant: (value: number) => set({ selectedVariant: value }),
	setSelectedSize: (value: number) => set({ selectedSize: value }),
	arraySubProduct: [],
}))
