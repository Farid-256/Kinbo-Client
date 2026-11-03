import Image from 'next/image';
import Link from 'next/link';

const ProductCard = ({ product, brandName }) => {
    if (!product) return null;

    //Discount logic
    const hasDiscount = product.discountPrice && Number(product.discountPrice) > 0;
    const originalPrice = Number(product.price);
    const discountAmount = Number(product.discountPrice);
    const finalPrice = hasDiscount ? originalPrice - discountAmount : originalPrice;
    const discountPercent = hasDiscount
        ? Math.round((discountAmount / originalPrice) * 100)
        : 0;

    return (
        <Link href={`/shop/${product._id}`}>
            <div className="bg-white rounded-sm shadow-md border border-gray-200 
        overflow-hidden hover:shadow-xs transition-all duration-300 hover:-translate-y-0.2 flex flex-col h-full">

                {/* Image Container */}
                <div className="relative w-full aspect-square bg-white p-2">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain"
                        unoptimized
                    />

                    {brandName && (
                        <span className="absolute top-2 left-2 bg-blue-600 text-white 
                    text-xs font-semibold px-3 py-1.5 rounded-lg shadow-md z-10">
                            {brandName}
                        </span>
                    )}

                    {/* Discount % Badge — Top Right */}
                    {hasDiscount && (
                        <span className="absolute top-2 right-2 bg-red-500 text-white 
                    text-xs font-bold px-2.5 py-1.5 rounded-lg shadow-md z-10">
                            -{discountPercent}%
                        </span>
                    )}
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-1 border-t border-gray-50">
                    <h3 className="text-base sm:text-lg font-bold text-gray-800 line-clamp-2 leading-snug">
                        {product.name}
                    </h3>

                    {/* ===== PRICE SECTION ===== */}
                    <div className="mt-auto pt-3 flex items-center justify-between">
                        <div className="flex items-center flex-wrap gap-1 sm:gap-2">
                            {hasDiscount ? (
                                <>
                                    {/* Original Price — strikethrough */}
                                    <div className='flex items-center gap-1'>
                                        <h3 className="text-xs sm:text-sm text-gray-400">Market Price: </h3>
                                        <span className="text-xs sm:text-sm text-gray-400 line-through">
                                            {originalPrice} Taka
                                        </span>
                                    </div>


                                    {/* Final Price — bold pink */}
                                    <div className='flex items-center gap-1'>
                                        <h3 className="text-xs sm:text-sm text-gray-400">Oumboo Price: </h3>
                                        <span className="text-lg sm:text-xl font-bold text-pink-600">
                                            {finalPrice} Taka
                                        </span>
                                    </div>

                                </>
                            ) : (
                                <span className="text-lg sm:text-xl font-bold text-gray-800">
                                    {originalPrice} Taka
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;