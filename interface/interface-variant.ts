import { TypeProduct } from './enums'

export interface IVariant {
	id: number | null
	value: string | null
	categories: number[]
	typeProduct: TypeProduct
}
