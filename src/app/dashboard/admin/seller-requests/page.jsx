'use client'

import { useSession } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { getAllSellerRequests, updateSellerRequest } from '@/lib/api/products'
import { FaUser, FaPhone, FaEnvelope, FaCheck, FaTimes, FaStore } from 'react-icons/fa'

const SellerRequests = () => {
    const { data: session, isPending } = useSession()
    const user = session?.user
    const router = useRouter()
    const [requests, setRequests] = useState([])
    const [loading, setLoading] = useState(true)

    // Role check
    useEffect(() => {
        if (isPending) return
        if (!user) router.push('/auth/login')
        else if (user.role !== 'admin') router.push('/dashboard')
    }, [user, isPending, router])

    // Fetch requests
    useEffect(() => {
        if (!user || user.role !== 'admin') return

        const fetchRequests = async () => {
            try {
                const data = await getAllSellerRequests()
                setRequests(data || [])
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        fetchRequests()
    }, [user])

    // Approve / Reject handler
    const handleStatusChange = async (requestId, newStatus) => {
        try {
            const result = await updateSellerRequest(requestId, newStatus)
            if (result.modifiedCount > 0) {
                toast.success(`Request ${newStatus}!`)
                setRequests(requests.map(r =>
                    r._id === requestId ? { ...r, status: newStatus } : r
                ))
            } else {
                toast.error('Failed to update')
            }
        } catch (error) {
            console.error(error)
            toast.error('Something went wrong')
        }
    }

    if (loading || isPending) {
        return <h3 className="text-center py-20 text-gray-500">Loading requests...</h3>
    }

    if (!user || user.role !== 'admin') return null

    return (
        <div className="p-6 max-w-6xl mx-auto">

            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Seller Requests</h1>
                <p className="text-gray-500 mt-1">Manage customer requests to become sellers</p>
            </div>

            {requests.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                    <FaStore className="text-gray-300 text-5xl mx-auto mb-3" />
                    <h3 className="text-xl text-gray-500">No requests yet</h3>
                    <p className="text-sm text-gray-400 mt-1">No seller requests have been submitted</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {requests.map((req) => (
                        <div key={req._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

                            {/* Header */}
                            <div className="flex flex-wrap justify-between items-center gap-3 px-6 py-4 bg-gray-50 border-b border-gray-100">
                                <div className="flex items-center gap-4">
                                    <span className="font-mono text-xs text-gray-600 bg-white px-3 py-1 rounded-md">
                                        #{req._id.slice(-6)}
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        {new Date(req.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase
                                    ${req.status === 'approved' ? 'bg-green-100 text-green-700'
                                        : req.status === 'rejected' ? 'bg-red-100 text-red-700'
                                            : 'bg-yellow-100 text-yellow-700'}`}>
                                    {req.status || 'pending'}
                                </span>
                            </div>

                            <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

                                {/* User Info */}
                                <div className="lg:col-span-2 space-y-4">

                                    {/* Name */}
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                                            <FaUser />
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Name</p>
                                            <p className="text-gray-800 font-semibold mt-0.5">{req.userName}</p>
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                                            <FaEnvelope />
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Email</p>
                                            <p className="text-gray-800 font-medium mt-0.5">{req.userEmail}</p>
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                                            <FaPhone />
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Phone</p>
                                            <p className="text-gray-800 font-semibold mt-0.5">{req.phone}</p>
                                            <a
                                                href={`tel:${req.phone}`}
                                                className="text-xs text-blue-600 hover:underline mt-1 inline-block"
                                            >
                                                📞 Call Now
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="lg:col-span-1 space-y-3">

                                    {req.status === 'pending' && (
                                        <>
                                            <button
                                                onClick={() => handleStatusChange(req._id, 'approved')}
                                                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg cursor-pointer transition"
                                            >
                                                <FaCheck /> Approve Request
                                            </button>
                                            <button
                                                onClick={() => handleStatusChange(req._id, 'rejected')}
                                                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-lg cursor-pointer transition"
                                            >
                                                <FaTimes /> Reject
                                            </button>
                                        </>
                                    )}

                                    {req.status === 'approved' && (
                                        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                                            <p className="text-green-700 font-semibold text-sm">
                                                ✅ Approved
                                            </p>
                                            <p className="text-xs text-green-600 mt-1">
                                                The user has been informed to log out and log in.
                                            </p>
                                        </div>
                                    )}

                                    {req.status === 'rejected' && (
                                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-center">
                                            <p className="text-red-700 font-semibold text-sm">
                                                ❌ Rejected
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

export default SellerRequests