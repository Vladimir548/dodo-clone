'use client'

import { QueryDeliveryAddress } from '@/app/api/query-delivery-address'
import { toastMessageHandler } from '@/lib/toast-message-handler'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

function useDeleteAddress() {
	const queryClient = useQueryClient()
	const { mutate, isPending } = useMutation({
		mutationKey: ['delete-address'],
		mutationFn: (id: number) => QueryDeliveryAddress.delete(id),
		onSuccess() {
			toast.success('Адрес удален')
			queryClient.invalidateQueries({ queryKey: ['user delivery address'] })
		},
		onError(error) {
			toastMessageHandler(error)
		},
	})

	return { mutate, isPending }
}

export default useDeleteAddress
