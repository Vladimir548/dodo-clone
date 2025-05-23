import ProviderQuery from '@/providers/ProviderQuery'
import { Nunito } from 'next/font/google'
const nunito = Nunito({
	subsets: ['cyrillic'],
	variable: '--font-nunito',
	weight: ['400', '500', '600', '700', '800', '900'],
})
export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang='ru'>
			<body className={nunito.className}>
				<ProviderQuery>{children}</ProviderQuery>
			</body>
		</html>
	)
}
