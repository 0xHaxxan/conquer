'use client';
import { ProductSection } from '@/components/import/ProductSection';
import { useState } from 'react';
import { products, newArrivals, bestSellers } from '@/lib/products';
import Footer from '@/components/home/Footer';

export default function PerfumeShopPage() {
    const [filterOpen, setFilterOpen] = useState({ brands: false, price: false, size: false, gender: false });

    const toggleFilter = (key: keyof typeof filterOpen) => {
        setFilterOpen(prev => ({ ...prev, [key]: !prev[key] }));
    };

    let allProducts = [...products,...newArrivals, ...bestSellers];

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
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 pl-10">
                        {/* Page Title */}
                        <div className="text-center mb-6">
                            <h1 className="text-xl font-bold text-logo mb-3">Everything Look Better With You !</h1>
                        </div>

                        {/* Sort & Count */}
                        <div className="flex items-center justify-between -mb-10">
                            <span className="text-sm text-gray-600">.</span>
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
                        <ProductSection products={allProducts} />

                        {/* Pagination */}
                        <div className="flex items-center justify-center gap-2 mb-8">
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

            <Footer />
        </div>
    );
}
