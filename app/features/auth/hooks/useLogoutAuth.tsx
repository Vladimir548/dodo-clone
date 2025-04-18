import { useMutation } from '@tanstack/react-query'

import { toastMessageHandler } from '@/lib/toast-message-handler'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { AuthService } from '../services/auth.service'

export function useLogoutAuth() {
	const { push } = useRouter()
	const { mutate, isPending } = useMutation({
		mutationKey: ['logout-user'],
		mutationFn: () => AuthService.logout(),
		onSuccess() {
			toast.success('Вы вышли из аккаунта')
			push('/auth/login')
		},
		onError(error) {
			toastMessageHandler(error)
		},
	})

	return { mutate, isPending }
}
