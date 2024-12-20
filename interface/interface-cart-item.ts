import { IProduct } from '@/interface/interface-product'
import { IProductVariant } from '@/interface/interface-product-variant'
import { IProportion } from '@/interface/IProportion'
import { TypeProduct } from './enums'

export type ICartItemResponse = ICartItem[]

export interface ICartItem {
	id: number
	cartId: number
	typeProduct: TypeProduct
	subCartItem: ISubCartItem[]
	createdAt: string
	updatedAt: string
}
export interface ISubCartItem {
	id: number
	productVariantId: number
	productId: number
	sizeId: number
	quantity: number
	createdAt: string
	updatedAt: string
	ingredients: Ingredient[]
	productVariant: IProductVariant
	size: ISize
	product: IProduct
}

export interface Ingredient {
	id: number
	name: string
	price: number
	createdAt: string
	updatedAt: string
	image: string
	typeProduct: string[]
}
export interface ISize {
	id: number
	proportion: IProportion
	sizeId: number
	price: number
	weight: number
	productVariantId: number
}
