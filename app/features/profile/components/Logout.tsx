'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AuthService } from '../../auth/services/auth.service'
import { LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

function Logout() {
	const { push } = useRouter()
	const queryClient = useQueryClient()
	const { mutate } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => AuthService.logout(),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['user data'] })
			push('/')
			toast('Вы вышли из профиля')
		},
	})

	return (
		<Button onClick={() => mutate()}>
			<LogOut />
		</Button>
	)
}

export default Logout
