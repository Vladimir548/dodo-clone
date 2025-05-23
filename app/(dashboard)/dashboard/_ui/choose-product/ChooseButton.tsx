import { Button } from '@/components/ui/button'
import { IProduct } from '@/interface/interface-product'
import { ProductService } from '@/services/product.service'
import { useChooseProduct } from '@/store/choose-product'
interface IProps {
	data: IProduct
	selectedSize: number | undefined
	selectedVariant: number | undefined
	count: number
	isReplace: boolean
}
function ChooseButton({
	data,
	selectedSize,
	selectedVariant,
	count,
	isReplace,
}: IProps) {
	const addProduct = useChooseProduct(state => state.addProduct)
	const getImage = ProductService.getImage(data, selectedVariant)
	const getPrice = ProductService.getPrice(data, selectedVariant, selectedSize)
	const getSize = ProductService.getSize(data, selectedVariant, selectedSize)

	const getProportionId = ProductService.getProportionId(
		data,
		selectedVariant,
		selectedSize
	)
	const getVariant = ProductService.getVariant(data, selectedVariant)
	const getVariantId = ProductService.getVariantId(data, selectedVariant)
	const getSizeId = ProductService.getSizeId(
		data,
		selectedVariant,
		selectedSize
	)
	const variantTypeId = ProductService.getVariantTypeId(data, selectedVariant)

	return (
		<Button
			className='w-full'
			onClick={() =>
				addProduct({
					productId: data.id,
					subSizeId: getSizeId ?? 0,
					variantId: getVariantId ?? 0,
					img: getImage,
					variantTypeId: variantTypeId,
					proportionId: getProportionId,
					name: data.name,
					price: getPrice,
					size: getSize,
					variant: getVariant,
					quantity: count,
					isReplace,
				})
			}
		>
			Добавить <span className='font-bold pl-2'>{getPrice} ₽</span>
		</Button>
	)
}

export default ChooseButton
