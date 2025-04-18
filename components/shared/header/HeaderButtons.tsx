'use client'

import DialogCart from '@/components/cart/DialogCart'
import HeaderLogin from '@/components/shared/header/HeaderLogin'

export default function HeaderButtons() {
	return (
		<div className='flex items-center gap-x-2'>
			<HeaderLogin />
			<div className=''>
				<DialogCart />
			</div>
		</div>
	)
}
