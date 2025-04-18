import Header from '@/components/shared/header/Header'
import { Toaster } from '@/components/ui/sonner'
import ProviderQuery from '@/providers/ProviderQuery'
import { ThemeProvider } from '@/providers/ThemeProvider'
import ToastProvider from '@/providers/ToastProvider'
import type { Metadata } from 'next'
import '../globals.css'

export const metadata: Metadata = {
	title: 'Pizza clone',
}

export default function RootLayout({
	children,
	modal,
}: Readonly<{ children: React.ReactNode; modal: React.ReactNode }>) {
	return (
		<body>
			<ToastProvider>
				<ThemeProvider
					attribute='class'
					enableSystem
					disableTransitionOnChange
					defaultTheme={'light'}
				>
					<ProviderQuery>
						<Header />
						<main className={'min-h-screen'}>{children}</main>
						{modal}
					</ProviderQuery>
				</ThemeProvider>
				<Toaster />
			</ToastProvider>
		</body>
	)
}
