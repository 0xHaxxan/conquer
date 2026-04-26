"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

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
  size?: string
  quantity?: number
}

export interface CartItem extends Product {
  quantity: number
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
  shippingAddress: User["address"]
}

interface StoreContextType {
  // Cart
  cart: CartItem[]
  addToCart: (product: Product, quantity?: number) => void
  removeFromCart: (productId: number) => void
  updateCartQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  cartTotal: number
  cartCount: number

  // Wishlist
  wishlist: Product[]
  addToWishlist: (product: Product) => void
  removeFromWishlist: (productId: number) => void
  isInWishlist: (productId: number) => boolean

  // User/Auth
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (userData: Partial<User> & { password: string }) => Promise<boolean>
  logout: () => void
  updateUser: (userData: Partial<User>) => void
}

const StoreContext = createContext<StoreContextType | undefined>(undefined)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [wishlist, setWishlist] = useState<Product[]>([])
  const [user, setUser] = useState<User | null>(null)

  // Load from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("perfumeshop-cart")
    const savedWishlist = localStorage.getItem("perfumeshop-wishlist")
    const savedUser = localStorage.getItem("perfumeshop-user")
    
    if (savedCart) setCart(JSON.parse(savedCart))
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist))
    if (savedUser) setUser(JSON.parse(savedUser))
  }, [])

  // Save to localStorage on changes
  useEffect(() => {
    localStorage.setItem("perfumeshop-cart", JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem("perfumeshop-wishlist", JSON.stringify(wishlist))
  }, [wishlist])

  useEffect(() => {
    if (user) {
      localStorage.setItem("perfumeshop-user", JSON.stringify(user))
    } else {
      localStorage.removeItem("perfumeshop-user")
    }
  }, [user])

  // Cart functions
  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prev, { ...product, quantity }]
    })
  }

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.id !== productId))
  }

  const updateCartQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => setCart([])

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  // Wishlist functions
  const addToWishlist = (product: Product) => {
    setWishlist((prev) => {
      if (prev.find((item) => item.id === product.id)) return prev
      return [...prev, product]
    })
  }

  const removeFromWishlist = (productId: number) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId))
  }

  const isInWishlist = (productId: number) => {
    return wishlist.some((item) => item.id === productId)
  }

  // Auth functions
  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    // For demo, accept any valid email/password combo
    if (email && password.length >= 6) {
      const mockUser: User = {
        id: "user-1",
        email,
        firstName: "John",
        lastName: "Doe",
        phone: "(555) 123-4567",
        address: {
          street: "123 Main St",
          city: "New York",
          state: "NY",
          zip: "10001",
          country: "United States",
        },
        orders: [
          {
            id: "ORD-001",
            date: "2024-01-15",
            status: "delivered",
            items: [],
            total: 156.99,
            shippingAddress: {
              street: "123 Main St",
              city: "New York",
              state: "NY",
              zip: "10001",
              country: "United States",
            },
          },
        ],
      }
      setUser(mockUser)
      return true
    }
    return false
  }

  const register = async (userData: Partial<User> & { password: string }): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    if (userData.email && userData.password.length >= 6) {
      const newUser: User = {
        id: `user-${Date.now()}`,
        email: userData.email,
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
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

  const updateUser = (userData: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...userData } : null))
  }

  return (
    <StoreContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        cartCount,
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
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

export function useStore() {
  const context = useContext(StoreContext)
  if (context === undefined) {
    throw new Error("useStore must be used within a StoreProvider")
  }
  return context
}
