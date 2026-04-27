'use client'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

const HeroSlider = () => {

        const [currentSlide, setCurrentSlide] = useState(0)

    return (
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
    )
}

export default HeroSlider