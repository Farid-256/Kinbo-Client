
import AddToCartSection from "@/components/AddToCartSection";
import { getSellerCompany } from "@/lib/api/products";
import Image from "next/image";
import Link from "next/link";
import { FaHeart, FaTruck, FaShieldAlt, FaUndoAlt } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";

const ProductDetails = async ({ params }) => {
    const { id } = await params;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    const res = await fetch(`${baseUrl}/api/products/${id}`)
    const product = await res.json()

    const company = await getSellerCompany(product.sellerId)

    return (
        <div className="max-w-7xl mx-auto p-6">

            {/* Back Link */}
            <Link href="/shop" className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:underline mb-6">
                <IoArrowBack />
                Back to Shop
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8">

                {/* Left: Product Image */}
                <div className="relative">
                    <div className="relative w-full h-96 bg-gray-50 rounded-2xl overflow-hidden">
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                            unoptimized
                        />
                    </div>

                    {/* Category Badge */}
                    <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wide">
                        {company?.companyName}
                    </span>

                    {/* Wishlist Icon */}
                    <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-gray-500 hover:text-red-500 transition cursor-pointer">
                        <FaHeart />
                    </button>
                </div>

                {/* 📝 Right: Product Info */}
                <div className="flex flex-col">

                    {/* Title */}
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                        {product.name}
                    </h1>

                    {/* Price */}
                    <div className="flex items-end gap-3 mt-5">
                        <span className="text-4xl font-bold text-blue-600">
                            {product.price} Taka
                        </span>
                    </div>

                    {/* Stock */}
                    <div className="mt-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold {product.stock > 10
                                ? 'bg-green-100 text-green-700'
                                : product.stock > 0
                                    ? 'bg-yellow-100 text-yellow-700'
                                    : 'bg-red-100 text-red-700'
                            }`}>
                            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                        </span>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-100 my-6"></div>

                    {/* Description */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-2">
                            Description
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            {product.description}
                        </p>
                    </div>

                    <div className="flex justify-end">
                            
                            <AddToCartSection product={product}></AddToCartSection>
                        </div>
                    </div>

                    

                    {/* Trust Badges */}
                    <div className="grid grid-cols-3 gap-3 mt-8 pt-6 border-t border-gray-100">
                        <div className="flex flex-col items-center text-center gap-1">
                            <FaTruck className="text-blue-600 text-xl" />
                            <span className="text-xs text-gray-600 font-medium">Fast Delivery</span>
                        </div>
                        <div className="flex flex-col items-center text-center gap-1">
                            <FaShieldAlt className="text-blue-600 text-xl" />
                            <span className="text-xs text-gray-600 font-medium">Secure Payment</span>
                        </div>
                        <div className="flex flex-col items-center text-center gap-1">
                            <FaUndoAlt className="text-blue-600 text-xl" />
                            <span className="text-xs text-gray-600 font-medium">Easy Return</span>
                        </div>
                    </div>

                </div>
            </div>
    );
};

export default ProductDetails;