import VerificationForm from '@/app/features/auth/components/VerificationForm'
import { Metadata } from 'next'
import { Suspense } from 'react'
export const metadata: Metadata = {
	title: 'Подтверждение почты',
}

function Page() {
	return (
		<>
			<Suspense>
				<VerificationForm />
			</Suspense>
		</>
	)
}

export default Page
