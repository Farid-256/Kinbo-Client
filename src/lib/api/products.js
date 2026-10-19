import { authClient } from "../auth-client";


const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const getCompanyProducts = async (sellerId, status = 'active') => {
    const res = await fetch(`${baseUrl}/api/products?sellerId=${sellerId}&status=${status}`)
    return res.json()
}


export const getAllProducts = async (page = 1, limit = 32) => {
    const res = await fetch(
        `${baseUrl}/api/products?status=active&page=${page}&limit=${limit}`, { cache: 'no-store' }
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
    const { data: tokenData } = await authClient.token();
    const token = tokenData?.token;
    const res = await fetch(`${baseUrl}/api/orders?userId=${userId}`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
    return res.json()
}

export const getSellerOrders = async (sellerId) => {
    const { data: tokenData } = await authClient.token();
    const token = tokenData?.token;
    const res = await fetch(`${baseUrl}/api/orders?sellerId=${sellerId}`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
    return res.json()
}

export const getAllOrders = async () => {
    const { data: tokenData } = await authClient.token();
    const token = tokenData?.token;
    const res = await fetch(`${baseUrl}/api/orders`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
    return res.json()
}

export const updateOrderStatus = async (orderId, status) => {
    const { data: tokenData } = await authClient.token();
    const token = tokenData?.token;
    const res = await fetch(`${baseUrl}/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
    })
    return res.json()
}

export const getAllSellerRequest = async () => {
    const { data: tokenData } = await authClient.token();
    const token = tokenData?.token;
    const res = await fetch(`${baseUrl}/api/seller-requests`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
    return res.json()
}

export const updateSellerRequest = async (requestId, status) => {
    const { data: tokenData } = await authClient.token();
    const token = tokenData?.token;
    const res = await fetch(`${baseUrl}/api/seller-requests/${requestId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
    })
    return res.json()
}

export const saveBanner = async (bannerData) => {
    const { data: tokenData } = await authClient.token();
    const token = tokenData?.token;
    const res = await fetch(`${baseUrl}/api/banner`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
        },
        body: JSON.stringify(bannerData)
    })
    return res.json()
}

export const getBanner = async () => {
    const { data: tokenData } = await authClient.token();
    const token = tokenData?.token;
    const res = await fetch(`${baseUrl}/api/banner`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
    return res.json()
}

export const deleteProduct = async (productId) => {
    const { data: tokenData } = await authClient.token();
    const token = tokenData?.token;
    const res = await fetch(`${baseUrl}/api/product/${productId}`, {
        method: 'DELETE',
        headers: {
            authorization: `Bearer ${token}`
        }
    })
    return res.json()
}

export const deleteCart = async (cartItemId) => {
    const { data: tokenData } = await authClient.token();
    const token = tokenData?.token;
    const res = await fetch(`${baseUrl}/api/cart/${cartItemId}`, {
        method: 'DELETE',
        headers: {
            authorization: `Bearer ${token}`
        }
    })
    return res.json()
}

export const clearUserCart = async (userId) => {
    const { data: tokenData } = await authClient.token();
    const token = tokenData?.token;
    const res = await fetch(`${baseUrl}/api/cart/user/${userId}`, {
        method: 'DELETE',
        headers: {
            authorization: `Bearer ${token}`
        }
    })
    return res.json()
}

export const getProductById = async (productId) => {
    const { data: tokenData } = await authClient.token();
    const token = tokenData?.token;
    const res = await fetch(`${baseUrl}/api/products/${productId}`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
    return res.json()
}

export const updateProduct = async (productId, updateProduct) => {
    const { data: tokenData } = await authClient.token();
    const token = tokenData?.token;
    const res = await fetch(`${baseUrl}/api/products/${productId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
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
    const { data: tokenData } = await authClient.token();
    const token = tokenData?.token;
    const res = await fetch(`${baseUrl}/api/companies/${companyId}`, {
        method: 'DELETE',
        headers: {
            authorization: `Bearer ${token}`
        }
    })
    return res.json()
}