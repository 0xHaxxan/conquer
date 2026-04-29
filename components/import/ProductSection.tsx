import Link from "next/link"
import { ProductCard } from "./ProductCard"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Product, useStore } from "@/lib/store-context"

export function ProductSection({
    title,
    products,
    showShopMore = false
}: {
    title?: string
    products: Product[]
    showShopMore?: boolean
}) {
    const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useStore()

    return (
        <section className="py-12 md:py-16">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8">{title}</h2>

                <div className="relative">

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
