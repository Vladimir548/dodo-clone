'use client'

import { QueryProduct } from '@/app/api/query-product'
import { useQuery } from '@tanstack/react-query'

export default function useTypeProduct(id: number | string) {
	const { data } = useQuery({
		queryKey: ['get-id-product', id],
		queryFn: () => QueryProduct.id(id),
		enabled: !!id,
	})

	return { category: data?.categoryId, type: data?.type }
}
