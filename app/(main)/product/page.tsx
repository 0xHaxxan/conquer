'use client';
import { useState } from 'react';

const perfumes = [
    { id: 1, name: "ARMAF PASSION", brand: "by Armaf", type: "Eau De Parfum", price: 51.74, image: "https://perfumeshop.com/cdn/shop/files/armaf-passion.jpg" },
    { id: 2, name: "JO MALONE VETIVER & GO...", brand: "by Jo Malone", type: "Luminizing Clay", price: 51.74, image: "https://perfumeshop.com/cdn/shop/files/jo-malone.jpg" },
    { id: 3, name: "BVLGARI EXTREME", brand: "by Bvlgari", type: "Luminizing Clay", price: 51.74, image: "https://perfumeshop.com/cdn/shop/files/bvlgari-extreme.jpg" },
    { id: 4, name: "JO MALONE VETIVER & GO...", brand: "by Bvlgari", type: "Eau De Toilette", price: 51.74, image: "https://perfumeshop.com/cdn/shop/files/jo-malone-2.jpg" },
    { id: 5, name: "ARMAF PASSION", brand: "by Armaf", type: "Eau De Parfum", price: 51.74, image: "https://perfumeshop.com/cdn/shop/files/armaf-2.jpg" },
    { id: 6, name: "JO MALONE VETIVER & GO...", brand: "by Jo Malone", type: "Luminizing Clay", price: 51.74, image: "https://perfumeshop.com/cdn/shop/files/jo-malone-3.jpg" },
    { id: 7, name: "BVLGARI EXTREME", brand: "by Bvlgari", type: "Luminizing Clay", price: 51.74, image: "https://perfumeshop.com/cdn/shop/files/bvlgari-2.jpg" },
    { id: 8, name: "JO MALONE VETIVER & GO...", brand: "by Bvlgari", type: "Eau De Toilette", price: 51.74, image: "https://perfumeshop.com/cdn/shop/files/jo-malone-4.jpg" },
    { id: 9, name: "JO MALONE VETIVER & GO...", brand: "by Jo Malone", type: "Luminizing Clay", price: 51.74, image: "https://perfumeshop.com/cdn/shop/files/jo-malone-5.jpg" },
    { id: 10, name: "ARMAF PASSION", brand: "by Armaf", type: "Eau De Parfum", price: 51.74, image: "https://perfumeshop.com/cdn/shop/files/armaf-3.jpg" },
    { id: 11, name: "JO MALONE VETIVER & GO...", brand: "by Bvlgari", type: "Eau De Toilette", price: 51.74, image: "https://perfumeshop.com/cdn/shop/files/jo-malone-6.jpg" },
    { id: 12, name: "BVLGARI EXTREME", brand: "by Jo Malone", type: "Luminizing Clay", price: 51.74, image: "https://perfumeshop.com/cdn/shop/files/bvlgari-3.jpg" },
    { id: 13, name: "ARMAF PASSION", brand: "by Armaf", type: "Eau De Parfum", price: 51.74, image: "https://perfumeshop.com/cdn/shop/files/armaf-4.jpg" },
    { id: 14, name: "JO MALONE VETIVER & GO...", brand: "by Jo Malone", type: "Luminizing Clay", price: 51.74, image: "https://perfumeshop.com/cdn/shop/files/jo-malone-7.jpg" },
    { id: 15, name: "BVLGARI EXTREME", brand: "by Bvlgari", type: "Luminizing Clay", price: 51.74, image: "https://perfumeshop.com/cdn/shop/files/bvlgari-4.jpg" },
    { id: 16, name: "JO MALONE VETIVER & GO...", brand: "by Bvlgari", type: "Eau De Toilette", price: 51.74, image: "https://perfumeshop.com/cdn/shop/files/jo-malone-8.jpg" },
];



