import { MessageCircle } from 'lucide-react'
import Image from 'next/image'

const Collection = () => {
    return (
        <section className="py-12 md:py-16">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">SHOP OUR COLLECTION</h2>
                    <p className="text-gray-500 text-sm">Our Delicious, Limited-Edition Collection</p>
                </div>

                <div className="flex justify-center mb-8">
                    <button className="border-2 border-gray-900 px-8 py-2 text-sm font-medium hover:bg-gray-900 hover:text-white transition-colors">
                        SHOP ALL
                    </button>
                </div>

                {/* Live Help Button */}
                <div className="fixed right-4 top-1/3 z-40 hidden lg:block">
                    <button className="bg-[#1a1a2e] text-white px-4 py-3 rounded-l-lg flex items-center gap-2 text-sm">
                        <MessageCircle className="w-4 h-4" />
                        LIVE HELP
                    </button>
                </div>

                {/* Category Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Women's Perfume */}
                    <div className="relative h-64 md:h-80 overflow-hidden group cursor-pointer">
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent z-10" />
                        <Image
                            src="/categories/womens.jpg"
                            alt="Women's Perfume"
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute bottom-4 left-4 z-20 text-white">
                            <h3 className="text-xl font-bold">WOMEN&apos;S PERFUME</h3>
                        </div>
                    </div>

                    {/* Men's Cologne */}
                    <div className="relative h-64 md:h-80 overflow-hidden group cursor-pointer">
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent z-10" />
                        <Image
                            src="/categories/mens.jpg"
                            alt="Men's Cologne"
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute bottom-4 left-4 z-20 text-white">
                            <h3 className="text-xl font-bold">MEN&apos;S COLOGNE</h3>
                            <p className="text-sm">Shop Now</p>
                        </div>
                    </div>

                    {/* Haircare */}
                    <div className="relative h-64 md:h-80 overflow-hidden group cursor-pointer">
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent z-10" />
                        <Image
                            src="/categories/haircare.jpg"
                            alt="Haircare"
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute bottom-4 left-4 z-20 text-white">
                            <h3 className="text-xl font-bold">HAIRCARE</h3>
                            <p className="text-sm">Shop Now</p>
                        </div>
                    </div>

                    {/* Skincare */}
                    <div className="relative h-64 md:h-80 overflow-hidden group cursor-pointer">
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent z-10" />
                        <Image
                            src="/categories/skincare.jpg"
                            alt="Skincare"
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute bottom-4 left-4 z-20 text-white">
                            <h3 className="text-xl font-bold">SKINCARE</h3>
                        </div>
                    </div>

                    {/* Gift Sets */}
                    <div className="relative h-64 md:h-80 overflow-hidden group cursor-pointer">
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent z-10" />
                        <Image
                            src="/categories/giftsets.jpg"
                            alt="Gift Sets"
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute bottom-4 left-4 z-20 text-white">
                            <h3 className="text-xl font-bold">GIFT SETS</h3>
                            <p className="text-sm">Shop Now</p>
                        </div>
                    </div>

                    {/* Best Sellers */}
                    <div className="relative h-64 md:h-80 overflow-hidden group cursor-pointer">
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent z-10" />
                        <Image
                            src="/categories/bestsellers.jpg"
                            alt="Best Sellers"
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute bottom-4 left-4 z-20 text-white">
                            <h3 className="text-xl font-bold">BEST SELLERS</h3>
                            <p className="text-sm">Shop Now</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Collection