import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ProductCard = ({ product }) => {
    if (!product) return null;

    return (
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 
        overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">

            {/* Image */}
            <div className="relative w-full h-56 bg-gray-100">
                <Image src={product.image} alt={product.name} fill className="object-cover"/>
            </div>

            

            {/* Content */}
            <div className="p-4 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
                    {product.name}
                </h3>

                <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                    {product.description}
                </p>

                <div className="mt-auto pt-3 flex items-center justify-between">
                    <p className="text-xl font-bold text-blue-600">
                        {product.price} Taka                    </p>

                    <Link href={`/product/${product._id}`}>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition cursor-pointer">
                            View
                        </button>
                    </Link>
                </div>
            </div>

        </div>
    );
};

export default ProductCard;