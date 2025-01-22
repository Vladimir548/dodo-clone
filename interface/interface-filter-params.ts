export interface IFilterParams {
	sizes: number[] | undefined
	ingredients?: number[] | undefined
	priceFrom?: number | undefined | null
	priceTo?: number | undefined | null
	variant?: number[] | undefined
}
