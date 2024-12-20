'use client'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import { ReactNode } from 'react'
function DialogCustom({
	trigger,
	content,
	classContent,
}: {
	trigger: ReactNode
	content: ReactNode
	classContent?: string
}) {
	return (
		<Dialog>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent className={cn(classContent)}>
				<VisuallyHidden.Root>
					<DialogHeader>
						<DialogTitle></DialogTitle>
						<DialogDescription></DialogDescription>
					</DialogHeader>
				</VisuallyHidden.Root>
				{content}
			</DialogContent>
		</Dialog>
	)
}

export default DialogCustom
