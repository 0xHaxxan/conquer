"use client"

import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
    ReactNode,
} from "react"

/* =========================
   TYPES
========================= */

export interface Product {
    id: number
    name: string
    category: string
    type: string
    price: number
    image: string
    tag: string
    tagColor: string
    description?: string

    // Product Options
    size?: any
}

export interface CartItem extends Product {
    quantity: number
    selectedSize?: string
}

export interface User {
    id: string
    email: string
    firstName: string
    lastName: string
    phone?: string

    address?: {
        street: string
        city: string
        state: string
        zip: string
        country: string
    }

    orders?: Order[]
}

export interface Order {
    id: string
    date: string
    status: "pending" | "processing" | "shipped" | "delivered"
    items: CartItem[]
    total: number
    shippingAddress?: User["address"]
}

/* =========================
   CONTEXT TYPES
========================= */

interface StoreContextType {
    // Cart
    cart: CartItem[]
    addToCart: (
        product: Product,
        quantity?: number,
        selectedSize?: string
    ) => void

    removeFromCart: (productId: number) => void

    updateCartQuantity: (
        productId: number,
        quantity: number
    ) => void

    updateCartSize: (
        productId: number,
        size: string
    ) => void

    clearCart: () => void

    cartTotal: number
    cartCount: number

    // Wishlist
    wishlist: Product[]

    addToWishlist: (product: Product) => void
    removeFromWishlist: (productId: number) => void
    isInWishlist: (productId: number) => boolean

    // Auth
    user: User | null
    isAuthenticated: boolean

    login: (
        email: string,
        password: string
    ) => Promise<boolean>

    register: (
        userData: Partial<User> & {
            password: string
        }
    ) => Promise<boolean>

    logout: () => void

    updateUser: (
        userData: Partial<User>
    ) => void
}

/* =========================
   STORAGE KEYS
========================= */

const STORAGE_KEYS = {
    cart: "perfumeshop-cart",
    wishlist: "perfumeshop-wishlist",
    user: "perfumeshop-user",
}

/* =========================
   CONTEXT
========================= */

const StoreContext = createContext<
    StoreContextType | undefined
>(undefined)

/* =========================
   PROVIDER
========================= */

