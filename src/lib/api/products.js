

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const getCompanyProducts = async (sellerId, status = 'active') => {
    const res = await fetch(`${baseUrl}/api/products?sellerId=${sellerId}&status=${status}`)
    return res.json()
}


export const getAllProducts = async (page = 1, limit = 32) => {
    const res = await fetch(
        `${baseUrl}/api/products?status=active&page=${page}&limit=${limit}`,{cache: 'no-store'}
    );

    if (!res.ok) {
        throw new Error('Failed to fetch products');
    }

    return res.json();
};


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
        body: JSON.stringify({ status })
    })
    return res.json()
}

export const getAllSellerRequest = async () => {
    const res = await fetch(`${baseUrl}/api/seller-requests`)
    return res.json()
}

export const updateSellerRequest = async (requestId, status) => {
    const res = await fetch(`${baseUrl}/api/seller-requests/${requestId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
    })
    return res.json()
}

export const saveBanner = async (bannerData) => {
    const res = await fetch(`${baseUrl}/api/banner`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bannerData)
    })
    return res.json()
}

export const getBanner = async () => {
    const res = await fetch(`${baseUrl}/api/banner`)
    return res.json()
}

export const deleteProduct = async (productId) => {
    const res = await fetch(`${baseUrl}/api/product/${productId}`, {
        method: 'DELETE'
    })
    return res.json()
}

export const deleteCart = async (cartItemId) => {
    const res = await fetch(`${baseUrl}/api/cart/${cartItemId}`, {
        method: 'DELETE',
    })
    return res.json()
}

export const clearUserCart = async (userId) => {
    const res = await fetch(`${baseUrl}/api/cart/user/${userId}`, {
        method: 'DELETE'
    })
    return res.json()
}

export const getProductById = async (productId) => {
    const res = await fetch(`${baseUrl}/api/products/${productId}`)
    return res.json()
}

export const updateProduct = async (productId, updateProduct) => {
    const res = await fetch(`${baseUrl}/api/products/${productId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateProduct)
    })
    return res.json()
}

export const getAllCompanies = async () => {
    const res = await fetch(`${baseUrl}/api/companies`)
    return res.json()
}

export const deleteCompany = async (companyId) => {
    const res = await fetch(`${baseUrl}/api/companies/${companyId}`, {
        method: 'DELETE'
    })
    return res.json()
}