import { Heart, Search, ShoppingBag, User } from 'lucide-react'
import Link from 'next/link'
import { useStore, type Product } from "@/lib/store-context"
import Image from 'next/image'

const Header = () => {

    const { cartCount, wishlist, isAuthenticated } = useStore()

    return (
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
                    <Link href="/" className="shrink-0">
                        <div className="flex items-center gap-1">
                            <Image src="/conquer.svg" alt="conquer" width={120} height={40} />
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
    )
}

export default Header