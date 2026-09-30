import ProductCard from "@/components/ProductCard";
import { getAllProducts } from "@/lib/api/products";


const Shop = async () => {
   const products = await getAllProducts()

    return (
        <div>
            <h1 className="text-3xl font-bold text-center text-gray-800 py-5">Shop</h1>
            {
                products.length === 0 ? 'No Product Available' : (<div className="grid grid-cols-4 gap-5 p-10">
                    {
                        products.map(product => (<ProductCard key={product._id} product={product}>
                            
                        </ProductCard>))
                    }
                </div>)
            }

        </div>
    );
};

export default Shop;