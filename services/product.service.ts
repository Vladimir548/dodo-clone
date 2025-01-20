import { productTypesConstructor } from '@/data/productTypesConstructor'
import { productTypesWithSubProducts } from '@/data/productTypesWithSubProducts'
import { TypeProduct } from '@/interface/enums'
import { IProduct } from '@/interface/interface-product'

export interface ISubProductForPrice {
	id: number
	index: number
	price: number
}

export const ProductService = {
	calcSumPrice(
		data: IProduct | undefined,
		selectedSize: number | undefined,
		selectedVariant?: number,
		customProducts?: ISubProductForPrice[]
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
					console.log('totalPrice', totalPrice)
					console.log('customProduct', customProduct)
					return (totalPrice += customProduct ?? 0)
				} else {
					console.log('variant size', variant.size.price)
					return (totalPrice += variant.size.price)
				}
			})
			return totalPrice
		} else {
			if (productTypesWithSubProducts.includes(data?.type)) {
				return data?.productVariant.find(
					variant =>
						variant.productAttribute.productVariantId === selectedVariant
				)?.priceKit
			} else {
				return data?.productVariant
					.find(val =>
						val.productAttribute.variantTypesId
							? val.productAttribute.variantTypesId === selectedVariant
							: val.productAttribute.productVariantId === selectedVariant
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
				)?.image ?? ''
			)
		}
	},
	getPrice(
		data: IProduct | undefined,
		selectedVariant: number | undefined,
		selectedSize: number | undefined
	) {
		if (data) {
			if (productTypesWithSubProducts.includes(data.type)) {
				return data.productVariant.find(
					variant => variant.id === selectedVariant
				)?.priceKit
			} else {
				return data.productVariant
					.find(val =>
						val.productAttribute.variantTypesId
							? val.productAttribute.variantTypesId === selectedVariant
							: val.productAttribute.productVariantId === selectedVariant
					)
					?.sizes.find(size => size.proportion.id === selectedSize)?.price
			}
		}
	},
	getSize(
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
	getSizeId(
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
				?.sizes.find(size => size.proportion.id === selectedSize)?.id
		}
	},
	getProportionId(
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
				?.sizes.find(size => size.proportion.id === selectedSize)?.proportionId
		}
	},
	getVariant(data: IProduct | undefined, selectedVariant: number | undefined) {
		if (data) {
			const getVariantProduct = data.productVariant.find(val =>
				val.productAttribute.variantTypesId
					? val.productAttribute.variantTypesId === selectedVariant
					: val.productAttribute.productVariantId === selectedVariant
			)
			if (getVariantProduct?.productAttribute.variantTypesId) {
				return getVariantProduct.productAttribute.variantTypes.value
			} else {
				return getVariantProduct?.productAttribute.name
			}
		}
	},
	getVariantId(
		data: IProduct | undefined,
		selectedVariant: number | undefined
	) {
		if (data) {
			const getVariantProduct = data.productVariant.find(val =>
				val.productAttribute.variantTypesId
					? val.productAttribute.variantTypesId === selectedVariant
					: val.productAttribute.productVariantId === selectedVariant
			)
			if (getVariantProduct?.productAttribute.variantTypesId) {
				return getVariantProduct.productAttribute.productVariantId
			} else {
				return getVariantProduct?.productAttribute.productVariantId
			}
		}
	},
	getIngredients(
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
