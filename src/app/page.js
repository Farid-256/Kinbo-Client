import Bannar from "@/components/Bannar";
import ProductCard from "@/components/ProductCard";
import { getAllProducts } from "@/lib/api/products";

export default async function Home() {
  const products = await getAllProducts()
  return (
    <div>
      <Bannar></Bannar>
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Our Products</h2>
          <p className="text-gray-500 mt-2">Browse our latest collection</p>
        </div>

        {products.length === 0 ? (
          <p className="text-center text-gray-500 py-10">No products available</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
        
      </section>
    </div>
  );
}
