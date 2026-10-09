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
            <div className="relative w-full h-96 bg-gray-100 flex items-center justify-center">
                <p className="text-gray-400">No banner set yet</p>
            </div>
        )
    }

    return (
        <div className="relative w-full h-96">
            <Image
                src={banner.imageUrl}
                alt={banner.title || 'Banner'}
                fill
                className="object-cover"
                unoptimized
                priority
            />
            {banner.title && (
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center px-4">
                    <h1 className="text-4xl md:text-6xl font-bold">{banner.title}</h1>
                </div>
            )}
        </div>
    )
}

export default Bannar