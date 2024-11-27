import { TypeDough } from '@/interface/enums'
import { ICartItem } from '@/interface/interface-cart-item'
import { IIngredient } from '@/interface/interface-ingredient'
import { IProduct } from '@/interface/interface-product'
import { IProductAttribute } from '@/interface/interface-product-attribute'
import { IProportion } from '@/interface/IProportion'

export interface IProductVariant {
	id: number
	parameterId: number
	quantity?: number
	productId: number
	image: string
	cartItems: ICartItem[]
	sizes: ISize[]
	product: IProduct
	doughName?: TypeDough
	file: File
	productAttribute: IProductAttribute
}
export interface ISize {
	id: number
	price: number
	weight: string
	sizeId: number
	ingredients?: IIngredient[]
	ingredientIds?: number[]
	proportion: IProportion
}