export function StoreProvider({
    children,
}: {
    children: ReactNode
}) {
    const [cart, setCart] = useState<CartItem[]>([])
    const [wishlist, setWishlist] = useState<Product[]>([])
    const [user, setUser] = useState<User | null>(null)

    /* =========================
       LOAD STORAGE
    ========================= */

    useEffect(() => {
        try {
            const savedCart = localStorage.getItem(STORAGE_KEYS.cart)
            const savedWishlist = localStorage.getItem(STORAGE_KEYS.wishlist)
            const savedUser = localStorage.getItem(STORAGE_KEYS.user)

            if (savedCart) {
                setCart(JSON.parse(savedCart))
            }

            if (savedWishlist) {
                setWishlist(JSON.parse(savedWishlist))
            }

            if (savedUser) {
                setUser(JSON.parse(savedUser))
            }
        } catch (error) {
            console.error("Storage load error:", error)
        }
    }, [])

    /* =========================
       SAVE STORAGE
    ========================= */

    useEffect(() => {
        localStorage.setItem(
            STORAGE_KEYS.cart,
            JSON.stringify(cart)
        )
    }, [cart])

    useEffect(() => {
        localStorage.setItem(
            STORAGE_KEYS.wishlist,
            JSON.stringify(wishlist)
        )
    }, [wishlist])

    useEffect(() => {
        if (user) {
            localStorage.setItem(
                STORAGE_KEYS.user,
                JSON.stringify(user)
            )
        } else {
            localStorage.removeItem(STORAGE_KEYS.user)
        }
    }, [user])

    /* =========================
       CART FUNCTIONS
    ========================= */

    const addToCart = (
        product: Product,
        quantity = 1,
        selectedSize?: string
    ) => {
        setCart((prev) => {
            const existingItem = prev.find(
                (item) =>
                    item.id === product.id &&
                    item.selectedSize === selectedSize
            )

            // Existing Product
            if (existingItem) {
                return prev.map((item) =>
                    item.id === product.id &&
                        item.selectedSize === selectedSize
                        ? {
                            ...item,
                            quantity:
                                item.quantity + quantity,
                        }
                        : item
                )
            }

            // New Product
            return [
                ...prev,
                {
                    ...product,
                    quantity,
                    selectedSize,
                },
            ]
        })
    }

    const removeFromCart = (
        productId: number
    ) => {
        setCart((prev) =>
            prev.filter((item) => item.id !== productId)
        )
    }

    const updateCartQuantity = (
        productId: number,
        quantity: number
    ) => {
        if (quantity <= 0) {
            removeFromCart(productId)
            return
        }

        setCart((prev) =>
            prev.map((item) =>
                item.id === productId
                    ? {
                        ...item,
                        quantity,
                    }
                    : item
            )
        )
    }

    // NEW SIZE UPDATE FUNCTION
    const updateCartSize = (
        productId: number,
        size: string
    ) => {
        setCart((prev) =>
            prev.map((item) =>
                item.id === productId
                    ? {
                        ...item,
                        selectedSize: size,
                    }
                    : item
            )
        )
    }

    const clearCart = () => {
        setCart([])
    }

    /* =========================
       CALCULATIONS
    ========================= */

    const cartTotal = useMemo(() => {
        return cart.reduce(
            (sum, item) =>
                sum + item.price * item.quantity,
            0
        )
    }, [cart])

    const cartCount = useMemo(() => {
        return cart.reduce(
            (sum, item) => sum + item.quantity,
            0
        )
    }, [cart])

    /* =========================
       WISHLIST
    ========================= */

    const addToWishlist = (
        product: Product
    ) => {
        setWishlist((prev) => {
            const exists = prev.some(
                (item) => item.id === product.id
            )

            if (exists) return prev

            return [...prev, product]
        })
    }

    const removeFromWishlist = (
        productId: number
    ) => {
        setWishlist((prev) =>
            prev.filter((item) => item.id !== productId)
        )
    }

    const isInWishlist = (
        productId: number
    ) => {
        return wishlist.some(
            (item) => item.id === productId
        )
    }

    /* =========================
       AUTH
    ========================= */

    const login = async (
        email: string,
        password: string
    ) => {
        await new Promise((resolve) =>
            setTimeout(resolve, 1000)
        )

        if (email && password.length >= 6) {
            const mockUser: User = {
                id: `user-${Date.now()}`,
                email,
                firstName: "John",
                lastName: "Doe",
            }

            setUser(mockUser)

            return true
        }

        return false
    }

    const register = async (
        userData: Partial<User> & {
            password: string
        }
    ) => {
        await new Promise((resolve) =>
            setTimeout(resolve, 1000)
        )

        if (
            userData.email &&
            userData.password.length >= 6
        ) {
            const newUser: User = {
                id: `user-${Date.now()}`,
                email: userData.email,
                firstName:
                    userData.firstName || "",
                lastName:
                    userData.lastName || "",
                phone: userData.phone,
                address: userData.address,
                orders: [],
            }

            setUser(newUser)

            return true
        }

        return false
    }

    const logout = () => {
        setUser(null)
    }

    const updateUser = (
        userData: Partial<User>
    ) => {
        setUser((prev) =>
            prev
                ? {
                    ...prev,
                    ...userData,
                }
                : null
        )
    }

    /* =========================
       PROVIDER
    ========================= */

    return (
        <StoreContext.Provider
            value={{
                // Cart
                cart,
                addToCart,
                removeFromCart,
                updateCartQuantity,
                updateCartSize,
                clearCart,
                cartTotal,
                cartCount,

                // Wishlist
                wishlist,
                addToWishlist,
                removeFromWishlist,
                isInWishlist,

                // User
                user,
                isAuthenticated: !!user,
                login,
                register,
                logout,
                updateUser,
            }}
        >
            {children}
        </StoreContext.Provider>
    )
}

/* =========================
   HOOK
========================= */

export function useStore() {
    const context = useContext(StoreContext)

    if (!context) {
        throw new Error(
            "useStore must be used within StoreProvider"
        )
    }

    return context
}