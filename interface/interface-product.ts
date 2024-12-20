import { TypeProduct } from '@/interface/enums'
import { IIngredient } from '@/interface/interface-ingredient'
import { IProductVariant } from '@/interface/interface-product-variant'
import { ICategory } from './interface-category'

export interface ISearchProduct {
	type: IProduct[]
}

export interface IProduct {
	id: number
	name: string
	category: ICategory
	categoryId: number
	type: TypeProduct
	createdAt: Date
	updatedAt: Date
	description?: string
	image: string
	ingredients: IIngredient[]
	ingredientIds: number[]
	file: File
	parentId: number
	productVariant: IProductVariant[]
}
