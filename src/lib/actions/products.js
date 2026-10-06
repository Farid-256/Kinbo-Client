
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const creatProduct = async (newProduct) =>{
    const res = await fetch(`${baseUrl}/api/products`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(newProduct)
    })
    return res.json()
}

export const creatCompany = async (newCompany) =>{
    const res = await fetch(`${baseUrl}/api/my-company`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(newCompany)
    })
    return res.json()
}
