import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'
import './globals.css'
import Providers from './providers'

const notoSans = Noto_Sans({
	subsets: ['latin', 'cyrillic'],
	weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
	title: 'Dashboard',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={`${notoSans.className} antialiased`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
