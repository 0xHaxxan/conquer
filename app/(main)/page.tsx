"use client"

import Link from "next/link"
import { ChevronLeft, ChevronRight} from "lucide-react"
import { useStore, type Product } from "@/lib/store-context"
import { products, newArrivals, bestSellers } from "@/lib/products"
import Footer from "@/components/home/Footer"
import Newsletter from "@/components/home/Newsletter"
import Trust from "@/components/home/Trust"
import Certificates from "@/components/home/Certificates"
import Collection from "@/components/home/Collection"
import SaleBanner from "@/components/home/SaleBanner"
import HeroSlider from "@/components/home/HeroSlider"
import Promo from "@/components/home/Promo"
import Header from "@/components/home/Header"
import { ProductCard } from "@/components/import/ProductCard"
import { ProductSection } from "@/components/import/ProductSection"


export default function HomePage() {

    return (
        <div className="min-h-screen bg-white">
            <Promo />
            <HeroSlider />
            <SaleBanner />
            <Collection />
            <ProductSection title="RECOMMENDED FOR YOU" products={products} showShopMore />
            <ProductSection title="NEW ARRIVALS!" products={newArrivals} />
            <Certificates />
            <ProductSection title="BEST SELLERS" products={bestSellers} />
            <Trust />
            <Newsletter />
            <Footer />

        </div>
    )
}



