import { MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const categories = [
    {
        title: "WOMEN'S PERFUME",
        image: "/categories/womens.jpg",
        alt: "Women's Perfume",
        subtitle: "Shop Now",
    },
    {
        title: "MEN'S PERFUME",
        image: "/categories/mens.jpg",
        alt: "Men's Perfume",
        subtitle: "Shop Now",
    },
    {
        title: "HAIRCARE",
        image: "/categories/haircare.jpg",
        alt: "Haircare",
        subtitle: "coming soon",
    },
    {
        title: "SKINCARE",
        image: "/categories/skincare.jpg",
        alt: "Skincare",
        subtitle: "coming soon",
    },
    {
        title: "GIFT SETS",
        image: "/categories/giftsets.jpg",
        alt: "Gift Sets",
        subtitle: "Shop Now",
    },
    {
        title: "BEST SELLERS",
        image: "/categories/bestsellers.jpg",
        alt: "Best Sellers",
        subtitle: "Shop Now",
    },
];

const Collection = () => {
    return (
        <section className="py-12 md:py-16">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                        SHOP OUR COLLECTION
                    </h2>
                    <p className="text-gray-500 text-sm">
                        Our Delicious, Limited-Edition Collection
                    </p>
                </div>

                {/* Button */}
                <div className="flex justify-center mb-8">
                    <Link href="/product" className="border-2 border-gray-900 px-8 py-2 text-sm font-medium hover:bg-gray-900 hover:text-white transition-colors">
                        SHOP ALL
                    </Link>
                </div>

                {/* Live Help */}
                <div className="fixed right-4 top-1/3 z-40 hidden lg:block">
                    <button className="bg-[#1a1a2e] text-white px-4 py-3 rounded-l-lg flex items-center gap-2 text-sm">
                        <MessageCircle className="w-4 h-4" />
                        LIVE HELP
                    </button>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {categories.map((item, index) => (
                        <div
                            key={index}
                            className="relative h-64 md:h-80 overflow-hidden group cursor-pointer"
                        >
                            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent z-10" />

                            <Image
                                src={item.image}
                                alt={item.alt}
                                fill
                                style={{ objectFit: "cover" }}
                                className="group-hover:scale-105 transition-transform duration-300"
                            />

                            <div className="absolute bottom-4 left-4 z-20 text-white">
                                <h3 className="text-xl font-bold">{item.title}</h3>
                                {item.subtitle && (
                                    <p className="text-sm">{item.subtitle}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Collection;