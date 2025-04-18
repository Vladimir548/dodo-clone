import { toastMessageHandler } from '@/lib/toast-message-handler'
import { useMutation } from '@tanstack/react-query'
import { AuthService } from '../services/auth.service'
import { TypeProvider } from '../types'

export function useSocialAuth() {
	const { mutateAsync } = useMutation({
		mutationKey: ['social-auth'],
		mutationFn: async (provider: TypeProvider) =>
			await AuthService.oauthByProvider(provider),
		onSuccess(data) {
			toastMessageHandler(data)
		},
		onError(error) {
			toastMessageHandler(error)
		},
	})

	return { mutateAsync }
}
