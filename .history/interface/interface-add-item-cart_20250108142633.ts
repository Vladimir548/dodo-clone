import { TypeProduct } from './enums'

export interface IAddItemCart {
	typeProduct: TypeProduct
	quantity: number
	cartId: number | undefined
	productId: number
	ingredientIds: number[]
	customSubProduct: ICartSubProduct[]
	productVariantId: number | undefined
	sizeId: number | undefined
}
export interface ICartSubProduct {
	subProductId: number
	variantId: number
	sizeId: number
	index: number
}
