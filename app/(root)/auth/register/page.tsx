import RegisterForm from '@/app/features/auth/components/RegisterForm'
import { Metadata } from 'next'
export const metadata: Metadata = {
	title: 'Регистрация',
	description: 'Страница для регистрации',
}

function Page() {
	return (
		<div className='m-auto py-2'>
			<RegisterForm />
		</div>
	)
}

export default Page
