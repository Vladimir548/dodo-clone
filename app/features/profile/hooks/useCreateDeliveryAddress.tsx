'use client'

import { QueryDeliveryAddress } from '@/app/api/query-delivery-address'
import { toastMessageHandler } from '@/lib/toast-message-handler'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { TypeDeliveryAddressCreateSchema } from '../schemas/delivery-addres-create.schema'

function useCreateDeliveryAddress() {
	const queryClient = useQueryClient()
	const { mutate, isPending } = useMutation({
		mutationKey: ['create-delivery-address'],
		mutationFn: (dto: TypeDeliveryAddressCreateSchema) =>
			QueryDeliveryAddress.create(dto),
		onSuccess() {
			toast.success('Адрес добавлен')
			queryClient.invalidateQueries({ queryKey: ['user delivery address'] })
		},
		onError(error) {
			toastMessageHandler(error)
		},
	})

	return { mutate, isPending }
}

export default useCreateDeliveryAddress
