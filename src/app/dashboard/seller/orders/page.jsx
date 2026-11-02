'use client'

import { getSellerOrders } from "@/lib/api/products";
import { useSession } from "@/lib/auth-client";
import Image from "next/image";
import { useEffect, useState } from "react";

const OrderPage = () => {
    const { data: session, isPending } = useSession()
    const [order, setOrder] = useState([])
    const [loading, setLoading] = useState(true)
    const user = session?.user

    useEffect(() => {
        if (!user?.id) return
        const fetchOrder = async () => {
            try {
                const data = await getSellerOrders(user.id)
                setOrder(data || [])
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        fetchOrder()
    }, [user?.id])

    if (loading || isPending) {
        return <h3 className="text-center py-20 text-gray-500 text-lg md:text-xl">Loading orders...</h3>
    }

    if (!user) {
        return <h3 className="text-center py-20 text-red-500 text-lg md:text-xl">Please Login First</h3>
    }

    if (order.length === 0) {
        return (
            <div className="text-center py-20">
                <h3 className="text-xl text-gray-500 font-semibold">No orders yet</h3>
                <p className="text-sm text-gray-400 mt-1">You have not received any orders yet</p>
            </div>
        )
    }

    return (
        <div className="p-4 md:p-6 max-w-7xl mx-auto w-full">
            <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">My Orders</h1>
                <p className="text-sm md:text-base text-gray-500 mt-1">All orders containing your products</p>
            </div>

            {/* =========================================
                DESKTOP VIEW (Table) - hidden on mobile
            ========================================= */}
            <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-sm">
                                <th className="px-6 py-4 font-medium">Order ID</th>
                                <th className="px-6 py-4 font-medium">Customer</th>
                                <th className="px-6 py-4 font-medium">Products</th>
                                <th className="px-6 py-4 font-medium">Total</th>
                                <th className="px-6 py-4 font-medium">Date</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {order.map((singleOrder) => (
                                <tr key={singleOrder._id} className="border-b border-gray-50 hover:bg-gray-50">

                                    <td className="px-6 py-4">
                                        <span className="font-mono text-xs text-gray-600">
                                            #{singleOrder._id.slice(-6)}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4">
                                        <p className="font-medium text-gray-800">{singleOrder.userName}</p>
                                        <p className="text-xs text-gray-500">{singleOrder.phone}</p>
                                        <p className="text-xs text-gray-400">{singleOrder.city}</p>
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="space-y-2">
                                            {singleOrder.items.map((item, i) => (
                                                <div key={i} className="flex items-center gap-2">
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        width={32}
                                                        height={32}
                                                        className="rounded object-cover"
                                                        unoptimized
                                                    />
                                                    <div className="min-w-0 flex-1">
                                                        <p className="text-xs font-medium text-gray-700">
                                                            {item.name}
                                                        </p>
                                                        {item.selectedVariant && (
                                                            <p className="text-xs text-blue-600 mt-1">
                                                                {item.variantName || 'Variant'}: {item.selectedVariant}
                                                            </p>
                                                        )}
                                                        <p className="text-xs text-gray-400 mt-1">
                                                            Qty: {item.quantity}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </td>

                                    <td className="px-6 py-4">
                                        <span className="font-bold text-gray-800">{singleOrder.subtotal} Taka</span>
                                    </td>

                                    <td className="px-6 py-4 text-xs text-gray-500">
                                        {new Date(singleOrder.createdAt).toLocaleDateString()}
                                    </td>

                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase
                                            ${singleOrder.status === 'delivered'
                                                ? 'bg-green-100 text-green-700'
                                                : singleOrder.status === 'cancelled'
                                                    ? 'bg-red-100 text-red-700'
                                                    : 'bg-yellow-100 text-yellow-700'}`}>
                                            {singleOrder.status || 'pending'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* =========================================
                MOBILE VIEW (Cards) - hidden on desktop
            ========================================= */}
            <div className="block md:hidden space-y-4">
                {order.map((singleOrder) => (
                    <div key={singleOrder._id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">

                        {/* Card Header: ID & Status */}
                        <div className="flex justify-between items-center mb-3 pb-3 border-b border-gray-100">
                            <span className="font-mono text-xs text-gray-500">
                                #{singleOrder._id.slice(-6)}
                            </span>
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase
                                ${singleOrder.status === 'delivered'
                                    ? 'bg-green-100 text-green-700'
                                    : singleOrder.status === 'cancelled'
                                        ? 'bg-red-100 text-red-700'
                                        : 'bg-yellow-100 text-yellow-700'}`}>
                                {singleOrder.status || 'pending'}
                            </span>
                        </div>

                        {/* Customer Info */}
                        <div className="mb-4">
                            <p className="text-sm font-bold text-gray-800">{singleOrder.userName}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{singleOrder.phone}</p>
                            <p className="text-xs text-gray-400">{singleOrder.city}</p>
                        </div>

                        {/* Products */}
                        <div className="space-y-3 mb-4 bg-gray-50 p-3 rounded-lg">
                            {singleOrder.items.map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        width={40}
                                        height={40}
                                        className="rounded-lg object-cover bg-white border border-gray-200"
                                        unoptimized
                                    />
                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs font-semibold text-gray-800 line-clamp-1">
                                            {item.name}
                                        </p>
                                        {item.selectedVariant && (
                                            <p className="text-[10px] text-blue-600 mt-0.5">
                                                {item.variantName || 'Variant'}: {item.selectedVariant}
                                            </p>
                                        )}
                                        <p className="text-[10px] text-gray-500 mt-0.5">
                                            Qty: {item.quantity}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Card Footer: Total & Date */}
                        <div className="flex justify-between items-center pt-2">
                            <span className="text-xs text-gray-500">
                                {new Date(singleOrder.createdAt).toLocaleDateString()}
                            </span>
                            <span className="font-bold text-gray-800 text-base">
                                {singleOrder.subtotal} Taka
                            </span>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default OrderPage