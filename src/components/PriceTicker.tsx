"use client";

import Link from "next/link";
import { TProductPrice } from "@/types/product";

const unitBn: Record<string, string> = {
  kg: "কেজি",
  liter: "লিটার",
  litre: "লিটার",
  piece: "পিস",
  dozen: "ডজন",
};

export default function PriceTicker({
  products,
}: {
  products: TProductPrice[];
}) {
  if (!products || products.length === 0) return null;

  const tickerItems = [...products, ...products];

  return (
    <div className="w-full overflow-hidden border-y border-gray-200 bg-white py-2">
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-ticker {
          display: flex;
          width: max-content;
          animation: marquee 45s linear infinite;
        }
        .animate-ticker:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="animate-ticker items-center">
        {tickerItems.map((product, index) => {
          const isUp = product.change.dir === "up";
          const isDown = product.change.dir === "down";

          return (
            <Link
              key={`${product.slug}-${index}`}
              href={`/product/${product.slug}`}
              className="inline-flex items-center gap-1.5 whitespace-nowrap px-3 text-xs sm:text-sm text-gray-700 transition hover:text-[#1B7F4B]"
            >
              <span>{product.image}</span>
              <span className="font-semibold text-gray-900">
                {product.nameBn}
              </span>
              <span className="text-gray-600">
                {product.today.toLocaleString("bn-BD")} টাকা/{" "}
                {unitBn[product.unit] || product.unit}
              </span>
              <span
                className={`font-semibold ${
                  isUp
                    ? "text-red-600"
                    : isDown
                    ? "text-green-600"
                    : "text-gray-500"
                }`}
              >
                {isUp ? "▲" : isDown ? "▼" : "•"}{" "}
                {Math.abs(product.change.pct).toLocaleString("bn-BD")} %
              </span>
              <span className="ml-2 text-gray-300">•</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}