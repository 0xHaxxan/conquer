"use client"

import { cn } from "@/lib/utils"
import {
    LayoutDashboard,
    Calculator,
    FlaskConical,
    ShoppingCart,
    Store,
    BarChart3,
    Menu,
    X,
    Package,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "costs", label: "Cost Calculator", icon: Calculator },
    { id: "production", label: "Production", icon: FlaskConical },
    { id: "sales", label: "Sales", icon: ShoppingCart },
    { id: "orders", label: "Orders", icon: Store },
    { id: "contents", label: "Contents", icon: Package },
    { id: "reports", label: "Reports", icon: BarChart3 },
]

export function Sidebar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const [activePage, setActivePage] = useState("dashboard")



    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex w-64 bg-white border-r border-gray-200 shrink-0 fixed h-full z-30 flex-col">
                <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-linear-to-br from-amber-600 to-amber-500 rounded-xl flex items-center justify-center">
                            <Package className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-800">Conquer</h1>
                            <p className="text-xs text-gray-500">Perfume Dashboard</p>
                        </div>
                    </div>
                </div>
                <nav className="flex-1 p-4 space-y-1">
                    {navItems.map((item) => {
                        const Icon = item.icon
                        return (
                            <Link
                                href={`/${item.id === "dashboard" ? "" : item.id}`}
                                key={item.id}
                                onClick={() => setActivePage(item.id)}
                                className={cn(
                                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 text-gray-700 font-medium",
                                    activePage === item.id
                                        ? "bg-linear-to-r from-amber-600 to-amber-500 text-white"
                                        : "hover:bg-amber-50"
                                )}
                            >
                                <Icon className="w-5 h-5" />
                                {item.label}
                            </Link>
                        )
                    })}
                </nav>
                <div className="p-4 border-t border-gray-100">
                    <div className="bg-linear-to-br from-amber-50 to-orange-50 rounded-xl p-4">
                        <p className="text-sm font-semibold text-amber-800">Conquer Perfume</p>
                        <p className="text-xs text-amber-600 mt-1">Bangladesh</p>
                        <p className="text-xs text-gray-500 mt-2">
                            {new Date().toLocaleDateString("en-US", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </p>
                    </div>
                </div>
            </aside>

            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-40 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-linear-to-br from-amber-600 to-amber-500 rounded-lg flex items-center justify-center">
                        <Package className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-gray-800">Conquer</span>
                </div>
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="p-2 rounded-lg hover:bg-gray-100"
                >
                    {mobileMenuOpen ? (
                        <X className="w-6 h-6 text-gray-600" />
                    ) : (
                        <Menu className="w-6 h-6 text-gray-600" />
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden fixed inset-0 z-50">
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setMobileMenuOpen(false)}
                    />
                    <div className="absolute right-0 top-0 bottom-0 w-64 bg-white p-4 space-y-2 pt-14">
                        {navItems.map((item) => {
                            const Icon = item.icon
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        setActivePage(item.id)
                                        setMobileMenuOpen(false)
                                    }}
                                    className={cn(
                                        "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 font-medium text-left",
                                        activePage === item.id
                                            ? "bg-amber-50 text-amber-700"
                                            : "hover:bg-gray-50"
                                    )}
                                >
                                    <Icon className="w-5 h-5" />
                                    {item.label}
                                </button>
                            )
                        })}
                    </div>
                </div>
            )}
        </>
    )
}
