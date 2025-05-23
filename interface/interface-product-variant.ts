import { ICartItem } from '@/interface/interface-cart-item'
import { IIngredient } from '@/interface/interface-ingredient'
import { IProduct } from '@/interface/interface-product'
import { IProductAttribute } from '@/interface/interface-product-attribute'
import { IProportion } from '@/interface/IProportion'
import { TypeProduct } from './enums'

export interface IProductVariant {
	id: number
	parameterId: number
	quantity?: number
	productId: number
	image: string
	cartItems: ICartItem[]
	sizes: ISize[]
	product: IProduct
	file: File
	priceKit?: number
	productAttribute: IProductAttribute
	subProduct: IProductsSub[]
	parentType?: TypeProduct
}
export interface ISize {
	id: number
	price: number
	weight: string
	proportionId: number
	ingredients?: IIngredient[]
	ingredientIds?: number[]
	proportion: IProportion
}

export interface IProductsSub {
	productId: number
	variantId?: number | undefined
	variant: IProductVariant
	size: ISize
	product: IProduct
	subSizeId: number | undefined
	quantity: number
	isReplace: boolean
	index?: number
}
