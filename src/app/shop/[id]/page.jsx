import AddToCartSection from "@/components/AddToCartSection";
import { getSellerCompany } from "@/lib/api/products";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { FaTruck, FaShieldAlt, FaUndoAlt } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";

const ProductDetails = async ({ params }) => {
    const { id } = await params;
    const {token} = await auth.api.getToken({
        headers: await headers()
    })

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    const res = await fetch(`${baseUrl}/api/products/${id}`, {
        headers: {
            authorization : `Bearer ${token}`
        }
    })
    const product = await res.json()

    const company = await getSellerCompany(product.sellerId)

    const hasDiscount = product.discountPrice && Number(product.discountPrice) > 0;
    const originalPrice = Number(product.price);
    const discountAmount = Number(product.discountPrice);
    const finalPrice = hasDiscount ? originalPrice - discountAmount : originalPrice;
    const discountPercent = hasDiscount
        ? Math.round((discountAmount / originalPrice) * 100)
        : 0;

    return (
        <div className="max-w-7xl mx-auto p-6">

            {/* Back Link */}
            <Link href="/" className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:underline mb-6">
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

                    {/* Company Badge */}
                    <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wide">
                        {company?.companyName || 'Brand Name'}
                    </span>

                    {/*Discount % Badge — Top Right */}
                    {hasDiscount && (
                        <span className="absolute top-4 right-4 bg-red-500 text-white text-sm font-bold px-3 py-1.5 rounded-lg shadow-md">
                            -{discountPercent}%
                        </span>
                    )}
                </div>

                {/* Right: Product Info */}
                <div className="flex flex-col">

                    {/* Title */}
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                        {product.name}
                    </h1>

                    {/*Price Section with Discount */}
                    <div className="flex items-end gap-3 mt-5">
                        {hasDiscount ? (
                            <>
                                {/* Original Price — strikethrough */}
                                <span className="text-2xl text-gray-400 line-through">
                                    ৳{originalPrice}
                                </span>

                                {/* Final Price — bold pink */}
                                <span className="text-4xl font-bold text-pink-600">
                                    ৳{finalPrice}
                                </span>

                                {/* Save Amount */}
                                <span className="text-sm text-green-600 font-semibold bg-green-50 px-2 py-1 rounded-md mb-1">
                                    Save ৳{discountAmount}
                                </span>
                            </>
                        ) : (
                            <span className="text-4xl font-bold text-blue-600">
                                ৳{originalPrice}
                            </span>
                        )}
                    </div>

                    {/* Stock */}
                    <div className="mt-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${product.stock > 10
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


                    {/* Add to Cart */}
                    <AddToCartSection product={product} />

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
        </div>
    );
};

export default ProductDetails;