import { TypeProduct } from '@/interface/enums'
import { IIngredient } from '@/interface/interface-ingredient'
import { IProductVariant } from '@/interface/interface-product-variant'

export interface ISearchProduct {
	type: IProduct[]
}

export interface IProduct {
	id: number
	name: string
	categoryId: number
	type: TypeProduct
	createdAt: Date
	updatedAt: Date
	description?: string
	image: string
	ingredients: IIngredient[]
	file: File
	productVariant: IProductVariant[]
}
