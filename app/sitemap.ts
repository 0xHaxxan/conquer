import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        { url: 'https://conquer-fragrance.com', lastModified: new Date() },
    ]
}
