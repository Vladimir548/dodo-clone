import { QueryProduct } from '@/app/api/query-product'
import { URL_API } from '@/constants'
import { DATADOUGHTYPE } from '@/data/dough-type'
import { IIngredient } from '@/interface/interface-ingredient'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { ISideHalf } from './HalvesModal'

interface IHalfPizza {
	half: ISideHalf
	setHalf: (update: (prev: ISideHalf) => ISideHalf) => void
	size: number
	dough: number
}

function HalfListPizza({ half, setHalf, dough, size }: IHalfPizza) {
	const { data } = useQuery({
		queryKey: ['pizza'],
		queryFn: () => QueryProduct.byCategory(1),
	})
	const addHalf = (img: string, name: string, ingredients: IIngredient[]) => {
		if (img === half.leftHalf.img) {
			return setHalf(prev => ({
				...prev,
				leftHalf: {
					img: '',
					name: '',
					ingredients: [],
				},
			}))
		}
		if (img === half.rightHalf.img) {
			return setHalf(prev => ({
				...prev,
				rightHalf: {
					img: '',
					name: '',
					ingredients: [],
				},
			}))
		}
		if (!half.leftHalf.img) {
			return setHalf(prev => ({
				...prev,
				leftHalf: {
					img: img,
					name: name,
					ingredients: ingredients,
				},
			}))
		} else {
			return setHalf(prev => ({
				...prev,
				rightHalf: {
					img: img,
					name: name,
					ingredients: ingredients,
				},
			}))
		}
	}
	const typeDough = DATADOUGHTYPE.find(type => type.id === dough)?.value

	// useEffect(()=>{

	// },[typeDough])

	if (!data) return ''
	return (
		<div className='flex flex-wrap items-center gap-3 max-w-[800px] '>
			{data
				?.filter(val =>
					val.productVariant.map(variant =>
						variant.sizes.filter(size => size.proportion.value === '35 см')
					)
				)
				.map(pizza => (
					<div
						className={`w-[170px] overflow-hidden  relative border rounded-md p-1 ${
							half.leftHalf.img === pizza.image ||
							half.rightHalf.img === pizza.image
								? 'border-primary'
								: 'border-transparent'
						}`}
						key={pizza.id}
						onClick={() => addHalf(pizza.image, pizza.name, pizza.ingredients)}
					>
						<div className='relative'>
							<span
								className={`absolute top-0 w-1/2 h-full   ${
									half.leftHalf.img === pizza.image
										? ' right-0 rounded-r-3xl bg-white/70  dark:bg-[#121212e0]'
										: half.rightHalf.img === pizza.image
										? ' left-0 rounded-l-3xl bg-white/70  dark:bg-[#121212e0] '
										: ''
								}`}
							></span>
							<Image
								src={`${URL_API}/${
									pizza.productVariant.find(
										variant => variant.doughName === typeDough
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
									pizza.productVariant
										.map(
											variant =>
												variant.sizes.find(sz => sz.sizeId === size)?.price
										)
										.find(val => val !== undefined)
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
