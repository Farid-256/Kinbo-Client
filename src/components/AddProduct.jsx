'use client';

import { toast } from 'react-toastify';

const AddProduct = () => {
    const handleFormSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const newProduct = Object.fromEntries(formData.entries())
        
        const res = await fetch('http://localhost:5000/api/products', {
            
            method: 'POST',
            headers: {
                'Content-Type' :'application/json'
            },
            body: JSON.stringify(newProduct)
        })

        const data = await res.json()

        if(data.insertedId){
            toast.success('Data added successfully')
        }
        else{
            toast.error('Failed to add data')
        }
    }
    return (
        <section>
            <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md border
            border-amber-200">
                <h2 className="text-2xl font-bold mb-6 text-center">Add Product</h2>

                <form onSubmit={handleFormSubmit} className="space-y-4">

                    {/* Product Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Product Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="e.g. T-Shirt"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Price
                        </label>
                        <input
                            type="number"
                            name="price"
                            placeholder="e.g. 500"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Category
                        </label>
                        <select
                            name="category"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Category</option>
                            <option value="Fashion">Fashion</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Food">Food</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            name="description"
                            rows="3"
                            placeholder="Product description..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                    </div>

                    {/* Image URL */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Image URL
                        </label>
                        <input
                            type="url"
                            name="image"
                            placeholder="https://..."
                            className="w-full px-5 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition cursor-pointer"
                    >
                        Add Product
                    </button>

                </form>
            </div>

        </section>
    );
};

export default AddProduct;