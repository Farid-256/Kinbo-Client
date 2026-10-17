
import Bannar from "@/components/Bannar";
import ProductSection from "@/components/ProductSection";
import { getAllProducts, getAllCompanies } from "@/lib/api/products";

export default async function Home({ searchParams }) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params?.page) || 1);

  const [productData, companies] = await Promise.all([
    getAllProducts(page, 32),
    getAllCompanies()
  ]);
  console.log("Backend response:", productData);

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
