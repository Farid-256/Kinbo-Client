

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const getCompanyProducts = async (sellerId, status = 'active') => {
    const res = await fetch(`${baseUrl}/api/products?sellerId=${sellerId}&status=${status}`)
    return res.json()
}

export const getAllProducts = async () => {
    const res = await fetch(`${baseUrl}/api/products?status=active`)
    return res.json()
}

export const getSellerCompany = async (sellerId) => {
    const res = await fetch(`${baseUrl}/api/my-company?sellerId=${sellerId}`)
    return res.json()
}

export const getUserOrder = async (userId) => {
    const res = await fetch(`${baseUrl}/api/orders?userId=${userId}`)
    return res.json()
}

export const getSellerOrders = async (sellerId) => {
    const res = await fetch(`${baseUrl}/api/orders?sellerId=${sellerId}`)
    return res.json()
}

export const getAllOrders = async () => {
    const res = await fetch(`${baseUrl}/api/orders`)
    return res.json()
}

export const updateOrderStatus = async (orderId, status) => {
    const res = await fetch(`${baseUrl}/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({status})
    })
    return res.json()
}