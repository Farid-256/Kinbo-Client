'use client'

import { clearUserCart, deleteCart } from '@/lib/api/products'
import { authClient, useSession } from '@/lib/auth-client'
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
            const { data: tokenData } = await authClient.token();
            const token = tokenData?.token;

            const res = await fetch(`${baseUrl}/api/cart/${user.id}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            const data = await res.json()
            setCart(data)
        }
        loadCart()

    }, [user?.id])

    const addToCart = async (product, quantity, finalPrice, selectedVariant) => {
        if (!user?.id) return

        const { data: tokenData } = await authClient.token();
        const token = tokenData?.token;

        const cartItem = {
            userId: user.id,
            productId: product._id,
            name: product.name,
            price: finalPrice,
            image: product.image,
            quantity: quantity,
            variantName: product.variantName || '',
            selectedVariant: selectedVariant || ''
        }

        await fetch(`${baseUrl}/api/cart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify(cartItem)
        })

        const res = await fetch(`${baseUrl}/api/cart/${user.id}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        const data = await res.json()
        setCart(data)
    }

    const clearCart = async () => {
        if (!user?.id) return
        await clearUserCart(user.id)
        setCart([])
    }

    const removeFromCart = async (cartItemId) => {
        try {
            const result = await deleteCart(cartItemId)

            if (result.deletedCount > 0) {
                setCart(cart.filter(item => item._id !== cartItemId))
            }
            else {
                console.error('Failed to delete cart item')
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, clearCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext)