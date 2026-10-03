'use client'

import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import { FaMinus, FaPlus, FaShoppingCart } from 'react-icons/fa'
import { toast } from 'react-toastify'

const AddToCartSection = ({ product }) => {
    const [quantity, setQuantity] = useState(1)
    const { addToCart } = useCart()

    const handleAdd = async() => {
        await addToCart(product, quantity)
        toast.success('Added to cart')
    }

    return (
        <div className="mt-8 space-y-4">
            {/* Quantity */}
            <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                    
                    <button onClick={() => quantity > 1 && setQuantity(quantity - 1)} className="px-4 py-2 text-gray-600 hover:bg-gray-50 cursor-pointer">
                        <FaMinus size={12} />
                    </button>

                    <span className="px-5 py-2 border-x border-gray-300 font-semibold">
                        {quantity}
                    </span>

                    <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 
                    text-gray-600 hover:bg-gray-50 cursor-pointer">
                        <FaPlus size={12} />
                    </button>
                </div>
            </div>

            {/* Add to Cart */}
            <button onClick={handleAdd} className="w-full flex items-center justify-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition shadow-md cursor-pointer">
                <FaShoppingCart /> Add to Cart
            </button>
        </div>
    )
}

export default AddToCartSection