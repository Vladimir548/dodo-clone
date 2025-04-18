import { productTypesConstructor } from '@/data/productTypesConstructor'
import { productTypesWithSubProducts } from '@/data/productTypesWithSubProducts'
import { TypeProduct } from '@/interface/enums'
import { IProduct } from '@/interface/interface-product'
import placeholder from '/public//placeholder.svg'
export interface ISubProductForPrice {
	id: number
	index: number
	price: number
}

export const ProductService = {
	calcSumPrice(
		data: IProduct | undefined,
		selectedSize: number | undefined | null,
		selectedVariant?: number | null,
		customProducts?: ISubProductForPrice[],
		priceIngredients?: number
	) {
		if (customProducts && customProducts?.length > 0) {
			let totalPrice = 0
			const findProduct = data?.productVariant.find(variant =>
				variant.productAttribute.variantTypesId
					? variant.productAttribute.variantTypesId === selectedVariant
					: variant.productAttribute.productVariantId === selectedVariant
			)

			if (data?.type === TypeProduct.PIZZA_HALF) {
				totalPrice = customProducts.reduce((acc, val) => acc + val.price, 0)
			}

			findProduct?.subProduct?.map((variant, index) => {
				if (customProducts.some(product => product.index === index)) {
					const customProduct = customProducts.find(
						product => product.index === index
					)?.price
					return (totalPrice += customProduct ?? 0)
				} else {
					return (totalPrice += variant.size.price)
				}
			})
			return totalPrice
		} else {
			if (data?.type && productTypesWithSubProducts.includes(data?.type)) {
				return data?.productVariant.find(
					variant =>
						variant.productAttribute.productVariantId === selectedVariant
				)?.priceKit
			} else {
				return data?.productVariant
					.find(
						val => val.productAttribute.productVariantId === selectedVariant
					)
					?.sizes.find(size => size.id === selectedSize)?.price
			}
		}
	},
	setDefaultSize(
		data: IProduct | undefined,
		selectedVariant: number | undefined
	) {
		if (data) {
			const getAvailableSize = data.productVariant
				.find(val =>
					val.productAttribute.variantTypesId
						? val.productAttribute.variantTypesId === selectedVariant
						: val.productAttribute.productVariantId === selectedVariant
				)
				?.sizes.map(size => size?.proportion?.id)

			if (getAvailableSize) return getAvailableSize.shift()
		}
	},
	setDefaultVariantProduct(data: IProduct | undefined) {
		if (data) {
			const isTypedId = data.productVariant.some(
				variant => variant.productAttribute.variantTypesId !== null
			)
			if (isTypedId) {
				return data.productVariant.find(variant => variant.sizes.length > 0)
					?.productAttribute.variantTypesId
			} else {
				if (productTypesWithSubProducts.includes(data.type)) {
					return data.productVariant.find(
						variant =>
							variant.subProduct?.length > 0 ||
							productTypesConstructor.includes(data.type)
					)?.productAttribute.productVariantId
				}
				return data.productVariant.find(variant => variant.sizes.length > 0)
					?.productAttribute.productVariantId
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
				.find(val =>
					val.productAttribute.variantTypesId
						? val.productAttribute.variantTypesId === selectedVariant
						: val.productAttribute.productVariantId === selectedVariant
				)
				?.sizes.find(size => size.proportion.id === selectedSize)?.proportion
				.value
		}
	},
	getWeight(
		data: IProduct | undefined,
		selectedVariant: number | undefined,
		selectedSize: number | undefined
	) {
		if (data) {
			return data.productVariant
				.find(val =>
					val.productAttribute.variantTypesId
						? val.productAttribute.variantTypesId === selectedVariant
						: val.productAttribute.productVariantId === selectedVariant
				)
				?.sizes.find(size => size.proportion.id === selectedSize)?.weight
		}
	},
	getImage(data: IProduct | undefined, selectedVariant: number | undefined) {
		if (data) {
			return (
				data.productVariant.find(val =>
					val.productAttribute.variantTypesId
						? val.productAttribute.variantTypesId === selectedVariant
						: val.productAttribute.productVariantId === selectedVariant
				)?.image ?? placeholder
			)
		}
	},
	getPrice(
		data: IProduct | undefined,
		selectedVariant: number | undefined | null,
		selectedSize: number | undefined | null
	) {
		if (data) {
			if (productTypesWithSubProducts.includes(data.type)) {
				return (
					data.productVariant.find(variant => variant.id === selectedVariant)
						?.priceKit ?? 0
				)
			} else {
				return (
					data.productVariant
						.find(val =>
							val.productAttribute.variantTypesId
								? val.productAttribute.variantTypesId === selectedVariant
								: val.productAttribute.productVariantId === selectedVariant
						)
						?.sizes.find(size => size.proportion.id === selectedSize)?.price ??
					0
				)
			}
		}
		return 0
	},
	getSize(
		data: IProduct | undefined,
		selectedVariant: number | undefined,
		selectedSize: number | undefined
	) {
		if (data) {
			return (
				data.productVariant
					.find(val =>
						val.productAttribute.variantTypesId
							? val.productAttribute.variantTypesId === selectedVariant
							: val.productAttribute.productVariantId === selectedVariant
					)
					?.sizes.find(size => size.proportion.id === selectedSize)?.proportion
					.value ?? null
			)
		}
		return null
	},
	getSizeId(
		data: IProduct | undefined,
		selectedVariant: number | undefined | null,
		selectedSize: number | undefined | null
	) {
		if (data) {
			return (
				data.productVariant
					.find(val =>
						val.productAttribute.variantTypesId
							? val.productAttribute.variantTypesId === selectedVariant
							: val.productAttribute.productVariantId === selectedVariant
					)
					?.sizes.find(size => size.proportion.id === selectedSize)?.id ?? null
			)
		}
		return null
	},
	getProportionId(
		data: IProduct | undefined,
		selectedVariant: number | undefined | null,
		selectedSize: number | undefined | null
	) {
		if (data) {
			return (
				data.productVariant
					.find(val =>
						val.productAttribute.variantTypesId
							? val.productAttribute.variantTypesId === selectedVariant
							: val.productAttribute.productVariantId === selectedVariant
					)
					?.sizes.find(size => size.proportion.id === selectedSize)
					?.proportionId ?? null
			)
		}
		return null
	},
	getVariant(data: IProduct | undefined, selectedVariant: number | undefined) {
		if (data) {
			const getVariantProduct = data.productVariant.find(val =>
				val.productAttribute.variantTypesId
					? val.productAttribute.variantTypesId === selectedVariant
					: val.productAttribute.productVariantId === selectedVariant
			)
			if (getVariantProduct?.productAttribute.variantTypesId) {
				return getVariantProduct.productAttribute.variantTypes.value ?? null
			} else {
				return getVariantProduct?.productAttribute.name ?? null
			}
		}
		return null
	},
	getVariantId(
		data: IProduct | undefined,
		selectedVariant: number | undefined | null
	) {
		if (data) {
			const getVariantProduct = data.productVariant.find(val =>
				val.productAttribute.variantTypesId
					? val.productAttribute.variantTypesId === selectedVariant
					: val.productAttribute.productVariantId === selectedVariant
			)
			if (getVariantProduct?.productAttribute.variantTypesId) {
				return getVariantProduct.productAttribute.productVariantId ?? null
			} else {
				return getVariantProduct?.productAttribute.productVariantId ?? null
			}
		}
		return null
	},
	getVariantTypeId(
		data: IProduct | undefined,
		selectedVariant: number | undefined
	) {
		if (data) {
			const getVariantProduct = data.productVariant.find(
				val => val.productAttribute.productVariantId === selectedVariant
			)

			return getVariantProduct?.productAttribute.variantTypesId ?? null
		}
		return null
	},
	getIngredients(
		data: IProduct | undefined,
		selectedVariant: number | undefined | null,
		selectedSize: number | undefined | null
	) {
		if (data) {
			return data.productVariant
				.find(val =>
					val.productAttribute.variantTypesId
						? val.productAttribute.variantTypesId === selectedVariant
						: val.productAttribute.productVariantId === selectedVariant
				)
				?.sizes.find(size => size.id === selectedSize)?.ingredients
		}
	},
	getIngredientsForProduct(data: IProduct | undefined) {
		if (data) {
			return data.ingredients.map(ingredient => ingredient.name).join(', ')
		}
	},
	getMinPrice(data: IProduct | undefined) {
		if (data) {
			if (productTypesWithSubProducts.includes(data.type)) {
				return Math.min(
					Number(
						...data.productVariant
							.filter(val => val.priceKit !== null)
							.map(variant => variant.priceKit)
							.flat()
					)
				)
			} else {
				return Math.min(
					...data.productVariant
						.map(val => val.sizes?.map(val => val.price))
						.flat()
				)
			}
		}
	},
}
