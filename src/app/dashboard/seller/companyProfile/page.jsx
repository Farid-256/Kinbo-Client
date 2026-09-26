'use client'

import Link from 'next/link';

const CompanyProfile = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        
        console.log("Company Profile Submitted");
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
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Logo</label>
                    <div className="flex items-center gap-4">
                        {/* Logo Preview */}
                        <div className="w-20 h-20 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-xs text-center">
                            Logo<br />Preview
                        </div>
                        {/* Upload Button */}
                        <div>
                            <input type="file" name="logo" accept="image/*" className="block w-full text-sm text-gray-500 file:mr-4  file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 file:font-medium 
                            hover:file:bg-blue-100 cursor-pointer"/>
                            <p className="text-xs text-gray-400 mt-1">PNG, JPG or WEBP (Upto 2MB)</p>
                        </div>
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
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        >
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