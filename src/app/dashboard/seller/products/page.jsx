import { getCompanyProducts } from "@/lib/api/products";
import Image from "next/image";
import Link from "next/link";

const SellerProducts = async () => {
    const companyId = 'company_123'
    const products = await getCompanyProducts(companyId)

    return (
        <div className="p-6 max-w-7xl mx-auto">

            {/*Page Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">My Products</h1>
                    <p className="text-gray-500 mt-1">Manage all your listed products in one place.</p>
                </div>
                <Link
                    href="/dashboard/seller/products/addProducts"
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition shadow-md"
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
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 text-gray-500 text-sm">
                                    <th className="px-6 py-4 font-medium">Product</th>
                                    <th className="px-6 py-4 font-medium">Category</th>
                                    <th className="px-6 py-4 font-medium">Price</th>
                                    <th className="px-6 py-4 font-medium">Stock</th>
                                    <th className="px-6 py-4 font-medium">Status</th>
                                    <th className="px-6 py-4 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {products.map((product) => (
                                    <tr
                                        key={product._id}
                                        className="border-b border-gray-50 hover:bg-gray-50 transition"
                                    >
                                        {/* Product Name + Image */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <Image src={product.image} width={48} height={48} alt="image" className="rounded-lg object-cover border border-gray-200" ></Image>
                                                <div>
                                                    <p className="font-semibold text-gray-800 line-clamp-1">
                                                        {product.name}
                                                    </p>
                                                    <p className="text-xs text-gray-400 line-clamp-1">
                                                        {product.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Category */}
                                        <td className="px-6 py-4 text-gray-600">
                                            {product.category}
                                        </td>

                                        {/* Price */}
                                        <td className="px-6 py-4">
                                            <span className="font-semibold text-gray-800">
                                                {product.price} Taka
                                            </span>
                                            {product.discountPrice && (
                                                <span className="block text-xs text-gray-400 line-through">
                                                    {product.discountPrice} Taka
                                                </span>
                                            )}
                                        </td>

                                        {/* Stock */}
                                        <td className="px-6 py-4">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-medium ${product.stock > 10
                                                        ? "bg-green-100 text-green-700"
                                                        : product.stock > 0
                                                            ? "bg-yellow-100 text-yellow-700"
                                                            : "bg-red-100 text-red-700"
                                                    }`}
                                            >
                                                {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                                            </span>
                                        </td>

                                        {/* Status */}
                                        <td className="px-6 py-4">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-medium ${product.status === 'active'
                                                        ? "bg-blue-100 text-blue-700"
                                                        : "bg-gray-100 text-gray-700"
                                                    }`}
                                            >
                                                {product.status || 'active'}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex justify-end gap-2">
                                                {/* Edit Button */}
                                                <Link
                                                    href={`/dashboard/seller/products/edit/${product._id}`}
                                                    className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 font-medium rounded-lg transition text-xs"
                                                >
                                                    Edit
                                                </Link>

                                                {/* Delete Button */}
                                                <button
                                                    type="button"
                                                    className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 font-medium rounded-lg transition text-xs cursor-pointer"
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