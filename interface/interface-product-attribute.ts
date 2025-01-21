import { IVariant } from './interface-variant'

export interface IProductAttribute {
	id: number
	name: string
	productVariantId: number
	variantTypes: IVariant
	variantTypesId: number | null
}
