import React from 'react'

const Promo = () => {
    return (
        <div className="bg-gray-100 py-2 text-center text-sm">
            <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-center gap-2 md:gap-8">
                <span className="text-logo font-semibold">25% OFF - Any Perfume</span>
                <span className="hidden md:inline text-logo">OR</span>
                <span className="text-logo font-semibold">FREE SHIPPING With Any 2 Purchases</span>
            </div>
        </div>
    )
}

export default Promo