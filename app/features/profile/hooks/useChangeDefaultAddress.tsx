'use client'

import { QueryDeliveryAddress } from '@/app/api/query-delivery-address'
import { toastMessageHandler } from '@/lib/toast-message-handler'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

function useChangeDefaultAddress() {
	const queryClient = useQueryClient()
	const { mutate, isPending } = useMutation({
		mutationKey: ['change-default-delivery-address'],
		mutationFn: (id: number) => QueryDeliveryAddress.changeDefaultAddress(id),
		onSuccess() {
			toast.success('Данные изменены')
			queryClient.invalidateQueries({ queryKey: ['user delivery address'] })
		},
		onError(error) {
			toastMessageHandler(error)
		},
	})

	return { mutate, isPending }
}

export default useChangeDefaultAddress
