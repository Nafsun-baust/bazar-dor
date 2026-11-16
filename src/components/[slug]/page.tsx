import Link from "next/link";
import CategoryProductList from "@/components/CategoryProductList";
import { TCategory } from "@/types/category";
import { TProductPrice } from "@/types/product";

export default async function CategoryPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const [catRes, prodRes] = await Promise.all([
        fetch("https://openapi.programming-hero.com/api/bazardor/categories"),
        fetch(
            `https://openapi.programming-hero.com/api/bazardor/products?category=${slug}`
        ),
    ]);

    const categories: TCategory[] = await catRes.json();
    const products: TProductPrice[] = await prodRes.json();
    const category = categories.find((c) => c.slug === slug);

    return (
        <div className="mx-auto max-w-7xl space-y-6 px-4 py-8">
            <nav className="flex items-center gap-2 text-xs text-gray-500">
                <Link href="/" className="hover:text-[#1B7F4B]">
                    হোম
                </Link>
                <span>/</span>
                <span className="font-semibold text-gray-900">
                    {category?.nameBn || slug}
                </span>
            </nav>

            <div className="flex items-center gap-4 rounded-2xl border border-green-100 bg-[#eaf4ec] p-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-3xl shadow-xs">
                    {category?.icon || "🛒"}
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        {category?.nameBn || slug} এর বাজার দর
                    </h1>
                    <p className="mt-1 text-xs text-gray-600">
                        আজকের সর্বশেষ যাচাইকৃত খুচরা ও পাইকারি বাজারদর
                    </p>
                </div>
            </div>

            <CategoryProductList products={products} />
        </div>
    );
}