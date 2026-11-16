import Link from "next/link";
import { TProductPrice } from "@/types/product";

const unitBn: Record<string, string> = {
  kg: "প্রতি কেজি",
  liter: "প্রতি লিটার",
  litre: "প্রতি লিটার",
  piece: "প্রতি পিস",
  dozen: "প্রতি ডজন",
};

export default function ProductCard({ product }: { product: TProductPrice }) {
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  return (
    <Link
      href={`/product/${product.slug}`}
      className="block rounded-2xl border border-gray-200 bg-white p-5 transition hover:border-[#1B7F4B] hover:shadow-md"
    >
      {/* উপরের অংশ: Emoji + পণ্যের নাম + একক (Unit) */}
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f3f7f3] text-2xl">
          {product.image}
        </div>
        <div>
          <h3 className="font-bold text-gray-900">{product.nameBn}</h3>
          <p className="text-xs text-gray-500">
            {unitBn[product.unit] || `প্রতি ${product.unit}`}
          </p>
        </div>
      </div>

      {/* নিচের অংশ: আজকের দাম + টাকা (বামে) এবং পরিবর্তনের ব্যাজ (ডানে) */}
      <div className="mt-5 flex items-end justify-between border-t border-gray-100 pt-3">
        <div>
          <p className="text-[11px] text-gray-400">আজকের দাম</p>
          <p className="mt-0.5 text-lg font-bold text-gray-900">
            {product.today.toLocaleString("bn-BD")}{" "}
            <span className="text-sm font-semibold text-gray-700">টাকা</span>
          </p>
        </div>

        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${isUp
            ? "bg-green-50 text-green-700"
            : isDown
              ? "bg-red-50 text-red-600"
              : "bg-gray-100 text-gray-600"
            }`}
        >
          {isUp
            ? `▲ ${Math.abs(product.change.pct).toLocaleString("bn-BD")}%`
            : isDown
              ? `▼ ${Math.abs(product.change.pct).toLocaleString("bn-BD")}%`
              : "— ০.০%"}
        </span>
      </div>
    </Link>
  );
}