'use client'

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import HalvesModal from './HalvesModal'
function PizzaHalves() {
	return (
		<Dialog>
			<DialogTrigger>
				<div className='w-[200px] h-[200px] rounded-md bg-slate-700 hover:bg-slate-500 ease-linear duration-200 flex items-center justify-center'>
					half
				</div>
			</DialogTrigger>
			<DialogContent
				className={cn(
					'w-[1160px] h-[90%] rounded-md bg-white dark:bg-dark-background backdrop-blur-lg '
				)}
			>
				<HalvesModal />
			</DialogContent>
		</Dialog>
	)
}

export default PizzaHalves
