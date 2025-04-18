'use client'

import { QueryOrder } from '@/app/api/query-order'
import { useQuery } from '@tanstack/react-query'

function useOrderData() {
	const { data, isPending } = useQuery({
		queryKey: ['user order'],
		queryFn: () => QueryOrder.findId(),
	})

	return { data, isPending }
}

export default useOrderData
