'use client'

import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import { useSession } from '@/lib/auth-client'
import { FaMinus, FaPlus, FaShoppingCart, FaBan } from 'react-icons/fa'
import { toast } from 'react-toastify'

const AddToCartSection = ({ product }) => {
    const [quantity, setQuantity] = useState(1)
    const { addToCart } = useCart()
    const { data: session } = useSession()
    const user = session?.user

    const isOwner = user?.id === product.sellerId
    const isOutOfStock = product.stock <= 0 

    const handleAdd = async () => {
        if (isOutOfStock) {
            toast.error('This product is out of stock')
            return
        }
        await addToCart(product, quantity)
        toast.success('Added to cart')
    }

    // Owner message
    if (isOwner) {
        return (
            <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
                <p className="text-yellow-700 font-medium">
                    You cannot purchase your own product.
                </p>
                <p className="text-yellow-600 text-sm mt-1">
                    This product is from your own store.
                </p>
            </div>
        )
    }

    //Out of stock
    if (isOutOfStock) {
        return (
            <div className="mt-8 p-6 bg-red-50 border-2 border-red-200 rounded-lg text-center">
                <div className="w-14 h-14 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-3">
                    <FaBan />
                </div>
                <p className="text-red-700 font-bold text-lg">
                    Out of Stock
                </p>
                <p className="text-red-600 text-sm mt-1">
                    This product is currently out of stock. Please try again later.
                </p>
            </div>
        )
    }

    return (
        <div className="mt-8 space-y-4">
            {/* Quantity */}
            <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                        onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-50 cursor-pointer"
                    >
                        <FaMinus size={12} />
                    </button>
                    <span className="px-5 py-2 border-x border-gray-300 font-semibold">
                        {quantity}
                    </span>
                    <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-50 cursor-pointer"
                    >
                        <FaPlus size={12} />
                    </button>
                </div>
            </div>

            {/* Add to Cart Button */}
            <button
                onClick={handleAdd}
                className="w-full flex items-center justify-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition shadow-md cursor-pointer"
            >
                <FaShoppingCart /> Add to Cart
            </button>
        </div>
    )
}

export default AddToCartSection