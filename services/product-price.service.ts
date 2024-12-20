import { IProduct } from '@/interface/interface-product'

export const ProductPriceService = {
	selectedSize(
		data: IProduct | undefined,
		selectedSize: number | undefined,
		selectedVariant: number | undefined
	) {
		return data?.productVariant
			.find(variant => variant.productAttribute.id === selectedVariant)
			?.sizes.find(size => size.id === selectedSize)?.id
	},
	selectedVariant(
		data: IProduct | undefined,
		selectedVariant: number | undefined
	) {
		return data?.productVariant.find(
			variant => variant.productAttribute.id === selectedVariant
		)?.id
	},

	calcTotalSum(
		price: number | undefined,
		totalIngredients?: number | undefined
	) {
		if (!price) return 0
		if (totalIngredients) {
			return Number(price) + Number(totalIngredients)
		} else {
			return Number(price)
		}
	},
}
