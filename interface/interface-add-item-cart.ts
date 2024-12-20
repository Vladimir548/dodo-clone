import { TypeProduct } from './enums'

export interface IAddItemCart {
	typeProduct: TypeProduct
	subCartItem: ISubItemCart[]
	quantity: number
	cartId: number | undefined
}
interface ISubItemCart {
	productId: number
	ingredientIds: number[]

	productVariantId: number | undefined
	sizeId: number | undefined
}
