import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { AuthService } from '../services/auth.service'

export const useVerificationAuth = () => {
	const { push } = useRouter()
	const { mutate } = useMutation({
		mutationKey: ['verification-email'],
		mutationFn: (token: string) => AuthService.verification(token),
		onSuccess() {
			toast.success('Почта успешно подтверждена')
			push('/dashboard/settings')
		},
		onError() {
			push('/auth/login')
		},
	})
	return { mutate }
}
