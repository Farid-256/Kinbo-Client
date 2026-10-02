'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FaTrash, FaArrowLeft } from 'react-icons/fa'
import { useCart } from '@/context/CartContext'

const Cart = () => {
    const { cart, removeFromCart } = useCart()

    const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)

    if (cart.length === 0) {
        return (
            <div className="max-w-7xl mx-auto p-6 text-center py-20">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
                <Link href="/shop" className="text-blue-600 hover:underline">
                    Continue Shopping
                </Link>
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
            <Link href="/shop" className="inline-flex items-center gap-2 text-blue-600 hover:underline mb-6">
                <FaArrowLeft /> Back to Shop
            </Link>

            <h1 className="text-3xl font-bold text-gray-800 mb-6">My Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                    {cart.map((item) => (
                        <div key={item._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex gap-4 items-center">
                            <div className="w-24 h-24 relative rounded-lg overflow-hidden shrink-0">
                                <Image src={item.image} alt={item.name} fill className="object-cover" unoptimized />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                                <p className="text-blue-600 font-bold mt-1">৳ {item.price}</p>
                                <p className="text-sm text-gray-500 mt-1">Quantity: {item.quantity}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-gray-800">৳ {item.price * item.quantity}</p>
                            </div>
                            <button
                                onClick={() => removeFromCart(item._id)}
                                className="text-red-500 hover:text-red-700 p-2 cursor-pointer"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>{subtotal} Taka </span>
                            </div>
                            <div className="border-t border-gray-100 pt-3 flex justify-between text-lg font-bold text-gray-800">
                                <span>Total</span>
                                <span className="text-blue-600">{subtotal} Taka</span>
                            </div>
                        </div>
                        <button className="w-full mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition shadow-md cursor-pointer">
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart