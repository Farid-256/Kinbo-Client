'use client'

import { useSession } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { FaCloudUploadAlt, FaSpinner, FaImage } from 'react-icons/fa'
import Image from 'next/image'

const SetBanner = () => {
    const { data: session, isPending } = useSession()
    const user = session?.user
    const router = useRouter()

    const [uploading, setUploading] = useState(false)
    const [imagePreview, setImagePreview] = useState(null)
    const [imageUrl, setImageUrl] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const fileInputRef = useRef(null)

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

    // Role check
    useEffect(() => {
        if (isPending) return
        if (!user) router.push('/auth/login')
        else if (user.role !== 'admin') router.push('/dashboard')
    }, [user, isPending, router])

    // ImgBB upload (CompanyProfile এর মতো)
    const handleImageUpload = async (e) => {
        const file = e.target.files[0]
        if (!file) return

        if (file.size > 5 * 1024 * 1024) {
            toast.error('Image must be less than 5MB')
            return
        }
        if (!file.type.startsWith('image/')) {
            toast.error('Please select an image')
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

    // Submit — MongoDB তে সেভ
    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitting(true)

        const formData = new FormData(e.currentTarget)
        const bannerData = {
            imageUrl: imageUrl,
            title: formData.get('title') || '',
            updatedAt: new Date()
        }

        try {
            const res = await fetch(`${baseUrl}/api/banner`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bannerData)
            })
            const result = await res.json()

            if (result.acknowledged) {
                toast.success('Banner saved successfully!')
            } else {
                toast.error('Failed to save banner')
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

    if (!user || user.role !== 'admin') return null

    return (
        <div className="p-6 max-w-3xl mx-auto">

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Set Banner</h1>
                <p className="text-gray-500 mt-1">Upload and set the homepage banner</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">

                {/* Image Upload */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Banner Image <span className="text-red-500">*</span>
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
                                    width={400}
                                    height={200}
                                    className="mx-auto rounded-lg object-cover max-h-48"
                                    unoptimized
                                />
                                <p className="text-sm text-green-600 mt-2">✅ Click to change image</p>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-2">
                                <FaCloudUploadAlt size={48} className="text-gray-400" />
                                <p className="text-gray-600">Click or drag to upload banner</p>
                                <p className="text-xs text-gray-400">PNG, JPG up to 5MB</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Title (optional) */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Banner Title (Optional)
                    </label>
                    <input
                        type="text"
                        name="title"
                        placeholder="e.g. Big Sale - 50% Off"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={submitting || uploading || !imageUrl}
                    className="w-full px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition shadow-md cursor-pointer disabled:bg-blue-300"
                >
                    {submitting ? 'Saving...' : 'Save Banner'}
                </button>

                {!imageUrl && (
                    <p className="text-xs text-center text-gray-400">
                        Please upload an image first
                    </p>
                )}
            </form>
        </div>
    )
}

export default SetBanner