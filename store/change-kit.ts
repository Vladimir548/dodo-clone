import { TypeProduct } from '@/interface/enums'
import { ICartSubProduct } from '@/interface/interface-add-item-cart'
import { IProduct } from '@/interface/interface-product'
import { IProductsSub } from '@/interface/interface-product-variant'
import { ISubProductForPrice } from '@/services/product.service'
import { create } from 'zustand'

export interface IChangeSubProduct {
	productId: number
	variantId: number
	sizeId: number
	weight: string
	image: string
	name: string
	quantity: number
	ingredients?: string
	price: number
	productAttributeValue?: string
	isReplace: boolean
	proportionId: number
	proportionValue: string
	type?: TypeProduct
	variantTypesId: number | null
	variantTypesValue: string | null
	differencePrice?: number
	index: number
}

export interface IChangeSubProductInfo {
	type?: TypeProduct
	productId?: number
	variantId?: number
	proportionId?: number
	price?: number
	sizeId?: number
	variantTypesId: number | null
}
export interface ISubProductVariantAndSize {
	productId: number
	variantId: number
	sizeId: number
	index: number
}

interface IStore {
	subProducts: IChangeSubProduct[]
	arraySubProduct: ICartSubProduct[]
	originalSubProducts: IChangeSubProduct[]
	infoProduct: IChangeSubProductInfo | null
	defaultProduct: IChangeSubProductInfo | null
	findIndexChangedProduct: number | null
	selectedProduct: ISubProductVariantAndSize | null
	changeProduct: (
		newProduct: IProduct,
		difference: number,
		variantProduct?: number
	) => void
	addProductList: (products: IProductsSub[] | undefined) => void
	changeDefaultProduct: (data: IChangeSubProduct) => void
	changeFindIndexProduct: (product: IChangeSubProduct, index: number) => void
	isChange: boolean
	difference: number
	changeVariant: (
		variant: number,
		variantValue: string | null | undefined,
		image: string,
		variantId: number | null
	) => void

	handleIsChange: (val: boolean) => void
	removeSelectedAndChangedProduct: () => void
	addChangedProductsToArray: () => void
	priceNewProduct: ISubProductForPrice[]
}

