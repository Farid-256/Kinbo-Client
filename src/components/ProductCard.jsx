import Image from 'next/image';
import Link from 'next/link';

const ProductCard = ({ product, brandName }) => {
    if (!product) return null;

    // 👈 Discount logic
    const hasDiscount = product.discountPrice && Number(product.discountPrice) > 0;
    const originalPrice = Number(product.price);
    const discountAmount = Number(product.discountPrice);
    const finalPrice = hasDiscount ? originalPrice - discountAmount : originalPrice;
    const discountPercent = hasDiscount
        ? Math.round((discountAmount / originalPrice) * 100)
        : 0;

    return (
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 
        overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">

            {/* Image Container */}
            <div className="relative w-full h-56 bg-gray-100">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    unoptimized
                />

                {/* 👈 Company Badge — prop থেকে আসছে */}
                {brandName && (
                    <span className="absolute top-1 left-2 bg-blue-600 text-white 
                    text-xs font-semibold px-3 py-1.5 rounded-lg shadow-md">
                        {brandName}
                    </span>
                )}

                {/* Discount % Badge — Top Right */}
                {hasDiscount && (
                    <span className="absolute top-1 right-2 bg-red-500 text-white 
                    text-xs font-bold px-2.5 py-1.5 rounded-lg shadow-md">
                        -{discountPercent}%
                    </span>
                )}
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
                    {product.name}
                </h3>

                <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                    {product.description}
                </p>

                {/* ===== PRICE SECTION ===== */}
                <div className="mt-auto pt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {hasDiscount ? (
                            <>
                                {/* Original Price — strikethrough */}
                                <span className="text-sm text-gray-400 line-through">
                                    ৳{originalPrice}
                                </span>

                                {/* Final Price — bold pink */}
                                <span className="text-xl font-bold text-pink-600">
                                    ৳{finalPrice}
                                </span>
                            </>
                        ) : (
                            <span className="text-xl font-bold text-gray-800">
                                ৳{originalPrice}
                            </span>
                        )}
                    </div>

                    <Link href={`/shop/${product._id}`}>
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