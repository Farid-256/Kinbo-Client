'use client'

import { creatProduct } from '@/lib/actions/products'
import { useSession } from '@/lib/auth-client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { useRef, useState } from 'react'
import { FaCloudUploadAlt, FaSpinner } from 'react-icons/fa'
import Image from 'next/image'

const AddProduct = () => {
    const router = useRouter()
    const { data: session } = useSession()
    const user = session?.user


    const [uploading, setUploading] = useState(false)
    const [imagePreview, setImagePreview] = useState(null)
    const [imageUrl, setImageUrl] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const fileInputRef = useRef(null)


    const handleImageUpload = async (e) => {
        const file = e.target.files[0]
        if (!file) return

        if (file.size > 5 * 1024 * 1024) {
            toast.error('Image must be less than 5MB')
            return
        }
        if (!file.type.startsWith('image/')) {
            toast.error('Please select an image file')
            return
        }

        setUploading(true)
        const formData = new FormData()
        formData.append('image', file)

        try {
            const res = await fetch(
                `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
                { method: 'POST', body: formData }
            )
            const data = await res.json()

            if (data.success) {
                setImageUrl(data.data.url)
                setImagePreview(data.data.url)
                toast.success('Image uploaded!')
            } else {
                toast.error('Upload failed')
            }
        } catch (error) {
            console.error(error)
            toast.error('Error uploading image')
        } finally {
            setUploading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitting(true)

        const formData = new FormData(e.currentTarget)
        const productData = Object.fromEntries(formData.entries())

        const submitData = {
            name: productData.name,
            category: productData.category,
            price: Number(productData.price),
            discountPrice: Number(productData.discountPrice) || 0,
            stock: Number(productData.stock),
            image: imageUrl,
            description: productData.description,
            sellerId: user?.id,
            status: 'active'
        }

        try {
            const res = await creatProduct(submitData)

            if (res.insertedId) {
                toast.success('Product added successfully!')
                router.push('/dashboard/seller/products')
            } else {
                toast.error('Failed to add product')
            }
        } catch (error) {
            console.error(error)
            toast.error('Something went wrong')
        } finally {
            setSubmitting(false)
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
                <Link href="/dashboard/seller/products" className="text-blue-600 font-semibold hover:underline">
                    Back to Products
                </Link>
            </div>

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
                        <select name="category" required
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
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
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price Taka</label>
                        <input type="number" name="price" required placeholder="e.g. 500"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Discount Price</label>
                        <input type="number" name="discountPrice" placeholder="e.g. 450"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
                        <input type="number" name="stock" required placeholder="e.g. 20"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                </div>

                {/* 👈 Image Upload (ImgBB) */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Product Image <span className="text-red-500">*</span>
                    </label>
                    <div
                        className={`border-2 border-dashed rounded-lg p-6 text-center transition cursor-pointer
                            ${imagePreview ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-blue-500'}`}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageUpload}
                            accept="image/*"
                            className="hidden"
                        />

                        {uploading ? (
                            <div className="flex items-center justify-center gap-2">
                                <FaSpinner className="animate-spin text-blue-600" size={24} />
                                <span className="text-gray-600">Uploading...</span>
                            </div>
                        ) : imagePreview ? (
                            <div>
                                <Image
                                    src={imagePreview}
                                    alt="Preview"
                                    width={200}
                                    height={200}
                                    className="mx-auto rounded-lg object-cover max-h-48"
                                    unoptimized
                                />
                                <p className="text-sm text-green-600 mt-2">✅ Click to change image</p>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-2">
                                <FaCloudUploadAlt size={48} className="text-gray-400" />
                                <p className="text-gray-600">Click or drag to upload product image</p>
                                <p className="text-xs text-gray-400">PNG, JPG up to 5MB</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Description</label>
                    <textarea name="description" required rows="4"
                        placeholder="Write a detailed description about the product..."
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    ></textarea>
                </div>

                {/* Submit Button */}
                <div className="pt-4 border-t border-gray-100">
                    <button
                        type="submit"
                        disabled={submitting || uploading || !imageUrl}
                        className="w-full md:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition shadow-md cursor-pointer disabled:bg-blue-300"
                    >
                        {submitting ? 'Adding...' : 'Add Product'}
                    </button>
                    {!imageUrl && (
                        <p className="text-xs text-gray-400 mt-2">Please upload a product image first</p>
                    )}
                </div>

            </form>
        </div>
    )
}

export default AddProduct