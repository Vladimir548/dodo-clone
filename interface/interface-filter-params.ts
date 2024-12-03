import { TypeDough } from './enums'

export interface IFilterParams {
	sizes: number[] | undefined
	ingredients?: number[] | undefined
	priceFrom?: number | undefined
	priceTo?: number | undefined
	dough?: TypeDough[] | undefined
}
