'use client'

import { useSession } from '@/lib/auth-client'
import { createContext, useContext, useEffect, useState } from 'react'
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])
    const { data: session } = useSession()
    const user = session?.user

    useEffect(() => {
        if (!user?.id) return

        const loadCart = async () => {
            const res = await fetch(`${baseUrl}/api/cart/${user.id}`)
            const data = await res.json()
            setCart(data)
        }
        loadCart()

    }, [user?.id])

    const addToCart = async (product, quantity) => {
        if (!user?.id) return

        const cartItem = {
            userId: user.id,
            productId: product._id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        }

        await fetch(`${baseUrl}/api/cart`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(cartItem)
        })

        const res = await fetch(`${baseUrl}/api/cart/${user.id}`)
        const data = await res.json()
        setCart(data)
    }

     const removeFromCart = (id) => {
        setCart(cart.filter(item => item._id !== id))
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext)