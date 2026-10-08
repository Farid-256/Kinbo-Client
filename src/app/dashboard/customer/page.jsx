'use client'
import { getUserOrder } from "@/lib/api/products";
import { useSession } from "@/lib/auth-client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBox, FaEnvelope, FaShoppingBag, FaUser } from "react-icons/fa";


const CustomerPage = () => {
    const router = useRouter()
    const { data: session, isPending } = useSession()
    const user = session?.user
    const [order, setOrder] = useState([])
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        if (isPending) return
        if (!user) {
            router.push('/auth/login')
        }
        else if (user.role === 'business' || user.role === 'admin') {
            router.push('/dashbord')
        }
    }, [router, user, isPending])

    useEffect(() => {
        if (!user || user.role !== 'customer') return

        const fetchOrder = async () => {
            try {
                const data = await getUserOrder(user.id)
                setOrder(data || [])
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        fetchOrder()
    }, [user])

    if (isPending || loading) {
        return <h2 className="text-center py-20 text-gray-500">Loading...</h2>
    }

    if (!user) return null
    const totalOrders = order.length
    const totalSpent = order.reduce((sum, o) => sum + Number(o.subtotal || 0), 0)




    return (
        <div className="p-6 max-w-7xl mx-auto">

            {/* Welcome Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">
                    Welcome, {user.name}
                </h1>
                <p className="text-gray-500 mt-1">Here is your account overview</p>
            </div>

            {/* Profile + Stats Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

                {/* Profile Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-2xl">
                            <FaUser />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Profile</p>
                            <h3 className="text-lg font-bold text-gray-800">{user.name}</h3>
                        </div>
                    </div>
                    <div className="space-y-2 border-t border-gray-100 pt-4">
                        <div className="flex items-center gap-2 text-sm">
                            <FaEnvelope className="text-gray-400" />
                            <span className="text-gray-700">{user.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <span className="text-xs font-semibold px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">
                                {user.role || 'customer'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Total Orders */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-4">
                    <div className="p-4 bg-purple-50 text-purple-600 rounded-xl text-2xl">
                        <FaBox />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Total Orders</p>
                        <h3 className="text-3xl font-bold text-gray-800">{totalOrders}</h3>
                        <p className="text-xs text-gray-400 mt-1">All time orders</p>
                    </div>
                </div>

                {/* Total Spent */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-4">
                    <div className="p-4 bg-green-50 text-green-600 rounded-xl text-2xl">
                        <FaShoppingBag />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Total Spent</p>
                        <h3 className="text-3xl font-bold text-gray-800">{totalSpent} Taka</h3>
                        <p className="text-xs text-gray-400 mt-1">All purchases</p>
                    </div>
                </div>
            </div>

            {/* Orders Section */}
            <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4">My Recent Orders</h2>

                {order.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                        <FaBox className="text-gray-300 text-5xl mx-auto mb-3" />
                        <h3 className="text-lg text-gray-500">No orders yet</h3>
                        <p className="text-sm text-gray-400 mt-1">Start shopping to see your orders here</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {order.map(order => (
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

                                    {/* Products */}
                                    <div className="lg:col-span-2">
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
                                                            {item.price} X {item.quantity} Taka
                                                        </p>
                                                    </div>
                                                    <p className="text-sm font-bold text-gray-800">
                                                        {Number(item.price) * item.quantity} Taka
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Total + Address */}
                                    <div className="lg:col-span-1 space-y-3">
                                        <div className="bg-blue-50 p-4 rounded-xl">
                                            <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                                                Total
                                            </p>
                                            <p className="text-2xl font-bold text-blue-700 mt-1">
                                                {order.subtotal} Taka
                                            </p>
                                            <p className="text-xs text-blue-500 mt-1">
                                                Cash on Delivery
                                            </p>
                                        </div>

                                        <div className="bg-gray-50 p-3 rounded-xl">
                                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                                                Delivery Address
                                            </p>
                                            <p className="text-sm text-gray-700">{order.address}</p>
                                            <p className="text-xs text-gray-500 mt-1">{order.city}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default CustomerPage