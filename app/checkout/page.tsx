"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { 
  ChevronDown, 
  ChevronLeft,
  Lock,
  CreditCard,
  Check
} from "lucide-react"
import { useStore } from "@/lib/store-context"

type CheckoutStep = "shipping" | "payment" | "review"

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, cartTotal, clearCart, user, isAuthenticated } = useStore()
  const [step, setStep] = useState<CheckoutStep>("shipping")
  const [orderComplete, setOrderComplete] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const [shippingInfo, setShippingInfo] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address?.street || "",
    city: user?.address?.city || "",
    state: user?.address?.state || "",
    zip: user?.address?.zip || "",
    country: "United States",
  })

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  })

  const shipping = cartTotal >= 100 ? 0 : 9.99
  const tax = cartTotal * 0.08
  const total = cartTotal + shipping + tax

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep("payment")
  }

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep("review")
  }

  const handlePlaceOrder = async () => {
    setLoading(true)
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    clearCart()
    setOrderComplete(true)
    setLoading(false)
  }

  if (cart.length === 0 && !orderComplete) {
    router.push("/cart")
    return null
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-center">
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
            </div>
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-4 py-16 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
          <p className="text-gray-600 mb-2">Thank you for your purchase.</p>
          <p className="text-gray-600 mb-8">
            Order #PS-{Date.now().toString().slice(-8)} has been placed successfully.
          </p>
          <p className="text-sm text-gray-500 mb-8">
            A confirmation email has been sent to {shippingInfo.email}
          </p>
          <Link 
            href="/"
            className="inline-block bg-[#1a1a2e] text-white px-8 py-3 text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            CONTINUE SHOPPING
          </Link>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-[#1a1a2e] text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-center gap-2">
          <Lock className="w-3 h-3" />
          <span>Secure Checkout</span>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/cart" className="flex items-center gap-2 text-sm text-gray-600 hover:text-purple-700">
              <ChevronLeft className="w-4 h-4" />
              Back to Cart
            </Link>
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
            <div className="w-24"></div>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="bg-white border-b">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center justify-center gap-4">
            {[
              { id: "shipping", label: "Shipping" },
              { id: "payment", label: "Payment" },
              { id: "review", label: "Review" },
            ].map((s, index) => (
              <div key={s.id} className="flex items-center">
                <div className={`flex items-center gap-2 ${
                  step === s.id ? "text-purple-700" : 
                  ["shipping", "payment", "review"].indexOf(step) > index ? "text-green-600" : "text-gray-400"
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step === s.id ? "bg-purple-700 text-white" :
                    ["shipping", "payment", "review"].indexOf(step) > index ? "bg-green-600 text-white" : "bg-gray-200 text-gray-500"
                  }`}>
                    {["shipping", "payment", "review"].indexOf(step) > index ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span className="hidden sm:inline text-sm font-medium">{s.label}</span>
                </div>
                {index < 2 && <div className="w-12 md:w-24 h-0.5 bg-gray-200 mx-2" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Checkout Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            {step === "shipping" && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Shipping Information</h2>
                
                {!isAuthenticated && (
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-purple-700">
                      <Link href="/login" className="font-medium underline">Sign in</Link> for a faster checkout experience
                    </p>
                  </div>
                )}

                <form onSubmit={handleShippingSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                      <input
                        type="text"
                        value={shippingInfo.firstName}
                        onChange={(e) => setShippingInfo({...shippingInfo, firstName: e.target.value})}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                      <input
                        type="text"
                        value={shippingInfo.lastName}
                        onChange={(e) => setShippingInfo({...shippingInfo, lastName: e.target.value})}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                      <input
                        type="email"
                        value={shippingInfo.email}
                        onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input
                        type="tel"
                        value={shippingInfo.phone}
                        onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                    <input
                      type="text"
                      value={shippingInfo.address}
                      onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                      <input
                        type="text"
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                      <input
                        type="text"
                        value={shippingInfo.state}
                        onChange={(e) => setShippingInfo({...shippingInfo, state: e.target.value})}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code *</label>
                      <input
                        type="text"
                        value={shippingInfo.zip}
                        onChange={(e) => setShippingInfo({...shippingInfo, zip: e.target.value})}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
                    <select
                      value={shippingInfo.country}
                      onChange={(e) => setShippingInfo({...shippingInfo, country: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-purple-500"
                    >
                      <option>United States</option>
                      <option>Canada</option>
                      <option>United Kingdom</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#1a1a2e] text-white py-4 text-sm font-medium hover:bg-gray-800 transition-colors mt-6"
                  >
                    CONTINUE TO PAYMENT
                  </button>
                </form>
              </div>
            )}

            {step === "payment" && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Information</h2>
                
                <form onSubmit={handlePaymentSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Number *</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={paymentInfo.cardNumber}
                        onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: e.target.value})}
                        placeholder="1234 5678 9012 3456"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-purple-500 pr-12"
                      />
                      <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card *</label>
                    <input
                      type="text"
                      value={paymentInfo.cardName}
                      onChange={(e) => setPaymentInfo({...paymentInfo, cardName: e.target.value})}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date *</label>
                      <input
                        type="text"
                        value={paymentInfo.expiry}
                        onChange={(e) => setPaymentInfo({...paymentInfo, expiry: e.target.value})}
                        placeholder="MM/YY"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">CVV *</label>
                      <input
                        type="text"
                        value={paymentInfo.cvv}
                        onChange={(e) => setPaymentInfo({...paymentInfo, cvv: e.target.value})}
                        placeholder="123"
                        required
                        maxLength={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 mt-6">
                    <button
                      type="button"
                      onClick={() => setStep("shipping")}
                      className="flex-1 border border-gray-300 text-gray-700 py-4 text-sm font-medium hover:bg-gray-50 transition-colors"
                    >
                      BACK
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-[#1a1a2e] text-white py-4 text-sm font-medium hover:bg-gray-800 transition-colors"
                    >
                      REVIEW ORDER
                    </button>
                  </div>
                </form>
              </div>
            )}

            {step === "review" && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Review Your Order</h2>
                  
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-4 py-4 border-b last:border-b-0">
                        <div className="w-16 h-16 bg-gray-50 rounded overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={64}
                            height={64}
                            className="w-full h-full object-contain p-1"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 text-sm">{item.name}</h3>
                          <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Shipping Address</h3>
                    <p className="text-sm text-gray-600">
                      {shippingInfo.firstName} {shippingInfo.lastName}<br />
                      {shippingInfo.address}<br />
                      {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zip}<br />
                      {shippingInfo.country}
                    </p>
                    <button 
                      onClick={() => setStep("shipping")}
                      className="text-sm text-purple-700 hover:underline mt-2"
                    >
                      Edit
                    </button>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Payment Method</h3>
                    <p className="text-sm text-gray-600">
                      Card ending in {paymentInfo.cardNumber.slice(-4) || "****"}<br />
                      Expires {paymentInfo.expiry || "MM/YY"}
                    </p>
                    <button 
                      onClick={() => setStep("payment")}
                      className="text-sm text-purple-700 hover:underline mt-2"
                    >
                      Edit
                    </button>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep("payment")}
                    className="flex-1 border border-gray-300 text-gray-700 py-4 text-sm font-medium hover:bg-gray-50 transition-colors"
                  >
                    BACK
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={loading}
                    className="flex-1 bg-[#1a1a2e] text-white py-4 text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      "PROCESSING..."
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        PLACE ORDER
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({cart.length} items)</span>
                  <span className="font-medium">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-lg font-bold">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Security Badge */}
              <div className="mt-6 pt-6 border-t text-center">
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <Lock className="w-4 h-4" />
                  <span>Secure 256-bit SSL encryption</span>
                </div>
              </div>
            </div>
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
