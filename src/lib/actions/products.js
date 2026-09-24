'use client'
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
export const creatProduct = async(newProductData) =>{
    const res =await fetch(`${baseUrl}/api/products`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(newProductData)
    })
    return res.json()
}