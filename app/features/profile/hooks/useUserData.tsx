'use client'

import { useQuery } from '@tanstack/react-query'
import { UserService } from '../../auth/services/user.service'

function useUserData() {
	const { data, isPending } = useQuery({
		queryKey: ['user data'],
		queryFn: () => UserService.profile(),
	})

	return { data, isPending }
}

export default useUserData
