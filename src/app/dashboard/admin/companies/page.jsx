'use client'

import { useSession } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { getAllCompanies, deleteCompany } from '@/lib/api/products'
import Image from 'next/image'
import { FaStore, FaTrash, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'

const AllCompanies = () => {
    const { data: session, isPending } = useSession()
    const user = session?.user
    const router = useRouter()
    const [companies, setCompanies] = useState([])
    const [loading, setLoading] = useState(true)

    // Role check
    useEffect(() => {
        if (isPending) return
        if (!user) router.push('/auth/login')
        else if (user.role !== 'admin') router.push('/dashboard')
    }, [user, isPending, router])

    // Fetch companies
    useEffect(() => {
        if (!user || user.role !== 'admin') return

        const fetchCompanies = async () => {
            try {
                const data = await getAllCompanies()
                setCompanies(data || [])
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        fetchCompanies()
    }, [user])

    // Delete handler
    const handleDelete = async (companyId, companyName) => {
        const confirmDelete = window.confirm(
            `"${companyName}" Do you want to delete the company and all its products? This action cannot be undone.`
        )
        if (!confirmDelete) return

        try {
            const result = await deleteCompany(companyId)

            if (result.companyDeleted > 0) {
                setCompanies(companies.filter(c => c._id !== companyId))
                toast.success(
                    `Company deleted! ${result.productsDeleted} products and ${result.cartItemsDeleted} cart items also removed.`
                )
            } else {
                toast.error('Failed to delete company')
            }
        } catch (error) {
            console.error(error)
            toast.error('Something went wrong')
        }
    }

    if (loading || isPending) {
        return <h3 className="text-center py-20 text-gray-500">Loading companies...</h3>
    }

    if (!user || user.role !== 'admin') return null

    return (
        <div className="p-6 max-w-7xl mx-auto">

            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">All Companies</h1>
                <p className="text-gray-500 mt-1">Manage all registered companies on the platform</p>
            </div>

            {companies.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                    <FaStore className="text-gray-300 text-5xl mx-auto mb-3" />
                    <h3 className="text-xl text-gray-500">No companies yet</h3>
                    <p className="text-sm text-gray-400 mt-1">No companies have been registered yet</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {companies.map((company) => (
                        <div key={company._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">

                            {/* Cover Banner */}
                            <div className="h-20 bg-blue-500 relative">
                                <span className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold uppercase
                                    ${company.status === 'active'
                                        ? 'bg-green-100 text-green-700'
                                        : company.status === 'pending'
                                            ? 'bg-yellow-100 text-yellow-700'
                                            : 'bg-red-100 text-red-700'}`}>
                                    {company.status || 'pending'}
                                </span>
                            </div>

                            {/* Logo */}
                            <div className="px-4">
                                <div className="w-20 h-20 rounded-full bg-white p-1 shadow-md border-4 border-white -mt-10 relative z-10">
                                    <Image
                                        src={company.image || '/assets/placeholder.png'}
                                        alt={company.companyName || 'Company logo'}
                                        width={80}
                                        height={80}
                                        className="w-full h-full rounded-full object-cover"
                                        unoptimized
                                    />
                                </div>
                            </div>

                            {/* Info */}
                            <div className="p-4 pt-3">
                                <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
                                    {company.companyName}
                                </h3>
                                <span className="inline-block mt-1 px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                                    {company.industry}
                                </span>

                                <div className="mt-3 space-y-2 text-xs text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <FaMapMarkerAlt className="text-gray-400" />
                                        <span className="line-clamp-1">{company.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FaPhone className="text-gray-400" />
                                        <span>{company.phone || 'N/A'}</span>
                                    </div>
                                </div>

                                {/* Delete Button */}
                                <button
                                    onClick={() => handleDelete(company._id, company.companyName)}
                                    className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 font-semibold rounded-lg transition text-sm cursor-pointer"
                                >
                                    <FaTrash size={12} /> Delete Company
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default AllCompanies