'use client'

import { getAllOrders, updateOrderStatus } from '@/lib/api/products'
import { useSession } from '@/lib/auth-client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { FaMapMarkerAlt, FaPhone, FaUser, FaCheck, FaTimes } from 'react-icons/fa'

const AllOrders = () => {
    const { data: session, isPending } = useSession()
    const user = session?.user
    const router = useRouter()
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    // Role check
    useEffect(() => {
        if (isPending) return
        if (!user) router.push('/auth/login')
        else if (user.role !== 'admin') router.push('/dashboard')
    }, [isPending, router, user])

    // Fetch orders
    useEffect(() => {
        if (!user || user.role !== 'admin') return

        const fetchOrders = async () => {
            try {
                const data = await getAllOrders()
                setOrders(data || [])
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        fetchOrders()
    }, [user])

    // Status update handler
    const handleStatusChange = async (orderId, newStatus) => {
        try {
            const result = await updateOrderStatus(orderId, newStatus)
            if (result.modifiedCount > 0) {
                toast.success(`Order ${newStatus}!`)
                setOrders(orders.map(o =>
                    o._id === orderId ? { ...o, status: newStatus } : o
                ))
            } else {
                toast.error('Failed to update status')
            }
        } catch (error) {
            console.error(error)
            toast.error('Something went wrong')
        }
    }

    if (loading || isPending) {
        return <h3 className="text-center py-20 text-gray-500">Loading orders...</h3>
    }

    if (!user || user.role !== 'admin') return null

    return (
        <div className="p-6 max-w-7xl mx-auto">

            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">All Orders</h1>
                <p className="text-gray-500 mt-1">Manage all customer orders</p>
            </div>

            {orders.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                    <h3 className="text-xl text-gray-500">No orders yet</h3>
                    <p className="text-sm text-gray-400 mt-1">No orders have been placed yet</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div key={order._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

                            {/* Order Header */}
                            <div className="flex flex-wrap justify-between items-center gap-3 px-6 py-4 bg-gray-50 border-b border-gray-100">
                                <div className="flex items-center gap-4">
                                    <span className="font-mono text-xs text-gray-600 bg-white px-3 py-1 rounded-md">
                                        #{order._id.slice(-6)}
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase
                                    ${order.status === 'approved' ? 'bg-green-100 text-green-700'
                                        : order.status === 'cancelled' ? 'bg-red-100 text-red-700'
                                            : 'bg-yellow-100 text-yellow-700'}`}>
                                    {order.status || 'pending'}
                                </span>
                            </div>

                            <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

                                {/* Customer + Address Section */}
                                <div className="lg:col-span-1 space-y-4">

                                    {/* Customer Info */}
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                                            <FaUser />
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Customer</p>
                                            <p className="text-gray-800 font-semibold mt-0.5">{order.userName}</p>
                                            <p className="text-sm text-gray-500">{order.userEmail}</p>
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                                            <FaPhone />
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Phone</p>
                                            <p className="text-gray-800 font-semibold mt-0.5">{order.phone}</p>
                                        </div>
                                    </div>

                                    {/* Address - Full */}
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                                            <FaMapMarkerAlt />
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Delivery Address</p>
                                            <p className="text-gray-800 font-medium mt-0.5">{order.address}</p>
                                            <p className="text-sm text-gray-500 mt-0.5">{order.city}</p>
                                            {order.notes && (
                                                <p className="text-xs text-gray-400 mt-1 italic">Note: {order.notes}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Products Section */}
                                <div className="lg:col-span-1">
                                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                                        Products ({order.items.length})
                                    </p>
                                    <div className="space-y-3">
                                        {order.items.map((item, i) => (
                                            <div key={i} className="flex gap-3 items-center bg-gray-50 p-3 rounded-lg">
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    width={48}
                                                    height={48}
                                                    className="rounded-lg object-cover"
                                                    unoptimized
                                                />
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium text-gray-800">{item.name}</p>
                                                    <p className="text-xs text-gray-500">
                                                        ৳ {item.price} × {item.quantity}
                                                    </p>
                                                </div>
                                                <p className="text-sm font-bold text-gray-800">
                                                    {Number(item.price) * item.quantity} Taka
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Total + Actions */}
                                <div className="lg:col-span-1 space-y-4">

                                    {/* Total */}
                                    <div className="bg-blue-50 p-4 rounded-xl">
                                        <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                                            Total Amount
                                        </p>
                                        <p className="text-3xl font-bold text-blue-700 mt-1">
                                            ৳ {order.subtotal}
                                        </p>
                                        <p className="text-xs text-blue-500 mt-1">
                                            💵 Cash on Delivery
                                        </p>
                                    </div>

                                    {/* Action Buttons */}
                                    {order.status === 'pending' && (
                                        <div className="space-y-2">
                                            <button
                                                onClick={() => handleStatusChange(order._id, 'approved')}
                                                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg cursor-pointer transition"
                                            >
                                                <FaCheck /> Approve Order
                                            </button>
                                            <button
                                                onClick={() => handleStatusChange(order._id, 'cancelled')}
                                                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-lg cursor-pointer transition"
                                            >
                                                <FaTimes /> Cancel Order
                                            </button>
                                        </div>
                                    )}

                                    {order.status === 'approved' && (
                                        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                                            <p className="text-green-700 font-semibold text-sm">
                                                ✅ Order Approved
                                            </p>
                                        </div>
                                    )}

                                    {order.status === 'cancelled' && (
                                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-center">
                                            <p className="text-red-700 font-semibold text-sm">
                                                ❌ Order Cancelled
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default AllOrders