export const products = [
    {
        id: 1,
        name: "JO MALONE VETIVER & GOLDEN VANILLA",
        category: "For Men",
        type: "Luminizing Clay",
        price: 51.74,
        image: "/products/product1.jpg",
        tag: "GENUINE",
        tagColor: "bg-purple-700",
        description: "A sophisticated blend of warm vetiver and golden vanilla, this fragrance captures the essence of modern masculinity. The rich, earthy notes of vetiver are perfectly balanced with the sweet warmth of vanilla, creating a scent that is both bold and inviting.",
        size: "100ml"
    },
    {
        id: 2,
        name: "ARMAF PASSION",
        category: "Eau De Parfum",
        type: "",
        price: 51.74,
        image: "/products/product2.jpg",
        tag: "GENUINE",
        tagColor: "bg-purple-700",
        description: "An intoxicating feminine fragrance that embodies passion and elegance. With floral top notes and a warm base, this perfume is perfect for the confident woman who wants to make a lasting impression.",
        size: "75ml"
    },
    {
        id: 3,
        name: "JO MALONE VETIVER & GOLDEN VANILLA",
        category: "Eau De Toilette",
        type: "",
        price: 51.74,
        image: "/products/product3.jpg",
        tag: "GENUINE",
        tagColor: "bg-purple-700",
        description: "A lighter interpretation of the classic vetiver fragrance, this Eau de Toilette offers a fresh and invigorating scent perfect for everyday wear. The golden vanilla adds a touch of sweetness without overwhelming.",
        size: "50ml"
    },
    {
        id: 4,
        name: "BVLGARI EXTREME",
        category: "For Men",
        type: "Luminizing Clay",
        price: 51.74,
        image: "/products/product4.jpg",
        tag: "GENUINE",
        tagColor: "bg-purple-700",
        description: "An intense and powerful fragrance for the modern man. BVLGARI EXTREME combines fresh citrus notes with woody undertones, creating a sophisticated scent that commands attention.",
        size: "100ml"
    },
]

export const newArrivals = [
    {
        id: 5,
        name: "JO MALONE VETIVER & GOLDEN VANILLA",
        category: "For Men",
        type: "Luminizing Clay",
        price: 51.74,
        image: "/products/new1.jpg",
        tag: "GENUINE",
        tagColor: "bg-purple-700",
        description: "A luxurious new addition to the Jo Malone collection, featuring the signature vetiver and golden vanilla combination in a stunning new formulation.",
        size: "100ml"
    },
    {
        id: 6,
        name: "ARMAF PASSION",
        category: "Eau De Parfum",
        type: "",
        price: 51.74,
        image: "/products/new2.jpg",
        tag: "GENUINE",
        tagColor: "bg-purple-700",
        description: "The latest addition to the Armaf collection, this passionate fragrance combines exotic florals with warm oriental notes for an unforgettable scent experience.",
        size: "75ml"
    },
    {
        id: 7,
        name: "JO MALONE VETIVER & GOLDEN VANILLA",
        category: "Eau De Toilette",
        type: "",
        price: 51.74,
        image: "/products/new3.jpg",
        tag: "GENUINE",
        tagColor: "bg-purple-700",
        description: "A fresh new take on the beloved vetiver fragrance, perfect for spring and summer. Light, airy, and utterly captivating.",
        size: "50ml"
    },
    {
        id: 8,
        name: "BVLGARI EXTREME",
        category: "For Men",
        type: "Luminizing Clay",
        price: 51.74,
        image: "/products/new4.jpg",
        tag: "GENUINE",
        tagColor: "bg-purple-700",
        description: "The newest release from BVLGARI, this extreme edition pushes boundaries with its bold and daring scent profile.",
        size: "100ml"
    },
]

export const bestSellers = [
    {
        id: 9,
        name: "JO MALONE VETIVER & GOLDEN VANILLA",
        category: "For Men",
        type: "Luminizing Clay",
        price: 51.74,
        image: "/products/best1.jpg",
        tag: "GENUINE",
        tagColor: "bg-purple-700",
        description: "Our best-selling men's fragrance, loved for its sophisticated blend of vetiver and vanilla. A timeless classic that never goes out of style.",
        size: "100ml"
    },
    {
        id: 10,
        name: "ARMAF PASSION",
        category: "Eau De Parfum",
        type: "",
        price: 51.74,
        image: "/products/best2.jpg",
        tag: "GENUINE",
        tagColor: "bg-purple-700",
        description: "A customer favorite, this passionate fragrance has earned its place as one of our top sellers with its enchanting blend of florals and warmth.",
        size: "75ml"
    },
    {
        id: 11,
        name: "JO MALONE VETIVER & GOLDEN VANILLA",
        category: "Eau De Toilette",
        type: "",
        price: 51.74,
        image: "/products/best3.jpg",
        tag: "GENUINE",
        tagColor: "bg-purple-700",
        description: "Perfect for gifting, this elegant fragrance comes in beautiful packaging with a signature red ribbon. A bestseller year after year.",
        size: "50ml"
    },
    {
        id: 12,
        name: "BVLGARI EXTREME",
        category: "For Men",
        type: "Luminizing Clay",
        price: 51.74,
        image: "/products/best4.jpg",
        tag: "5 STAR RATED",
        tagColor: "bg-pink-500",
        description: "Our highest-rated men's cologne, with countless 5-star reviews praising its longevity and sophisticated scent profile.",
        size: "100ml"
    },
]

export const allProducts = [...products, ...newArrivals, ...bestSellers]

export function getProductById(id: number) {
    return allProducts.find(product => product.id === id)
}
