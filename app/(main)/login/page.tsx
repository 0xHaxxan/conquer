"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, ChevronDown } from "lucide-react"
import { useStore } from "@/lib/store-context"

export default function LoginPage() {
    const router = useRouter()
    const { login } = useStore()
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setLoading(true)

        const success = await login(email, password)

        if (success) {
            router.push("/account")
        } else {
            setError("Invalid email or password. Password must be at least 6 characters.")
        }
        setLoading(false)
    }

    return (
        <div className="min-h-screen bg-white">

            {/* Login Form */}
            <main className="max-w-md mx-auto px-4 py-12">
                <h1 className="text-2xl font-bold text-center text-gray-900 mb-8">Sign In</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded text-sm">
                            {error}
                        </div>
                    )}

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address *
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-purple-500"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                            Password *
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-purple-500 pr-12"
                                placeholder="Enter your password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2">
                            <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                            <span className="text-sm text-gray-600">Remember me</span>
                        </label>
                        <Link href="#" className="text-sm text-purple-700 hover:underline">
                            Forgot password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#1a1a2e] text-white py-3 text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "SIGNING IN..." : "SIGN IN"}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-600">
                        Don&apos;t have an account?{" "}
                        <Link href="/register" className="text-purple-700 font-medium hover:underline">
                            Create Account
                        </Link>
                    </p>
                </div>

                <div className="mt-8 pt-8 border-t">
                    <h2 className="text-lg font-semibold text-center text-gray-900 mb-4">Why Create An Account?</h2>
                    <ul className="space-y-3 text-sm text-gray-600">
                        <li className="flex items-start gap-2">
                            <span className="text-purple-700">✓</span>
                            <span>Track your orders and view order history</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-purple-700">✓</span>
                            <span>Save items to your wishlist</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-purple-700">✓</span>
                            <span>Faster checkout with saved addresses</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-purple-700">✓</span>
                            <span>Exclusive offers and promotions</span>
                        </li>
                    </ul>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-100 py-8 mt-12">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p className="text-xs text-gray-500">
                        Entire Contents Copyright © 1997-2023 PerfumeShop.com, Inc. All Rights Reserved.
                    </p>
                </div>
            </footer>
        </div>
    )
}
