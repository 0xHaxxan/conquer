'use client'
import Link from 'next/link'

const Footer = () => {
    return (
        <footer className="bg-gray-200 py-12">
            <div className="max-w-7xl mx-auto px-4">
                {/* Bottom Footer */}
                <div className="border-t border-gray-300 pt-6 text-center">
                    <div className="flex flex-wrap items-center justify-center gap-4 mb-4 text-xs text-gray-600">
                        <Link href="#" className="underline">Privacy Policy</Link>
                        <Link href="#" className="underline">CA Privacy Notice</Link>
                        <span>Entire Contents Copyright © 2025-2026 conquer-fragrance.com, Inc.</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-4">
                        The Following Trademarks And Contents Are The Property Of Their Respective Owners And Are Used For Description Purposes Only.<br />
                        PerfumeShop And PerfumeShop.Com Are Trademarks Of PerfumeShop, Inc. And Are Registered In The US Patent & Trademark Office.
                    </p>
                    <div className="flex items-center justify-center gap-2 mb-4">
                        {["Bkash", "Nagad", "Visa", "Debit Card", "Upay", "Master Card", "Google Pay"].map((payment) => (
                            <div key={payment} className="w-10 h-6 bg-gray-300 rounded flex items-center justify-center text-[8px] text-gray-600">
                                {payment}
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-gray-500">All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer