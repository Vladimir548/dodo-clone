'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useVerificationAuth } from '../hooks/useVerificationAuth'
import AuthWrapper from './AuthWrapper'

function VerificationForm() {
	const searchParams = useSearchParams()

	const token = searchParams.get('token')

	const { mutate } = useVerificationAuth()

	useEffect(() => {
		if (token) {
			mutate(token)
		}
	}, [token])

	return (
		<AuthWrapper heading='Подтверждение почты'>
			<div className='flex justify-center items-center py-4'>
				Пожалуйста подождите{' '}
			</div>
		</AuthWrapper>
	)
}

export default VerificationForm
