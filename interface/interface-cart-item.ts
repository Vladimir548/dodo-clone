import { IProduct } from '@/interface/interface-product'
import {
	IProductsSub,
	IProductVariant,
} from '@/interface/interface-product-variant'
import { IProportion } from '@/interface/IProportion'
import { TypeProduct } from './enums'

export type ICartItemResponse = ICartItem[]

export interface ICartItem {
	id: number
	cartId: number
	cartSubProduct: IProductsSub[]
	typeProduct: TypeProduct
	productVariantId: number
	productId: number
	sizeId: number
	quantity: number
	ingredients: Ingredient[]
	productVariant: IProductVariant
	size: ISize
	product: IProduct
	createdAt: string
	updatedAt: string
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
