"use client";

import { Heart } from "lucide-react";
import { type Product } from "@/lib/store-context";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/lib/store-context";

export function ProductCard({
    product,
    onToggleWishlist,
    isInWishlist,
}: {
    product: Product;
    onToggleWishlist: () => void;
    isInWishlist: boolean;
}) {
    const { cart, addToCart } = useStore();

    // ✅ THIS IS THE FIX
    const isInCart = cart.some((item) => item.id === product.id);

    return (
        <div className="group my-6">
            <div className="relative bg-gray-50 aspect-square mb-3 overflow-hidden">
                {/* Tag */}
                <span
                    className={`absolute top-2 left-2 ${product.tagColor} text-white text-[10px] px-2 py-0.5 z-10`}
                >
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
                    <Heart
                        className={`w-4 h-4 ${isInWishlist ? "text-pink-500 fill-pink-500" : "text-gray-600"
                            }`}
                    />
                </button>

                {/* Image */}
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

            {/* Info */}
            <div className="text-center">
                <Link href={`/product/${product.id}`}>
                    <h3 className="text-xs font-semibold text-gray-900 mb-1 truncate hover:text-purple-700">
                        {product.name}
                    </h3>
                </Link>

                <p className="text-xs text-gray-500 mb-1">{product.category}</p>

                <p className="text-sm font-semibold text-gray-900 mb-2">
                    <span className="text-xs font-normal text-gray-500">from </span>
                    ৳ {product.price.toFixed(2)}
                </p>

                {/* ✅ BUTTON FIX */}
                <button
                    onClick={() => addToCart(product, 1)}
                    disabled={isInCart}
                    className={`w-full py-2 text-xs font-medium transition-colors ${isInCart
                            ? "bg-green-600 text-white cursor-not-allowed"
                            : "border border-gray-900 hover:bg-gray-900 hover:text-white"
                        }`}
                >
                    {isInCart ? "ADDED TO CART ✓" : "ADD TO BAG"}
                </button>
            </div>
        </div>
    );
}