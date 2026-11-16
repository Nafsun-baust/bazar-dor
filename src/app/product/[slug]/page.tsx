import Link from "next/link";
import { TProductPrice } from "@/types/product";

const unitBn: Record<string, string> = {
  kg: "কেজি",
  liter: "লিটার",
  litre: "লিটার",
  piece: "পিস",
  dozen: "ডজন",
};

export default async function ProductDetailsPage({params,}: {params: Promise<{ slug: string }>;}){
  const { slug } = await params;
  const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products");
  const products: TProductPrice[] = await res.json();
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    return (
      <div className="py-20 text-center">
        <p className="text-lg font-bold">পণ্যটি পাওয়া যায়নি</p>
        <Link href="/" className="btn btn-sm mt-3 bg-[#1B7F4B] text-white">
          হোমে ফিরুন
        </Link>
      </div>
    );
  }

  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";
  const unit = unitBn[product.unit] || product.unit;
  const markets = product.markets || [];

  const minPrice = markets.length
    ? Math.min(...markets.map((m) => m.min))
    : product.today;
  const maxPrice = markets.length
    ? Math.max(...markets.map((m) => m.max))
    : product.today;
  const avgPrice = Math.round((minPrice + maxPrice) / 2);

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-8">
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <Link href="/" className="hover:text-[#1B7F4B]">হোম</Link>
        <span>/</span>
        <Link href={`/category/${product.category}`} className="hover:text-[#1B7F4B]">
          {product.categoryNameBn}
        </Link>
        <span>/</span>
        <span className="font-semibold text-gray-900">{product.nameBn}</span>
      </div>

      <div className="flex flex-col justify-between gap-6 rounded-2xl border border-gray-200 bg-white p-6 md:flex-row md:items-center">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#eaf4ec] text-4xl">
            {product.image}
          </div>
          <div>
            <span className="rounded-full bg-[#eaf4ec] px-2.5 py-0.5 text-xs font-semibold text-[#1B7F4B]">
              {product.categoryNameBn}
            </span>
            <h1 className="mt-1 text-2xl font-bold text-gray-900">{product.nameBn}</h1>
            <p className="text-xs text-gray-500">প্রতি {unit}</p>
          </div>
        </div>

        <div className="rounded-xl bg-[#f8fbf9] p-4 md:min-w-64">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-900">
              ৳{product.today.toLocaleString("bn-BD")}
            </span>
            <span className="text-xs text-gray-500">/ {unit}</span>
            <span
              className={`ml-auto rounded-full px-2 py-0.5 text-xs font-semibold ${
                isUp ? "bg-red-50 text-red-600" : isDown ? "bg-green-50 text-green-700" : "bg-gray-100"
              }`}
            >
              {isUp ? "▲" : isDown ? "▼" : "•"} {Math.abs(product.change.pct).toLocaleString("bn-BD")}%
            </span>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2 border-t border-gray-200 pt-2 text-xs">
            <div>
              <span className="block text-gray-400">গতকাল</span>
              <span className="font-semibold">৳{product.yesterday.toLocaleString("bn-BD")}</span>
            </div>
            <div>
              <span className="block text-gray-400">গত সপ্তাহ</span>
              <span className="font-semibold">৳{product.lastWeek.toLocaleString("bn-BD")}</span>
            </div>
            <div>
              <span className="block text-gray-400">গত মাস</span>
              <span className="font-semibold">৳{product.lastMonth.toLocaleString("bn-BD")}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-4">
          <p className="text-xs text-gray-500">সর্বনিম্ন দর</p>
          <p className="mt-1 text-2xl font-bold text-[#1B7F4B]">৳{minPrice.toLocaleString("bn-BD")}</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-4">
          <p className="text-xs text-gray-500">গড় দর</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">৳{avgPrice.toLocaleString("bn-BD")}</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-4">
          <p className="text-xs text-gray-500">সর্বোচ্চ দর</p>
          <p className="mt-1 text-2xl font-bold text-red-600">৳{maxPrice.toLocaleString("bn-BD")}</p>
        </div>
      </div>

      {markets.length > 0 && (
        <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white p-5">
          <h2 className="mb-3 text-base font-bold text-gray-900">বাজারভিত্তিক আজকের দর</h2>
          <table className="table w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-xs">
                <th>বাজার</th>
                <th>বিভাগ</th>
                <th>সর্বনিম্ন</th>
                <th>সর্বোচ্চ</th>
              </tr>
            </thead>
            <tbody>
              {markets.map((m, idx) => (
                <tr key={idx}>
                  <td className="font-semibold">{m.market}</td>
                  <td>{m.division}</td>
                  <td className="text-[#1B7F4B]">৳{m.min.toLocaleString("bn-BD")}</td>
                  <td className="text-red-600">৳{m.max.toLocaleString("bn-BD")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}