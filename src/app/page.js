import Bannar from "@/components/Bannar";
import ProductSection from "@/components/ProductSection";
import { getAllProducts, getAllCompanies } from "@/lib/api/products";

export default async function Home() {
  const products = await getAllProducts()
  const companies = await getAllCompanies()

  return (
    <div>
      <Bannar />
      <ProductSection products={products} companies={companies} />
    </div>
  );
}