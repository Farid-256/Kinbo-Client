'use client'
import { creatProduct } from '@/lib/actions/products';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { toast } from 'react-toastify';


const AddProduct = () => {
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const productData = Object.fromEntries(formData.entries())
        console.log(productData)

        const submitData = {
            name: productData.name,
            category: productData.category,
            price: productData.price,
            discountPrice: productData.discountPrice,
            stock: productData.stock,
            image: productData.image,
            description: productData.description,
            company_id: 'company_123',
            status: 'active'
        }

        const res = await creatProduct(submitData)
        console.log(res)

        if (res.insertedId) {
            e.target.reset()
            router.push('/dashboard/seller/products')
        }
        else {
            toast.error('Failed to added product')
        }

    }

    return (
        <div className="p-6 max-w-4xl mx-auto">

            {/* Page Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Add New Product</h1>
                    <p className="text-gray-500 mt-1">Fill in the details to add a new product to your store.</p>
                </div>
                <Link href="/dashboard/seller" className="text-blue-600 font-semibold hover:underline">
                    Back to Dashboard
                </Link>
            </div>

            {/*Form */}
            <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">

                {/* Product Name & Category */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                        <input type="text" name="name" required placeholder="e.g. Premium Cotton T-Shirt"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select
                            name="category"
                            required
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        >
                            <option value="">Select Category</option>
                            <option value="Fashion">Fashion</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Food">Food</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>
                </div>

                {/* Price, Discount & Stock */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price (৳)</label>
                        <input type="number" name="price" required placeholder="e.g. 500"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Discount Price </label>
                        <input type="number" name="discountPrice" placeholder="e.g. 450"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
                        <input
                            type="number"
                            name="stock"
                            required
                            placeholder="e.g. 20"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* Image URL */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                    <input
                        type="url"
                        name="image"
                        required
                        placeholder="https://example.com/image.jpg"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Description</label>
                    <textarea
                        name="description"
                        required
                        rows="4"
                        placeholder="Write a detailed description about the product..."
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    ></textarea>
                </div>

                {/* Submit Button */}
                <div className="pt-4 border-t border-gray-100">
                    <button
                        type="submit"
                        className="w-full md:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition shadow-md cursor-pointer"
                    >
                        Add Product
                    </button>
                </div>

            </form>
        </div>
    );
};

export default AddProduct;