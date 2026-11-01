'use client'
import { deleteProduct, getCompanyProducts } from "@/lib/api/products";
import { useSession } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const SellerProducts = () => {
    const { data: session, isPending } = useSession()
    const user = session?.user
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!user?.id) return

        const fetchProducts = async () => {
            const data = await getCompanyProducts(user.id)
            setProducts(data.products || [])
            setLoading(false)
        }
        fetchProducts()
    }, [user?.id])

    if (isPending) {
        return <h3 className="text-center text-3xl md:text-5xl text-blue-600 py-10">Loading...</h3>
    }

    if (!user) {
        return <h3 className="text-center text-red-500 py-10">Please Login</h3>
    }

    if (loading) {
        return <h3 className="text-center text-gray-500 py-10">Loading Products...</h3>
    }

    const handleDelete = async (productId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this product?')
        if (!confirmDelete) return

        try {
            const result = await deleteProduct(productId)
            if (result.deletedCount > 0) {
                setProducts(products.filter(p => p._id !== productId))
                toast.success('Product deleted successfully!')
            } else {
                toast.error('Failed to delete product')
            }
        } catch (error) {
            console.error(error)
            toast.error('Something went wrong')
        }
    }

    return (
        <div className="p-4 md:p-6 max-w-7xl mx-auto w-full">

            {/* Page Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">My Products</h1>
                    <p className="text-sm md:text-base text-gray-500 mt-1">Manage all your listed products in one place.</p>
                </div>
                <Link
                    href="/dashboard/seller/products/addProducts"
                    className="w-full md:w-auto text-center px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition shadow-md"
                >
                    + Add New Product
                </Link>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {products.length === 0 ? (
                    <div className="p-10 text-center text-gray-500">
                        <p className="text-lg font-medium">No products found!</p>
                        <p className="text-sm mt-1">Start by adding your first product.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs md:text-sm">
                            <thead>
                                <tr className="bg-gray-50 text-gray-500">
                                    <th className="px-3 md:px-6 py-3 md:py-4 font-medium">Product</th>
                                    <th className="hidden md:table-cell px-6 py-4 font-medium">Category</th>
                                    <th className="px-3 md:px-6 py-3 md:py-4 font-medium">Price</th>
                                    <th className="hidden md:table-cell px-6 py-4 font-medium">Discount</th>
                                    <th className="px-3 md:px-6 py-3 md:py-4 font-medium text-center md:text-left">Stock</th>
                                    <th className="px-3 md:px-6 py-3 md:py-4 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product._id} className="border-b border-gray-50 hover:bg-gray-50 transition">

                                        <td className="px-3 md:px-6 py-3 md:py-4">
                                            <div className="flex items-center gap-2 md:gap-3">
                                                <Image
                                                    src={product.image}
                                                    width={40}
                                                    height={40}
                                                    alt={product.name}
                                                    className="rounded-lg object-cover border border-gray-200 w-10 h-10 md:w-12 md:h-12 shrink-0"
                                                />
                                                <div className="min-w-0">
                                                    <p className="font-semibold text-gray-800 line-clamp-2 md:line-clamp-1">
                                                        {product.name}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="hidden md:table-cell px-6 py-4 text-gray-600">
                                            {product.category}
                                        </td>

                                        <td className="px-3 md:px-6 py-3 md:py-4">
                                            <span className="font-semibold text-gray-800">
                                                {product.price} Taka
                                            </span>
                                        </td>

                                        <td className="hidden md:table-cell px-6 py-4">
                                            {product.discountPrice > 0 ? (
                                                <span className="font-semibold text-green-600">
                                                    {product.discountPrice}
                                                </span>
                                            ) : (
                                                <span className="text-xs text-gray-400">No discount</span>
                                            )}
                                        </td>

                                        <td className="px-3 md:px-6 py-3 md:py-4 text-center md:text-left">
                                            <span
                                                className={`inline-block px-2 md:px-3 py-1 rounded-full text-[10px] md:text-xs font-medium ${product.stock > 10
                                                        ? "bg-green-100 text-green-700"
                                                        : product.stock > 0
                                                            ? "bg-yellow-100 text-yellow-700"
                                                            : "bg-red-100 text-red-700"
                                                    }`}
                                            >
                                                {product.stock > 0 ? `${product.stock}` : "Out"}
                                            </span>
                                        </td>

                                        <td className="px-3 md:px-6 py-3 md:py-4">
                                            <div className="flex flex-col md:flex-row justify-end gap-1.5 md:gap-2">
                                                <Link
                                                    href={`/dashboard/seller/products/edit/${product._id}`}
                                                    className="px-2 md:px-3 py-1 md:py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 font-medium rounded-lg transition text-[10px] md:text-xs text-center"
                                                >
                                                    Edit
                                                </Link>

                                                <button
                                                    onClick={() => handleDelete(product._id)}
                                                    type="button"
                                                    className="px-2 md:px-3 py-1 md:py-1.5 bg-red-50 hover:bg-red-100 text-red-600 font-medium rounded-lg transition text-[10px] md:text-xs cursor-pointer text-center"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SellerProducts;