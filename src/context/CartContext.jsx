'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        const saved = localStorage.getItem('kinbo-cart')
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (saved) setCart(JSON.parse(saved))
        setIsLoaded(true)
    }, [])


    useEffect(() => {
        if (isLoaded) localStorage.setItem('kinbo-cart', JSON.stringify(cart))
    }, [cart, isLoaded])


    const addToCart = (product, quantity) => {
        const existing = cart.find(item => item._id === product._id)
        
        if (existing) {

            setCart(cart.map(item =>
                item._id === product._id
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
            ))
        } else {

            setCart([...cart, { ...product, quantity }])
        }
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