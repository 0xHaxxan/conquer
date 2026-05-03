import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { StoreProvider } from '@/lib/store-context'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: 'Conquer Fragrance | Premium Perfume Brand in Bangladesh',
    description: 'Explore Conquer Fragrance for authentic, long-lasting luxury perfumes and gift sets in Bangladesh. Experience premium scents with fast nationwide delivery.',
    keywords: ['Perfume in Bangladesh', 'Luxury Fragrance BD', 'Original Perfume shop', 'Conquer Fragrance', 'Best perfumes for men and women'],
    metadataBase: new URL('https://conquer-fragrance.com'),
    applicationName: 'Conquer Fragrance',
    verification: {
        google: 'NJdIfDnK3TyZMlp14rr9rvGzpw0k9jGR9fhVkFzRfXQ',
    },
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
        apple: '/apple-touch-icon.png', 
    },
    openGraph: {
        title: "Conquer Fragrance | Premium Perfumes in BD",
        description: "Buy authentic and long-lasting luxury perfumes from Conquer Fragrance. Fast delivery across Bangladesh.",
        url: "https://conquer-fragrance.com",
        siteName: "Conquer Fragrance",
        images: [
            {
                url: "/og-image.png", 
                width: 1200,
                height: 630,
                alt: "Conquer Fragrance Luxury Collection",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Conquer Fragrance | Premium Perfumes in BD",
        description: "Discover luxury scents at Conquer Fragrance.",
        images: ["/og-image.png"],
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
