import { ResetPasswordForm } from '@/app/features/auth/components'
import { Metadata } from 'next'
export const metadata: Metadata = {
	title: 'Сброс пароля',
}

function Page() {
	return (
		<>
			<ResetPasswordForm />
		</>
	)
}

export default Page
