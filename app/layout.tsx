import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { StoreProvider } from '@/lib/store-context'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: 'Conquer Fragrance | Premium Perfume Brand in Bangladesh',
    description: 'Buy authentic perfumes and gift sets from Conquer Fragrance. Long-lasting luxury scents in Bangladesh with fast delivery.',
    metadataBase: new URL('https://conquer-fragrance.com'),
    keywords: ['conquer fragrance', 'conquer', 'fragrance', 'no1 conquer', 'perfume'],
    applicationName: 'conquer',
    robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    icons: {
        icon: '/favicon.ico',
    },
    openGraph: {
        title: "Conquer Fragrance",
        description: "Premium perfumes in Bangladesh",
        url: "https://conquer-fragrance.com",
        siteName: "Conquer Fragrance",
        images: [
            {
                url: "/conquer.svg",
                width: 1200,
                height: 630,
            },
        ],
        locale: "en_US",
        type: "website",
    },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
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
