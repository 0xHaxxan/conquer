import Link from 'next/link'
import React from 'react'

const Newsletter = () => {
    return (
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
                                className="flex-1 min-w-37.5 px-4 py-2 border border-gray-300 text-sm focus:outline-none focus:border-purple-500"
                            />
                            <input
                                type="text"
                                placeholder="Your Website"
                                className="flex-1 min-w-37.5 px-4 py-2 border border-gray-300 text-sm focus:outline-none focus:border-purple-500"
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
                            <p className="text-sm text-gray-600">fragrance.conquer@gmail.com</p>
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 mb-2">VISIT US</h3>
                            <p className="text-sm text-gray-600">
                                Conquer Fragrance INC.<br />
                                58 Mugda<br />
                                Sobujbag, Dhaka - Bangladesh
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Newsletter