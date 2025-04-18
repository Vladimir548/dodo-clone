import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useRouter } from 'next/navigation'

import { toastMessageHandler } from '@/lib/toast-message-handler'
import { toast } from 'sonner'
import { TypeLoginSchema } from '../schemes/login.schema'
import { AuthService } from '../services/auth.service'

export function useLoginAuth() {
	const router = useRouter()

	const queryClient = useQueryClient()
	const { mutate, isPending } = useMutation({
		mutationKey: ['login-user'],
		mutationFn: ({
			body,
			recaptcha,
		}: {
			body: TypeLoginSchema
			recaptcha: string
		}) => AuthService.login(body, recaptcha),
		onSuccess(data) {
			if (data.message) {
				toast.success('Код подтверждения', {
					description: 'Код подтверждения отправлен вам на почту',
				})
				router.push(`/auth/login/two-factor?id=${data.id}`)
			} else {
				queryClient.invalidateQueries({queryKey:['user data']})
				toast.success('Успешная авторизация')
				router.push('/profile')
			}
		},
		onError(error) {
			toastMessageHandler(error)
		},
	})

	return { mutate, isPending }
}
