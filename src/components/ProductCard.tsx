import Link from "next/link";
import { TProductPrice } from "@/types/product";

const unitBn: Record<string, string> = {
  kg: "কেজি",
  liter: "লিটার",
  litre: "লিটার",
  piece: "পিস",
  dozen: "ডজন",
};

export default function ProductCard({ product }: { product: TProductPrice }) {
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  return (
    <Link
      href={`/product/${product.slug}`}
      className="block rounded-2xl border border-gray-200 bg-white p-5 transition hover:border-[#1B7F4B] hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f3f7f3] text-2xl">
            {product.image}
          </div>
          <div>
            <h3 className="font-bold text-gray-900">{product.nameBn}</h3>
            <p className="text-xs text-gray-500">{product.categoryNameBn}</p>
          </div>
        </div>

        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
            isUp
              ? "bg-red-50 text-red-600"
              : isDown
              ? "bg-green-50 text-green-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {isUp ? "▲" : isDown ? "▼" : "•"} {Math.abs(product.change.pct).toLocaleString("bn-BD")}%
        </span>
      </div>

      <div className="mt-4 flex items-baseline justify-between border-t border-gray-100 pt-3">
        <div>
          <span className="text-xl font-bold text-gray-900">
            ৳{product.today.toLocaleString("bn-BD")}
          </span>
          <span className="ml-1 text-xs text-gray-500">
            / {unitBn[product.unit] || product.unit}
          </span>
        </div>

        <span className="text-xs text-gray-400">
          গতকাল: ৳{product.yesterday.toLocaleString("bn-BD")}
        </span>
      </div>
    </Link>
  );
}