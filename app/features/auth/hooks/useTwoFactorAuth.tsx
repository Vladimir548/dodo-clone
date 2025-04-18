import { useMutation } from '@tanstack/react-query'

import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'

import { toastMessageHandler } from '@/lib/toast-message-handler'
import { AuthService } from '../services/auth.service'

export function useTwoFactorAuth() {
	const searchParams = useSearchParams()

	const idUser = searchParams.get('id')
	const router = useRouter()

	const { mutate, isPending } = useMutation({
		mutationKey: ['two-factor-login-user'],
		mutationFn: (code: string) => AuthService.twoFactor(code, idUser),
		onSuccess() {
			toast.success('Успешная авторизация')
			router.push('/dashboard/settings')
		},
		onError(error) {
			console.log(error)
			toastMessageHandler(error)
		},
	})

	return { mutate, isPending }
}
