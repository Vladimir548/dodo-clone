import { ICategory } from './interface-category'

export interface IProportion {
	id: number
	value: string
	categories: ICategory[]
}

export interface IProportionData {
	id: number
	value: string
	categories: number[]
}
