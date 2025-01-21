import { QueryProduct } from '@/app/api/query-product'
import { URL_API } from '@/constants'
import { TypeProduct } from '@/interface/enums'
import { ProductService } from '@/services/product.service'
import { useHalvesStore } from '@/store/halves'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'

function HalfListPizza() {
	const { data } = useQuery({
		queryKey: ['pizza'],
		queryFn: () => QueryProduct.byType(TypeProduct.PIZZA),
	})

	const addHalf = useHalvesStore(state => state.addHalf)
	const leftHalf = useHalvesStore(state => state.leftHalf)
	const rightHalf = useHalvesStore(state => state.rightHalf)
	const selectedVariant = useHalvesStore(state => state.selectedVariant)
	const selectedSize = useHalvesStore(state => state.selectedSize)
	if (!data) return ''
	return (
		<div className='flex flex-wrap items-center gap-3 max-w-[800px] '>
			{data
				?.filter(val =>
					val.productVariant.some(
						product =>
							product.productAttribute.variantTypesId === selectedVariant &&
							product.sizes.some(size => size.proportionId === selectedSize)
					)
				)
				.map(pizza => (
					<div
						className={`w-[170px] overflow-hidden cursor-pointer relative border rounded-md p-1 ${
							leftHalf?.id === pizza.id || rightHalf?.id === pizza.id
								? 'border-primary'
								: 'border-transparent'
						}`}
						key={pizza.id}
						onClick={() =>
							addHalf({
								id: pizza.id,
								name: pizza.name,
								img: pizza.image,
								variantId: pizza.productVariant.find(
									variant =>
										variant.productAttribute.variantTypesId === selectedVariant
								)?.id,
								sizeId: pizza.productVariant
									.find(
										variant =>
											variant.productAttribute.variantTypesId ===
											selectedVariant
									)
									?.sizes.find(size => size.proportionId === selectedSize)?.id,
								ingredients: pizza.ingredients
									? pizza.ingredients
											.map(ingredient => ingredient.name)
											.join(', ')
									: '',
								price: pizza.productVariant
									.find(
										variant =>
											variant.productAttribute.variantTypesId ===
											selectedVariant
									)
									?.sizes.find(size => size.proportionId === selectedSize)
									?.price,
							})
						}
					>
						<div className='relative'>
							<span
								className={`absolute top-0 w-1/2 h-full   ${
									leftHalf?.id === pizza.id
										? ' right-0 rounded-r-3xl bg-white/70  dark:bg-[#121212e0]'
										: rightHalf?.id === pizza.id
										? ' left-0 rounded-l-3xl bg-white/70  dark:bg-[#121212e0] '
										: ''
								}`}
							></span>
							<Image
								src={`${URL_API}/${
									pizza.productVariant.find(
										variant =>
											variant.productAttribute.variantTypesId ===
											selectedVariant
									)?.image
								}`}
								width={170}
								height={170}
								alt={pizza.name}
							/>
						</div>
						<p className='text-center flex-nowrap line-clamp-2'>{pizza.name}</p>
						<p className='text-center'>
							{Math.ceil(
								Number(
									ProductService.getPrice(pizza, selectedVariant, selectedSize)
								) / 2
							)}{' '}
							₽
						</p>
					</div>
				))}
		</div>
	)
}

export default HalfListPizza
