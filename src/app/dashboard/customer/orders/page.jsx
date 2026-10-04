/* eslint-disable react-hooks/purity */
'use client'
import { getUserOrder } from "@/lib/api/products";
import { useSession } from "@/lib/auth-client";
import Image from "next/image";
import { useEffect, useState } from "react";

const Order = () => {
    const { data: session, isPending } = useSession();
    const user = session?.user;
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setLoading(false)
            return
        }

        const fetchOrders = async () => {
            try {
                const data = await getUserOrder(user.id)
                setOrders(data || [])
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        fetchOrders()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.id])

    if (loading || isPending) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <h3 className="text-xl font-medium text-gray-600 animate-pulse">Loading orders...</h3>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <h3 className="text-xl font-semibold text-red-500 mb-2">Please Login to view your orders</h3>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <h3 className="text-xl font-medium text-gray-500">No orders yet</h3>
                <p className="text-sm text-gray-400 mt-1">You have not placed any orders so far.</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">My Orders</h1>

            <div className="space-y-6">
                {orders.map((order) => (
                    <div key={order._id}
                        className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
                    >
                        {/* Order Header */}
                        <div className="flex flex-wrap justify-between items-center border-b pb-4 mb-4 gap-2">
                            <div>
                                <span className="text-xs text-gray-500 block">Order ID</span>
                                <span className="font-mono text-sm font-semibold text-gray-700">{order._id}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className={`px-3 py-1 text-xs font-semibold rounded-full uppercase ${order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                                    order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                                        'bg-yellow-100 text-yellow-750'
                                    }`}>
                                    {order.status || 'Pending'}
                                </span>
                                <span className="text-sm font-medium text-gray-600">
                                    {new Date(order.createdAt || Date.now()).toLocaleDateString()}
                                </span>
                            </div>
                        </div>

                        {/* Order Items List */}
                        <div className="space-y-3">
                            {order.items?.map((item, index) => (
                                <div key={index} className="flex justify-between items-center text-sm">
                                    <div className="flex items-center gap-3">

                                        {item.image && (
                                            <Image src={item.image} alt={item.name} width={48} height={48} className="object-cover rounded" unoptimized />
                                        )}

                                        <div>
                                            <p className="font-medium text-gray-800">{item.name || "Product Name"}</p>
                                            <p className="text-gray-500 text-xs">Qty: {item.quantity || 1}</p>
                                        </div>
                                    </div>
                                  <span className="font-semibold text-gray-700">
                                    {item.price || 0} Taka
                                  </span>
                                </div>
                            ))}
                        </div>

                        {/* Order Footer / Total */}
                        <div className="border-t pt-4 mt-4 flex justify-between items-center">
                            <span className="font-medium text-gray-600">Total Amount:</span>
                            <span className="text-lg font-bold text-gray-900">{order.subtotal || 0} Taka</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Order;