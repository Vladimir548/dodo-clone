'use client'
import ProductIdAll from '@/app/(root)/product/[id]/ProductIdAll'
import ProductIdPizza from '@/app/(root)/product/[id]/ProductIdPizza'
import { QueryProduct } from '@/app/api/query-product'
import { productTypesWithSubProducts } from '@/data/productTypesWithSubProducts'
import { TypeProduct } from '@/interface/enums'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import ProductIdCombo from './ProductIdCombo'

interface IProductId {
	modalClass?: boolean
}

export default function ProductId({ modalClass }: IProductId) {
	const { id } = useParams<{ id: string }>()
	const { data, isPending } = useQuery({
		queryKey: ['get-product-id', id],
		queryFn: () => QueryProduct.id(id),
	})
	return (
		<div>
			{TypeProduct.PIZZA === data?.type && (
				<ProductIdPizza
					data={data}
					isPending={isPending}
					modalClass={modalClass}
				/>
			)}
			{productTypesWithSubProducts.includes(data?.type) && (
				<ProductIdCombo
					data={data}
					isPending={isPending}
					modalClass={modalClass}
				/>
			)}
			{TypeProduct.DRINKS === data?.type && (
				<ProductIdAll data={data} modalClass={modalClass} />
			)}
		</div>
	)
}
