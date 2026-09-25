
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const getCompanyProducts = async (companyId, status= 'active') =>{
    const res = await fetch(`${baseUrl}/api/products?companyId=${companyId}&status=${status}`)
    return res.json()
}