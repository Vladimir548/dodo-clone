import TwoFactorForm from '@/app/features/auth/components/TwoFactorForm'
import { Metadata } from 'next'
import { Suspense } from 'react'
export const metadata: Metadata = {
	title: 'Двухфакторная аутентификация',
	description: 'Страница прохождения двухфакторной аутентификации',
}

function Page() {
	return (
		<div className='m-auto'>
			<Suspense>
				<TwoFactorForm />
			</Suspense>
		</div>
	)
}

export default Page
