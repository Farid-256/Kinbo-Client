
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const getCompanyProducts = async (companyId, status= 'active') =>{
    const res = await fetch(`${baseUrl}/api/products?companyId=${companyId}&status=${status}`)
    return res.json()
}

export const getSellerCompany = async (sellerId) =>{
    const res = await fetch(`${baseUrl}/api/my-company?sellerId=${sellerId}`)
    return res.json()
}