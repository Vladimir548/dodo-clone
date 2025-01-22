import { IProduct } from '@/interface/interface-product'
import ChooseProductCard from './ChooseProductCard'

interface IList {
	data: IProduct[] | undefined
}

function ChooseProductList({ data }: IList) {
	return (
		<ul className='flex items-center gap-3'>
			{data?.map(product => (
				<li key={product.id}>
					<ChooseProductCard product={product} />
				</li>
			))}
		</ul>
	)
}

export default ChooseProductList
