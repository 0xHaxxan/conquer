"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { 
  Search, 
  User, 
  Heart, 
  ShoppingBag, 
  ChevronDown, 
  Minus, 
  Plus, 
  X,
  Trash2,
  ArrowRight,
  Tag
} from "lucide-react"
import { useStore } from "@/lib/store-context"

const navItems = ["PERFUMES", "BRANDS", "SKINCARE", "MAKEUP", "HAIRCARE", "AROMATHERAPY", "CANDLES", "GIFTS"]

export default function CartPage() {
  const { cart, removeFromCart, updateCartQuantity, cartTotal, cartCount } = useStore()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [promoCode, setPromoCode] = useState("")
  const [promoApplied, setPromoApplied] = useState(false)

  const shipping = cartTotal >= 100 ? 0 : 9.99
  const discount = promoApplied ? cartTotal * 0.1 : 0
  const total = cartTotal + shipping - discount

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === "save10") {
      setPromoApplied(true)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-[#1a1a2e] text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 cursor-pointer">
              <span>USD</span>
              <ChevronDown className="w-3 h-3" />
            </div>
            <div className="flex items-center gap-1 cursor-pointer">
              <span>English</span>
              <ChevronDown className="w-3 h-3" />
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 text-center">
            <span className="text-yellow-400">★</span>
            <span>Only 11 days left until VALENTINE&apos;S DAY!</span>
            <span className="text-yellow-400">★</span>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <Link href="#" className="hover:text-gray-300">Help & Information</Link>
            <Link href="#" className="hover:text-gray-300">Connect with us</Link>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <button 
              className="lg:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <div className="w-6 h-0.5 bg-gray-800 mb-1.5"></div>
              <div className="w-6 h-0.5 bg-gray-800 mb-1.5"></div>
              <div className="w-6 h-0.5 bg-gray-800"></div>
            </button>

            <div className="hidden md:flex items-center flex-1 max-w-md">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Hey, what are you looking for?"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <Link href="/" className="flex-shrink-0">
              <div className="flex items-center gap-1">
                <div className="w-8 h-8 bg-purple-700 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">P</span>
                </div>
                <div>
                  <span className="text-xl font-bold text-purple-700">Perfume</span>
                  <span className="text-xl font-bold text-gray-800">Shop</span>
                  <span className="text-[8px] text-gray-500 align-top">.com</span>
                </div>
              </div>
            </Link>

            <div className="flex items-center gap-4 md:gap-6">
              <Link href="/account" className="hidden sm:flex items-center gap-1 text-sm text-gray-700 hover:text-purple-700">
                <User className="w-5 h-5" />
                <span className="hidden lg:inline">My Account</span>
              </Link>
              <Link href="/wishlist" className="flex items-center gap-1 text-sm text-gray-700 hover:text-purple-700">
                <Heart className="w-5 h-5" />
                <span className="hidden lg:inline">Wishlist</span>
              </Link>
              <Link href="/cart" className="flex items-center gap-1 text-sm text-purple-700 font-medium">
                <ShoppingBag className="w-5 h-5" />
                <span className="hidden lg:inline">{cartCount} Items</span>
              </Link>
            </div>
          </div>
        </div>

        <nav className="hidden lg:block border-t bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <ul className="flex items-center justify-center gap-8">
              {navItems.map((item) => (
                <li key={item}>
                  <Link href="#" className="block py-3 text-sm font-medium text-gray-800 hover:text-purple-700 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/50">
            <div className="bg-white w-80 h-full overflow-y-auto">
              <div className="flex items-center justify-between p-4 border-b">
                <span className="font-semibold">Menu</span>
                <button onClick={() => setMobileMenuOpen(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>
              <ul className="p-4">
                {navItems.map((item) => (
                  <li key={item} className="border-b">
                    <Link href="#" className="block py-3 text-sm font-medium text-gray-800 hover:text-purple-700">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </header>

      {/* Cart Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Shopping Bag ({cartCount} items)</h1>

        {cart.length > 0 ? (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-sm p-4 md:p-6">
                  <div className="flex gap-4 md:gap-6">
                    <Link href={`/product/${item.id}`} className="flex-shrink-0">
                      <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-50 rounded overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={128}
                          height={128}
                          className="w-full h-full object-contain p-2"
                        />
                      </div>
                    </Link>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <Link href={`/product/${item.id}`}>
                            <h3 className="font-semibold text-gray-900 hover:text-purple-700">{item.name}</h3>
                          </Link>
                          <p className="text-sm text-gray-500">{item.category}</p>
                          {item.size && <p className="text-sm text-gray-500">Size: {item.size}</p>}
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="flex flex-wrap items-end justify-between mt-4 gap-4">
                        <div className="flex items-center border border-gray-300">
                          <button 
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-50"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                          <button 
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-50"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <p className="text-lg font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  {promoApplied && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Promo Discount (10%)</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                {/* Promo Code */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Promo Code</label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Enter code"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-purple-500"
                        disabled={promoApplied}
                      />
                    </div>
                    <button 
                      onClick={handleApplyPromo}
                      disabled={promoApplied}
                      className="px-4 py-2 border border-gray-900 text-sm font-medium hover:bg-gray-900 hover:text-white transition-colors disabled:opacity-50"
                    >
                      Apply
                    </button>
                  </div>
                  {promoApplied && (
                    <p className="text-xs text-green-600 mt-1">Promo code applied successfully!</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">Try: SAVE10</p>
                </div>

                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-lg font-bold">${total.toFixed(2)}</span>
                  </div>
                  {cartTotal < 100 && (
                    <p className="text-xs text-gray-500 mt-1">
                      Add ${(100 - cartTotal).toFixed(2)} more for free shipping!
                    </p>
                  )}
                </div>

                <Link 
                  href="/checkout"
                  className="w-full bg-[#1a1a2e] text-white py-4 text-sm font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                >
                  PROCEED TO CHECKOUT
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="mt-4 text-center">
                  <Link href="/" className="text-sm text-purple-700 hover:underline">
                    Continue Shopping
                  </Link>
                </div>

                {/* Payment Methods */}
                <div className="mt-6 pt-6 border-t">
                  <p className="text-xs text-gray-500 text-center mb-3">Secure Payment Methods</p>
                  <div className="flex items-center justify-center gap-2">
                    {["Visa", "MC", "Amex", "PayPal", "Apple Pay"].map((payment) => (
                      <div key={payment} className="w-10 h-6 bg-gray-100 rounded flex items-center justify-center text-[8px] text-gray-600">
                        {payment}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Your bag is empty</h2>
            <p className="text-gray-500 mb-6">Looks like you haven&apos;t added anything to your bag yet</p>
            <Link 
              href="/" 
              className="inline-block bg-[#1a1a2e] text-white px-8 py-3 text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              START SHOPPING
            </Link>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-200 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs text-gray-500">
            Entire Contents Copyright © 1997-2023 PerfumeShop.com, Inc. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
