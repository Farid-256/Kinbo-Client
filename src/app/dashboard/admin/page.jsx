'use client'
import { getAllOrders } from "@/lib/api/products";
import { useSession } from "@/lib/auth-client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


const AllOrders = () => {
    const { data: session, isPending } = useSession()
    const user = session?.user
    const router = useRouter()
    const [order, setOrder] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        if (!isPending) return
        if (!user) return router.push('/auth/login')
        else if (!user.role !== 'admin') router.push('/dashboard')
    }, [isPending, router, user])

    useEffect(() => {
        if (!user || user.role !== 'admin') return

        const fetchOrder = async () => {
            try {
                const data = await getAllOrders()
                setOrder(data)
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        fetchOrder()
    }, [user])

    if (loading || isPending) {
        return <h3 className="text-center py-20 text-gray-500">Loading orders...</h3>
    }

    if (!user || user.role !== 'admin') return null


    return (
        <div className="p-6 max-w-7xl mx-auto">

            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">All Orders</h1>
                <p className="text-gray-500 mt-1">All orders from the platform</p>
            </div>

            {order.length === 0 ? (
                <div className="text-center py-20">
                    <h3 className="text-xl text-gray-500">No orders yet</h3>
                    <p className="text-sm text-gray-400 mt-1">No orders have been placed yet</p>
                </div>
            ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
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
                                {order.map((order) => (
                                    <tr key={order._id} className="border-b border-gray-50 hover:bg-gray-50">

                                        {/* Order ID */}
                                        <td className="px-6 py-4">
                                            <span className="font-mono text-xs text-gray-600">
                                                #{order._id.slice(-6)}
                                            </span>
                                        </td>

                                        {/* Customer */}
                                        <td className="px-6 py-4">
                                            <p className="font-medium text-gray-800">{order.userName}</p>
                                            <p className="text-xs text-gray-500">{order.phone}</p>
                                            <p className="text-xs text-gray-400">{order.city}</p>
                                        </td>

                                        {/* Products */}
                                        <td className="px-6 py-4">
                                            <div className="space-y-2">
                                                {order.items.map((item, i) => (
                                                    <div key={i} className="flex items-center gap-2">
                                                        <Image
                                                            src={item.image}
                                                            alt={item.name}
                                                            width={32}
                                                            height={32}
                                                            className="rounded object-cover"
                                                            unoptimized
                                                        />
                                                        <div>
                                                            <p className="text-xs font-medium text-gray-700">{item.name}</p>
                                                            <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </td>

                                        {/* Total */}
                                        <td className="px-6 py-4">
                                            <span className="font-bold text-gray-800">৳ {order.subtotal}</span>
                                        </td>

                                        {/* Date */}
                                        <td className="px-6 py-4 text-xs text-gray-500">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </td>

                                        {/* Status */}
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase
                                                ${order.status === 'delivered'
                                                    ? 'bg-green-100 text-green-700'
                                                    : order.status === 'cancelled'
                                                        ? 'bg-red-100 text-red-700'
                                                        : 'bg-yellow-100 text-yellow-700'}`}>
                                                {order.status || 'pending'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AllOrders