'use client'

import { useCart } from '@/context/CartContext'
import { useSession } from '@/lib/auth-client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const Checkout = () => {
    const { data: session, isPending } = useSession()
    const user = session?.user
    const router = useRouter()
    const { cart } = useCart()
    const [submitting, setSubmitting] = useState(false)
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

    useEffect(() => {
        if (isPending) return
        if (!user) router.push('/auth/login')
    }, [isPending, router, user])

    useEffect(() => {
        if (cart.length === 0) router.push('/')
    }, [cart, router])

    const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)

    const handleConfirmOrder = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const userData = Object.fromEntries(formData.entries())
        setSubmitting(true)

        const orderData = {
            userId: user.id,
            userName: user.name,
            userEmail: user.email,
            phone: userData.phone,
            address: userData.address,
            city: userData.city,
            notes: userData.notes || '',
            items: cart,
            subtotal: subtotal,
            paymentMethod: 'COD',
            status: 'pending',
            createdAt: new Date()
        }

        try {
            const res = await fetch(`${baseUrl}/api/orders`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            })
            const result = await res.json()

            if (result.insertedId) {
                toast.success('Order placed successfully')
                router.push('/order-success')
            } else {
                toast.error('Failed to place order')
            }
        } catch (error) {
            toast.error('Something went wrong')
        } finally {
            setSubmitting(false)
        }
    }

    if (isPending) return <h2 className='text-5xl text-center text-blue-600 font-medium'>Loading...</h2>
    if (!user) return null

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Checkout</h1>

            <form onSubmit={handleConfirmOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* বাম: Delivery Form */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border">
                    <h2 className="text-xl font-bold mb-4">Delivery Information</h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Full Name</label>
                            <input type="text" defaultValue={user.name} readOnly
                                className="w-full px-4 py-2 border rounded-lg bg-gray-100" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Phone *</label>
                            <input type="tel" name="phone" required
                                className="w-full px-4 py-2 border rounded-lg" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Full Address *</label>
                            <textarea name="address" required rows="3"
                                className="w-full px-4 py-2 border rounded-lg resize-none"></textarea>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">City *</label>
                            <input type="text" name="city" required
                                className="w-full px-4 py-2 border rounded-lg" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Notes (Optional)</label>
                            <textarea name="notes" rows="2"
                                className="w-full px-4 py-2 border rounded-lg resize-none"></textarea>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border sticky top-6">
                        <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                        <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                            {cart.map(item => (
                                <div key={item._id} className="flex gap-3 items-center">
                                    <Image src={item.image} alt={item.name} width={40} height={40}
                                        className="rounded-lg object-cover" unoptimized />
                                    <div className="flex-1 text-sm">
                                        <p className="font-medium line-clamp-1">{item.name}</p>
                                        <p className="text-gray-500">{item.price} X {item.quantity} Tka</p>
                                    </div>
                                    <p className="font-bold text-sm">{item.price * item.quantity} Taka</p>
                                </div>
                            ))}
                        </div>

                        <div className="border-t pt-3 space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>{subtotal} Taka</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg border-t pt-2">
                                <span>Total</span>
                                <span className="text-blue-600">{subtotal} Taka</span>
                            </div>
                        </div>

                        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-center">
                            <p className="text-green-700 font-semibold text-sm">💵 Cash on Delivery</p>
                        </div>

                        <button type="submit" disabled={submitting}
                            className="w-full mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg disabled:bg-blue-300 cursor-pointer">
                            {submitting ? 'Placing Order...' : 'Confirm Order'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Checkout