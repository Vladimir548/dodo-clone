'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useSocialAuth } from '../hooks/useSocialAuth'
import { TypeProvider } from '../types'

function AuthSocial() {
	const { mutateAsync } = useSocialAuth()
	const { push } = useRouter()

	const handleProvider = async (provider: TypeProvider) => {
		const { url } = await mutateAsync(provider)

		if (url) {
			push(url)
		}
	}

	return (
		<>
			<div className='grid grid-cols-2 gap-7'>
				<Button
					onClick={() => handleProvider('google')}
					variant={'outline'}
					className='flex gap-x-2 items-center fill-primary hover:fill-white'
				>
					<svg
						width={'20px'}
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 488 512'
					>
						<path d='M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z' />
					</svg>
					Google
				</Button>
				<Button
					onClick={() => handleProvider('yandex')}
					variant={'outline'}
					className='flex gap-x-2 items-center fill-primary hover:fill-white'
				>
					<svg
						width={'20px'}
						height={'26px'}
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 256 512'
					>
						<path d='M153.1 315.8L65.7 512H2l96-209.8c-45.1-22.9-75.2-64.4-75.2-141.1C22.7 53.7 90.8 0 171.7 0H254v512h-55.1V315.8h-45.8zm45.8-269.3h-29.4c-44.4 0-87.4 29.4-87.4 114.6 0 82.3 39.4 108.8 87.4 108.8h29.4V46.5z' />
					</svg>
					Яндекс
				</Button>
			</div>
			<div className='relative mb-2 space-y-4'>
				<div className='absolute inset-0 flex items-center'>
					<span className='w-full border-t' />
				</div>
				<div className='relative flex justify-center text-xs uppercase mt-1'>
					<span className='bg-white  px-2 dark:text-white/70 dark:bg-dark-background text-muted-foreground'>
						Или
					</span>
				</div>
			</div>
		</>
	)
}

export default AuthSocial