export const useChangeKit = create<IStore>()((set, get) => ({
	subProducts: [],
	originalSubProducts: [],
	selectedProduct: null,
	defaultProduct: null,
	infoProduct: null,
	findIndexChangedProduct: null,
	isChange: false,
	difference: 0,
	priceNewProduct: [],
	changeProduct: (
		product: IProduct,
		difference: number,
		variantProduct?: number
	) => {
		set(state => {
			if (
				typeof state.findIndexChangedProduct === 'number' &&
				state.findIndexChangedProduct >= 0
			) {
				const getSizeId = product.productVariant
					.find(variant =>
						variant.productAttribute.variantTypesId
							? variant.productAttribute.variantTypesId ===
							  state.infoProduct?.variantTypesId
							: variant.productAttribute.productVariantId === variantProduct
					)
					?.sizes.find(
						size => size.proportionId === state.infoProduct?.proportionId
					)
				const getVariantId = product.productVariant.find(variant =>
					variant.productAttribute.variantTypesId
						? variant.productAttribute.variantTypesId ===
						  state.infoProduct?.variantTypesId
						: variant.productAttribute.productVariantId === variantProduct
				)

				if (!getSizeId || !getVariantId) {
					return state
				}

				const newArrayProduct = [...state.subProducts]
				newArrayProduct[state.findIndexChangedProduct] = {
					...newArrayProduct[state.findIndexChangedProduct],
					productId: product.id,
					sizeId: getSizeId?.id,
					variantId: getVariantId?.id,
					weight: getSizeId?.weight,
					name: product.name,
					image: getVariantId?.image,
					ingredients:
						(getSizeId?.ingredients &&
							getSizeId?.ingredients
								.map(ingredient => ingredient.name)
								.join(', ')) ||
						'',
					price: getSizeId?.price,
					productAttributeValue: getVariantId?.productAttribute.name,
					proportionId: getSizeId?.proportionId,
					proportionValue: getSizeId?.proportion.value,
					type: product.type,
					differencePrice: difference,
				}

				return {
					...state,
					subProducts: newArrayProduct,
					selectedProduct: {
						productId: newArrayProduct[state.findIndexChangedProduct].productId,
						sizeId: newArrayProduct[state.findIndexChangedProduct].sizeId,
						variantId: newArrayProduct[state.findIndexChangedProduct].variantId,
						index: state.findIndexChangedProduct,
					},
					infoProduct: {
						productId:
							newArrayProduct[state.findIndexChangedProduct].productId ?? 0,
						type: newArrayProduct[state.findIndexChangedProduct].type,
						proportionId:
							newArrayProduct[state.findIndexChangedProduct].proportionId,
						variantId:
							newArrayProduct[state.findIndexChangedProduct].variantId ?? 0,
						price: newArrayProduct[state.findIndexChangedProduct].price,
						variantTypesId:
							newArrayProduct[state.findIndexChangedProduct].variantTypesId,
						sizeId: newArrayProduct[state.findIndexChangedProduct].sizeId,
					},
				}
			}

			return state
		})
		get().addChangedProductsToArray()
	},
	addProductList: (products: IProductsSub[] | undefined) =>
		set(state => {
			state.subProducts = []
			if (products) {
				const listProduct = products.map((product, index) => ({
					productId: product.productId,
					sizeId: product.subSizeId ?? 0,
					variantId: product.variantId ?? 0,
					variantTypesValue:
						product.variant.productAttribute.variantTypes?.value,
					weight: product.size.weight,
					name: product.product.name,
					image: product.variant.image,
					quantity: product.quantity,
					ingredients:
						product.size.ingredients &&
						product.size.ingredients
							.map(ingredient => ingredient.name)
							.join(', '),
					price: product?.size?.price,
					productAttributeValue: product.variant.productAttribute.name,
					isReplace: product.isReplace,
					proportionId: product.size.proportion.id,
					proportionValue: product.size.proportion.value,
					type: product.product.type,

					variantTypesId:
						product.variant.productAttribute.variantTypesId ??
						product.variantId ??
						null,
					index: index,
				}))

				return {
					...state,
					subProducts: listProduct,
					originalSubProducts: listProduct,
				}
			}
			return state
		}),
	handleIsChange: (val: boolean) => set({ isChange: val }),
	changeDefaultProduct: (data: IChangeSubProduct) =>
		set(state => {
			return {
				...state,
				defaultProduct: {
					productId: data.productId,
					sizeId: data.sizeId,
					type: data.type,
					variantId: data.variantId,
					proportionId: data.proportionId,
					price: data.price,
					variantTypesId: data.variantTypesId,
				},
				infoProduct: {
					productId: data.productId,
					sizeId: data.sizeId,
					type: data.type,
					variantId: data.variantId,
					proportionId: data.proportionId,
					price: data.price,
					variantTypesId: data.variantTypesId,
				},
			}
		}),
	changeFindIndexProduct: (product: IChangeSubProduct, index: number) =>
		set(state => {
			const findIndexChangedProduct = state.subProducts.findIndex(
				val => val.index === index
			)

			return {
				findIndexChangedProduct: findIndexChangedProduct,
				isChange: true,
				selectedProduct: {
					productId: product.productId,
					sizeId: product.productId,
					variantId: product.variantId,
					index: findIndexChangedProduct,
				},
			}
		}),
	changeVariant: (
		variant: number,
		variantValue: string | null | undefined,
		image: string,
		variantId: number | null
	) => {
		set(state => {
			if (state.findIndexChangedProduct === null) {
				return state
			}
			const newArrayProduct = [...state.subProducts]
			newArrayProduct[state.findIndexChangedProduct] = {
				...newArrayProduct[state.findIndexChangedProduct],
				variantTypesId: variant,
				...(variantId && { variantId: variantId }),
				...(variantValue && { variantTypesValue: variantValue }),
				...(image && { image }),
			}

			return {
				...state,
				subProducts: newArrayProduct,
				infoProduct: {
					...state.infoProduct,
					variantTypesId: variant,
				},
				defaultProduct: {
					...state.defaultProduct,
					variantTypesId: variant,
				},
			}
		})
		get().addChangedProductsToArray()
	},
	arraySubProduct: [],
	addChangedProductsToArray: () => {
		const getChangedProduct = get().subProducts.filter((product, index) => {
			const originalProduct = get().originalSubProducts[index]
			return (
				product.productId !== originalProduct.productId ||
				product.variantTypesId !== originalProduct.variantTypesId
			)
		})
		const filterProduct: ICartSubProduct[] = getChangedProduct.map(product => ({
			subProductId: product.productId,
			variantId: product.variantId,
			sizeId: product.sizeId,
			index: product.index,
		}))

		const filterNewProductPrice = getChangedProduct.map(product => ({
			index: product.index,
			price: product.price,
			id: product.productId,
		}))

		set(state => {
			return {
				...state,
				arraySubProduct: filterProduct,
				priceNewProduct: filterNewProductPrice,
			}
		})
	},

	removeSelectedAndChangedProduct: () =>
		set(state => {
			return {
				...state,
				selectedProduct: null,
				findIndexChangedProduct: null,
				isChange: false,
				priceNewProduct: [],
				arraySubProduct: [],
			}
		}),
}))
