import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { StoreProvider } from '@/lib/store-context'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: 'PerfumeShop - Authentic Designer Fragrances & Perfumes',
    description: 'Shop authentic designer perfumes, colognes, skincare, and gift sets at PerfumeShop. Trusted since 1997. Free shipping on orders over $100.',
    generator: 'v0.app',
    icons: {
        icon: [
            {
                url: '/icon-light-32x32.png',
                media: '(prefers-color-scheme: light)',
            },
            {
                url: '/icon-dark-32x32.png',
                media: '(prefers-color-scheme: dark)',
            },
            {
                url: '/icon.svg',
                type: 'image/svg+xml',
            },
        ],
        apple: '/apple-icon.png',
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" className="bg-white">
            <body className="font-sans antialiased">
                <StoreProvider>
                    {children}
                </StoreProvider>
                {process.env.NODE_ENV === 'production' && <Analytics />}
            </body>
        </html>
    )
}
