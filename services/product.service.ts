import { productTypesWithSubProducts } from '@/data/productTypesWithSubProducts'
import { TypeDough } from '@/interface/enums'
import { IProduct } from '@/interface/interface-product'

export const ProductService = {
	isSizeTypeDough(
		data: IProduct | undefined,
		selectedDough: TypeDough,
		sizeId: number
	) {
		return !data?.productVariant
			?.find(find => find?.doughName === selectedDough)
			?.sizes.some(type => type.sizeId === sizeId)
	},
	calcSumPrice(
		data: IProduct | undefined,
		selectedSize: number | undefined,
		selectedVariant?: number
	) {
		if (productTypesWithSubProducts.includes(data?.type)) {
			return data?.productVariant.find(
				variant => variant.productAttribute.id === selectedVariant
			)?.priceKit
		} else {
			return data?.productVariant
				.find(variant => variant.productAttribute.id === selectedVariant)
				?.sizes.find(size => size.sizeId === selectedSize)?.price
		}
	},
	setDefaultSize(
		data: IProduct | undefined,
		selectedVariant: number | undefined
	) {
		if (data) {
			const getAvailableSize = data.productVariant
				.find(variant => variant.productAttribute.id === selectedVariant)
				?.sizes.map(size => size.sizeId)

			if (getAvailableSize) return getAvailableSize.shift()
		}
	},
	setDefaultVariantProduct(data: IProduct | undefined) {
		if (data) {
			if (productTypesWithSubProducts.includes(data.type)) {
				const findAvailableVariant = data.productVariant.find(
					variant => variant.subProduct.length > 0
				)?.productAttribute.productVariantId
				return findAvailableVariant
			} else {
				const findAvailableVariant = data.productVariant.find(
					variant => variant.sizes.length > 0
				)?.productAttribute.id
				return findAvailableVariant
			}
		}
	},
	getProportion(
		data: IProduct | undefined,
		selectedVariant: number | undefined,
		selectedSize: number | undefined
	) {
		if (data) {
			return data.productVariant
				?.find(variant => variant.productAttribute.id === selectedVariant)
				?.sizes.find(size => size.sizeId === selectedSize)?.proportion.value
		}
	},
	getWeight(
		data: IProduct | undefined,
		selectedVariant: number | undefined,
		selectedSize: number | undefined
	) {
		if (data) {
			return data.productVariant
				.find(variant => variant.productAttribute.id === selectedVariant)
				?.sizes.find(size => size.sizeId === selectedSize)?.weight
		}
	},
	getImage(data: IProduct | undefined, selectedVariant: number | undefined) {
		if (data) {
			return data.productVariant.find(
				val => val.productAttribute.productVariantId === selectedVariant
			)?.image
		}
	},
	getPrice(
		data: IProduct | undefined,
		selectedVariant: number | undefined,
		selectedSize: number | undefined
	) {
		if (data) {
			return data.productVariant
				.find(
					variant =>
						variant.productAttribute.productVariantId === selectedVariant
				)
				?.sizes.find(size => size.sizeId === selectedSize)?.price
		}
	},
	getSize(
		data: IProduct | undefined,
		selectedVariant: number | undefined,
		selectedSize: number | undefined
	) {
		if (data) {
			return data.productVariant
				.find(
					variant =>
						variant.productAttribute.productVariantId === selectedVariant
				)
				?.sizes.find(size => size.sizeId === selectedSize)?.proportion.value
		}
	},
	getVariant(data: IProduct | undefined, selectedVariant: number | undefined) {
		if (data) {
			return data.productVariant.find(
				variant => variant.productAttribute.productVariantId === selectedVariant
			)?.productAttribute.name
		}
	},
	getIngredients(
		data: IProduct | undefined,
		selectedVariant: number | undefined,
		selectedSize: number | undefined
	) {
		if (data) {
			return data.productVariant
				.find(variant => variant.productAttribute.id === selectedVariant)
				?.sizes.find(size => size.sizeId === selectedSize)?.ingredients
		}
	},
}
