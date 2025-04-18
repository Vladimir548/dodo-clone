'use client'
import { Toaster } from '@/components/ui/sonner'
export default function ToastProvider({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<>
			<Toaster position='bottom-right' richColors />
			{children}
		</>
	)
}
