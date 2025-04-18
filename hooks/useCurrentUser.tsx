'use client'

import { UserService } from '@/app/features/auth/services/user.service'
import { useQuery } from '@tanstack/react-query'

export default function useCurrentUser(): {
	userId: number
	cartId: number
} | null {
	const { data, isError } = useQuery({
		queryKey: ['user data'],
		queryFn: () => UserService.profile(),
	})

	if (data) {
		return { userId: Number(data.id), cartId: Number(data?.cart?.id) }
	}
	if (isError) {
		return null
	}

	return null
}
