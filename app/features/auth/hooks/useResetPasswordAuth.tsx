import { toastMessageHandler } from '@/lib/toast-message-handler'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { TypeResetPasswordSchema } from '../schemes'
import { AuthService } from '../services/auth.service'

export function useResetPasswordAuth() {
	const { mutate, isPending } = useMutation({
		mutationKey: ['password-reset'],
		mutationFn: ({
			body,
			recaptcha,
		}: {
			body: TypeResetPasswordSchema
			recaptcha: string
		}) => AuthService.resetPassword(body, recaptcha),
		onSuccess() {
			toast.success('Проверьте почту', {
				description: 'На вашу почту была отправлена ссылка для подтверждения.',
			})
		},
		onError(error) {
			toastMessageHandler(error)
		},
	})

	return { mutate, isPending }
}
