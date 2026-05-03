import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: { userAgent: '*', allow: '/', disallow: '/private/' },
        sitemap: 'https://conquer-fragrance.com/sitemap.xml',
    }
}
