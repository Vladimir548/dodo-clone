import { toastMessageHandler } from '@/lib/toast-message-handler'
import { useMutation } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import { TypeNewPasswordSchema } from '../schemes'
import { AuthService } from '../services/auth.service'

export function useNewPasswordAuth() {
	const { push } = useRouter()
	const searchParams = useSearchParams()

	const token = searchParams.get('token')
	const { mutate, isPending } = useMutation({
		mutationKey: ['password-new'],
		mutationFn: ({
			body,
			recaptcha,
		}: {
			body: TypeNewPasswordSchema
			recaptcha: string
		}) => AuthService.newPassword(body, token, recaptcha),
		onSuccess() {
			toast.success('Пароль успешно изменен')
			push('/dashboard/settings')
		},
		onError(error) {
			toastMessageHandler(error)
		},
	})

	return { mutate, isPending }
}
