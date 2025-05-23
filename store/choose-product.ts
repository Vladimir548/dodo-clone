import { create } from 'zustand'

export interface IProductStore {
	productId: number
	variantId: number | undefined
	subSizeId: number
	price: number
	name: string
	size: string | null
	variant: string | null
	img: string
	quantity: number
	isReplace: boolean
	variantTypeId: number | null | undefined
	proportionId: number | null
}

interface IChooseDough {
	products: IProductStore[]
	totalPrice: number
	addProduct: (data: IProductStore) => void
	removeProduct: (
		id: number,
		variantId: number | undefined,
		sizeId: number | undefined
	) => void
	clearProduct: () => void
}

const calcSumProduct = (products: IProductStore[]) => {
	return products.reduce((acc, val) => {
		return acc + val.price * val.quantity
	}, 0)
}

export const useChooseProduct = create<IChooseDough>()(set => ({
	products: [],
	totalPrice: 0,
	addProduct: (data: IProductStore) =>
		set(state => {
			const someProduct = state.products.some(
				val =>
					val.productId === data?.productId &&
					val.subSizeId === data.subSizeId &&
					val.variantId === data.variantId
			)

			const findProduct = state.products.find(
				val =>
					val.productId === data?.productId &&
					val.subSizeId === data.subSizeId &&
					val.variantId === data.variantId
			)
			const findIndexProduct = state.products.findIndex(
				val =>
					val.productId === data?.productId &&
					val.subSizeId === data.subSizeId &&
					val.variantId === data.variantId
			)

			const updateProduct =
				JSON.stringify(findProduct) === JSON.stringify(data)
					? state.products.reduce(
							(acc: IProductStore[], val: IProductStore, index) => {
								if (index === findIndexProduct) {
									val.quantity = (val.quantity || 1) + 1
								}
								acc.push(val)
								return acc
							},
							[]
					  )
					: someProduct
					? [
							...state.products.filter(val => val.productId !== data.productId),
							data,
					  ]
					: [...state.products, data]

			return {
				...state,
				products: updateProduct,
				totalPrice: calcSumProduct(updateProduct),
			}
		}),

	removeProduct: (
		id: number,
		variantId: number | undefined,
		sizeId: number | undefined
	) =>
		set(state => {
			const remove = state.products.filter(
				val =>
					val.productId !== id ||
					val.variantId !== variantId ||
					val.subSizeId !== sizeId
			)
			return {
				...state,
				products: remove,
				totalPrice: calcSumProduct(remove),
			}
		}),
	clearProduct() {},
}))
