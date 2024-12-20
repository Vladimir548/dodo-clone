import DialogCustom from '@/components/shared/DialogCustom'
import { URL_API } from '@/constants'
import { IProduct } from '@/interface/interface-product'
import Image from 'next/image'
import ChooseCardModal from './ChooseCardModal'
interface IProps {
	product: IProduct
	defaultSize?: number
	defaultVariant?: number
}

function ChooseProductCard({ product, defaultSize, defaultVariant }: IProps) {
	return (
		<DialogCustom
			trigger={
				<div className='flex cursor-pointer flex-col shadow-[0px_1px_2px] shadow-[#0605323d] dark:shadow-[#8e8be448] rounded-md p-2 hover:shadow-primary'>
					<Image
						src={`${URL_API}/${product.image}`}
						width={150}
						height={150}
						alt={product.name}
					/>
					<h3 className='text-center line-clamp-2'>{product.name}</h3>
				</div>
			}
			classContent='w-[960px] h-[80%] rounded-md bg-white dark:bg-dark-background backdrop-blur-lg flex gap-x-3'
			content={
				<ChooseCardModal
					productId={product.id}
					defaultSize={defaultSize}
					defaultVariant={defaultVariant}
				/>
			}
		/>
	)
}

export default ChooseProductCard
