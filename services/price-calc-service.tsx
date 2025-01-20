import { productTypesWithSubProducts } from '@/data/productTypesWithSubProducts'
import { TypeProduct } from '@/interface/enums'
import { ICartItem } from '@/interface/interface-cart-item'

export const PriceCalcService = (data: ICartItem) => {
	let totalPrice = 0

	if (productTypesWithSubProducts.includes(data.product.type)) {
		if (data.productVariant.subProduct.length > 0) {
			let priceCartProduct = 0
			data.productVariant.subProduct.forEach((product, index) => {
				if (data.cartSubProduct.some(product => product.index === index)) {
					const findProduct = data?.cartSubProduct.find(
						product => product.index === index
					)?.size.price
					return (priceCartProduct += findProduct ?? 0)
				} else {
					return (priceCartProduct += product.size.price)
				}
			})
			return (totalPrice = priceCartProduct * data.quantity)
		} else {
			totalPrice = data.cartSubProduct.reduce((acc, val) => {
				return (acc += val.size.price * data.quantity)
			}, 0)
		}
	}
	if (
		data.cartSubProduct.length === 0 &&
		data.productVariant.subProduct.length === 0
	) {
		totalPrice =
			(data?.size?.price +
				data.ingredients.reduce((acc, val) => acc + val.price, 0)) *
			data.quantity
	}
	if (data.product.type === TypeProduct.PIZZA_HALF) {
		return totalPrice / 2
	}
	return totalPrice
}
