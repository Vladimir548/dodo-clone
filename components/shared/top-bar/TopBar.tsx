'use client'

import Container from '@/components/shared/Container'
import Categories from '@/components/shared/top-bar/Categories'
import Sorting from '@/components/shared/top-bar/Sorting'

export default function TopBar() {
	return (
		<>
			<div
				className={
					'pt-6 z-10 sticky dark:bg-[#121212cc] backdrop-blur-lg bg-white left-0 top-0 w-full border-b dark:border-primary/30 pb-5 '
				}
			>
				<Container className={'flex items-center justify-between gap-x-6'}>
					<Categories />
					<Sorting />
				</Container>
			</div>
		</>
	)
}
