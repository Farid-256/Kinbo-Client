import { authClient } from "../auth-client"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const creatProduct = async (newProduct) => {
    const res = await fetch(`${baseUrl}/api/products`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct)
    })
    return res.json()
}

export const creatCompany = async (newCompany) => {
    const { data: tokenData } = await authClient.token();
    const token = tokenData?.token;
    const res = await fetch(`${baseUrl}/api/my-company`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(newCompany)
    })
    return res.json()
}