export default function PerfumeShopPage() {
    const [filterOpen, setFilterOpen] = useState({ brands: false, price: false, size: false, gender: false });

    const toggleFilter = (key: keyof typeof filterOpen) => {
        setFilterOpen(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="min-h-screen bg-white font-sans">

            {/* Breadcrumb & Filters Section */}
            <div className="max-w-7xl mx-auto px-4 py-4">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <a href="#" className="hover:text-purple-900 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                        Back
                    </a>
                    <div className="flex items-center gap-1 ml-4">
                        <a href="#" className="hover:text-purple-900">Home</a>
                        <span>/</span>
                        <span className="text-gray-800">Perfumes</span>
                    </div>
                </div>

                <div className="flex gap-6">
                    {/* Sidebar Filters */}
                    <aside className="hidden lg:block w-56 shrink-0">
                        {/* Active Filters */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            <span className="bg-purple-50 text-purple-900 text-xs px-3 py-1 rounded-full flex items-center gap-1">
                                CK ONE <button className="hover:text-red-500">×</button>
                            </span>
                            <span className="bg-purple-50 text-purple-900 text-xs px-3 py-1 rounded-full flex items-center gap-1">
                                75 ML <button className="hover:text-red-500">×</button>
                            </span>
                        </div>
                        <button className="text-purple-900 text-xs font-medium mb-6 hover:underline">RESET ALL FILTERS</button>

                        {/* Filter Sections */}
                        {[
                            { key: "brands", label: "FEATURED BRANDS" },
                            { key: "price", label: "PRICE RANGE" },
                            { key: "size", label: "PARFUME SIZE" },
                            { key: "gender", label: "GENDER" }
                        ].map((filter: any) => (
                            <div key={filter.key} className="border-b border-gray-200 py-3">
                                <button
                                    className="flex items-center justify-between w-full text-sm font-medium text-gray-800"
                                    onClick={() => toggleFilter(filter.key)}
                                >
                                    {filter.label}
                                    <svg className={`w-4 h-4 transition-transform `} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                </button>
                                {filterOpen && (
                                    <div className="mt-2 space-y-2 text-sm text-gray-600">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="checkbox" className="rounded" /> Option 1
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="checkbox" className="rounded" /> Option 2
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="checkbox" className="rounded" /> Option 3
                                        </label>
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Coupon Signup */}
                        <div className="mt-6 bg-purple-50 p-4 rounded-lg">
                            <h4 className="text-sm font-medium text-purple-900 mb-3">JOIN OUR COUPON LIST</h4>
                            <input type="email" placeholder="Email Address" className="w-full border border-gray-300 rounded px-3 py-2 text-sm mb-3 focus:outline-none focus:border-purple-900" />
                            <button className="w-full bg-purple-900 text-white py-2 rounded text-sm font-medium hover:bg-purple-800 transition-colors">SIGN UP</button>
                        </div>

                        {/* About Section */}
                        <div className="mt-6 text-sm text-gray-600 leading-relaxed">
                            <h4 className="font-medium text-gray-800 mb-2">ABOUT WOMEN'S PERFUME</h4>
                            <p>The Only Place To Shop The Latest Designer Perfumes At Discounts Up To 80% Off Department Store Prices. We Offer The Largest Selection Of The Latest Brand Name Perfumes And Discount Perfume Products. Shop And Save On All Women's Perfume Today.</p>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1">
                        {/* Page Title */}
                        <div className="text-center mb-6">
                            <h1 className="text-xl font-bold text-logo mb-3">Everything Look Better With You !</h1>
                        </div>

                        {/* Sort & Count */}
                        <div className="flex items-center justify-between mb-6">
                            <span className="text-sm text-gray-600">75 Products</span>
                            <div className="flex items-center gap-3">
                                <select className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-purple-900">
                                    <option>Price (High To Low)</option>
                                    <option>Price (Low To High)</option>
                                    <option>Name (A-Z)</option>
                                    <option>Best Selling</option>
                                </select>
                                <select className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-purple-900">
                                    <option>48</option>
                                    <option>24</option>
                                    <option>96</option>
                                </select>
                            </div>
                        </div>

                        {/* Product Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                            {perfumes.map((perfume) => (
                                <div key={perfume.id} className="group border border-gray-100 rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
                                    <div className="relative mb-3">
                                        <span className="absolute top-0 left-0 bg-purple-900 text-white text-xs px-2 py-0.5 rounded">WOMEN</span>
                                        <button className="absolute top-0 right-0 text-gray-400 hover:text-red-500 transition-colors">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                                        </button>
                                        <div className="bg-gray-50 rounded-lg h-48 flex items-center justify-center overflow-hidden">
                                            <div className="text-6xl opacity-30"></div>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <h3 className="text-sm font-medium text-gray-800 truncate">{perfume.name}</h3>
                                        <p className="text-xs text-gray-500 mb-1">{perfume.brand}</p>
                                        <p className="text-xs text-gray-500 mb-2">{perfume.type}</p>
                                        <p className="text-sm font-semibold text-gray-900 mb-3">from <span className="text-purple-900">${perfume.price}</span></p>
                                        <button className="w-full border border-gray-300 text-gray-700 py-2 rounded text-xs font-medium hover:bg-purple-900 hover:text-white hover:border-purple-900 transition-colors">
                                            ADD TO BAG
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="flex items-center justify-center gap-2 mt-8">
                            <button className="border border-gray-300 rounded px-3 py-1.5 text-sm hover:bg-gray-100 transition-colors">&lt;</button>
                            <button className="bg-purple-900 text-white rounded px-4 py-1.5 text-sm font-medium">1</button>
                            <button className="border border-gray-300 rounded px-4 py-1.5 text-sm hover:bg-gray-100 transition-colors">2</button>
                            <button className="border border-gray-300 rounded px-3 py-1.5 text-sm hover:bg-gray-100 transition-colors">&gt;</button>
                        </div>
                    </main>
                </div>
            </div>

            {/* Live Help Button */}
            <button className="fixed right-6 bottom-24 bg-purple-900 text-white rounded-full px-4 py-2 text-sm font-medium flex items-center gap-2 shadow-lg hover:bg-purple-800 transition-colors z-40">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                LIVE HELP
            </button>
        </div>
    );
}
