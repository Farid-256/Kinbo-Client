'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import ProductCard from './ProductCard'
import { FaSearch } from 'react-icons/fa'

const ProductSection = ({
    products = [],
    companies = [],
    currentPage = 1,
    totalPages= 1
}) => {
    const [productSearch, setProductSearch] = useState('')
    const [companySearch, setCompanySearch] = useState('')

    const router = useRouter()
    const searchParams = useSearchParams()

    const getBrandName = (sellerId) => {
        const company = companies.find(c => c.sellerId === sellerId)
        return company?.companyName || null
    }

    const filteredProducts = products.filter((product) => {
        const brandName = getBrandName(product.sellerId) || ''

        const matchProduct = (product.name || '')
            .toLowerCase()
            .includes(productSearch.toLowerCase())

        const matchCompany = brandName
            .toLowerCase()
            .includes(companySearch.toLowerCase())

        return matchProduct && matchCompany
    })

    const goToPage = (page) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('page', String(page))
        router.push(`?${params.toString()}`, { scroll: false })
    }

    return (
        <section className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">
                    Our Products
                </h2>
                <p className="text-gray-500 mt-2">
                    Browse our latest collection
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 max-w-3xl mx-auto">
                <div className="relative">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by product name..."
                        value={productSearch}
                        onChange={(e) => setProductSearch(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="relative">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by company name..."
                        value={companySearch}
                        onChange={(e) => setCompanySearch(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            <p className="text-sm text-gray-500 text-center mb-6">
                {filteredProducts.length} product
                {filteredProducts.length !== 1 ? 's' : ''} found on this page
            </p>

            {filteredProducts.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-xl text-gray-500">
                        No products found on this page
                    </p>
                    <p className="text-sm text-gray-400 mt-2">
                        Try a different search term
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {filteredProducts.map(product => (
                        <ProductCard
                            key={product._id}
                            product={product}
                            brandName={getBrandName(product.sellerId)}
                        />
                    ))}
                </div>
            )}

            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">
                    <button
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 border rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
                    >
                        Previous
                    </button>

                    {Array.from(
                        { length: totalPages },
                        (_, i) => i + 1
                    ).map(page => (
                        <button
                            key={page}
                            onClick={() => goToPage(page)}
                            className={`min-w-10 px-3 py-2 border rounded-lg ${
                                currentPage === page
                                    ? 'bg-blue-600 text-white border-blue-600'
                                    : 'hover:bg-gray-100'
                            }`}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 border rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
                    >
                        Next
                    </button>
                </div>
            )}
        </section>
    )
}

export default ProductSection