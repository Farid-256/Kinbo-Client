import Bannar from "@/components/Bannar";
import ProductSection from "@/components/ProductSection";
import { getAllProducts, getAllCompanies } from "@/lib/api/products";

export default async function Home({ searchParams }) {
  const params = await searchParams;

  const page = Math.max(1, parseInt(params?.page) || 1);
  const search = params?.search || '';
  const company = params?.company || '';
  const category = params?.category || '';

  const [productData, companies] = await Promise.all([
    getAllProducts({ page, limit: 32, search, company, category }),
    getAllCompanies()
  ]);

  return (
    <div>
      <Bannar />
      <ProductSection
        products={productData?.products}
        companies={companies}
        currentPage={productData?.currentPage}
        totalPages={productData?.totalPages}
      />
    </div>
  );
}