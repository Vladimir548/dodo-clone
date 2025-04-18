import { toastMessageHandler } from '@/lib/toast-message-handler'
import { useMutation } from '@tanstack/react-query'
import { TypeRegisterSchema } from '../schemes'
import { AuthService } from '../services/auth.service'

export function useRegisterAuth() {
	const { mutate, isPending } = useMutation({
		mutationKey: ['register-user'],
		mutationFn: ({
			body,
			recaptcha,
		}: {
			body: TypeRegisterSchema
			recaptcha: string
		}) => AuthService.register(body, recaptcha),
		onSuccess(data) {
			toastMessageHandler(data)
		},
		onError(error) {
			toastMessageHandler(error)
		},
	})

	return { mutate, isPending }
}
