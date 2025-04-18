import { NewPasswordForm } from '@/app/features/auth/components'
import { Metadata } from 'next'
import { Suspense } from 'react'
export const metadata: Metadata = {
	title: 'Новый пароль',
}

function Page() {
	return (
		<div className=''>
			<Suspense>
				<NewPasswordForm />
			</Suspense>
		</div>
	)
}

export default Page
