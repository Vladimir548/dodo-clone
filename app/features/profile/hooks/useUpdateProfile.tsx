'use client'

import { toastMessageHandler } from '@/lib/toast-message-handler'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { TypeProfileSchema } from '../../auth/schemes/profile.schema'
import { UserService } from '../../auth/services/user.service'

function useUpdateProfile() {
	const { mutate, isPending, isSuccess } = useMutation({
		mutationKey: ['change-phone'],
		mutationFn: (profile: TypeProfileSchema) => UserService.update(profile),
		onSuccess() {
			toast.success('Данные изменены ')
		},
		onError(error) {
			toastMessageHandler(error)
		},
	})

	return { mutate, isPending, isSuccess }
}

export default useUpdateProfile
