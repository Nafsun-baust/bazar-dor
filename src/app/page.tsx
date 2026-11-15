import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { TProductPrice } from "@/types/product";

export default async function HomePage() {
  const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products");
  const products: TProductPrice[] = await res.json();

  const priceUp = products.filter((item) => item.change.dir === "up").slice(0, 6);
  const priceDown = products.filter((item) => item.change.dir === "down").slice(0, 6);

  return (
    <div className="pb-12">
      <Hero />

      <div className="mx-auto mt-8 max-w-7xl space-y-10 px-4">

        <section>
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            আজ দাম বেড়েছে <span className="text-red-600">▲</span>
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {priceUp.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            আজ দাম কমেছে <span className="text-green-700">▼</span>
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {priceDown.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section id="সব-পণ্য" className="scroll-mt-36">
          <h2 className="mb-4 text-xl font-bold text-gray-900">সব পণ্য</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}