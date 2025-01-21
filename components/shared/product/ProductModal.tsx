'use client'
import ProductId from '@/app/(root)/product/[id]/ProductId'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { usePathname, useRouter } from 'next/navigation'

export default function ProductModal() {
	const pathname = usePathname()
	const { back } = useRouter()

	return (
		<Dialog open={pathname.includes('product')} onOpenChange={() => back()}>
			<DialogContent
				className={cn(
					'w-[1160px] h-[90%] rounded-md bg-white dark:bg-dark-background backdrop-blur-lg '
				)}
			>
				<VisuallyHidden>
					<DialogHeader>
						<DialogTitle> </DialogTitle>
						<DialogDescription> </DialogDescription>
					</DialogHeader>
				</VisuallyHidden>
				<ProductId modalClass={true} />
			</DialogContent>
		</Dialog>
	)
}
