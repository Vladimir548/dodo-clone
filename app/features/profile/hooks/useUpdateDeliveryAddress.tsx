'use client'

import { QueryDeliveryAddress } from '@/app/api/query-delivery-address'
import { toastMessageHandler } from '@/lib/toast-message-handler'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { TypeDeliveryAddressCreateSchema } from '../schemas/delivery-addres-create.schema'

function useUpdateDeliveryAddress() {
	const queryClient = useQueryClient()

	const { mutate, isPending } = useMutation({
		mutationKey: ['update-delivery-address'],
		mutationFn: ({
			id,
			dto,
		}: {
			id: number
			dto?: TypeDeliveryAddressCreateSchema
		}) => QueryDeliveryAddress.update(id, dto),
		onSuccess() {
			toast.success('Данные изменены ')
			queryClient.invalidateQueries({ queryKey: ['user delivery address'] })
		},
		onError(error) {
			toastMessageHandler(error)
		},
	})

	return { mutate, isPending }
}

export default useUpdateDeliveryAddress
