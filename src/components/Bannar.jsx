'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { getBanner } from '@/lib/api/products'

const Bannar = () => {
    const [banner, setBanner] = useState(null)

    useEffect(() => {
        const fetchBanner = async () => {
            const data = await getBanner()
            setBanner(data)
        }
        fetchBanner()
    }, [])

    if (!banner?.imageUrl) {
        return (
            <div className="w-full px-4 lg:px-20 py-4">
                <div className="relative w-full h-64 md:h-96 bg-gray-100 flex items-center justify-center rounded-2xl">
                    <p className="text-gray-400">No banner set yet</p>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full mb-5">

            <div className="relative w-full bg-gray-100 overflow-hidden shadow-sm">
                <Image
                    src={banner.imageUrl}
                    alt={banner.title || 'Banner'}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-full h-auto"
                    unoptimized
                    priority
                />

                {banner.title && (
                    <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center px-4">
                        <h1 className="text-4xl md:text-6xl font-bold">{banner.title}</h1>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Bannar