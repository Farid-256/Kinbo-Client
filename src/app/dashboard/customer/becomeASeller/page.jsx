'use client'

import { useSession } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { FaStore, FaPhone, FaCheckCircle, FaArrowLeft } from 'react-icons/fa'
import Link from 'next/link'

const BecomeSeller = () => {
    const { data: session, isPending } = useSession()
    const user = session?.user
    const router = useRouter()
    const [submitting, setSubmitting] = useState(false)
    const [alreadyRequested, setAlreadyRequested] = useState(false)

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

    // Role check customer
    useEffect(() => {
        if (isPending) return
        if (!user) router.push('/auth/login')
        else if (user.role !== 'customer') router.push('/dashboard')
    }, [user, isPending, router])

    // Check if a request has already been submitted
    useEffect(() => {
        if (!user?.id) return

        const checkRequest = async () => {
            try {
                const res = await fetch(`${baseUrl}/api/seller-requests/check?userId=${user.id}`)
                const data = await res.json()
                if (data && data.status) {
                    setAlreadyRequested(data.status)
                }
            } catch (error) {
                console.error(error)
            }
        }
        checkRequest()
    }, [user?.id, baseUrl])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitting(true)

        const formData = new FormData(e.currentTarget)
        const requestData = {
            userId: user.id,
            userName: user.name,
            userEmail: user.email,
            phone: formData.get('phone'),
            interested: true,
            status: 'pending',
            createdAt: new Date()
        }

        try {
            const res = await fetch(`${baseUrl}/api/seller-requests`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestData)
            })
            const result = await res.json()

            if (result.insertedId) {
                toast.success('Request submitted successfully!')
                setAlreadyRequested('pending')
            } else {
                toast.error('Failed to submit request')
            }
        } catch (error) {
            console.error(error)
            toast.error('Something went wrong')
        } finally {
            setSubmitting(false)
        }
    }

    if (isPending) {
        return <h3 className="text-center py-20 text-gray-500">Loading...</h3>
    }

    if (!user) return null

    return (
        <div className="p-6 max-w-3xl mx-auto">

            {/* Back Link */}
            <Link href="/dashboard/customer" className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:underline mb-6">
                <FaArrowLeft /> Back to Dashboard
            </Link>

            {/* Header */}
            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
                    <FaStore />
                </div>
                <h1 className="text-3xl font-bold text-gray-800">Become a Seller</h1>
                <p className="text-gray-500 mt-2">
                    Start selling your products on Kinbo. Fill the form below and our admin will contact you.
                </p>
            </div>

            {/* If already requested */}
            {alreadyRequested && (
                <div className={`p-6 rounded-2xl border-2 text-center mb-6
                    ${alreadyRequested === 'approved'
                        ? 'bg-green-50 border-green-200'
                        : alreadyRequested === 'rejected'
                            ? 'bg-red-50 border-red-200'
                            : 'bg-yellow-50 border-yellow-200'}`}>

                    {alreadyRequested === 'pending' && (
                        <>
                            <p className="text-yellow-700 font-bold text-lg">Request Pending</p>
                            <p className="text-yellow-600 mt-2">
                                Your request has been sent. Admin will contact you soon
                            </p>
                        </>
                    )}

                    {alreadyRequested === 'approved' && (
                        <>
                            <p className="text-green-700 font-bold text-lg">✅ Request Approved!</p>
                            <p className="text-green-600 mt-2">
                                Congratulations! Your account has been upgraded to a seller account. Please log out and log in again
                            </p>
                            <button
                                onClick={() => {
                                    localStorage.clear()
                                    router.push('/auth/login')
                                }}
                                className="mt-4 px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg cursor-pointer"
                            >
                                Logout Now
                            </button>
                        </>
                    )}

                    {alreadyRequested === 'rejected' && (
                        <>
                            <p className="text-red-700 font-bold text-lg">❌ Request Rejected</p>
                            <p className="text-red-600 mt-2">
                                Sorry, your request was not accepted. Please contact us for details
                            </p>
                        </>
                    )}
                </div>
            )}

            {/* Form */}
            {!alreadyRequested && (
                <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">

                    {/* User Info (Readonly) */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                            Your Info
                        </p>
                        <p className="text-gray-800 font-medium">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            <FaPhone className="inline mr-2 text-gray-400" />
                            Phone Number *
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            required
                            placeholder="01XXXXXXXXX"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <p className="text-xs text-gray-400 mt-1">
                            The admin will call this number to verify
                        </p>
                    </div>

                    {/* Confirmation */}
                    <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                        <FaCheckCircle className="text-blue-600 text-xl mt-0.5" />
                        <div className="text-sm text-gray-700">
                            <p className="font-medium">I am interested in joining Kinbo as a seller</p>
                            <p className="text-gray-500 mt-1">
                                Once you submit, the admin will contact you.
                            </p>
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition shadow-md cursor-pointer disabled:bg-blue-300"
                    >
                        {submitting ? 'Submitting...' : 'Submit Request'}
                    </button>
                </form>
            )}
        </div>
    )
}

export default BecomeSeller