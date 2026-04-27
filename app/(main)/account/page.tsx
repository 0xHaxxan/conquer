"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { 
  User, 
  Heart, 
  ShoppingBag, 
  Package, 
  Settings, 
  LogOut, 
  ChevronDown,
  MapPin,
  CreditCard,
  Bell,
  ChevronRight,
  Edit2,
  Search,
  X
} from "lucide-react"
import { useStore } from "@/lib/store-context"

const navItems = ["PERFUMES", "BRANDS", "SKINCARE", "MAKEUP", "HAIRCARE", "AROMATHERAPY", "CANDLES", "GIFTS"]

type TabType = "dashboard" | "orders" | "addresses" | "wishlist" | "settings"

export default function AccountPage() {
  const router = useRouter()
  const { user, isAuthenticated, logout, wishlist, removeFromWishlist, addToCart } = useStore()
  const [activeTab, setActiveTab] = useState<TabType>("dashboard")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated || !user) {
    return null
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const tabs = [
    { id: "dashboard" as TabType, label: "Dashboard", icon: User },
    { id: "orders" as TabType, label: "Orders", icon: Package },
    { id: "addresses" as TabType, label: "Addresses", icon: MapPin },
    { id: "wishlist" as TabType, label: "Wishlist", icon: Heart },
    { id: "settings" as TabType, label: "Settings", icon: Settings },
  ]

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
              <Link href="/account" className="hidden sm:flex items-center gap-1 text-sm text-purple-700 font-medium">
                <User className="w-5 h-5" />
                <span className="hidden lg:inline">My Account</span>
              </Link>
              <Link href="/wishlist" className="flex items-center gap-1 text-sm text-gray-700 hover:text-purple-700">
                <Heart className="w-5 h-5" />
                <span className="hidden lg:inline">Wishlist</span>
              </Link>
              <Link href="/cart" className="flex items-center gap-1 text-sm text-gray-700 hover:text-purple-700">
                <ShoppingBag className="w-5 h-5" />
                <span className="hidden lg:inline">Cart</span>
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

      {/* Account Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-purple-700" />
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900">{user.firstName} {user.lastName}</h2>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
            </div>

            <nav className="bg-white rounded-lg shadow-sm overflow-hidden">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-6 py-4 text-left text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-purple-50 text-purple-700 border-l-4 border-purple-700"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </button>
              ))}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-6 py-4 text-left text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === "dashboard" && (
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
                
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <Package className="w-6 h-6 text-purple-700" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">{user.orders?.length || 0}</p>
                        <p className="text-sm text-gray-500">Total Orders</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                        <Heart className="w-6 h-6 text-pink-500" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">{wishlist.length}</p>
                        <p className="text-sm text-gray-500">Wishlist Items</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">$0.00</p>
                        <p className="text-sm text-gray-500">Store Credit</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
                    <button 
                      onClick={() => setActiveTab("orders")}
                      className="text-sm text-purple-700 hover:underline"
                    >
                      View All
                    </button>
                  </div>
                  {user.orders && user.orders.length > 0 ? (
                    <div className="space-y-4">
                      {user.orders.slice(0, 3).map((order) => (
                        <div key={order.id} className="flex items-center justify-between py-4 border-b last:border-b-0">
                          <div>
                            <p className="font-medium text-gray-900">Order #{order.id}</p>
                            <p className="text-sm text-gray-500">{order.date}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-gray-900">${order.total.toFixed(2)}</p>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              order.status === "delivered" ? "bg-green-100 text-green-700" :
                              order.status === "shipped" ? "bg-blue-100 text-blue-700" :
                              "bg-yellow-100 text-yellow-700"
                            }`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8">No orders yet</p>
                  )}
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Contact Information</h3>
                      <p className="text-gray-900">{user.firstName} {user.lastName}</p>
                      <p className="text-gray-900">{user.email}</p>
                      {user.phone && <p className="text-gray-900">{user.phone}</p>}
                      <button className="text-sm text-purple-700 hover:underline mt-2 flex items-center gap-1">
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </button>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Default Address</h3>
                      {user.address ? (
                        <>
                          <p className="text-gray-900">{user.address.street}</p>
                          <p className="text-gray-900">{user.address.city}, {user.address.state} {user.address.zip}</p>
                          <p className="text-gray-900">{user.address.country}</p>
                          <button className="text-sm text-purple-700 hover:underline mt-2 flex items-center gap-1">
                            <Edit2 className="w-4 h-4" />
                            Edit
                          </button>
                        </>
                      ) : (
                        <p className="text-gray-500">No address saved</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Order History</h1>
                {user.orders && user.orders.length > 0 ? (
                  <div className="space-y-4">
                    {user.orders.map((order) => (
                      <div key={order.id} className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                          <div>
                            <p className="font-semibold text-gray-900">Order #{order.id}</p>
                            <p className="text-sm text-gray-500">Placed on {order.date}</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className={`text-sm px-3 py-1 rounded-full ${
                              order.status === "delivered" ? "bg-green-100 text-green-700" :
                              order.status === "shipped" ? "bg-blue-100 text-blue-700" :
                              "bg-yellow-100 text-yellow-700"
                            }`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                            <p className="font-semibold text-gray-900">${order.total.toFixed(2)}</p>
                          </div>
                        </div>
                        <div className="border-t pt-4">
                          <button className="text-sm text-purple-700 hover:underline flex items-center gap-1">
                            View Order Details
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">You haven&apos;t placed any orders yet</p>
                    <Link href="/" className="inline-block bg-[#1a1a2e] text-white px-6 py-3 text-sm font-medium hover:bg-gray-800 transition-colors">
                      START SHOPPING
                    </Link>
                  </div>
                )}
              </div>
            )}

            {activeTab === "addresses" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-2xl font-bold text-gray-900">Saved Addresses</h1>
                  <button className="bg-[#1a1a2e] text-white px-4 py-2 text-sm font-medium hover:bg-gray-800 transition-colors">
                    Add New Address
                  </button>
                </div>
                {user.address ? (
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg shadow-sm p-6 border-2 border-purple-700 relative">
                      <span className="absolute top-4 right-4 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                        Default
                      </span>
                      <h3 className="font-semibold text-gray-900 mb-2">{user.firstName} {user.lastName}</h3>
                      <p className="text-gray-600">{user.address.street}</p>
                      <p className="text-gray-600">{user.address.city}, {user.address.state} {user.address.zip}</p>
                      <p className="text-gray-600">{user.address.country}</p>
                      <div className="flex gap-4 mt-4">
                        <button className="text-sm text-purple-700 hover:underline">Edit</button>
                        <button className="text-sm text-red-600 hover:underline">Delete</button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                    <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No addresses saved</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "wishlist" && (
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-6">My Wishlist</h1>
                {wishlist.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {wishlist.map((product) => (
                      <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden group">
                        <div className="relative aspect-square bg-gray-50">
                          <button 
                            onClick={() => removeFromWishlist(product.id)}
                            className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center z-10 shadow-sm hover:bg-red-50"
                          >
                            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                          </button>
                          <Link href={`/product/${product.id}`}>
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-contain p-4"
                            />
                          </Link>
                        </div>
                        <div className="p-4">
                          <Link href={`/product/${product.id}`}>
                            <h3 className="text-xs font-semibold text-gray-900 mb-1 truncate hover:text-purple-700">
                              {product.name}
                            </h3>
                          </Link>
                          <p className="text-xs text-gray-500 mb-2">{product.category}</p>
                          <p className="text-sm font-semibold text-gray-900 mb-3">${product.price.toFixed(2)}</p>
                          <button 
                            onClick={() => addToCart(product)}
                            className="w-full border border-gray-900 py-2 text-xs font-medium hover:bg-gray-900 hover:text-white transition-colors"
                          >
                            ADD TO CART
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                    <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">Your wishlist is empty</p>
                    <Link href="/" className="inline-block bg-[#1a1a2e] text-white px-6 py-3 text-sm font-medium hover:bg-gray-800 transition-colors">
                      EXPLORE PRODUCTS
                    </Link>
                  </div>
                )}
              </div>
            )}

            {activeTab === "settings" && (
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h1>
                
                <div className="space-y-6">
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Email Preferences</h2>
                    <div className="space-y-4">
                      <label className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Promotional Emails</p>
                          <p className="text-sm text-gray-500">Receive emails about sales and promotions</p>
                        </div>
                        <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-300 text-purple-700" />
                      </label>
                      <label className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Order Updates</p>
                          <p className="text-sm text-gray-500">Receive emails about your order status</p>
                        </div>
                        <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-300 text-purple-700" />
                      </label>
                      <label className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">Newsletter</p>
                          <p className="text-sm text-gray-500">Receive our weekly newsletter</p>
                        </div>
                        <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-purple-700" />
                      </label>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Security</h2>
                    <button className="text-purple-700 hover:underline text-sm font-medium">
                      Change Password
                    </button>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-lg font-semibold text-red-600 mb-4">Danger Zone</h2>
                    <p className="text-sm text-gray-500 mb-4">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <button className="text-red-600 border border-red-600 px-4 py-2 text-sm font-medium hover:bg-red-50 transition-colors">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
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
