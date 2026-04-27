"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart, ChevronLeft, ChevronRight} from "lucide-react"
import { useStore, type Product } from "@/lib/store-context"
import { products, newArrivals, bestSellers } from "@/lib/products"
import Footer from "@/components/home/Footer"
import Newsletter from "@/components/home/Newsletter"
import Trust from "@/components/home/Trust"
import Certificates from "@/components/home/Certificates"
import Collection from "@/components/home/Collection"
import SaleBanner from "@/components/home/SaleBanner"
import HeroSlider from "@/components/home/HeroSlider"
import Promo from "@/components/home/Promo"
import Header from "@/components/home/Header"


export default function HomePage() {

    return (
        <div className="min-h-screen bg-white">
            <Promo />
            <HeroSlider />
            <SaleBanner />
            <Collection />
            <ProductSection title="RECOMMENDED FOR YOU" products={products} showShopMore />
            <ProductSection title="NEW ARRIVALS!" products={newArrivals} />
            <Certificates />
            <ProductSection title="BEST SELLERS" products={bestSellers} />
            <Trust />
            <Newsletter />
            <Footer />

        </div>
    )
}

function ProductSection({
    title,
    products,
    showShopMore = false
}: {
    title: string
    products: Product[]
    showShopMore?: boolean
}) {
    const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useStore()

    return (
        <section className="py-12 md:py-16">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8">{title}</h2>

                <div className="relative">
                    {/* Navigation Arrows */}
                    <button className="absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors z-10 hidden md:flex">
                        <ChevronLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors z-10 hidden md:flex">
                        <ChevronRight className="w-5 h-5 text-gray-600" />
                    </button>

                    {/* Products Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onAddToCart={() => addToCart(product)}
                                onToggleWishlist={() => {
                                    if (isInWishlist(product.id)) {
                                        removeFromWishlist(product.id)
                                    } else {
                                        addToWishlist(product)
                                    }
                                }}
                                isInWishlist={isInWishlist(product.id)}
                            />
                        ))}
                    </div>
                </div>

                {showShopMore && (
                    <div className="flex justify-center mt-8">
                        <Link href='/product' className="border-2 border-gray-900 px-8 py-2 text-sm font-medium hover:bg-gray-900 hover:text-white transition-colors">
                            SHOP MORE
                        </Link>
                    </div>
                )}
            </div>
        </section>
    )
}

function ProductCard({
    product,
    onAddToCart,
    onToggleWishlist,
    isInWishlist
}: {
    product: Product
    onAddToCart: () => void
    onToggleWishlist: () => void
    isInWishlist: boolean
}) {
    return (
        <div className="group">
            <div className="relative bg-gray-50 aspect-square mb-3 overflow-hidden">
                {/* Tag */}
                <span className={`absolute top-2 left-2 ${product.tagColor} text-white text-[10px] px-2 py-0.5 z-10`}>
                    {product.tag}
                </span>

                {/* Wishlist */}
                <button
                    onClick={onToggleWishlist}
                    className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center z-10 transition-all ${isInWishlist
                        ? "bg-pink-50 opacity-100"
                        : "bg-white opacity-0 group-hover:opacity-100"
                        }`}
                >
                    <Heart className={`w-4 h-4 ${isInWishlist ? "text-pink-500 fill-pink-500" : "text-gray-600"}`} />
                </button>

                {/* Product Image */}
                <Link href={`/product/${product.id}`}>
                    <div className="w-full h-full flex items-center justify-center p-4">
                        <Image
                            src={product.image}
                            alt={product.name}
                            width={150}
                            height={200}
                            className="object-contain max-h-full group-hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                </Link>
            </div>

            {/* Product Info */}
            <div className="text-center">
                <Link href={`/product/${product.id}`}>
                    <h3 className="text-xs font-semibold text-gray-900 mb-1 truncate hover:text-purple-700">{product.name}</h3>
                </Link>
                <p className="text-xs text-gray-500 mb-1">{product.category}</p>
                {product.type && <p className="text-xs text-gray-500 mb-1">{product.type}</p>}
                <p className="text-sm font-semibold text-gray-900 mb-2">
                    <span className="text-xs font-normal text-gray-500">from </span>
                    ${product.price.toFixed(2)}
                </p>
                <button
                    onClick={onAddToCart}
                    className="w-full border border-gray-900 py-2 text-xs font-medium hover:bg-gray-900 hover:text-white transition-colors"
                >
                    ADD TO BAG
                </button>
            </div>
        </div>
    )
}
