'use client'
import DialogCustom from '@/components/shared/DialogCustom'
import { Button } from '@/components/ui/button'
import ChooseProductModal from './ChooseProductModal'
function ChooseProduct() {
	return (
		<>
			<DialogCustom
				content={<ChooseProductModal />}
				trigger={<Button>Выберите товары</Button>}
				classContent='w-[1160px] h-[90%] rounded-md bg-white dark:bg-dark-background backdrop-blur-lg'
			/>
		</>
	)
}

export default ChooseProduct
