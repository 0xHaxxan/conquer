import React from 'react'

const SaleBanner = () => {
    return (
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
                        className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-318.75 -z-10"
                    />
                </div>
            </div>
        </section>
    )
}

export default SaleBanner