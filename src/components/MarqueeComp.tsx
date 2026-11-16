import Link from "next/link";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";
import { TProductPrice } from "@/types/product";

const unitBn: Record<string, string> = {
  kg: "কেজি",
  liter: "লিটার",
  litre: "লিটার",
  piece: "পিস",
  dozen: "ডজন",
};

export default async function MarqueeComp() {
  const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products");
  const products: TProductPrice[] = await res.json();

  return (
    <div className="border-b border-gray-200 bg-[#f8fbf9] py-2 text-xs sm:text-sm">
      <div className="mx-auto max-w-7xl px-4">
        <MarqueeText>
          {products.map((item) => {
            const isUp = item.change.dir === "up";
            const isDown = item.change.dir === "down";

            return (
              <Link
                key={item.id}
                href={`/product/${item.slug}`}
                className="mx-4 inline-flex items-center gap-1.5 hover:underline"
              >
                <span>{item.image}</span>
                <span className="font-semibold text-gray-800">{item.nameBn}</span>
                <span className="text-gray-600">
                  {item.today.toLocaleString("bn-BD")} টাকা/{unitBn[item.unit] || item.unit}
                </span>
                <span
                  className={
                    isUp
                      ? "font-semibold text-green-700"
                      : isDown
                      ? "font-semibold text-red-600"
                      : "text-gray-500"
                  }
                >
                  {isUp ? "▲" : isDown ? "▼" : "•"} {Math.abs(item.change.pct).toLocaleString("bn-BD")}%
                </span>
                <span className="ml-3 text-gray-300">•</span>
              </Link>
            );
          })}
        </MarqueeText>
      </div>
    </div>
  );
}