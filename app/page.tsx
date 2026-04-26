"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, User, Heart, ShoppingBag, ChevronDown, ChevronLeft, ChevronRight, Phone, MessageCircle, Truck, Shield, CreditCard, Award, X } from "lucide-react"
import { useStore, type Product } from "@/lib/store-context"
import { products, newArrivals, bestSellers } from "@/lib/products"

const navItems = ["PERFUMES", "BRANDS", "SKINCARE", "MAKEUP", "HAIRCARE", "AROMATHERAPY", "CANDLES", "GIFTS"]

export default function HomePage() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const { cartCount, wishlist, isAuthenticated } = useStore()

    return (
        <div className="min-h-screen bg-white">

            {/* Header */}
            <header className="border-b bg-logo">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between gap-4">
                        {/* Mobile Menu Button */}
                        {/* <button
                            className="lg:hidden p-2"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <div className="w-6 h-0.5 bg-[#F5C65B] mb-1.5"></div>
                            <div className="w-6 h-0.5 bg-[#F5C65B] mb-1.5"></div>
                            <div className="w-6 h-0.5 bg-[#F5C65B]"></div>
                        </button> */}

                        {/* Search */}
                        <div className="hidden md:flex items-center">
                            <div className="relative w-full">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F5C65B]" />
                                <input
                                    type="text"
                                    placeholder="Hey, what are you looking for?"
                                    className="w-75 pl-10 pr-4 py-2 text-[#FFE4B5] rounded-full text-sm focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* Logo */}
                        <Link href="/" className="flex-shrink-0">
                            <div className="flex items-center gap-1">
                                <Image src="/logo.svg" alt="conquer" width={120} height={40} />
                            </div>
                        </Link>

                        {/* Right Icons */}
                        <div className="flex items-center gap-4 md:gap-10">
                            <Link href={isAuthenticated ? "/account" : "/login"} className="flex items-center gap-1 text-sm text-[#F5C65B]">
                                <User className="w-5 h-5" />
                                <span className="hidden lg:inline text-[#FFE4B5]">My Account</span>
                            </Link>
                            <Link href="/wishlist" className="flex items-center gap-1 text-sm text-[#F5C65B]  relative">
                                <Heart className="w-5 h-5" />
                                {wishlist.length > 0 && (
                                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-pink-500 text-white text-[10px] rounded-full flex items-center justify-center">
                                        {wishlist.length}
                                    </span>
                                )}
                                <span className="hidden lg:inline text-[#FFE4B5]">Wishlist</span>
                            </Link>
                            <Link href="/cart" className="flex items-center gap-1 text-sm text-[#F5C65B] ">
                                <ShoppingBag className="w-5 h-5" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-purple-700 text-white text-[10px] rounded-full flex items-center justify-center">
                                        {cartCount}
                                    </span>
                                )}
                                <span className="hidden lg:inline text-[#FFE4B5]">{cartCount} Items</span>
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Search */}
                    <div className="hidden mt-4">
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F5C65B]" />
                            <input
                                type="text"
                                placeholder="Hey, what are you looking for?"
                                className="w-full pl-10 pr-4 py-2 border border-[#936A31] text-[#F5C65B] rounded-sm text-sm focus:outline-none focus:border-purple-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                {/* <nav className="hidden lg:block border-t bg-white">
                    <div className="max-w-7xl mx-auto px-4">
                        <ul className="flex items-center justify-center gap-8">
                            {navItems.map((item) => (
                                <li key={item}>
                                    <Link
                                        href="#"
                                        className="block py-3 text-sm font-medium text-gray-800 hover:text-purple-700 transition-colors"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </nav> */}

                {/* Mobile Navigation */}
                {/* {mobileMenuOpen && (
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
                                        <Link
                                            href="#"
                                            className="block py-3 text-sm font-medium text-gray-800 hover:text-purple-700"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                                <li className="border-b">
                                    <Link
                                        href={isAuthenticated ? "/account" : "/login"}
                                        className="block py-3 text-sm font-medium text-gray-800 hover:text-purple-700"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {isAuthenticated ? "My Account" : "Sign In"}
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                )} */}
            </header>

            {/* Promo Bar */}
            <div className="bg-gray-100 py-2 text-center text-sm">
                <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-center gap-2 md:gap-8">
                    <span className="text-logo font-semibold">25% OFF - Any Perfume</span>
                    <span className="hidden md:inline text-logo">OR</span>
                    <span className="text-logo font-semibold">FREE SHIPPING With Any 2 Purchases</span>
                </div>
            </div>

            {/* Hero Slider */}
            <section className="relative bg-white my-12">
                <div className="max-w-7xl mx-auto">
                    <div className="relative">
                        <div className="flex items-center min-h-75 md:min-h-100">
                            <div className="w-full md:w-1/2 p-8 md:p-16 z-10 pl-10">
                                <p className="text-gray-300 text-sm mb-2">FIND THE PERFECT FRAGRANCE From OUR</p>
                                <h1 className="text-4xl md:text-5xl font-bold text-gray-300 mb-6">
                                    VARIETY<br />FRAGRANCE SETS
                                </h1>
                                <button className="bg-logo cursor-pointer text-white px-8 py-3 text-sm font-medium">
                                    SHOP NOW
                                </button>
                            </div>
                            <div className="hidden md:block w-1/2 h-full">
                                <img
                                    src={'/banners/hero-banner.png'}
                                    alt="Gift Sets"
                                    className="absolute -top-10 left-0 z-0 w-318.75 h-121.25"
                                />
                            </div>
                        </div>

                        {/* Navigation Arrows */}
                        <button className="hidden absolute -left-14 top-1/2 -translate-y-1/2 w-10 h-10 bg-gray-100 rounded-full md:flex items-center justify-center hover:bg-white transition-colors">
                            <ChevronLeft className="w-5 h-5 text-gray-600" />
                        </button>
                        <button className="hidden absolute -right-12 top-1/2 -translate-y-1/2 w-10 h-10 bg-gray-100 rounded-full md:flex items-center justify-center hover:bg-white transition-colors">
                            <ChevronRight className="w-5 h-5 text-gray-600" />
                        </button>

                        {/* Dots */}
                        <div className="flex justify-center mt-14 gap-4">
                            {[0, 1, 2].map((dot) => (
                                <button
                                    key={dot}
                                    onClick={() => setCurrentSlide(dot)}
                                    className={`w-2 h-2 rounded-full transition-colors ${currentSlide === dot ? "bg-[#4D2952]" : "bg-gray-400"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Sale Banner */}
            <section className="hidden md:block bg-white py-8 relative overflow-hidden z-10">
                <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-between">
                    <div className="pl-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">UP TO 20% OFF.</h2>
                        <button className="bg-logo text-white px-6 py-2 text-sm font-medium">
                            SEARCH FOR BRAND
                        </button>
                    </div>
                    <div className="flex justify-center">
                        <img
                            src={'/banners/banner-2.jpg'}
                            alt="Model"
                            className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[1275px] -z-10"
                        />
                    </div>
                </div>
            </section>

            {/* Shop Our Collection */}
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
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
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
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
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
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
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
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
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
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
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
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
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

            {/* Recommended For You */}
            <ProductSection title="RECOMMENDED FOR YOU" products={products} showShopMore />

            {/* New Arrivals */}
            <ProductSection title="NEW ARRIVALS!" products={newArrivals} />

            {/* Gift Certificates Banner */}
            <section className="bg-purple-900 py-12 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-between">
                    <div className="text-white">
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">GIFT CERTIFICATES</h2>
                        <button className="bg-white text-gray-900 px-6 py-2 text-sm font-medium hover:bg-gray-100 transition-colors">
                            GET A GIFT CERTIFICATE
                        </button>
                    </div>
                    <div className="hidden md:block">
                        <div className="relative w-64 h-40">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-800 to-transparent z-10" />
                            <Image
                                src="/banners/gift-certificate.jpg"
                                alt="Gift Certificate"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Subscription Club & Win Banner */}
            <section className="grid md:grid-cols-2">
                {/* Subscription Club */}
                <div className="bg-[#2d2d44] py-12 px-8 relative overflow-hidden">
                    <div className="relative z-10 text-white">
                        <p className="text-sm mb-2">JOIN OUR</p>
                        <h2 className="text-2xl md:text-3xl font-bold mb-2">SUBSCRIPTION</h2>
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">CLUB</h2>
                        <p className="text-sm mb-4">as low as $19/month</p>
                        <button className="bg-purple-600 text-white px-6 py-2 text-sm font-medium hover:bg-purple-700 transition-colors">
                            LEARN MORE
                        </button>
                    </div>
                    <div className="absolute right-0 bottom-0 opacity-30">
                        <Image
                            src="/banners/subscription.jpg"
                            alt="Subscription"
                            width={200}
                            height={200}
                            className="object-contain"
                        />
                    </div>
                </div>

                {/* Win Shopping Spree */}
                <div className="bg-[#3d3d5c] py-12 px-8 relative overflow-hidden">
                    <div className="relative z-10 text-white">
                        <h2 className="text-2xl md:text-3xl font-bold mb-2">WIN A $250</h2>
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">SHOPPING SPREE</h2>
                        <p className="text-sm mb-4">MONTHLY GIVEAWAY</p>
                        <button className="bg-[#1a1a2e] text-white px-6 py-2 text-sm font-medium hover:bg-gray-900 transition-colors">
                            LEARN MORE
                        </button>
                    </div>
                </div>
            </section>

            {/* Best Sellers */}
            <ProductSection title="BEST SELLERS" products={bestSellers} />

            {/* Trust Badges */}
            <section className="bg-gray-800 py-6">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div className="flex items-center justify-center gap-2 text-white">
                            <Truck className="w-6 h-6" />
                            <span className="text-xs md:text-sm">Free Delivery & Returns*</span>
                        </div>
                        <div className="flex items-center justify-center gap-2 text-white">
                            <Phone className="w-6 h-6" />
                            <span className="text-xs md:text-sm">Online Self Service</span>
                        </div>
                        <div className="flex items-center justify-center gap-2 text-white">
                            <Shield className="w-6 h-6" />
                            <span className="text-xs md:text-sm">100% Genuine Guaranteed</span>
                        </div>
                        <div className="flex items-center justify-center gap-2 text-white">
                            <CreditCard className="w-6 h-6" />
                            <span className="text-xs md:text-sm">Secure Payment</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter & Footer Info */}
            <section className="bg-gray-100 py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Newsletter */}
                        <div>
                            <h3 className="font-bold text-gray-900 mb-4">SIGN UP FOR SPECIAL OFFERS AND PROMOTIONS</h3>
                            <div className="flex flex-wrap gap-2">
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    className="flex-1 min-w-[150px] px-4 py-2 border border-gray-300 text-sm focus:outline-none focus:border-purple-500"
                                />
                                <input
                                    type="text"
                                    placeholder="Your Website"
                                    className="flex-1 min-w-[150px] px-4 py-2 border border-gray-300 text-sm focus:outline-none focus:border-purple-500"
                                />
                                <button className="bg-gray-900 text-white px-6 py-2 text-sm font-medium hover:bg-gray-800 transition-colors">
                                    SIGN UP
                                </button>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">
                                By entering your email and clicking &quot;subscribe&quot;, you consent to receive marketing emails from us 1:1. You can unsubscribe at any time through
                                the unsubscribe link in each email. See our <Link href="#" className="underline">Privacy Notice</Link> for more details, including how your personal information is used and shared.
                            </p>
                        </div>

                        {/* Contact Info */}
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="font-bold text-gray-900 mb-2">NEED HELP?</h3>
                                <p className="text-sm text-gray-600">customerservice@perfumeshop.com</p>
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 mb-2">VISIT US</h3>
                                <p className="text-sm text-gray-600">
                                    PERFUMESHOP INC.<br />
                                    1970 NE 153 ST<br />
                                    CORAL GABLES, CA 90512
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer Links */}
            <footer className="bg-gray-200 py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
                        {/* Shop By Department */}
                        <div>
                            <h4 className="font-bold text-xs text-gray-900 mb-4">SHOP BY DEPARTMENT</h4>
                            <ul className="space-y-2">
                                {["Perfumes", "Women's Perfume", "Men's Cologne", "Boutiques", "20% Off", "Samples", "Skincare", "Aromatherapy"].map((link) => (
                                    <li key={link}>
                                        <Link href="#" className="text-xs text-gray-600 hover:text-purple-700">{link}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-xs text-gray-900 mb-4">&nbsp;</h4>
                            <ul className="space-y-2">
                                {["Best Sellers", "Clearance", "For Kids", "Makeup", "Candles", "New Arrivals", "Mini", "Hard To Find"].map((link) => (
                                    <li key={link}>
                                        <Link href="#" className="text-xs text-gray-600 hover:text-purple-700">{link}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Customer Support */}
                        <div>
                            <h4 className="font-bold text-xs text-gray-900 mb-4">CUSTOMER SUPPORT</h4>
                            <ul className="space-y-2">
                                {["Gift Certificates", "Gift Certificate Balance", "Accessibility Policy", "Return Policy", "Security Pledge", "Terms Of Use", "Shipping Rates"].map((link) => (
                                    <li key={link}>
                                        <Link href="#" className="text-xs text-gray-600 hover:text-purple-700">{link}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold text-xs text-gray-900 mb-4">&nbsp;</h4>
                            <ul className="space-y-2">
                                {["Wholesale Information", "Affiliate Program", "Sitemap", "Redeem Coupons", "Careers", "", "100% Genuine"].map((link, i) => (
                                    <li key={i}>
                                        {link && <Link href="#" className="text-xs text-gray-600 hover:text-purple-700">{link}</Link>}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* My Account */}
                        <div>
                            <h4 className="font-bold text-xs text-gray-900 mb-4">MY ACCOUNT</h4>
                            <ul className="space-y-2">
                                <li>
                                    <Link href="/register" className="text-xs text-gray-600 hover:text-purple-700">Register Now</Link>
                                </li>
                                <li>
                                    <Link href="/account" className="text-xs text-gray-600 hover:text-purple-700">Order Status</Link>
                                </li>
                                <li>
                                    <Link href="#" className="text-xs text-gray-600 hover:text-purple-700">Rewards Club</Link>
                                </li>
                                <li>
                                    <Link href="/login" className="text-xs text-gray-600 hover:text-purple-700">Sign In</Link>
                                </li>
                            </ul>

                            {/* Social Icons */}
                            <div className="flex flex-wrap gap-2 mt-6">
                                {["X", "fb", "in", "yt", "pin", "tw", "tik"].map((social) => (
                                    <Link
                                        key={social}
                                        href="#"
                                        className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-white text-xs hover:bg-purple-700 transition-colors"
                                    >
                                        {social.charAt(0).toUpperCase()}
                                    </Link>
                                ))}
                            </div>

                            <div className="mt-4">
                                <Link href="#" className="text-xs text-gray-600 hover:text-purple-700 flex items-center gap-1">
                                    Change Country
                                </Link>
                            </div>

                            <div className="mt-4">
                                <h4 className="font-bold text-xs text-gray-900 mb-2">SUBSCRIPTION CLUB</h4>
                                <div className="w-20 h-12 bg-purple-100 rounded flex items-center justify-center">
                                    <span className="text-purple-700 text-xs font-bold">Luxsent</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Footer */}
                    <div className="border-t border-gray-300 pt-6 text-center">
                        <div className="flex flex-wrap items-center justify-center gap-4 mb-4 text-xs text-gray-600">
                            <span>Customer Service Code: 04</span>
                            <Link href="#" className="underline">Privacy Policy</Link>
                            <Link href="#" className="underline">CA Privacy Notice</Link>
                            <span>Entire Contents Copyright © 1997-2023 PerfumeShop.com, Inc.</span>
                        </div>
                        <p className="text-xs text-gray-500 mb-4">
                            The Following Trademarks And Contents Are The Property Of Their Respective Owners And Are Used For Description Purposes Only.<br />
                            PerfumeShop And PerfumeShop.Com Are Trademarks Of PerfumeShop, Inc. And Are Registered In The US Patent & Trademark Office.
                        </p>
                        <div className="flex items-center justify-center gap-2 mb-4">
                            {["Visa", "MC", "Amex", "Discover", "PayPal", "Apple Pay", "Google Pay"].map((payment) => (
                                <div key={payment} className="w-10 h-6 bg-gray-300 rounded flex items-center justify-center text-[8px] text-gray-600">
                                    {payment}
                                </div>
                            ))}
                        </div>
                        <p className="text-xs text-gray-500">All Rights Reserved.</p>
                    </div>
                </div>
            </footer>
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
                        <button className="border-2 border-gray-900 px-8 py-2 text-sm font-medium hover:bg-gray-900 hover:text-white transition-colors">
                            SHOP MORE
                        </button>
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
