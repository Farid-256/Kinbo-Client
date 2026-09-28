'use client'

import { creatCompany, creatProduct } from '@/lib/actions/products';
import { useSession } from '@/lib/auth-client';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { FaCloudUploadAlt, FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';

const CompanyProfile = () => {

    const [uploading, setUploading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const fileInputRef = useRef(null);
    const {data: session} = useSession()
    const user = session?.user

    // Image upload to imgbb
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast.error('Image size must be less than 5MB');
            return;
        }

        // Validate file type
        if (!file.type.startsWith('image/')) {
            toast.error('Please select an image file');
            return;
        }

        setUploading(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
            const res = await fetch(
                `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
                { method: 'POST', body: formData }
            );
            const data = await res.json();

            if (data.success) {
                const url = data.data.url;
                setImageUrl(url);
                setImagePreview(url);
                toast.success('Image uploaded successfully!');
            } else {
                console.error(data);
                toast.error(data.error?.message || "Image upload failed");
            }
        } catch (error) {
            console.error(error);
            toast.error('Error uploading image. Please try again.');
        } finally {
            setUploading(false);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const companyData = Object.fromEntries(formData.entries())

        const dataSubmit = {
            companyName: companyData.companyName,
            industry: companyData.industry,
            location: companyData.location,
            phone: companyData.phone,
            description: companyData.description,
            image: imageUrl,
            status: 'pending',
            sellerId : user.id
        }

        try {
            const result = await creatCompany(dataSubmit)
            if (result.insertedId) {
                toast.success('Profile Created Successfully')
                e.target.reset()
                setImagePreview(null)
                setImageUrl('')
            }
            else {
                toast.error('Profile not created')
            }
        }
        catch {
            toast.error('Some thing went wrong')
        }
    }

    const handleCancel = () => {
        setImagePreview(null)
        setImageUrl('')
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">

            {/* Page Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Company Profile</h1>
                    <p className="text-gray-500 mt-1">Set up your company information to build trust with customers.</p>
                </div>

                <Link href="/dashboard/seller" className="text-blue-600 font-semibold hover:underline">
                    Back to Dashboard
                </Link>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">

                {/* Company Logo Upload */}
                {/* Image Upload */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Company Logo <span className="text-red-500">*</span>
                    </label>
                    <div
                        className={`border-2 border-dashed rounded-lg p-6 text-center transition cursor-pointer
            ${imagePreview ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-blue-500'}`}
                        onClick={() => fileInputRef.current?.click()}>
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
                            <div className="relative">
                                <Image
                                    src={imagePreview}
                                    alt="Preview"
                                    width={200}
                                    height={150}
                                    className="mx-auto rounded-lg object-cover max-h-48"
                                    unoptimized
                                />
                                <p className="text-sm text-green-600 mt-2">✅ Image uploaded! Click to change</p>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-2">
                                <FaCloudUploadAlt size={48} className="text-gray-400" />
                                <p className="text-gray-600">Click or drag to upload image</p>
                                <p className="text-xs text-gray-400">PNG, JPG, GIF up to 5MB</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Company Name & Industry */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                        <input
                            type="text"
                            name="companyName"
                            required
                            placeholder="e.g. Kinbo Enterprise"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Industry / Category</label>
                        <select
                            name="industry"
                            required
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                            <option value="">Select Industry</option>
                            <option value="Fashion">Fashion & Apparel</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Food">Food & Beverage</option>
                            <option value="Beauty">Beauty & Personal Care</option>
                            <option value="Home">Home & Living</option>
                            <option value="Sports">Sports & Outdoor</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>
                </div>

                {/* Location & Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <input
                            type="text"
                            name="location"
                            required
                            placeholder="e.g. Bogura Sadar, Bogura"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            placeholder="e.g. +8801XXXXXXXXX"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* Company Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Description</label>
                    <textarea
                        name="description"
                        required
                        rows="5"
                        placeholder="Write about your company"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    ></textarea>
                </div>

                {/* Submit Button */}
                <div className="pt-4 border-t border-gray-100 flex gap-3">
                    <button
                        type="submit"
                        className="w-full md:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition shadow-md cursor-pointer"
                    >
                        Save Profile
                    </button>
                    <button
                        onClick={handleCancel}
                        type="button"
                        className="w-full md:w-auto px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition cursor-pointer"
                    >
                        Cancel
                    </button>
                </div>

            </form>
        </div>
    );
};

export default CompanyProfile;