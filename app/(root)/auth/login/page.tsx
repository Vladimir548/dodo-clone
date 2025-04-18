import LoginForm from '@/app/features/auth/components/LoginForm'
import { Metadata } from 'next'
export const metadata: Metadata = {
	title: 'Войти',
	description: 'Страница для входа в систему',
}

function Page() {
	return (
		<div className='m-auto'>
			<LoginForm />
		</div>
	)
}

export default Page
